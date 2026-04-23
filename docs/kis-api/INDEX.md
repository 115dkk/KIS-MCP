# 한국투자증권 OpenAPI — Index

339개 API의 LLM 친화 변환본. 원본은 `한국투자증권_오픈API_전체문서_*.xlsx` (소스 보존).

## 카테고리별 파일

| 파일 | 카테고리 | API 수 |
|---|---|---|
| [_other.md](./_other.md) | (기타) | 5 |
| [domestic-bond.md](./domestic-bond.md) | [장내채권] | 18 |
| [domestic-futureoption.md](./domestic-futureoption.md) | [국내선물옵션] | 44 |
| [domestic-stock.md](./domestic-stock.md) | [국내주식] | 186 |
| [overseas-futureoption.md](./overseas-futureoption.md) | [해외선물옵션] | 35 |
| [overseas-stock.md](./overseas-stock.md) | [해외주식] | 51 |
| **TOTAL** | | **339** |

## 공통 인증 헤더 (모든 REST API 공통, 각 API 본문에서 생략됨)

| Element | 의미 | 비고 |
|---|---|---|
| `content-type` | application/json; charset=utf-8 | 고정 |
| `authorization` | `Bearer {access_token}` | OAuth 토큰. `KisClient`가 자동 부여 |
| `appkey` / `appsecret` | 한투 발급 키 | Workers Secrets |
| `tr_id` | 거래 ID | API별 상이 (각 섹션 메타 표 참조) |
| `tr_cont` | 연속 조회 키 | 페이징 응답이 N건 cap일 때 |
| `custtype` | `P`(개인) / `B`(법인) | 기본 P |

## 전체 API 목록 (TR_ID 검색용)

| TR_ID | API 이름 | 카테고리 | URL |
|---|---|---|---|
| `—` | [API 목록](./_other.md#api-목록) | (기타) | `—` |
| `—` | [Hashkey](./_other.md#hashkey) | (기타) | `/uapi/hashkey` |
| `—` | [실시간 (웹소켓) 접속키 발급](./_other.md#실시간-(웹소켓)-접속키-발급) | (기타) | `/oauth2/Approval` |
| `—` | [접근토큰폐기(P)](./_other.md#접근토큰폐기(p)) | (기타) | `/oauth2/revokeP` |
| `—` | [접근토큰발급(P)](./_other.md#접근토큰발급(p)) | (기타) | `/oauth2/tokenP` |
| `(구) JTCE1004R (신) STTN5105R` | [(야간)선물옵션 주문가능 조회](./domestic-futureoption.md#(야간)선물옵션-주문가능-조회) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-psbl-ngt-order` |
| `(구) JTCE5005R (신) STTN5201R` | [(야간)선물옵션 주문체결 내역조회](./domestic-futureoption.md#(야간)선물옵션-주문체결-내역조회) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-ngt-ccnl` |
| `(구) JTCE6001R (신) CTFN6118R` | [(야간)선물옵션 잔고현황](./domestic-futureoption.md#(야간)선물옵션-잔고현황) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-ngt-balance` |
| `(구) JTCE6003R (신) CTFN7107R` | [(야간)선물옵션 증거금 상세](./domestic-futureoption.md#(야간)선물옵션-증거금-상세) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/ngt-margin-detail` |
| `(주간 매수/매도) TTTO1101U (야간 매수/매도) (구) JTCE1001U (신) STTN1101U` | [선물옵션 주문](./domestic-futureoption.md#선물옵션-주문) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/order` |
| `(주간 정정/취소) TTTO1103U (야간 정정/취소) (구) JTCE1002U (신) STTN1103U` | [선물옵션 정정취소주문](./domestic-futureoption.md#선물옵션-정정취소주문) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/order-rvsecncl` |
| `CTFO5139R` | [선물옵션 기준일체결내역](./domestic-futureoption.md#선물옵션-기준일체결내역) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-ccnl-bstime` |
| `CTFO6117R` | [선물옵션 잔고정산손익내역](./domestic-futureoption.md#선물옵션-잔고정산손익내역) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-balance-settlement-pl` |
| `CTFO6118R` | [선물옵션 잔고현황](./domestic-futureoption.md#선물옵션-잔고현황) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-balance` |
| `CTFO6119R` | [선물옵션기간약정수수료일별](./domestic-futureoption.md#선물옵션기간약정수수료일별) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-daily-amount-fee` |
| `CTFO6159R` | [선물옵션 잔고평가손익내역](./domestic-futureoption.md#선물옵션-잔고평가손익내역) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-balance-valuation-pl` |
| `CTRP6550R` | [선물옵션 총자산현황](./domestic-futureoption.md#선물옵션-총자산현황) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-deposit` |
| `FHKIF03020100` | [선물옵션기간별시세(일_주_월_년)](./domestic-futureoption.md#선물옵션기간별시세(일_주_월_년)) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/inquire-daily-fuopchartprice` |
| `FHKIF03020200` | [선물옵션 분봉조회](./domestic-futureoption.md#선물옵션-분봉조회) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/inquire-time-fuopchartprice` |
| `FHMIF10000000` | [선물옵션 시세](./domestic-futureoption.md#선물옵션-시세) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/inquire-price` |
| `FHMIF10010000` | [선물옵션 시세호가](./domestic-futureoption.md#선물옵션-시세호가) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/inquire-asking-price` |
| `FHPIF05030000` | [국내선물 기초자산 시세](./domestic-futureoption.md#국내선물-기초자산-시세) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/display-board-top` |
| `FHPIF05030100` | [국내옵션전광판_콜풋](./domestic-futureoption.md#국내옵션전광판_콜풋) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/display-board-callput` |
| `FHPIF05030200` | [국내옵션전광판_선물](./domestic-futureoption.md#국내옵션전광판_선물) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/display-board-futures` |
| `FHPIF05110100` | [선물옵션 일중예상체결추이](./domestic-futureoption.md#선물옵션-일중예상체결추이) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/exp-price-trend` |
| `FHPIO056104C0` | [국내옵션전광판_옵션월물리스트](./domestic-futureoption.md#국내옵션전광판_옵션월물리스트) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/display-board-option-list` |
| `H0CFASP0` | [상품선물 실시간호가](./domestic-futureoption.md#상품선물-실시간호가) | [국내선물옵션] | `/tryitout/H0CFASP0` |
| `H0CFCNT0` | [상품선물 실시간체결가](./domestic-futureoption.md#상품선물-실시간체결가) | [국내선물옵션] | `/tryitout/H0CFCNT0` |
| `H0EUANC0` | [KRX야간옵션실시간예상체결](./domestic-futureoption.md#krx야간옵션실시간예상체결) | [국내선물옵션] | `/tryitout/H0EUANC0` |
| `H0EUASP0` | [KRX야간옵션 실시간호가](./domestic-futureoption.md#krx야간옵션-실시간호가) | [국내선물옵션] | `/tryitout/H0EUASP0` |
| `H0EUCNT0` | [KRX야간옵션 실시간체결가](./domestic-futureoption.md#krx야간옵션-실시간체결가) | [국내선물옵션] | `/tryitout/H0EUCNT0` |
| `H0IFASP0` | [지수선물 실시간호가](./domestic-futureoption.md#지수선물-실시간호가) | [국내선물옵션] | `/tryitout/H0IFASP0` |
| `H0IFCNI0` | [선물옵션 실시간체결통보](./domestic-futureoption.md#선물옵션-실시간체결통보) | [국내선물옵션] | `/tryitout/H0IFCNI0` |
| `H0IFCNT0` | [지수선물 실시간체결가](./domestic-futureoption.md#지수선물-실시간체결가) | [국내선물옵션] | `/tryitout/H0IFCNT0` |
| `H0IOASP0` | [지수옵션 실시간호가](./domestic-futureoption.md#지수옵션-실시간호가) | [국내선물옵션] | `/tryitout/H0IOASP0` |
| `H0IOCNT0` | [지수옵션  실시간체결가](./domestic-futureoption.md#지수옵션-실시간체결가) | [국내선물옵션] | `/tryitout/H0IOCNT0` |
| `H0MFASP0` | [KRX야간선물 실시간호가](./domestic-futureoption.md#krx야간선물-실시간호가) | [국내선물옵션] | `/tryitout/H0MFASP0` |
| `H0MFCNI0` | [KRX야간옵션실시간체결통보](./domestic-futureoption.md#krx야간옵션실시간체결통보) | [국내선물옵션] | `/tryitout/H0EUCNI0` |
| `H0MFCNI0` | [KRX야간선물 실시간체결통보](./domestic-futureoption.md#krx야간선물-실시간체결통보) | [국내선물옵션] | `/tryitout/H0MFCNI0` |
| `H0MFCNT0` | [KRX야간선물 실시간종목체결](./domestic-futureoption.md#krx야간선물-실시간종목체결) | [국내선물옵션] | `/tryitout/H0MFCNT0` |
| `H0ZFANC0` | [주식선물 실시간예상체결](./domestic-futureoption.md#주식선물-실시간예상체결) | [국내선물옵션] | `/tryitout/H0ZFANC0` |
| `H0ZFASP0` | [주식선물 실시간호가](./domestic-futureoption.md#주식선물-실시간호가) | [국내선물옵션] | `/tryitout/H0ZFASP0` |
| `H0ZFCNT0` | [주식선물 실시간체결가](./domestic-futureoption.md#주식선물-실시간체결가) | [국내선물옵션] | `/tryitout/H0ZFCNT0` |
| `H0ZOANC0` | [주식옵션 실시간예상체결](./domestic-futureoption.md#주식옵션-실시간예상체결) | [국내선물옵션] | `/tryitout/H0ZOANC0` |
| `H0ZOASP0` | [주식옵션 실시간호가](./domestic-futureoption.md#주식옵션-실시간호가) | [국내선물옵션] | `/tryitout/H0ZOASP0` |
| `H0ZOCNT0` | [주식옵션 실시간체결가](./domestic-futureoption.md#주식옵션-실시간체결가) | [국내선물옵션] | `/tryitout/H0ZOCNT0` |
| `TTTO5105R` | [선물옵션 주문가능](./domestic-futureoption.md#선물옵션-주문가능) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-psbl-order` |
| `TTTO5201R` | [선물옵션 주문체결내역조회](./domestic-futureoption.md#선물옵션-주문체결내역조회) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/trading/inquire-ccnl` |
| `TTTO6032R` | [선물옵션 증거금률](./domestic-futureoption.md#선물옵션-증거금률) | [국내선물옵션] | `/uapi/domestic-futureoption/v1/quotations/margin-rate` |
| `(3개월이내) TTTC0081R (3개월이전) CTSC9215R` | [주식일별주문체결조회](./domestic-stock.md#주식일별주문체결조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-daily-ccld` |
| `(매도) TTTC0011U (매수) TTTC0012U` | [주식주문(현금)](./domestic-stock.md#주식주문(현금)) | [국내주식] | `/uapi/domestic-stock/v1/trading/order-cash` |
| `(매도) TTTC0051U (매수) TTTC0052U` | [주식주문(신용)](./domestic-stock.md#주식주문(신용)) | [국내주식] | `/uapi/domestic-stock/v1/trading/order-credit` |
| `(예약취소) CTSC0009U (예약정정) CTSC0013U` | [주식예약주문정정취소](./domestic-stock.md#주식예약주문정정취소) | [국내주식] | `/uapi/domestic-stock/v1/trading/order-resv-rvsecncl` |
| `CTCA0903R` | [국내휴장일조회](./domestic-stock.md#국내휴장일조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/chk-holiday` |
| `CTPF1002R` | [주식기본조회](./domestic-stock.md#주식기본조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/search-stock-info` |
| `CTPF1604R` | [상품기본조회](./domestic-stock.md#상품기본조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/search-info` |
| `CTRGA011R` | [기간별계좌권리현황조회](./domestic-stock.md#기간별계좌권리현황조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/period-rights` |
| `CTRP6548R` | [투자계좌자산현황조회](./domestic-stock.md#투자계좌자산현황조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-account-balance` |
| `CTSC0004R` | [주식예약주문조회](./domestic-stock.md#주식예약주문조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/order-resv-ccnl` |
| `CTSC0008U` | [주식예약주문](./domestic-stock.md#주식예약주문) | [국내주식] | `/uapi/domestic-stock/v1/trading/order-resv` |
| `CTSC2702R` | [당사 대주가능 종목](./domestic-stock.md#당사-대주가능-종목) | [국내주식] | `/uapi/domestic-stock/v1/quotations/lendable-by-company` |
| `FHKEW15010000` | [ELW 현재가 시세](./domestic-stock.md#elw-현재가-시세) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-elw-price` |
| `FHKEW15100000` | [ELW 종목검색](./domestic-stock.md#elw-종목검색) | [국내주식] | `/uapi/elw/v1/quotations/cond-search` |
| `FHKEW151701C0` | [ELW 비교대상종목조회](./domestic-stock.md#elw-비교대상종목조회) | [국내주식] | `/uapi/elw/v1/quotations/compare-stocks` |
| `FHKEW154100C0` | [ELW 기초자산 목록조회](./domestic-stock.md#elw-기초자산-목록조회) | [국내주식] | `/uapi/elw/v1/quotations/udrl-asset-list` |
| `FHKEW154101C0` | [ELW 기초자산별 종목시세](./domestic-stock.md#elw-기초자산별-종목시세) | [국내주식] | `/uapi/elw/v1/quotations/udrl-asset-price` |
| `FHKEW154700C0` | [ELW 만기예정_만기종목](./domestic-stock.md#elw-만기예정_만기종목) | [국내주식] | `/uapi/elw/v1/quotations/expiration-stocks` |
| `FHKEW154800C0` | [ELW 신규상장종목](./domestic-stock.md#elw-신규상장종목) | [국내주식] | `/uapi/elw/v1/quotations/newly-listed` |
| `FHKST01010100` | [주식현재가 시세](./domestic-stock.md#주식현재가-시세) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-price` |
| `FHKST01010200` | [주식현재가 호가_예상체결](./domestic-stock.md#주식현재가-호가_예상체결) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn` |
| `FHKST01010300` | [주식현재가 체결](./domestic-stock.md#주식현재가-체결) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-ccnl` |
| `FHKST01010400` | [주식현재가 일자별](./domestic-stock.md#주식현재가-일자별) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-daily-price` |
| `FHKST01010600` | [주식현재가 회원사](./domestic-stock.md#주식현재가-회원사) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-member` |
| `FHKST01010900` | [주식현재가 투자자](./domestic-stock.md#주식현재가-투자자) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-investor` |
| `FHKST01011800` | [종합 시황_공시(제목)](./domestic-stock.md#종합-시황_공시(제목)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/news-title` |
| `FHKST03010100` | [국내주식기간별시세(일_주_월_년)](./domestic-stock.md#국내주식기간별시세(일_주_월_년)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice` |
| `FHKST03010200` | [주식당일분봉조회](./domestic-stock.md#주식당일분봉조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice` |
| `FHKST03010230` | [주식일별분봉조회](./domestic-stock.md#주식일별분봉조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-time-dailychartprice` |
| `FHKST03010800` | [종목별일별매수매도체결량](./domestic-stock.md#종목별일별매수매도체결량) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-daily-trade-volume` |
| `FHKST111900C0` | [국내주식 체결금액별 매매비중](./domestic-stock.md#국내주식-체결금액별-매매비중) | [국내주식] | `/uapi/domestic-stock/v1/quotations/tradprt-byamt` |
| `FHKST11300006` | [관심종목(멀티종목) 시세조회](./domestic-stock.md#관심종목(멀티종목)-시세조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/intstock-multprice` |
| `FHKST117300C0` | [국내주식 장마감 예상체결가](./domestic-stock.md#국내주식-장마감-예상체결가) | [국내주식] | `/uapi/domestic-stock/v1/quotations/exp-closing-price` |
| `FHKST11860000` | [국내주식 시간외예상체결등락률](./domestic-stock.md#국내주식-시간외예상체결등락률) | [국내주식] | `/uapi/domestic-stock/v1/ranking/overtime-exp-trans-fluct` |
| `FHKST121600C0` | [ETF 구성종목시세](./domestic-stock.md#etf-구성종목시세) | [국내주식] | `/uapi/etfetn/v1/quotations/inquire-component-stock-price` |
| `FHKST130000C0` | [국내주식 상하한가 포착](./domestic-stock.md#국내주식-상하한가-포착) | [국내주식] | `/uapi/domestic-stock/v1/quotations/capture-uplowprice` |
| `FHKST17010000` | [국내주식 신용잔고 상위](./domestic-stock.md#국내주식-신용잔고-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/credit-balance` |
| `FHKST190900C0` | [국내주식 대량체결건수 상위](./domestic-stock.md#국내주식-대량체결건수-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/bulk-trans-num` |
| `FHKST644100C0` | [외국계 매매종목 가집계](./domestic-stock.md#외국계-매매종목-가집계) | [국내주식] | `/uapi/domestic-stock/v1/quotations/frgnmem-trade-estimate` |
| `FHKST644400C0` | [종목별 외국계 순매수추이](./domestic-stock.md#종목별-외국계-순매수추이) | [국내주식] | `/uapi/domestic-stock/v1/quotations/frgnmem-pchs-trend` |
| `FHKST649100C0` | [국내 증시자금 종합](./domestic-stock.md#국내-증시자금-종합) | [국내주식] | `/uapi/domestic-stock/v1/quotations/mktfunds` |
| `FHKST663300C0` | [국내주식 종목투자의견](./domestic-stock.md#국내주식-종목투자의견) | [국내주식] | `/uapi/domestic-stock/v1/quotations/invest-opinion` |
| `FHKST663400C0` | [국내주식 증권사별 투자의견](./domestic-stock.md#국내주식-증권사별-투자의견) | [국내주식] | `/uapi/domestic-stock/v1/quotations/invest-opbysec` |
| `FHKST66430100` | [국내주식 대차대조표](./domestic-stock.md#국내주식-대차대조표) | [국내주식] | `/uapi/domestic-stock/v1/finance/balance-sheet` |
| `FHKST66430200` | [국내주식 손익계산서](./domestic-stock.md#국내주식-손익계산서) | [국내주식] | `/uapi/domestic-stock/v1/finance/income-statement` |
| `FHKST66430300` | [국내주식 재무비율](./domestic-stock.md#국내주식-재무비율) | [국내주식] | `/uapi/domestic-stock/v1/finance/financial-ratio` |
| `FHKST66430400` | [국내주식 수익성비율](./domestic-stock.md#국내주식-수익성비율) | [국내주식] | `/uapi/domestic-stock/v1/finance/profit-ratio` |
| `FHKST66430500` | [국내주식 기타주요비율](./domestic-stock.md#국내주식-기타주요비율) | [국내주식] | `/uapi/domestic-stock/v1/finance/other-major-ratios` |
| `FHKST66430600` | [국내주식 안정성비율](./domestic-stock.md#국내주식-안정성비율) | [국내주식] | `/uapi/domestic-stock/v1/finance/stability-ratio` |
| `FHKST66430800` | [국내주식 성장성비율](./domestic-stock.md#국내주식-성장성비율) | [국내주식] | `/uapi/domestic-stock/v1/finance/growth-ratio` |
| `FHKUP03500100` | [국내주식업종기간별시세(일_주_월_년)](./domestic-stock.md#국내주식업종기간별시세(일_주_월_년)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice` |
| `FHKUP03500200` | [업종 분봉조회](./domestic-stock.md#업종-분봉조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-time-indexchartprice` |
| `FHKUP11750000` | [국내주식 예상체결 전체지수](./domestic-stock.md#국내주식-예상체결-전체지수) | [국내주식] | `/uapi/domestic-stock/v1/quotations/exp-total-index` |
| `FHPEW02740100` | [ELW 투자지표추이(체결)](./domestic-stock.md#elw-투자지표추이(체결)) | [국내주식] | `/uapi/elw/v1/quotations/indicator-trend-ccnl` |
| `FHPEW02740200` | [ELW 투자지표추이(일별)](./domestic-stock.md#elw-투자지표추이(일별)) | [국내주식] | `/uapi/elw/v1/quotations/indicator-trend-daily` |
| `FHPEW02740300` | [ELW 투자지표추이(분별)](./domestic-stock.md#elw-투자지표추이(분별)) | [국내주식] | `/uapi/elw/v1/quotations/indicator-trend-minute` |
| `FHPEW02770000` | [ELW 상승률순위](./domestic-stock.md#elw-상승률순위) | [국내주식] | `/uapi/elw/v1/ranking/updown-rate` |
| `FHPEW02780000` | [ELW 거래량순위](./domestic-stock.md#elw-거래량순위) | [국내주식] | `/uapi/elw/v1/ranking/volume-rank` |
| `FHPEW02790000` | [ELW 지표순위](./domestic-stock.md#elw-지표순위) | [국내주식] | `/uapi/elw/v1/ranking/indicator` |
| `FHPEW02830100` | [ELW 민감도 추이(체결)](./domestic-stock.md#elw-민감도-추이(체결)) | [국내주식] | `/uapi/elw/v1/quotations/sensitivity-trend-ccnl` |
| `FHPEW02830200` | [ELW 민감도 추이(일별)](./domestic-stock.md#elw-민감도-추이(일별)) | [국내주식] | `/uapi/elw/v1/quotations/sensitivity-trend-daily` |
| `FHPEW02840100` | [ELW 변동성추이(체결)](./domestic-stock.md#elw-변동성추이(체결)) | [국내주식] | `/uapi/elw/v1/quotations/volatility-trend-ccnl` |
| `FHPEW02840200` | [ELW 변동성 추이(일별)](./domestic-stock.md#elw-변동성-추이(일별)) | [국내주식] | `/uapi/elw/v1/quotations/volatility-trend-daily` |
| `FHPEW02840300` | [ELW 변동성 추이(분별)](./domestic-stock.md#elw-변동성-추이(분별)) | [국내주식] | `/uapi/elw/v1/quotations/volatility-trend-minute` |
| `FHPEW02840400` | [ELW 변동성 추이(틱)](./domestic-stock.md#elw-변동성-추이(틱)) | [국내주식] | `/uapi/elw/v1/quotations/volatility-trend-tick` |
| `FHPEW02850000` | [ELW 민감도 순위](./domestic-stock.md#elw-민감도-순위) | [국내주식] | `/uapi/elw/v1/ranking/sensitivity` |
| `FHPEW02870000` | [ELW 당일급변종목](./domestic-stock.md#elw-당일급변종목) | [국내주식] | `/uapi/elw/v1/ranking/quick-change` |
| `FHPEW03760000` | [ELW LP매매추이](./domestic-stock.md#elw-lp매매추이) | [국내주식] | `/uapi/elw/v1/quotations/lp-trade-trend` |
| `FHPPG04600001` | [프로그램매매 종합현황(일별)](./domestic-stock.md#프로그램매매-종합현황(일별)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/comp-program-trade-daily` |
| `FHPPG04600101` | [프로그램매매 종합현황(시간)](./domestic-stock.md#프로그램매매-종합현황(시간)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/comp-program-trade-today` |
| `FHPPG04650101` | [종목별 프로그램매매추이(체결)](./domestic-stock.md#종목별-프로그램매매추이(체결)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/program-trade-by-stock` |
| `FHPPG04650201` | [종목별 프로그램매매추이(일별)](./domestic-stock.md#종목별-프로그램매매추이(일별)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/program-trade-by-stock-daily` |
| `FHPST01010000` | [주식현재가 시세2](./domestic-stock.md#주식현재가-시세2) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-price-2` |
| `FHPST01060000` | [주식현재가 당일시간대별체결](./domestic-stock.md#주식현재가-당일시간대별체결) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-time-itemconclusion` |
| `FHPST01130000` | [국내주식 매물대_거래비중](./domestic-stock.md#국내주식-매물대_거래비중) | [국내주식] | `/uapi/domestic-stock/v1/quotations/pbar-tratio` |
| `FHPST01390000` | [변동성완화장치(VI) 현황](./domestic-stock.md#변동성완화장치(vi)-현황) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-vi-status` |
| `FHPST01680000` | [국내주식 체결강도 상위](./domestic-stock.md#국내주식-체결강도-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/volume-power` |
| `FHPST01700000` | [국내주식 등락률 순위](./domestic-stock.md#국내주식-등락률-순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/fluctuation` |
| `FHPST01710000` | [거래량순위](./domestic-stock.md#거래량순위) | [국내주식] | `/uapi/domestic-stock/v1/quotations/volume-rank` |
| `FHPST01720000` | [국내주식 호가잔량 순위](./domestic-stock.md#국내주식-호가잔량-순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/quote-balance` |
| `FHPST01730000` | [국내주식 수익자산지표 순위](./domestic-stock.md#국내주식-수익자산지표-순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/profit-asset-index` |
| `FHPST01740000` | [국내주식 시가총액 상위](./domestic-stock.md#국내주식-시가총액-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/market-cap` |
| `FHPST01750000` | [국내주식 재무비율 순위](./domestic-stock.md#국내주식-재무비율-순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/finance-ratio` |
| `FHPST01760000` | [국내주식 시간외잔량 순위](./domestic-stock.md#국내주식-시간외잔량-순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/after-hour-balance` |
| `FHPST01770000` | [국내주식 우선주_괴리율 상위](./domestic-stock.md#국내주식-우선주_괴리율-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/prefer-disparate-ratio` |
| `FHPST01780000` | [국내주식 이격도 순위](./domestic-stock.md#국내주식-이격도-순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/disparity` |
| `FHPST01790000` | [국내주식 시장가치 순위](./domestic-stock.md#국내주식-시장가치-순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/market-value` |
| `FHPST01800000` | [국내주식 관심종목등록 상위](./domestic-stock.md#국내주식-관심종목등록-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/top-interest-stock` |
| `FHPST01810000` | [국내주식 예상체결가 추이](./domestic-stock.md#국내주식-예상체결가-추이) | [국내주식] | `/uapi/domestic-stock/v1/quotations/exp-price-trend` |
| `FHPST01820000` | [국내주식 예상체결 상승_하락상위](./domestic-stock.md#국내주식-예상체결-상승_하락상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/exp-trans-updown` |
| `FHPST01840000` | [국내주식 예상체결지수 추이](./domestic-stock.md#국내주식-예상체결지수-추이) | [국내주식] | `/uapi/domestic-stock/v1/quotations/exp-index-trend` |
| `FHPST01860000` | [국내주식 당사매매종목 상위](./domestic-stock.md#국내주식-당사매매종목-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/traded-by-company` |
| `FHPST01870000` | [국내주식 신고_신저근접종목 상위](./domestic-stock.md#국내주식-신고_신저근접종목-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/near-new-highlow` |
| `FHPST02300000` | [국내주식 시간외현재가](./domestic-stock.md#국내주식-시간외현재가) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-overtime-price` |
| `FHPST02300400` | [국내주식 시간외호가](./domestic-stock.md#국내주식-시간외호가) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-overtime-asking-price` |
| `FHPST02310000` | [주식현재가 시간외시간별체결](./domestic-stock.md#주식현재가-시간외시간별체결) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-time-overtimeconclusion` |
| `FHPST02320000` | [주식현재가 시간외일자별주가](./domestic-stock.md#주식현재가-시간외일자별주가) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-daily-overtimeprice` |
| `FHPST02340000` | [국내주식 시간외등락율순위](./domestic-stock.md#국내주식-시간외등락율순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/overtime-fluctuation` |
| `FHPST02350000` | [국내주식 시간외거래량순위](./domestic-stock.md#국내주식-시간외거래량순위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/overtime-volume` |
| `FHPST02400000` | [ETF_ETN 현재가](./domestic-stock.md#etf_etn-현재가) | [국내주식] | `/uapi/etfetn/v1/quotations/inquire-price` |
| `FHPST02440000` | [NAV 비교추이(종목)](./domestic-stock.md#nav-비교추이(종목)) | [국내주식] | `/uapi/etfetn/v1/quotations/nav-comparison-trend` |
| `FHPST02440100` | [NAV 비교추이(분)](./domestic-stock.md#nav-비교추이(분)) | [국내주식] | `/uapi/etfetn/v1/quotations/nav-comparison-time-trend` |
| `FHPST02440200` | [NAV 비교추이(일)](./domestic-stock.md#nav-비교추이(일)) | [국내주식] | `/uapi/etfetn/v1/quotations/nav-comparison-daily-trend` |
| `FHPST04320000` | [회원사 실시간 매매동향(틱)](./domestic-stock.md#회원사-실시간-매매동향(틱)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/frgnmem-trade-trend` |
| `FHPST04540000` | [주식현재가 회원사 종목매매동향](./domestic-stock.md#주식현재가-회원사-종목매매동향) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-member-daily` |
| `FHPST04760000` | [국내주식 신용잔고 일별추이](./domestic-stock.md#국내주식-신용잔고-일별추이) | [국내주식] | `/uapi/domestic-stock/v1/quotations/daily-credit-balance` |
| `FHPST04770000` | [국내주식 당사 신용가능종목](./domestic-stock.md#국내주식-당사-신용가능종목) | [국내주식] | `/uapi/domestic-stock/v1/quotations/credit-by-company` |
| `FHPST04820000` | [국내주식 공매도 상위종목](./domestic-stock.md#국내주식-공매도-상위종목) | [국내주식] | `/uapi/domestic-stock/v1/ranking/short-sale` |
| `FHPST04830000` | [국내주식 공매도 일별추이](./domestic-stock.md#국내주식-공매도-일별추이) | [국내주식] | `/uapi/domestic-stock/v1/quotations/daily-short-sale` |
| `FHPST07020000` | [금리 종합(국내채권_금리)](./domestic-stock.md#금리-종합(국내채권_금리)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/comp-interest` |
| `FHPTJ04030000` | [시장별 투자자매매동향(시세)](./domestic-stock.md#시장별-투자자매매동향(시세)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-investor-time-by-market` |
| `FHPTJ04040000` | [시장별 투자자매매동향(일별)](./domestic-stock.md#시장별-투자자매매동향(일별)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-investor-daily-by-market` |
| `FHPTJ04160001` | [종목별 투자자매매동향(일별)](./domestic-stock.md#종목별-투자자매매동향(일별)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/investor-trade-by-stock-daily` |
| `FHPTJ04400000` | [국내기관_외국인 매매종목가집계](./domestic-stock.md#국내기관_외국인-매매종목가집계) | [국내주식] | `/uapi/domestic-stock/v1/quotations/foreign-institution-total` |
| `FHPUP02100000` | [국내업종 현재지수](./domestic-stock.md#국내업종-현재지수) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-index-price` |
| `FHPUP02110100` | [국내업종 시간별지수(초)](./domestic-stock.md#국내업종-시간별지수(초)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-index-tickprice` |
| `FHPUP02110200` | [국내업종 시간별지수(분)](./domestic-stock.md#국내업종-시간별지수(분)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-index-timeprice` |
| `FHPUP02120000` | [국내업종 일자별지수](./domestic-stock.md#국내업종-일자별지수) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-index-daily-price` |
| `FHPUP02140000` | [국내업종 구분별전체시세](./domestic-stock.md#국내업종-구분별전체시세) | [국내주식] | `/uapi/domestic-stock/v1/quotations/inquire-index-category-price` |
| `H0EWANC0` | [ELW 실시간예상체결](./domestic-stock.md#elw-실시간예상체결) | [국내주식] | `/tryitout/H0EWANC0` |
| `H0EWASP0` | [ELW 실시간호가](./domestic-stock.md#elw-실시간호가) | [국내주식] | `/tryitout/H0EWASP0` |
| `H0EWCNT0` | [ELW 실시간체결가](./domestic-stock.md#elw-실시간체결가) | [국내주식] | `/tryitout/H0EWCNT0` |
| `H0NXANC0` | [국내주식 실시간예상체결 (NXT)](./domestic-stock.md#국내주식-실시간예상체결-(nxt)) | [국내주식] | `/tryitout/H0NXANC0` |
| `H0NXASP0` | [국내주식 실시간호가 (NXT)](./domestic-stock.md#국내주식-실시간호가-(nxt)) | [국내주식] | `/tryitout/H0NXASP0` |
| `H0NXCNT0` | [국내주식 실시간체결가 (NXT)](./domestic-stock.md#국내주식-실시간체결가-(nxt)) | [국내주식] | `/tryitout/H0NXCNT0` |
| `H0NXMBC0` | [국내주식 실시간회원사 (NXT)](./domestic-stock.md#국내주식-실시간회원사-(nxt)) | [국내주식] | `/tryitout/H0NXMBC0` |
| `H0NXMKO0` | [국내주식 장운영정보 (NXT)](./domestic-stock.md#국내주식-장운영정보-(nxt)) | [국내주식] | `/tryitout/H0NXMKO0` |
| `H0NXPGM0` | [국내주식 실시간프로그램매매 (NXT)](./domestic-stock.md#국내주식-실시간프로그램매매-(nxt)) | [국내주식] | `/tryitout/H0NXPGM0` |
| `H0STANC0` | [국내주식 실시간예상체결 (KRX)](./domestic-stock.md#국내주식-실시간예상체결-(krx)) | [국내주식] | `/tryitout/H0STANC0` |
| `H0STASP0` | [국내주식 실시간호가 (KRX)](./domestic-stock.md#국내주식-실시간호가-(krx)) | [국내주식] | `/tryitout/H0STASP0` |
| `H0STCNI0` | [국내주식 실시간체결통보](./domestic-stock.md#국내주식-실시간체결통보) | [국내주식] | `/tryitout/H0STCNI0` |
| `H0STCNT0` | [국내주식 실시간체결가 (KRX)](./domestic-stock.md#국내주식-실시간체결가-(krx)) | [국내주식] | `/tryitout/H0STCNT0` |
| `H0STMBC0` | [국내주식 실시간회원사 (KRX)](./domestic-stock.md#국내주식-실시간회원사-(krx)) | [국내주식] | `/tryitout/H0STMBC0` |
| `H0STMKO0` | [국내주식 장운영정보 (KRX)](./domestic-stock.md#국내주식-장운영정보-(krx)) | [국내주식] | `/tryitout/H0STMKO0` |
| `H0STNAV0` | [국내ETF NAV추이](./domestic-stock.md#국내etf-nav추이) | [국내주식] | `/tryitout/H0STNAV0` |
| `H0STOAA0` | [국내주식 시간외 실시간호가 (KRX)](./domestic-stock.md#국내주식-시간외-실시간호가-(krx)) | [국내주식] | `/tryitout/H0STOAA0` |
| `H0STOAC0` | [국내주식 시간외 실시간예상체결 (KRX)](./domestic-stock.md#국내주식-시간외-실시간예상체결-(krx)) | [국내주식] | `/tryitout/H0STOAC0` |
| `H0STOUP0` | [국내주식 시간외 실시간체결가 (KRX)](./domestic-stock.md#국내주식-시간외-실시간체결가-(krx)) | [국내주식] | `/tryitout/H0STOUP0` |
| `H0STPGM0` | [국내주식 실시간프로그램매매 (KRX)](./domestic-stock.md#국내주식-실시간프로그램매매-(krx)) | [국내주식] | `/tryitout/H0STPGM0` |
| `H0UNANC0` | [국내주식 실시간예상체결 (통합)](./domestic-stock.md#국내주식-실시간예상체결-(통합)) | [국내주식] | `/tryitout/H0UNANC0` |
| `H0UNASP0` | [국내주식 실시간호가 (통합)](./domestic-stock.md#국내주식-실시간호가-(통합)) | [국내주식] | `/tryitout/H0UNASP0` |
| `H0UNCNT0` | [국내주식 실시간체결가 (통합)](./domestic-stock.md#국내주식-실시간체결가-(통합)) | [국내주식] | `/tryitout/H0UNCNT0` |
| `H0UNMBC0` | [국내주식 실시간회원사 (통합)](./domestic-stock.md#국내주식-실시간회원사-(통합)) | [국내주식] | `/tryitout/H0UNMBC0` |
| `H0UNMKO0` | [국내주식 장운영정보 (통합)](./domestic-stock.md#국내주식-장운영정보-(통합)) | [국내주식] | `/tryitout/H0UNMKO0` |
| `H0UNPGM0` | [국내주식 실시간프로그램매매 (통합)](./domestic-stock.md#국내주식-실시간프로그램매매-(통합)) | [국내주식] | `/tryitout/H0UNPGM0` |
| `H0UPANC0` | [국내지수 실시간예상체결](./domestic-stock.md#국내지수-실시간예상체결) | [국내주식] | `/tryitout/H0UPANC0` |
| `H0UPCNT0` | [국내지수 실시간체결](./domestic-stock.md#국내지수-실시간체결) | [국내주식] | `/tryitout/H0UPCNT0` |
| `H0UPPGM0` | [국내지수 실시간프로그램매매](./domestic-stock.md#국내지수-실시간프로그램매매) | [국내주식] | `/tryitout/H0UPPGM0` |
| `HHKCM113004C6` | [관심종목 그룹별 종목조회](./domestic-stock.md#관심종목-그룹별-종목조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/intstock-stocklist-by-group` |
| `HHKCM113004C7` | [관심종목 그룹조회](./domestic-stock.md#관심종목-그룹조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/intstock-grouplist` |
| `HHKDB13470100` | [국내주식 배당률 상위](./domestic-stock.md#국내주식-배당률-상위) | [국내주식] | `/uapi/domestic-stock/v1/ranking/dividend-rate` |
| `HHKDB669100C0` | [예탁원정보(유상증자일정)](./domestic-stock.md#예탁원정보(유상증자일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/paidin-capin` |
| `HHKDB669101C0` | [예탁원정보(무상증자일정)](./domestic-stock.md#예탁원정보(무상증자일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/bonus-issue` |
| `HHKDB669102C0` | [예탁원정보(배당일정)](./domestic-stock.md#예탁원정보(배당일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/dividend` |
| `HHKDB669103C0` | [예탁원정보(주식매수청구일정)](./domestic-stock.md#예탁원정보(주식매수청구일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/purreq` |
| `HHKDB669104C0` | [예탁원정보(합병_분할일정)](./domestic-stock.md#예탁원정보(합병_분할일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/merger-split` |
| `HHKDB669105C0` | [예탁원정보(액면교체일정)](./domestic-stock.md#예탁원정보(액면교체일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/rev-split` |
| `HHKDB669106C0` | [예탁원정보(자본감소일정)](./domestic-stock.md#예탁원정보(자본감소일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/cap-dcrs` |
| `HHKDB669107C0` | [예탁원정보(상장정보일정)](./domestic-stock.md#예탁원정보(상장정보일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/list-info` |
| `HHKDB669108C0` | [예탁원정보(공모주청약일정)](./domestic-stock.md#예탁원정보(공모주청약일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/pub-offer` |
| `HHKDB669109C0` | [예탁원정보(실권주일정)](./domestic-stock.md#예탁원정보(실권주일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/forfeit` |
| `HHKDB669110C0` | [예탁원정보(의무예치일정)](./domestic-stock.md#예탁원정보(의무예치일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/mand-deposit` |
| `HHKDB669111C0` | [예탁원정보(주주총회일정)](./domestic-stock.md#예탁원정보(주주총회일정)) | [국내주식] | `/uapi/domestic-stock/v1/ksdinfo/sharehld-meet` |
| `HHKST03900300` | [종목조건검색 목록조회](./domestic-stock.md#종목조건검색-목록조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/psearch-title` |
| `HHKST03900400` | [종목조건검색조회](./domestic-stock.md#종목조건검색조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/psearch-result` |
| `HHKST668300C0` | [국내주식 종목추정실적](./domestic-stock.md#국내주식-종목추정실적) | [국내주식] | `/uapi/domestic-stock/v1/quotations/estimate-perform` |
| `HHMCM000002C0` | [국내선물 영업일조회](./domestic-stock.md#국내선물-영업일조회) | [국내주식] | `/uapi/domestic-stock/v1/quotations/market-time` |
| `HHMCM000100C0` | [HTS조회상위20종목](./domestic-stock.md#hts조회상위20종목) | [국내주식] | `/uapi/domestic-stock/v1/ranking/hts-top-view` |
| `HHPPG046600C1` | [프로그램매매 투자자매매동향(당일)](./domestic-stock.md#프로그램매매-투자자매매동향(당일)) | [국내주식] | `/uapi/domestic-stock/v1/quotations/investor-program-trade-today` |
| `HHPST074500C0` | [종목별 일별 대차거래추이](./domestic-stock.md#종목별-일별-대차거래추이) | [국내주식] | `/uapi/domestic-stock/v1/quotations/daily-loan-trans` |
| `HHPTJ04160200` | [종목별 외인기관 추정가집계](./domestic-stock.md#종목별-외인기관-추정가집계) | [국내주식] | `/uapi/domestic-stock/v1/quotations/investor-trend-estimate` |
| `TTTC0013U` | [주식주문(정정취소)](./domestic-stock.md#주식주문(정정취소)) | [국내주식] | `/uapi/domestic-stock/v1/trading/order-rvsecncl` |
| `TTTC0084R` | [주식정정취소가능주문조회](./domestic-stock.md#주식정정취소가능주문조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-psbl-rvsecncl` |
| `TTTC0503R` | [퇴직연금 매수가능조회](./domestic-stock.md#퇴직연금-매수가능조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/pension/inquire-psbl-order` |
| `TTTC0506R` | [퇴직연금 예수금조회](./domestic-stock.md#퇴직연금-예수금조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/pension/inquire-deposit` |
| `TTTC0869R` | [주식통합증거금 현황](./domestic-stock.md#주식통합증거금-현황) | [국내주식] | `/uapi/domestic-stock/v1/trading/intgr-margin` |
| `TTTC2201R(기존 KRX만 가능), TTTC2210R (KRX,NXT/SOR)` | [퇴직연금 미체결내역](./domestic-stock.md#퇴직연금-미체결내역) | [국내주식] | `/uapi/domestic-stock/v1/trading/pension/inquire-daily-ccld` |
| `TTTC2202R` | [퇴직연금 체결기준잔고](./domestic-stock.md#퇴직연금-체결기준잔고) | [국내주식] | `/uapi/domestic-stock/v1/trading/pension/inquire-present-balance` |
| `TTTC2208R` | [퇴직연금 잔고조회](./domestic-stock.md#퇴직연금-잔고조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/pension/inquire-balance` |
| `TTTC8408R` | [매도가능수량조회](./domestic-stock.md#매도가능수량조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-psbl-sell` |
| `TTTC8434R` | [주식잔고조회](./domestic-stock.md#주식잔고조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-balance` |
| `TTTC8494R` | [주식잔고조회_실현손익](./domestic-stock.md#주식잔고조회_실현손익) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-balance-rlz-pl` |
| `TTTC8708R` | [기간별손익일별합산조회](./domestic-stock.md#기간별손익일별합산조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-period-profit` |
| `TTTC8715R` | [기간별매매손익현황조회](./domestic-stock.md#기간별매매손익현황조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-period-trade-profit` |
| `TTTC8908R` | [매수가능조회](./domestic-stock.md#매수가능조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-psbl-order` |
| `TTTC8909R` | [신용매수가능조회](./domestic-stock.md#신용매수가능조회) | [국내주식] | `/uapi/domestic-stock/v1/trading/inquire-credit-psamount` |
| `CTPF1101R` | [장내채권 발행정보](./domestic-bond.md#장내채권-발행정보) | [장내채권] | `/uapi/domestic-bond/v1/quotations/issue-info` |
| `CTPF1114R` | [장내채권 기본조회](./domestic-bond.md#장내채권-기본조회) | [장내채권] | `/uapi/domestic-bond/v1/quotations/search-bond-info` |
| `CTPF2005R` | [장내채권 평균단가조회](./domestic-bond.md#장내채권-평균단가조회) | [장내채권] | `/uapi/domestic-bond/v1/quotations/avg-unit` |
| `CTSC8013R` | [장내채권 주문체결내역](./domestic-bond.md#장내채권-주문체결내역) | [장내채권] | `/uapi/domestic-bond/v1/trading/inquire-daily-ccld` |
| `CTSC8035R` | [채권정정취소가능주문조회](./domestic-bond.md#채권정정취소가능주문조회) | [장내채권] | `/uapi/domestic-bond/v1/trading/inquire-psbl-rvsecncl` |
| `CTSC8407R` | [장내채권 잔고조회](./domestic-bond.md#장내채권-잔고조회) | [장내채권] | `/uapi/domestic-bond/v1/trading/inquire-balance` |
| `FHKBJ773400C0` | [장내채권현재가(시세)](./domestic-bond.md#장내채권현재가(시세)) | [장내채권] | `/uapi/domestic-bond/v1/quotations/inquire-price` |
| `FHKBJ773401C0` | [장내채권현재가(호가)](./domestic-bond.md#장내채권현재가(호가)) | [장내채권] | `/uapi/domestic-bond/v1/quotations/inquire-asking-price` |
| `FHKBJ773403C0` | [장내채권현재가(체결)](./domestic-bond.md#장내채권현재가(체결)) | [장내채권] | `/uapi/domestic-bond/v1/quotations/inquire-ccnl` |
| `FHKBJ773404C0` | [장내채권현재가(일별)](./domestic-bond.md#장내채권현재가(일별)) | [장내채권] | `/uapi/domestic-bond/v1/quotations/inquire-daily-price` |
| `FHKBJ773701C0` | [장내채권 기간별시세(일)](./domestic-bond.md#장내채권-기간별시세(일)) | [장내채권] | `/uapi/domestic-bond/v1/quotations/inquire-daily-itemchartprice` |
| `H0BICNT0` | [채권지수 실시간체결가](./domestic-bond.md#채권지수-실시간체결가) | [장내채권] | `/tryitout/H0BICNT0` |
| `H0BJCNT0` | [일반채권 실시간체결가](./domestic-bond.md#일반채권-실시간체결가) | [장내채권] | `/tryitout/H0BJCNT0` |
| `H0BJCNT0` | [일반채권 실시간호가](./domestic-bond.md#일반채권-실시간호가) | [장내채권] | `/tryitout/H0BJASP0` |
| `TTTC0952U` | [장내채권 매수주문](./domestic-bond.md#장내채권-매수주문) | [장내채권] | `/uapi/domestic-bond/v1/trading/buy` |
| `TTTC0953U` | [장내채권 정정취소주문](./domestic-bond.md#장내채권-정정취소주문) | [장내채권] | `/uapi/domestic-bond/v1/trading/order-rvsecncl` |
| `TTTC0958U` | [장내채권 매도주문](./domestic-bond.md#장내채권-매도주문) | [장내채권] | `/uapi/domestic-bond/v1/trading/sell` |
| `TTTC8910R` | [장내채권 매수가능조회](./domestic-bond.md#장내채권-매수가능조회) | [장내채권] | `/uapi/domestic-bond/v1/trading/inquire-psbl-order` |
| `(정정) OTFM3002U (취소) OTFM3003U` | [해외선물옵션 정정취소주문](./overseas-futureoption.md#해외선물옵션-정정취소주문) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/order-rvsecncl` |
| `HDFFF010` | [해외선물옵션 실시간호가](./overseas-futureoption.md#해외선물옵션-실시간호가) | [해외선물옵션] | `/tryitout/HDFFF010` |
| `HDFFF020` | [해외선물옵션 실시간체결가](./overseas-futureoption.md#해외선물옵션-실시간체결가) | [해외선물옵션] | `/tryitout/HDFFF020` |
| `HDFFF1C0` | [해외선물옵션 실시간주문내역통보](./overseas-futureoption.md#해외선물옵션-실시간주문내역통보) | [해외선물옵션] | `/tryitout/HDFFF1C0` |
| `HDFFF2C0` | [해외선물옵션 실시간체결내역통보](./overseas-futureoption.md#해외선물옵션-실시간체결내역통보) | [해외선물옵션] | `/tryitout/HDFFF2C0` |
| `HHDDB95030000` | [해외선물 미결제추이](./overseas-futureoption.md#해외선물-미결제추이) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/investor-unpd-trend` |
| `HHDFC55010000` | [해외선물종목현재가](./overseas-futureoption.md#해외선물종목현재가) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/inquire-price` |
| `HHDFC55010100` | [해외선물종목상세](./overseas-futureoption.md#해외선물종목상세) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/stock-detail` |
| `HHDFC55020000` | [해외선물 체결추이(주간)](./overseas-futureoption.md#해외선물-체결추이(주간)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/weekly-ccnl` |
| `HHDFC55020100` | [해외선물 체결추이(일간)](./overseas-futureoption.md#해외선물-체결추이(일간)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/daily-ccnl` |
| `HHDFC55020200` | [해외선물 체결추이(틱)](./overseas-futureoption.md#해외선물-체결추이(틱)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/tick-ccnl` |
| `HHDFC55020300` | [해외선물 체결추이(월간)](./overseas-futureoption.md#해외선물-체결추이(월간)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/monthly-ccnl` |
| `HHDFC55020400` | [해외선물 분봉조회](./overseas-futureoption.md#해외선물-분봉조회) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/inquire-time-futurechartprice` |
| `HHDFC55200000` | [해외선물 상품기본정보](./overseas-futureoption.md#해외선물-상품기본정보) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/search-contract-detail` |
| `HHDFC86000000` | [해외선물 호가](./overseas-futureoption.md#해외선물-호가) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/inquire-asking-price` |
| `HHDFO55010000` | [해외옵션종목현재가](./overseas-futureoption.md#해외옵션종목현재가) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/opt-price` |
| `HHDFO55010100` | [해외옵션종목상세](./overseas-futureoption.md#해외옵션종목상세) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/opt-detail` |
| `HHDFO55020000` | [해외옵션 체결추이(주간)](./overseas-futureoption.md#해외옵션-체결추이(주간)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/opt-weekly-ccnl` |
| `HHDFO55020100` | [해외옵션 체결추이(일간)](./overseas-futureoption.md#해외옵션-체결추이(일간)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/opt-daily-ccnl` |
| `HHDFO55020200` | [해외옵션 체결추이(틱)](./overseas-futureoption.md#해외옵션-체결추이(틱)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/opt-tick-ccnl` |
| `HHDFO55020300` | [해외옵션 체결추이(월간)](./overseas-futureoption.md#해외옵션-체결추이(월간)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/opt-monthly-ccnl` |
| `HHDFO55020400` | [해외옵션 분봉조회](./overseas-futureoption.md#해외옵션-분봉조회) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/inquire-time-optchartprice` |
| `HHDFO55200000` | [해외옵션 상품기본정보](./overseas-futureoption.md#해외옵션-상품기본정보) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/search-opt-detail` |
| `HHDFO86000000` | [해외옵션 호가](./overseas-futureoption.md#해외옵션-호가) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/opt-asking-price` |
| `OTFM1411R` | [해외선물옵션 예수금현황](./overseas-futureoption.md#해외선물옵션-예수금현황) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/inquire-deposit` |
| `OTFM1412R` | [해외선물옵션 미결제내역조회(잔고)](./overseas-futureoption.md#해외선물옵션-미결제내역조회(잔고)) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/inquire-unpd` |
| `OTFM2229R` | [해외선물옵션 장운영시간](./overseas-futureoption.md#해외선물옵션-장운영시간) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/quotations/market-time` |
| `OTFM3001U` | [해외선물옵션 주문](./overseas-futureoption.md#해외선물옵션-주문) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/order` |
| `OTFM3114R` | [해외선물옵션 기간계좌거래내역](./overseas-futureoption.md#해외선물옵션-기간계좌거래내역) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/inquire-period-trans` |
| `OTFM3115R` | [해외선물옵션 증거금상세](./overseas-futureoption.md#해외선물옵션-증거금상세) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/margin-detail` |
| `OTFM3116R` | [해외선물옵션 당일주문내역조회](./overseas-futureoption.md#해외선물옵션-당일주문내역조회) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/inquire-ccld` |
| `OTFM3118R` | [해외선물옵션 기간계좌손익 일별](./overseas-futureoption.md#해외선물옵션-기간계좌손익-일별) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/inquire-period-ccld` |
| `OTFM3120R` | [해외선물옵션 일별 주문내역](./overseas-futureoption.md#해외선물옵션-일별-주문내역) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/inquire-daily-order` |
| `OTFM3122R` | [해외선물옵션 일별 체결내역](./overseas-futureoption.md#해외선물옵션-일별-체결내역) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/inquire-daily-ccld` |
| `OTFM3304R` | [해외선물옵션 주문가능조회](./overseas-futureoption.md#해외선물옵션-주문가능조회) | [해외선물옵션] | `/uapi/overseas-futureoption/v1/trading/inquire-psamount` |
| `(미국 예약주문 취소접수) TTTT3017U (아시아국가 미제공)` | [해외주식 예약주문접수취소](./overseas-stock.md#해외주식-예약주문접수취소) | [해외주식] | `/uapi/overseas-stock/v1/trading/order-resv-ccnl` |
| `(미국 정정·취소) TTTT1004U (아시아 국가 하단 규격서 참고)` | [해외주식 정정취소주문](./overseas-stock.md#해외주식-정정취소주문) | [해외주식] | `/uapi/overseas-stock/v1/trading/order-rvsecncl` |
| `(미국) TTTT3039R (일본/중국/홍콩/베트남) TTTS3014R` | [해외주식 예약주문조회](./overseas-stock.md#해외주식-예약주문조회) | [해외주식] | `/uapi/overseas-stock/v1/trading/order-resv-list` |
| `(미국매수) TTTT1002U  (미국매도) TTTT1006U (아시아 국가 하단 규격서 참고)` | [해외주식 주문](./overseas-stock.md#해외주식-주문) | [해외주식] | `/uapi/overseas-stock/v1/trading/order` |
| `(미국예약매수) TTTT3014U  (미국예약매도) TTTT3016U   (중국/홍콩/일본/베트남 예약주문) TTTS3013U` | [해외주식 예약주문접수](./overseas-stock.md#해외주식-예약주문접수) | [해외주식] | `/uapi/overseas-stock/v1/trading/order-resv` |
| `(주간매수) TTTS6036U (주간매도) TTTS6037U` | [해외주식 미국주간주문](./overseas-stock.md#해외주식-미국주간주문) | [해외주식] | `/uapi/overseas-stock/v1/trading/daytime-order` |
| `CTLN4050R` | [당사 해외주식담보대출 가능 종목](./overseas-stock.md#당사-해외주식담보대출-가능-종목) | [해외주식] | `/uapi/overseas-price/v1/quotations/colable-by-company` |
| `CTOS4001R` | [해외주식 일별거래내역](./overseas-stock.md#해외주식-일별거래내역) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-period-trans` |
| `CTOS5011R` | [해외결제일자조회](./overseas-stock.md#해외결제일자조회) | [해외주식] | `/uapi/overseas-stock/v1/quotations/countries-holiday` |
| `CTPF1702R` | [해외주식 상품기본정보](./overseas-stock.md#해외주식-상품기본정보) | [해외주식] | `/uapi/overseas-price/v1/quotations/search-info` |
| `CTRGT011R` | [해외주식 기간별권리조회](./overseas-stock.md#해외주식-기간별권리조회) | [해외주식] | `/uapi/overseas-price/v1/quotations/period-rights` |
| `CTRP6010R` | [해외주식 결제기준잔고](./overseas-stock.md#해외주식-결제기준잔고) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-paymt-stdr-balance` |
| `CTRP6504R` | [해외주식 체결기준현재잔고](./overseas-stock.md#해외주식-체결기준현재잔고) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-present-balance` |
| `FHKST01011801` | [해외속보(제목)](./overseas-stock.md#해외속보(제목)) | [해외주식] | `/uapi/overseas-price/v1/quotations/brknews-title` |
| `FHKST03030100` | [해외주식 종목_지수_환율기간별시세(일_주_월_년)](./overseas-stock.md#해외주식-종목_지수_환율기간별시세(일_주_월_년)) | [해외주식] | `/uapi/overseas-price/v1/quotations/inquire-daily-chartprice` |
| `FHKST03030200` | [해외지수분봉조회](./overseas-stock.md#해외지수분봉조회) | [해외주식] | `/uapi/overseas-price/v1/quotations/inquire-time-indexchartprice` |
| `H0GSCNI0` | [해외주식 실시간체결통보](./overseas-stock.md#해외주식-실시간체결통보) | [해외주식] | `/tryitout/H0GSCNI0` |
| `HDFSASP0` | [해외주식 실시간호가](./overseas-stock.md#해외주식-실시간호가) | [해외주식] | `/tryitout/HDFSASP0` |
| `HDFSASP1` | [해외주식 지연호가(아시아)](./overseas-stock.md#해외주식-지연호가(아시아)) | [해외주식] | `/tryitout/HDFSASP1` |
| `HDFSCNT0` | [해외주식 실시간지연체결가](./overseas-stock.md#해외주식-실시간지연체결가) | [해외주식] | `/tryitout/HDFSCNT0` |
| `HHDFS00000300` | [해외주식 현재체결가](./overseas-stock.md#해외주식-현재체결가) | [해외주식] | `/uapi/overseas-price/v1/quotations/price` |
| `HHDFS76200100` | [해외주식 현재가 호가](./overseas-stock.md#해외주식-현재가-호가) | [해외주식] | `/uapi/overseas-price/v1/quotations/inquire-asking-price` |
| `HHDFS76200200` | [해외주식 현재가상세](./overseas-stock.md#해외주식-현재가상세) | [해외주식] | `/uapi/overseas-price/v1/quotations/price-detail` |
| `HHDFS76200300` | [해외주식 체결추이](./overseas-stock.md#해외주식-체결추이) | [해외주식] | `/uapi/overseas-price/v1/quotations/inquire-ccnl` |
| `HHDFS76220000` | [해외주식 복수종목 시세조회](./overseas-stock.md#해외주식-복수종목-시세조회) | [해외주식] | `/uapi/overseas-price/v1/quotations/multprice` |
| `HHDFS76240000` | [해외주식 기간별시세](./overseas-stock.md#해외주식-기간별시세) | [해외주식] | `/uapi/overseas-price/v1/quotations/dailyprice` |
| `HHDFS76260000` | [해외주식 가격급등락](./overseas-stock.md#해외주식-가격급등락) | [해외주식] | `/uapi/overseas-stock/v1/ranking/price-fluct` |
| `HHDFS76270000` | [해외주식 거래량급증](./overseas-stock.md#해외주식-거래량급증) | [해외주식] | `/uapi/overseas-stock/v1/ranking/volume-surge` |
| `HHDFS76280000` | [해외주식 매수체결강도상위](./overseas-stock.md#해외주식-매수체결강도상위) | [해외주식] | `/uapi/overseas-stock/v1/ranking/volume-power` |
| `HHDFS76290000` | [해외주식 상승율_하락율](./overseas-stock.md#해외주식-상승율_하락율) | [해외주식] | `/uapi/overseas-stock/v1/ranking/updown-rate` |
| `HHDFS76300000` | [해외주식 신고_신저가](./overseas-stock.md#해외주식-신고_신저가) | [해외주식] | `/uapi/overseas-stock/v1/ranking/new-highlow` |
| `HHDFS76310010` | [해외주식 거래량순위](./overseas-stock.md#해외주식-거래량순위) | [해외주식] | `/uapi/overseas-stock/v1/ranking/trade-vol` |
| `HHDFS76320010` | [해외주식 거래대금순위](./overseas-stock.md#해외주식-거래대금순위) | [해외주식] | `/uapi/overseas-stock/v1/ranking/trade-pbmn` |
| `HHDFS76330000` | [해외주식 거래증가율순위](./overseas-stock.md#해외주식-거래증가율순위) | [해외주식] | `/uapi/overseas-stock/v1/ranking/trade-growth` |
| `HHDFS76340000` | [해외주식 거래회전율순위](./overseas-stock.md#해외주식-거래회전율순위) | [해외주식] | `/uapi/overseas-stock/v1/ranking/trade-turnover` |
| `HHDFS76350100` | [해외주식 시가총액순위](./overseas-stock.md#해외주식-시가총액순위) | [해외주식] | `/uapi/overseas-stock/v1/ranking/market-cap` |
| `HHDFS76370000` | [해외주식 업종별시세](./overseas-stock.md#해외주식-업종별시세) | [해외주식] | `/uapi/overseas-price/v1/quotations/industry-theme` |
| `HHDFS76370100` | [해외주식 업종별코드조회](./overseas-stock.md#해외주식-업종별코드조회) | [해외주식] | `/uapi/overseas-price/v1/quotations/industry-price` |
| `HHDFS76410000` | [해외주식조건검색](./overseas-stock.md#해외주식조건검색) | [해외주식] | `/uapi/overseas-price/v1/quotations/inquire-search` |
| `HHDFS76950200` | [해외주식분봉조회](./overseas-stock.md#해외주식분봉조회) | [해외주식] | `/uapi/overseas-price/v1/quotations/inquire-time-itemchartprice` |
| `HHDFS78330900` | [해외주식 권리종합](./overseas-stock.md#해외주식-권리종합) | [해외주식] | `/uapi/overseas-price/v1/quotations/rights-by-ice` |
| `HHPSTH60100C1` | [해외뉴스종합(제목)](./overseas-stock.md#해외뉴스종합(제목)) | [해외주식] | `/uapi/overseas-price/v1/quotations/news-title` |
| `TTTC2101R` | [해외증거금 통화별조회](./overseas-stock.md#해외증거금-통화별조회) | [해외주식] | `/uapi/overseas-stock/v1/trading/foreign-margin` |
| `TTTS3007R` | [해외주식 매수가능금액조회](./overseas-stock.md#해외주식-매수가능금액조회) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-psamount` |
| `TTTS3012R` | [해외주식 잔고](./overseas-stock.md#해외주식-잔고) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-balance` |
| `TTTS3018R` | [해외주식 미체결내역](./overseas-stock.md#해외주식-미체결내역) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-nccs` |
| `TTTS3035R` | [해외주식 주문체결내역](./overseas-stock.md#해외주식-주문체결내역) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-ccnl` |
| `TTTS3039R` | [해외주식 기간손익](./overseas-stock.md#해외주식-기간손익) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-period-profit` |
| `TTTS6038U` | [해외주식 미국주간정정취소](./overseas-stock.md#해외주식-미국주간정정취소) | [해외주식] | `/uapi/overseas-stock/v1/trading/daytime-order-rvsecncl` |
| `TTTS6058R` | [해외주식 지정가주문번호조회](./overseas-stock.md#해외주식-지정가주문번호조회) | [해외주식] | `/uapi/overseas-stock/v1/trading/algo-ordno` |
| `TTTS6059R` | [해외주식 지정가체결내역조회](./overseas-stock.md#해외주식-지정가체결내역조회) | [해외주식] | `/uapi/overseas-stock/v1/trading/inquire-algo-ccnl` |

## 본 MCP에서 사용 중인 핵심 API

| 도구 | TR_ID | 시트명 |
|---|---|---|
| `get_quote` (주식) | `FHKST01010100` | 주식현재가 시세 |
| `get_quote` (ETF/ETN) | `FHPST02400000` | ETF/ETN 현재가 |
| `get_chart` | `FHKST03010100` | 국내주식기간별시세(일/주/월/년) |
| `get_etf_components` | `FHKST121600C0` | ETF 구성종목시세 |
| `get_dividend` | `HHKDB669102C0` | 예탁원정보(배당일정) |
| `get_credit_ratio` | `FHPST04760000` | 종목별 일별 신용잔고 |
| `get_credit_ratio` (공매도) | `FHPST04830000` | 종목별 일별 공매도 |
| `get_credit_ratio` (대차) | `HHPST074500C0` | 종목별 일별 대차거래추이 |
| `advanced_search` (등락률) | `FHPST01700000` | 국내주식 등락률 순위 |
| `advanced_search` (시총) | `FHPST01740000` | 국내주식 시가총액 순위 |
| `advanced_search` (거래량) | `FHPST01710000` | 거래량 순위 |
| `get_index` (국내) | `FHPUP02100000` | 국내업종 현재지수 |
| `get_index_chart` (국내) | `FHPUP02120000` | 국내업종 일자별지수 |
| `get_index`/`get_fx` (해외) | `FHKST03030100` | 해외주식 종목/지수/환율 기간별시세 |
| `get_commodity` | `HHDFC55010000` | 해외선물종목현재가 |
| `get_commodity_chart` | `HHDFC55020100` | 해외선물 체결추이(일간) |
