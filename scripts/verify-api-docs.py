#!/usr/bin/env python3
"""Validate generated KIS API reference docs."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
INDEX = ROOT / "docs" / "kis-api" / "INDEX.md"
REQUIRED_DOCS = [
    "INDEX.md",
    "_other.md",
    "domestic-stock.md",
    "domestic-futureoption.md",
    "overseas-stock.md",
    "overseas-futureoption.md",
    "domestic-bond.md",
]
MCP_TR_IDS = [
    "FHKST01010100",
    "FHKST03010100",
    "FHKST03010230",
    "FHPST02400000",
    "FHKST121600C0",
    "FHPST02440000",
    "FHPST02440200",
    "FHPST02440100",
    "HHKDB669102C0",
    "FHPST04760000",
    "FHPST04830000",
    "HHPST074500C0",
    "FHKST17010000",
    "FHPST04820000",
    "FHPST01700000",
    "FHPST01740000",
    "FHPST01710000",
    "FHPUP02100000",
    "FHPUP02120000",
    "FHPUP02110200",
    "FHKST03030100",
    "FHKST03030200",
    "HHDFS76220000",
    "CTPF1702R",
    "HHDFS76240000",
    "HHDFS76950200",
    "HHDFC55010000",
    "HHDFC55020100",
    "HHDFC55020400",
]


def fail(message: str) -> int:
    print(f"ERROR: {message}", file=sys.stderr)
    return 1


def main() -> int:
    docs_dir = ROOT / "docs" / "kis-api"
    missing_docs = [name for name in REQUIRED_DOCS if not (docs_dir / name).exists()]
    if missing_docs:
        return fail(f"missing generated docs: {', '.join(missing_docs)}")

    text = INDEX.read_text(encoding="utf-8")
    marker = "## 본 MCP에서 사용 중인 핵심 API"
    if marker not in text:
        return fail("INDEX.md is missing the MCP-used API section")

    mcp_section = text.split(marker, 1)[1]
    missing_from_mcp = [tr_id for tr_id in MCP_TR_IDS if f"`{tr_id}`" not in mcp_section]
    if missing_from_mcp:
        return fail(f"TR_IDs missing from MCP-used API section: {', '.join(missing_from_mcp)}")

    missing_from_full_index = [tr_id for tr_id in MCP_TR_IDS if text.count(f"`{tr_id}`") < 2]
    if missing_from_full_index:
        return fail(f"TR_IDs missing from full API index: {', '.join(missing_from_full_index)}")

    print(f"Verified {len(REQUIRED_DOCS)} generated docs and {len(MCP_TR_IDS)} MCP TR_ID mappings.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
