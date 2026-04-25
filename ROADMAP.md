# KIS-MCP 로드맵 및 실행 계획서

본 문서는 CLAUDE.md §11(개발 우선순위)을 대체한다. Claude Code는 아래 마일스톤을 순서대로 실행하며, 각 마일스톤의 모든 항목이 완료되고 검증 체크리스트를 통과한 뒤 다음 마일스톤으로 진행한다.

---

## 마일스톤 순서 요약

| 순서 | 이름 | 핵심 산출물 | 선행 조건 |
|------|------|-------------|-----------|
| M0 | 리팩토링/최적화 | 공용 유틸 3종, 코드 정리 | 없음 |
| M1 | enrichment 완성 | `enrichWithFundamentals` 옵션 | M0 |
| M2 | 해외 주식 도구 확장 | `get_overseas_stock_quote`, `get_overseas_stock_info` | M0 |
| M3 | 원자재/환율 alias 확장 | 은, 구리, 천연가스, 추가 통화쌍 | M0 |
| M4 | 응답 캐싱 | KV 기반 단기 TTL 캐시 | M2 권장 |
| M5 | 마스터 인덱스 자동 갱신 | Cron Trigger, KV 인덱스 | M4 |
| M6 | 접근 제어 | Bearer 토큰 검증 | 독립 |
| M7 | Prompt 확장 | compare_stocks, analyze_sector 등 | M2 |
| M8 | 테스트 확장 | 도구별 단위 테스트, 통합 테스트 | M0~M3 |

---

## 전역 코드 원칙

이하 모든 마일스톤에서 Claude Code가 반드시 준수해야 하는 원칙이다. 기능 구현보다 이 원칙이 우선한다.

### DRY: 공용 유틸 재사용 강제

새로운 도구를 작성할 때, 아래 패턴을 파일 내부에 재정의하지 않는다. 반드시 import하여 사용한다.

- KIS 응답에서 배열 추출 → `import { extractArray } from "../utils/kisResponse.js"`
- KIS 응답에서 단일 객체 추출 → `import { extractObject } from "../utils/kisResponse.js"`
- 1분봉을 N분봉으로 집계 → `import { aggregateMinutes } from "../tools/chart.js"`
- 시계열 다운샘플링 → `import { downsample } from "../utils/downsample.js"`
- 배치 병렬 API 호출 → `import { batchParallel } from "../utils/batch.js"`

위 유틸이 아직 존재하지 않으면 M0에서 먼저 생성한다.

### 병렬화: 순차 루프 금지

`for...of + await` 패턴으로 독립적인 API 호출을 순차 처리하지 않는다. 각 호출이 서로 의존하지 않는 한 `batchParallel`을 사용한다.

### 매매 엔드포인트 비존재 유지

모든 마일스톤 완료 후 아래 명령의 결과가 0건이어야 한다.

```bash
grep -r -E "trading|order|inquire-balance|inquire-psbl-order" src/
```

---

## M0: 리팩토링/최적화

기능 추가 전에 기반 코드를 정리하는 단계. 이 단계의 모든 변경은 기존 동작을 변경하지 않아야 한다(리팩토링 전후 동일 입력에 동일 출력).

### M0-1: 응답 추출 유틸 통합

**문제:** 10개 도구 파일에 16개의 `extract*` 함수가 산재하며, 모두 `[res.output, res.output1, res.output2]` 순회라는 동일 패턴을 반복한다.

**작업:**

1. `src/utils/kisResponse.ts` 파일을 새로 생성한다.
2. 아래 두 함수를 정의한다.

```typescript
import type { KisResponse } from "../kis/types.js";

/**
 * KIS 응답에서 배열 타입 출력을 추출한다.
 * output, output1, output2 중 첫 번째 **비어있지 않은** 배열을 반환. 없으면 빈 배열.
 *
 * 핵심: Array.isArray(c) && c.length > 0 조건을 사용한다.
 * 빈 배열([])은 건너뛴다. KIS API가 output에 빈 배열을 넣고 output2에 실제 데이터를
 * 넣는 경우가 있기 때문이다 (ETF 구성종목 등). 빈 배열을 유효한 응답으로 취급하면
 * output2의 실제 데이터에 도달하지 못하는 버그가 발생한다.
 */
export function extractArray<T>(res: KisResponse<unknown>): T[] {
  for (const c of [res.output, res.output1, res.output2]) {
    if (Array.isArray(c) && c.length > 0) return c as T[];
  }
  return [];
}

/**
 * KIS 응답에서 단일 객체 출력을 추출한다.
 * output, output1, output2 중 첫 번째 비배열 객체를 반환. 없으면 빈 객체.
 */
export function extractObject<T>(res: KisResponse<unknown>): Partial<T> {
  for (const c of [res.output, res.output1, res.output2]) {
    if (c && typeof c === "object" && !Array.isArray(c)) return c as Partial<T>;
  }
  return {};
}
```

3. 아래 파일들에서 개별 `extract*` 함수를 제거하고, `extractArray`/`extractObject` import로 교체한다. 교체 시 기존 함수와 동일한 동작을 유지하는지 확인한다.

   - `src/tools/chart.ts`: `extractDailyItems`, `extractMinuteItems` → `extractArray`
   - `src/tools/commodity.ts`: `extractOverseasChartItems`, `extractFuturesChartItems`, `extractFuturesMinuteItems` → `extractArray`
   - `src/tools/credit.ts`: `extractArray` (이미 제네릭이므로 import 경로만 변경)
   - `src/tools/dividend.ts`: `extractItems` → `extractArray`
   - `src/tools/etf.ts`: `extractItems` → `extractArray`, `extractMeta` → `extractObject`
   - `src/tools/fx.ts`: `extractChartItems` → `extractArray`
   - `src/tools/marketIndex.ts`: `extractGenericArray`, `extractDomesticChartItems`, `extractOverseasChartItems` → `extractArray`
   - `src/tools/overseasStock.ts`: `extractDailyItems`, `extractMinuteItems` → `extractArray`
   - `src/tools/search.ts`: `extractArray` (import 경로 변경)

4. **주의:** 일부 도구(chart.ts, dividend.ts)에서는 배열이 아닌 단일 객체를 배열로 감싸는 fallback 로직이 있다. 이 경우 `extractArray` 호출 후 결과가 빈 배열이면 `extractObject`로 단일 객체를 시도하는 2단계 로직으로 교체한다.

5. **주의:** overseasStock.ts의 extract 함수들은 `[res.output2, res.output, res.output1]` 순서로 순회한다(output2 우선). 이 순서 차이가 의미 있는지 확인하고, 의미 있다면 `extractArray`에 `preferredOrder` 옵션을 추가하거나, 해당 도구에서만 직접 순회를 유지한다.

6. **참고:** 이 작업에서 `extractArray`에 적용하는 빈 배열 건너뛰기(`c.length > 0`)는 M0-9(ETF 구성종목 신뢰성)의 근본 원인을 해결한다. KIS가 `output: []`, `output2: [실제 데이터]`를 반환할 때 빈 배열을 건너뛰고 실제 데이터에 도달하게 된다.

**검증:**
- `npm run typecheck` 통과
- `npm run test` 통과
- `grep -rn "function extract" src/tools/` 결과가 0건 (공용 유틸로 이동 완료)

### M0-2: 배치 병렬화 유틸

**문제:** `search.ts` enrichment(최대 30건), `credit.ts` ETF 구성종목(최대 20개 × 3 API)이 순차 호출로 처리되어, wall-clock 시간을 낭비한다.

**작업:**

1. `src/utils/batch.ts` 파일을 새로 생성한다.

```typescript
/**
 * 배치 병렬 실행. items를 batchSize 단위로 나누어 각 배치 내에서 병렬 실행.
 * 레이트 리미터(초당 15)와 충돌하지 않도록 batchSize는 8 이하를 권장.
 *
 * 반환: 입력 순서 보존. 각 항목에 result(성공) 또는 error(실패) 포함.
 */
export interface BatchResult<T, R> {
  item: T;
  result?: R;
  error?: unknown;
}

export async function batchParallel<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  batchSize = 5,
): Promise<BatchResult<T, R>[]> {
  const results: BatchResult<T, R>[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const settled = await Promise.allSettled(batch.map(fn));
    for (let j = 0; j < batch.length; j++) {
      const s = settled[j];
      results.push(
        s.status === "fulfilled"
          ? { item: batch[j], result: s.value }
          : { item: batch[j], error: s.reason },
      );
    }
  }
  return results;
}
```

2. `src/tools/search.ts`의 enrichment 루프(2곳 모두)를 `batchParallel`로 교체한다.

```typescript
// 변경 전
for (const hit of trimmed) {
  try {
    const ret = await getReturn(client, { symbol: hit.symbol, period });
    enriched.push({ ...hit, enrichedReturnPct: ret.absoluteReturnPct, ... });
  } catch { enriched.push(hit); }
}

// 변경 후
const batchResults = await batchParallel(
  trimmed,
  (hit) => getReturn(client, { symbol: hit.symbol, period }),
  5,
);
const enriched = batchResults.map(({ item, result, error }) =>
  result
    ? { ...item, enrichedReturnPct: result.absoluteReturnPct, enrichedReturnPeriod: period }
    : item,
);
```

3. `src/tools/credit.ts`의 ETF 구성종목 루프를 동일하게 교체한다.

**검증:**
- `npm run typecheck` 통과
- 기존 순차 호출과 동일한 결과가 나오는지 수동 확인 (같은 ETF에 대해 credit_ratio 호출, 결과 비교)

### M0-3: symbolIndex normalizeName 사전 캐싱

**문제:** `findByName` 호출마다 4,330개 레코드에 정규식 치환(`normalizeName`)을 재적용한다. 사전 캐싱으로 66% CPU 절감이 가능하다(벤치마크 확인 완료).

**작업:**

1. `src/utils/symbolIndex.ts`를 수정한다.

2. 모듈 초기화 블록에서 records에 `_norm` 프로퍼티를 미리 계산한다.

```typescript
interface IndexedRecord extends SymbolRecord {
  _norm: string;
}

const indexed: IndexedRecord[] = data.records.map(rec => ({
  ...rec,
  _norm: normalizeName(rec.name),
}));
```

3. `findByName`의 tier2/tier3 순회에서 `normalizeName(rec.name)` 대신 `rec._norm`을 참조한다.

4. `listByFilter`에서도 `data.records` 대신 `indexed`를 순회한다.

5. 기존의 `byCode`, `byNormalizedName` Map 구축도 `indexed`를 기반으로 변경한다.

**검증:**
- `npm run test` 통과 (symbol.test.ts)
- `find_symbol` 도구의 검색 결과가 변경 전과 동일한지 수동 확인

### M0-4: marketCodes.ts 참조 공유

**문제:** 15개 대상에 대해 44개의 별도 객체 리터럴이 생성되어 있다. 동일 대상의 alias가 독립 객체를 참조하므로 메모리 낭비와 변경 시 다중 수정이 발생한다.

**작업:**

1. `src/utils/marketCodes.ts`에서 각 고유 대상을 상수로 추출한다.

```typescript
const _KOSPI: MarketAlias = { category: "index-domestic", mrkt: "U", iscd: "0001", displayName: "코스피" };
const _KOSDAQ: MarketAlias = { category: "index-domestic", mrkt: "U", iscd: "1001", displayName: "코스닥" };
const _KOSPI200: MarketAlias = { category: "index-domestic", mrkt: "U", iscd: "2001", displayName: "코스피200" };
// ... 나머지 12개 대상
```

2. `ALIAS_TABLE`에서 각 키가 해당 상수를 참조하도록 변경한다.

```typescript
const ALIAS_TABLE: Record<string, MarketAlias> = {
  KOSPI: _KOSPI, 코스피: _KOSPI, KS11: _KOSPI,
  KOSDAQ: _KOSDAQ, 코스닥: _KOSDAQ, KQ11: _KOSDAQ,
  // ...
};
```

3. 상수 이름에 underscore prefix를 붙여 모듈 외부 export와 구분한다.

**검증:**
- `npm run test` 통과 (marketCodes.test.ts)
- `resolveAlias("KOSPI") === resolveAlias("코스피")` 참조 동일성 확인 (===)

### M0-5: get_quote auto-detection 개선

**문제:** ETF 종목을 `instrumentType='auto'`로 조회하면 주식 API → ETF API 2회 호출이 발생한다. 마스터파일 인덱스에 이미 종목 유형이 포함되어 있으므로, 사전 감지로 1회로 줄일 수 있다.

**작업:**

1. `src/tools/quote.ts`의 `getQuote` 함수에서 auto 모드일 때 마스터 인덱스를 먼저 조회한다.

```typescript
import { findByCode } from "../utils/symbolIndex.js";

// auto 모드: 마스터 인덱스로 사전 감지
if (requested === "auto") {
  const rec = findByCode(symbol);
  if (rec && (rec.type === "EF" || rec.type === "EN" || rec.type === "BC")) {
    return fetchEtfQuote(client, symbol);
  }
}
```

2. 마스터 인덱스에 없는 종목(신규 상장 등)에 대해서는 기존의 API 기반 fallback을 유지한다. 즉, `findByCode`가 undefined를 반환하면 기존 로직(주식 API 호출 → 응답 검사 → 필요 시 ETF 재호출)을 그대로 탄다.

**검증:**
- 주식 종목(005930): 1회 API 호출로 응답
- ETF 종목(069500): 1회 API 호출로 응답 (기존에는 2회)
- 마스터에 없는 종목: 기존 fallback으로 정상 동작

### M0-6: 리팩토링 대상 함수 회귀 테스트

M0에서 변경하는 핵심 함수들에 대해 최소한의 단위 테스트를 작성한다.

**작업:**

1. `test/kisResponse.test.ts` 생성: `extractArray`, `extractObject`가 output/output1/output2 각각에서 올바르게 추출하는지, 빈 응답에서 빈 배열/객체를 반환하는지 검증. **추가:** 빈 배열 건너뛰기 테스트(M0-9 참조) — `{ output: [], output2: [data] }` → `[data]` 반환 확인.

2. `test/batch.test.ts` 생성: `batchParallel`이 입력 순서를 보존하는지, 개별 실패가 전체를 중단시키지 않는지, batchSize 경계(items.length가 batchSize의 배수가 아닐 때) 검증.

3. `test/symbolIndex.test.ts` 확장 (기존 symbol.test.ts와 별도): `findByName`의 3-tier 매칭, `findByCode`의 정확 매칭, `listByFilter`의 type/market 필터.

4. `test/filters.test.ts` 확장 (M0-8 참조): 해외 키워드 확장 후 `TIGER 필라델피아반도체`, `ACE MSCI필리핀(합성)` 등이 `excludeOverseas: true`에서 제외되는지 확인. `KODEX MSCI Korea`가 화이트리스트로 생존하는지 확인. `excludeBonds: true`에서 `HK 26-12 회사채`, `ACE TDF2030액티브`, `TIGER 머니마켓액티브`가 제외되는지 확인.

**검증:**
- `npm run test` 전체 통과

### M0-7: CLAUDE.md 원칙 추가

`CLAUDE.md` §5(비기능 요구사항) 끝에 아래 내용을 추가한다.

```markdown
### 5.7. 코드 구조 원칙 (리팩토링 이후 신규 코드에 적용)

- **DRY:** KIS 응답 추출은 `utils/kisResponse.ts`의 `extractArray`/`extractObject`를 사용한다. 도구 파일 내부에 개별 extract 함수를 정의하지 않는다.
- **병렬화:** 독립적인 API 호출을 순차 for-await 루프로 처리하지 않는다. `utils/batch.ts`의 `batchParallel`을 사용한다. batchSize는 레이트 리미터 용량(15) 미만으로 설정한다.
- **사전 계산:** 반복 사용되는 연산(normalizeName 등)은 모듈 로드 시점에 사전 계산하여 캐싱한다. 호출 시점에 재계산하지 않는다.
- **참조 공유:** 동일 데이터를 여러 키에 매핑할 때, 객체 리터럴을 복사하지 않고 상수 참조를 공유한다.
```

**검증:**
- CLAUDE.md에 §5.7이 추가되었는지 확인

### M0-8: Advanced Search 필터 확장

**문제 1 — 해외 ETF 누락:** `filters.ts`의 `OVERSEAS_KEYWORDS`가 14개뿐이어서, 해외 자산을 추종하는 ETF 44개 이상이 `excludeOverseas: true`를 통과한다. 누락 패턴은 국가/도시명(홍콩, 대만, 독일 등), 해외지수명(MSCI, FTSE, DAX 등), 해외기업명(테슬라, 엔비디아, 애플 등) 세 가지다.

**문제 2 — 채권/TDF 필터 부재:** `DEFAULT_EXCLUDE_KEYWORDS`에 '채권혼합'은 있지만 순수 '채권'이 없어, 179개의 채권·TDF·머니마켓 ETF를 제외할 방법이 없다. `HK 26-12 회사채(AA-이상)액티브`, `ACE TDF2030액티브`, `TIGER 머니마켓액티브` 등이 주식 스크리닝 결과에 섞여 나온다.

**작업:**

1. `src/utils/filters.ts`의 `OVERSEAS_KEYWORDS` 배열을 확장한다. 아래 키워드를 추가한다.

```typescript
const OVERSEAS_KEYWORDS = [
  // 기존
  "미국", "나스닥", "S&P", "S&P500", "다우", "글로벌", "차이나", "중국",
  "일본", "베트남", "인도", "유럽", "선진국", "신흥국",
  // 국가/지역 추가
  "홍콩", "대만", "독일", "영국", "호주", "캐나다", "브라질", "러시아",
  "멕시코", "필리핀", "인도네시아", "태국", "이탈리아", "프랑스", "스페인",
  "터키", "사우디", "아랍", "폴란드", "아시아", "아프리카", "남미",
  "이머징",
  // 해외지수/거래소
  "MSCI", "FTSE", "STOXX", "DAX", "TOPIX", "Nifty", "항셍", "닛케이",
  "니케이", "NYSE",
  // 해외기업명 (개별주식 추종 ETF)
  "테슬라", "엔비디아", "애플", "아마존", "마이크로소프트", "구글", "알파벳",
  "메타",
  // 해외자산
  "달러", "USD", "미국채", "Treasury",
];
```

2. **MSCI Korea 문제:** MSCI 키워드가 `KODEX MSCI Korea` 같은 국내 추종 ETF까지 잡는 부작용이 있다. 이를 처리하기 위해 `isExcludedByKeyword` 함수에 화이트리스트 예외 로직을 추가한다. 화이트리스트 키워드(`Korea`, `한국`)가 이름에 포함되면 해외 필터를 면제한다.

```typescript
const OVERSEAS_WHITELIST = ["Korea", "한국"];

export function isExcludedByKeyword(name: string, opts: ExclusionOptions = {}): boolean {
  if (!name) return false;
  const lower = name.toLowerCase();

  // 기본 제외 키워드 (인버스, 레버리지 등) — 화이트리스트 면제 없음
  for (const kw of [...DEFAULT_EXCLUDE_KEYWORDS, ...(opts.extraKeywords ?? [])]) {
    if (!kw) continue;
    if (lower.includes(kw.toLowerCase())) return true;
  }

  // 해외 제외 키워드 — 화이트리스트 면제 적용
  if (opts.excludeOverseas) {
    const whitelisted = OVERSEAS_WHITELIST.some(w => lower.includes(w.toLowerCase()));
    if (!whitelisted) {
      for (const kw of OVERSEAS_KEYWORDS) {
        if (lower.includes(kw.toLowerCase())) return true;
      }
    }
  }

  // 채권/TDF/머니마켓 제외
  if (opts.excludeBonds) {
    for (const kw of BOND_TDF_KEYWORDS) {
      if (lower.includes(kw.toLowerCase())) return true;
    }
  }

  return false;
}
```

3. `BOND_TDF_KEYWORDS` 배열을 새로 정의한다.

```typescript
const BOND_TDF_KEYWORDS = [
  "채권", "국고채", "국채", "회사채", "금리", "통안채", "단기채",
  "TDF", "타겟데이트", "Target Date",
  "머니마켓", "MMF", "단기자금",
  "SOFR", "CD금리",
  "종합채권", "크레딧", "하이일드",
];
```

4. `src/utils/filters.ts`의 `ExclusionOptions` 인터페이스에 `excludeBonds?: boolean` 필드를 추가한다.

5. `src/tools/search.ts`의 `AdvancedSearchInput`에 `excludeBonds?: boolean` 필드를 추가한다. 기존 `excludeOverseas`와 동일한 패턴으로 `isExcludedByKeyword`에 전달한다.

6. `src/mcp/server.ts`의 `advanced_search` 도구 등록에 `excludeBonds` Zod 스키마를 추가한다.

```typescript
excludeBonds: z.boolean().optional().describe(
  "채권/TDF/머니마켓 ETF 제외 (채권, 국고채, 회사채, TDF, 머니마켓, CD금리 등)"
),
```

7. `SERVER_INSTRUCTIONS`에 `excludeBonds`의 존재를 안내한다. 기존 `excludeOverseas` 설명 옆에 추가한다.

8. `DEFAULT_EXCLUDE_KEYWORDS`에서 `"채권혼합"`을 제거한다. `BOND_TDF_KEYWORDS`에 이미 `"채권"`이 포함되어 있으므로, `excludeBonds: true`일 때 자동으로 잡힌다. `excludeBonds: false`일 때는 채권혼합 ETF가 결과에 포함되어야 하므로 기본 제외 대상이 아니다. 단, `"혼합"` 키워드는 유지한다(주식/채권 혼합형 의미).

**검증:**
- `npm run test` 통과 (filters.test.ts)
- `advanced_search({instrumentType: "etf", rankBy: "return_1y", excludeOverseas: true})` 결과에 '테슬라', '엔비디아', '필라델피아' 포함 ETF가 없는지 확인
- `advanced_search({instrumentType: "etf", rankBy: "return_1y", excludeBonds: true})` 결과에 '회사채', 'TDF', '머니마켓' 포함 ETF가 없는지 확인
- `KODEX MSCI Korea`가 `excludeOverseas: true`에서 화이트리스트로 생존하는지 확인
- filters.test.ts에 신규 키워드 테스트 케이스 추가

### M0-9: ETF 구성종목 응답 신뢰성 개선

**문제 — extractItems 빈 배열 버그:** `etf.ts`의 `extractItems`는 `[res.output, res.output1, res.output2]` 순서로 순회하면서 첫 번째 배열을 반환한다. KIS API의 ETF 구성종목 엔드포인트는 문서상 output1에 메타 객체, output2에 구성종목 배열을 넣어 반환하는데, KIS가 output에 빈 배열(`[]`)을 넣어 보내는 경우가 있다. `Array.isArray([])`는 `true`이므로, `extractItems`가 이 빈 배열을 즉시 반환하고 실제 데이터가 담긴 output2에 도달하지 못한다.

실증 결과:
```
입력: { output: [], output1: {메타}, output2: [{실제 데이터}] }
현재 코드 반환: []          ← output의 빈 배열을 반환
수정 코드 반환: [{실제 데이터}]  ← output2의 실제 데이터를 반환
```

이 버그로 인해 KIS API가 데이터를 정상 반환했음에도 코드는 빈 응답으로 처리하며, 3회 재시도 모두 동일한 이유로 실패할 수 있다. 사용자에게는 "KIS API가 3회 호출 모두에서 구성종목 데이터를 반환하지 않았습니다"라는 메시지가 나오지만, 실제로는 데이터가 도착했으나 코드가 잘못된 필드를 읽은 것이다.

**작업:**

1. M0-1에서 생성하는 `extractArray` 유틸이 `Array.isArray(c) && c.length > 0` 조건을 사용하도록 이미 수정되었다. `etf.ts`의 `extractItems`를 `extractArray` import로 교체하면(M0-1 작업) 이 버그가 자동으로 해결된다.

2. **추가: 재시도 로직 강화.** 빈 배열 버그 해결 후에도 KIS API 자체의 비결정적 빈 응답(30~50% 확률) 문제는 남아 있으므로, 재시도 로직을 강화한다.

   a. `maxAttempts` 기본값을 3에서 5로 변경한다 (실패 확률: 50%^3=12.5% → 50%^5=3.1%).
   b. 고정 대기(500ms)를 지수 백오프로 변경한다: 500ms → 750ms → 1125ms → 1687ms. `RETRY_DELAY_MS * (1.5 ** i)`.
   c. 응답 로깅 강화: 각 시도에서 어떤 output 필드에 데이터가 왔는지를 `attempts` 카운터 옆에 기록하여 디버깅을 돕는다.

3. **도구 description 보강.** `server.ts`의 `get_etf_components` description에 아래 문구를 추가한다.

```typescript
"KIS API의 비결정적 빈 응답 특성상 최대 5회 재시도하며, 그래도 빈 응답이면 message 필드로 안내한다.",
"구성종목, 포트폴리오, 보유 종목, 비중 등의 질문에 사용.",
```

   마지막 줄은 LLM이 '구성종목' 외에 '포트폴리오', '보유 종목', '비중' 같은 유사 표현으로 질문받았을 때도 이 도구를 선택하도록 돕는 동의어 힌트다.

**검증:**
- M0-1의 `extractArray` 교체가 적용된 상태에서, `get_etf_components("069500")` 5회 연속 호출 시 성공률 확인
- `test/kisResponse.test.ts`에 빈 배열 건너뛰기 테스트 케이스 추가 (M0-6에서 함께 처리):
  - `{ output: [], output1: {}, output2: [{data}] }` → `[{data}]` 반환
  - `{ output: undefined, output2: [{data}] }` → `[{data}]` 반환
  - `{ output: [], output1: {}, output2: [] }` → `[]` 반환

---

## M1: enrichment 완성

### M1-1: enrichWithFundamentals 옵션

**작업:**

1. `src/tools/search.ts`의 `AdvancedSearchInput`에 `enrichWithFundamentals?: boolean` 필드를 추가한다.

2. `advancedSearch` 함수와 `advancedSearchViaMaster` 함수 모두에서, `enrichWithReturn` 처리 블록 직후에 `enrichWithFundamentals` 블록을 추가한다.

3. 로직: 후보 상위 30건(ENRICH_CAP과 동일)에 대해 `batchParallel`로 `getFundamentals`를 호출한다. 응답에서 PER, PBR을 추출하여 hit에 `enrichedPer`, `enrichedPbr` 필드를 추가한다.

4. `maxPer`, `maxPbr` 파라미터가 주어졌으면 enrichment 결과를 기준으로 필터링한다. enrichment에 실패한 종목(API 에러 등)은 필터에서 제외(통과시킴)한다.

5. `AdvancedSearchHit`에 `enrichedPer?: number`, `enrichedPbr?: number` 필드를 추가한다.

6. `server.ts`의 `advanced_search` 도구 등록에 `enrichWithFundamentals` Zod 스키마를 추가한다. description은 `maxPer` 기존 describe에서 `"(현재 enrichment 미구현 예약)"`을 제거한다.

**검증:**
- `npm run typecheck` 통과
- `advanced_search({rankBy: "mcap", enrichWithFundamentals: true, maxPer: 15})` 호출 시 PER 15 초과 종목이 결과에서 제외되는지 수동 확인

### M1-2: Prompt 갱신

1. `server.ts`의 `screen_value_stocks` Prompt를 수정한다. 기존 "후보별 get_fundamentals 호출" 지시를 `advanced_search({enrichWithFundamentals: true, maxPer: ..., maxPbr: ...})` 단일 호출로 대체한다.

2. `SERVER_INSTRUCTIONS`에서 `maxPer` 관련 설명을 갱신한다. "(현재 enrichment 미구현 예약)" 문구를 제거하고, `enrichWithFundamentals`의 사용법을 추가한다.

---

## M2: 해외 주식 도구 확장

### M2-1: endpoints.ts에 해외 주식 엔드포인트 추가

1. `src/kis/endpoints.ts`에 아래를 추가한다.

```typescript
/** 해외주식 현재가. EXCD(거래소) + SYMB(종목코드). */
overseasStockPrice: {
  path: "/uapi/overseas-price/v1/quotations/price",
  trIdReal: "HHDFS00000300",
},
/** 해외주식 기본정보 (조건검색). EXCD + SYMB. PER, EPS, 시총 등. */
overseasStockSearchInfo: {
  path: "/uapi/overseas-price/v1/quotations/search-info",
  trIdReal: "CTPF1702R",
},
```

2. `src/kis/types.ts`에 해당 응답 타입을 추가한다. 한투 API 문서(`docs/kis-api/overseas-stock.md`)에서 응답 필드를 확인하여 정의한다.

### M2-2: get_overseas_stock_quote 도구

1. `src/tools/overseasStockQuote.ts` 파일을 새로 생성한다.
2. 입력: `market`(NAS/NYS/AMS/TSE/HKS/SHS/SZS/HSX/HNX), `symbol`(종목코드)
3. 출력: 현재가, 전일대비, 등락률, 거래량, 52주 고저, 시가/고가/저가
4. `extractObject`를 import하여 응답 추출. 개별 extract 함수를 정의하지 않는다.

### M2-3: get_overseas_stock_info 도구

1. `src/tools/overseasStockInfo.ts` 파일을 새로 생성한다.
2. 입력: `market`, `symbol`
3. 출력: PER, EPS, 시총, 업종, 발행주식수 등
4. `extractObject`로 응답 추출.

### M2-4: server.ts 등록 및 instructions 갱신

1. `server.ts`의 `registerTools`에 두 도구를 추가한다.
2. `SERVER_INSTRUCTIONS`의 도구 선택 가이드에 해외 주식 현재가/기본정보 항목을 추가한다.
3. `TOOLS.md`에 두 도구의 스키마와 예시를 추가한다.

**검증:**
- `npm run typecheck` 통과
- "테슬라 현재가" → `get_overseas_stock_quote({market: "NAS", symbol: "TSLA"})` 정상 응답
- "애플 PER" → `get_overseas_stock_info({market: "NAS", symbol: "AAPL"})` 정상 응답

---

## M3: 원자재/환율 alias 확장

### M3-1: 원자재 alias 추가

`src/utils/marketCodes.ts`에 아래 원자재를 추가한다. M0-4에서 확립한 참조 공유 패턴을 따른다.

추가 대상과 한투 코드:
- **은(Silver):** srsBase `SI`, contractCadence `monthly`, priceDecimals `3`, unit `USD/oz`
- **구리(Copper):** srsBase `HG`, contractCadence `monthly`, priceDecimals `4`, unit `USD/lb`
- **천연가스(Natural Gas):** srsBase `NG`, contractCadence `monthly`, priceDecimals `3`, unit `USD/MMBtu`
- **팔라듐(Palladium):** srsBase `PA`, contractCadence `quarterly`, priceDecimals `1`, unit `USD/oz`
- **백금(Platinum):** srsBase `PL`, contractCadence `quarterly`, priceDecimals `1`, unit `USD/oz`

각 대상에 영문, 한국어 alias를 등록한다(예: SILVER/은, COPPER/구리, NATGAS/천연가스).

`priceDecimals`, `srsBase`, `contractCadence` 값은 한투 ffcode.mst 마스터파일 또는 `docs/kis-api/overseas-futureoption.md`에서 확인한다. 확인이 불가능하면 notes 필드에 "미검증, 실제 호출로 확인 필요"를 명시한다.

### M3-2: 환율 alias 추가

추가 대상:
- **GBP/KRW:** iscd 추정 `FX@GBP`, 영파운드/원파운드
- **AUD/KRW:** iscd 추정 `FX@AUD`, 호주달러
- **CAD/KRW:** iscd 추정 `FX@CAD`, 캐나다달러

iscd는 한투 마스터파일에서 확인한다. 확인이 불가능하면 notes 필드에 명시하고, `get_fx` 호출 시 실제 데이터가 반환되는지 수동 검증한다.

### M3-3: marketCodes.test.ts 확장

새로 추가한 alias들이 `resolveAlias`로 정상 매핑되는지 테스트를 추가한다.

**검증:**
- `npm run test` 통과
- `get_commodity("SILVER")`, `get_fx("GBPKRW")` 수동 호출로 실제 데이터 반환 확인

---

## M4: 응답 캐싱

### M4-1: KisClient 내 캐시 레이어

1. `src/utils/responseCache.ts`를 새로 생성한다.
2. 캐시 키: `path + sorted(query params)` 의 SHA-256 해시 (또는 단순 문자열 결합).
3. TTL 분류:
   - `quotations/inquire-price`, `quotations/price` (현재가): 10초
   - `quotations/inquire-index-price` (지수 현재가): 10초
   - `ksdinfo/dividend`, `ranking/*` (배당/랭킹): 300초
   - 기타 (차트, 신용잔고 등): 60초
4. 저장소: Cloudflare KV. KV minimum TTL이 60초이므로, 10초 TTL 항목은 KV 저장 시 TTL을 60초로 설정하되, 캐시 값 내부에 `expiresAt` 타임스탬프를 포함하여 조회 시 만료 검사를 수행한다.

### M4-2: KisClient.get()에 캐시 통합

1. `src/kis/client.ts`의 `get()` 메서드에 캐시 조회/저장 로직을 추가한다. 캐시를 사용하지 않는 옵션(`skipCache?: boolean`)도 KisGetOptions에 추가한다.
2. 캐시 히트 시 레이트 리미터를 소비하지 않는다.

### M4-3: ping 응답에 캐시 통계

`ping` 도구 응답에 `cacheHits`, `cacheMisses` 카운터를 추가한다 (isolate 수명 기준).

**검증:**
- 동일 종목에 `get_quote` 2회 연속 호출 시, 두 번째 호출이 캐시에서 즉시 반환되는지 확인 (ping의 cacheHits 증가)
- `npm run typecheck` 통과

---

## M5: 마스터 인덱스 자동 갱신

### M5-1: scheduled worker

1. `wrangler.toml`에 Cron Trigger를 추가한다. 매일 KST 16:00 (UTC 07:00) 실행.

```toml
[triggers]
crons = ["0 7 * * *"]
```

2. `src/index.ts`에 `scheduled` 이벤트 핸들러를 추가한다. `scripts/build-symbol-index.mjs`의 마스터파일 다운로드/파싱 로직을 TypeScript로 포팅하여, 결과 JSON을 KV(`KIS_TOKENS` 또는 별도 namespace)에 `symbol-index:latest` 키로 저장한다.

### M5-2: symbolIndex.ts 데이터 소스 전환

1. `src/utils/symbolIndex.ts`의 데이터 소스를 정적 import에서 KV 조회로 전환한다.
2. 모듈 로드 시점이 아닌, 첫 호출 시 lazy load한다. 로드된 데이터는 isolate 수명 동안 in-memory 캐싱한다.
3. KV에 데이터가 없으면 정적 import(`src/data/symbolIndex.json`)를 fallback으로 사용한다.
4. KV 기반이므로 `KVNamespace` 바인딩이 필요하다. `findByCode`, `findByName`, `listByFilter` 함수 시그니처에 `kv: KVNamespace` 파라미터를 추가하거나, 초기화 함수를 통해 KV를 주입한다.

**검증:**
- `wrangler dev --test-scheduled` 로 cron 수동 트리거, KV에 인덱스가 저장되는지 확인
- KV 인덱스 삭제 후 `find_symbol` 호출 시 정적 fallback으로 정상 동작하는지 확인

---

## M6: 접근 제어

### M6-1: Bearer 토큰 검증

1. `wrangler secret put MCP_AUTH_TOKEN`으로 인증 토큰을 등록한다.

2. `src/index.ts`의 fetch 핸들러 시작부에 인증 미들웨어를 추가한다.

```typescript
// /health는 인증 없이 접근 가능 (상태 확인용)
if (url.pathname !== "/" && url.pathname !== "/health") {
  const authHeader = request.headers.get("Authorization");
  const expected = env.MCP_AUTH_TOKEN;
  if (expected && authHeader !== `Bearer ${expected}`) {
    return new Response("Unauthorized", { status: 401 });
  }
}
```

3. `MCP_AUTH_TOKEN`이 설정되지 않은 경우(빈 문자열 또는 undefined) 인증을 건너뛴다. 이는 기존 사용자의 하위 호환성을 유지하기 위함이다.

4. README.md에 MCP 클라이언트 설정 시 Bearer 토큰 포함 방법을 안내한다.

**검증:**
- `MCP_AUTH_TOKEN` 설정 후, 토큰 없이 `/sse` 접근 시 401 응답
- 올바른 토큰으로 접근 시 정상 동작
- `MCP_AUTH_TOKEN` 미설정 시 기존처럼 인증 없이 접근 가능

---

## M7: Prompt 확장

M2(해외 주식 도구) 완성 후 진행한다.

### M7-1: compare_stocks Prompt

2~5개 종목의 현재가/PER/PBR/배당수익률/1Y 수익률을 병렬 조회하여 비교표를 생성하는 Prompt. 국내/해외 혼합 가능.

### M7-2: analyze_sector Prompt

업종 키워드 입력 → `advanced_search`로 해당 업종 시총 상위 종목 → 각 종목 `get_fundamentals` + `get_return` → 업종 지수 시계열과 대비 분석.

### M7-3: portfolio_risk_check Prompt

종목코드 리스트(최대 20개) 입력 → 각 종목의 `get_credit_ratio` + `get_dividend` + `get_return` 병렬 조회 → 위험도/배당/수익률 종합 보고.

각 Prompt의 구현은 기존 `registerPrompts` 함수 내에 `server.prompt(...)` 호출을 추가하는 방식이다. 기존 4개 Prompt(`analyze_credit_risk`, `inspect_etf`, `screen_value_stocks`, `screen_high_dividend`)의 패턴을 따른다.

---

## M8: 테스트 확장

### M8-1: client.ts 테스트

- 401 시 토큰 재발급 1회 재시도
- 429 시 지수 백오프 3회
- `EGW00201` 에러 코드 인식
- 25초 타임아웃
- Mock 기반: `KisClient` 생성자에 fetch 함수를 주입 가능하도록 인터페이스 추출, 또는 vitest의 `vi.fn()` 사용.

### M8-2: 페이지네이션 테스트

- `fetchDailyChart`: 빈 응답 → 즉시 종료, 100건 미만 → 종료, cursor 비진전 → 종료, 20페이지 상한
- `fetchMinuteChart`: 동일 종료 조건 + 날짜 경계 처리

### M8-3: aggregateMinutes 테스트

- 단일 봉 → 그대로 반환
- intervalMinutes 경계 (예: 3분봉에 4개 1분봉 → 2개 3분봉)
- 날짜 변경 시 버킷 강제 리셋
- 빈 입력 → 빈 배열

### M8-4: nearestFutureContract 테스트

- 월말 25일 경계 (롤오버)
- 12월 → 다음해 1월 전환
- quarterly 만기 (H/M/U/Z만 선택)

---

## 마일스톤 완료 시 공통 절차

모든 마일스톤 완료 시 아래 순서를 따른다.

1. `npm run typecheck` 통과 확인
2. `npm run test` 통과 확인
3. `grep -r -E "trading|order|inquire-balance|inquire-psbl-order" src/` 결과 0건 확인
4. `npx wrangler deploy` 프로덕션 배포
5. 변경된 도구 1개 이상 수동 호출로 프로덕션 동작 확인
6. `git add`, `git commit`, `git push origin main`
7. TOOLS.md, README.md에 새 도구/변경사항 반영 (해당하는 경우)
