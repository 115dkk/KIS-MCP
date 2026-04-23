#!/usr/bin/env node
/**
 * scripts/build-symbol-index.mjs
 *
 * 한투 다운로드 서버에서 KOSPI + KOSDAQ master file을 받아
 * cp949 fixed-width 레코드를 파싱한 뒤 JSON 인덱스로 변환한다.
 * 결과는 src/data/symbolIndex.json에 저장.
 *
 * 워커 런타임은 이 JSON을 import해서 사용 (ZIP/cp949 라이브러리 불포함).
 *
 * 사용:
 *   node scripts/build-symbol-index.mjs
 *
 * 외부 의존성:
 *   - fflate (ZIP unpack, devDependency)
 *   - Node 18+ (TextDecoder('euc-kr') 지원)
 */

import { unzipSync } from "fflate";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCES = [
  {
    market: "KOSPI",
    url: "https://new.real.download.dws.co.kr/common/master/kospi_code.mst.zip",
  },
  {
    market: "KOSDAQ",
    url: "https://new.real.download.dws.co.kr/common/master/kosdaq_code.mst.zip",
  },
];

// fixed-width byte offsets (실측 분석 기반):
//   0-9   단축코드 (9 bytes, right-padded with spaces)
//   9-21  표준코드 ISIN (12 bytes)
//   21-61 한글 종목명 (40 bytes, cp949 — 한글 1자=2바이트)
//   61-63 종목분류 (2 bytes: ST=주식, EF=ETF, EN=ETN, F=펀드 prefix)
const FIELD = {
  CODE: [0, 9],
  ISIN: [9, 21],
  NAME: [21, 61],
  TYPE: [61, 63],
};

const decoder = new TextDecoder("euc-kr");

function decodeSlice(buf, start, end) {
  return decoder.decode(buf.subarray(start, end)).trim();
}

async function fetchMasterFile(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url}: HTTP ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

function unzipSingle(zipBuf) {
  const files = unzipSync(zipBuf);
  const names = Object.keys(files);
  if (names.length !== 1) {
    throw new Error(`expected 1 file in ZIP, got ${names.length}: ${names.join(", ")}`);
  }
  return files[names[0]];
}

function splitLines(buf) {
  const lines = [];
  let start = 0;
  for (let i = 0; i < buf.length; i++) {
    const b = buf[i];
    if (b === 0x0a /* \n */ || b === 0x0d /* \r */) {
      if (i > start) lines.push(buf.subarray(start, i));
      // \r\n 처리: \r 다음 \n이면 같이 건너뜀
      if (b === 0x0d && buf[i + 1] === 0x0a) i++;
      start = i + 1;
    }
  }
  if (start < buf.length) lines.push(buf.subarray(start));
  return lines;
}

function parseRecord(line, market) {
  if (line.length < FIELD.TYPE[1]) return null;
  const code = decodeSlice(line, FIELD.CODE[0], FIELD.CODE[1]);
  const name = decodeSlice(line, FIELD.NAME[0], FIELD.NAME[1]);
  const type = decodeSlice(line, FIELD.TYPE[0], FIELD.TYPE[1]);
  if (!code || !name) return null;
  return { code, name, type, market };
}

async function build() {
  const all = [];
  const stats = { total: 0, byType: {}, byMarket: {} };

  for (const src of SOURCES) {
    process.stderr.write(`[${src.market}] downloading ${src.url}\n`);
    const zipBuf = await fetchMasterFile(src.url);
    process.stderr.write(`  ${zipBuf.length} bytes (compressed)\n`);
    const rawBuf = unzipSingle(zipBuf);
    process.stderr.write(`  ${rawBuf.length} bytes (raw)\n`);
    const lines = splitLines(rawBuf);
    process.stderr.write(`  ${lines.length} records\n`);
    let ok = 0;
    for (const line of lines) {
      const rec = parseRecord(line, src.market);
      if (!rec) continue;
      all.push(rec);
      ok++;
      stats.byType[rec.type] = (stats.byType[rec.type] ?? 0) + 1;
      stats.byMarket[rec.market] = (stats.byMarket[rec.market] ?? 0) + 1;
    }
    process.stderr.write(`  ${ok} parsed OK\n`);
    stats.total += ok;
  }

  // 정렬: market → code (deterministic 출력)
  all.sort((a, b) => (a.market === b.market ? a.code.localeCompare(b.code) : a.market.localeCompare(b.market)));

  const output = {
    generatedAt: new Date().toISOString(),
    sourceServer: "new.real.download.dws.co.kr",
    totalRecords: all.length,
    typeDistribution: stats.byType,
    marketDistribution: stats.byMarket,
    records: all,
  };

  const __filename = fileURLToPath(import.meta.url);
  const repoRoot = dirname(dirname(__filename));
  const outPath = `${repoRoot}/src/data/symbolIndex.json`;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(output));

  // human-readable summary to stderr
  process.stderr.write(`\n=== Summary ===\n`);
  process.stderr.write(`Total records: ${stats.total}\n`);
  process.stderr.write(`By market: ${JSON.stringify(stats.byMarket)}\n`);
  process.stderr.write(`By type: ${JSON.stringify(stats.byType)}\n`);
  process.stderr.write(`Output: ${outPath} (${(JSON.stringify(output).length / 1024).toFixed(1)} KB)\n`);

  // sanity check: 005930 삼성전자 / 069500 KODEX 200 / 247540 에코프로비엠 모두 검색되는지
  const samples = ["005930", "069500", "247540", "035720"];
  for (const code of samples) {
    const hit = all.find((r) => r.code === code);
    process.stderr.write(`  ${code}: ${hit ? hit.name + " (" + hit.type + " / " + hit.market + ")" : "NOT FOUND"}\n`);
  }
}

build().catch((err) => {
  process.stderr.write(`ERROR: ${err.message}\n${err.stack}\n`);
  process.exit(1);
});
