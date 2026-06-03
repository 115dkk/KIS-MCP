#!/usr/bin/env python3
"""Download the latest KIS OpenAPI workbook from the official API portal.

The weekly GitHub Actions workflow uses this before regenerating docs/kis-api.
If the downloaded bytes match an existing workbook, the script leaves the tree
unchanged so the workflow can skip empty commits.
"""
from __future__ import annotations

import argparse
import hashlib
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).parent.parent
DEFAULT_URL = "https://apiportal.koreainvestment.com/files/download/apiCollection/API_COLLECTION"
SOURCE_GLOB = "한국투자증권_오픈API_전체문서_*.xlsx"
SOURCE_NAME_RE = re.compile(r"^한국투자증권_오픈API_전체문서_\d{8}_\d{6}\.xlsx$")
KST = timezone(timedelta(hours=9))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--url",
        default=os.environ.get("KIS_API_COLLECTION_URL", DEFAULT_URL),
        help="KIS API collection download URL.",
    )
    return parser.parse_args()


def download(url: str) -> tuple[bytes, str | None]:
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*",
            "User-Agent": "KIS-MCP-doc-refresh/1.0",
        },
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        data = response.read()
        content_disposition = response.headers.get("Content-Disposition")
    return data, content_disposition


def filename_from_content_disposition(header: str | None) -> str | None:
    if not header:
        return None

    star_match = re.search(r"filename\*\s*=\s*(?:UTF-8''|)([^;]+)", header, re.IGNORECASE)
    if star_match:
        candidate = urllib.parse.unquote(star_match.group(1).strip().strip('"'))
        candidate = Path(candidate).name
        if is_expected_filename(candidate):
            return candidate

    match = re.search(r'filename\s*=\s*"?(.*?)"?(?:;|$)', header, re.IGNORECASE)
    if not match:
        return None

    raw = match.group(1).strip()
    candidates = [raw, urllib.parse.unquote(raw)]
    for encoding in ("utf-8", "cp949"):
        try:
            candidates.append(raw.encode("latin-1").decode(encoding))
        except UnicodeError:
            pass

    for candidate in candidates:
        name = Path(candidate).name
        if is_expected_filename(name):
            return name
    return None


def is_expected_filename(name: str) -> bool:
    return bool(SOURCE_NAME_RE.fullmatch(name))


def fallback_filename() -> str:
    now = datetime.now(KST)
    return f"한국투자증권_오픈API_전체문서_{now:%Y%m%d_%H%M%S}.xlsx"


def validate_xlsx(data: bytes) -> None:
    if len(data) < 100_000:
        raise ValueError(f"downloaded file is unexpectedly small ({len(data)} bytes)")
    if not data.startswith(b"PK\x03\x04"):
        raise ValueError("downloaded file does not look like an .xlsx zip archive")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    args = parse_args()
    data, content_disposition = download(args.url)
    validate_xlsx(data)

    downloaded_hash = sha256_bytes(data)
    existing = sorted(ROOT.glob(SOURCE_GLOB), key=lambda p: p.name)
    for path in existing:
        if sha256_file(path) == downloaded_hash:
            print(f"Downloaded workbook already matches {path.name}; no source update needed.")
            return 0

    filename = filename_from_content_disposition(content_disposition) or fallback_filename()
    target = ROOT / filename

    for path in existing:
        path.unlink()
        print(f"Removed old workbook {path.name}")

    target.write_bytes(data)
    print(f"Wrote {target.name} ({len(data)} bytes)")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
