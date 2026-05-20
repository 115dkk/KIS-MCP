import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisStockPriceOutput } from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { extractObject } from "../utils/kisResponse.js";
import { normalizeSymbol } from "../utils/symbol.js";
import { findByCode } from "../utils/symbolIndex.js";

export interface GetTradingStatusInput {
  symbol: string;
}

export interface TradingStatusFlag {
  key: string;
  value?: string;
  label: string;
  active: boolean;
  severity: "info" | "warning" | "danger";
}

export interface TradingStatusResult {
  symbol: string;
  name?: string;
  market?: string;
  sector?: string;
  price?: number;
  changeRate?: number;
  flags: TradingStatusFlag[];
  riskLevel: "normal" | "caution" | "danger";
  notes: string[];
}

const FLAG_DEFS: Array<{
  key: keyof KisStockPriceOutput;
  label: string;
  active: (value: string | undefined) => boolean;
  severity: TradingStatusFlag["severity"];
}> = [
  { key: "temp_stop_yn", label: "temporary halt", active: isYes, severity: "danger" },
  { key: "invt_caful_yn", label: "investment caution", active: isYes, severity: "warning" },
  { key: "short_over_yn", label: "short-sale overheated", active: isYes, severity: "warning" },
  { key: "ssts_yn", label: "short sale available", active: isYes, severity: "info" },
  { key: "sltr_yn", label: "short selling restriction", active: isYes, severity: "warning" },
  { key: "mang_issu_cls_code", label: "administrative issue class", active: nonZero, severity: "danger" },
  { key: "mrkt_warn_cls_code", label: "market warning class", active: nonZero, severity: "warning" },
  { key: "iscd_stat_cls_code", label: "issue status class", active: nonZeroExceptNormal, severity: "warning" },
  { key: "crdt_able_yn", label: "credit trading available", active: (v) => v === "N", severity: "info" },
  { key: "vi_cls_code", label: "volatility interruption class", active: nonZero, severity: "info" },
];

export async function getTradingStatus(
  client: KisClient,
  input: GetTradingStatusInput,
): Promise<TradingStatusResult> {
  const symbol = normalizeSymbol(input.symbol);
  const res = await client.get<KisStockPriceOutput>({
    path: KIS.stockPrice.path,
    trId: KIS.stockPrice.trIdReal,
    query: { fid_cond_mrkt_div_code: "J", fid_input_iscd: symbol },
  });
  const out = extractObject<KisStockPriceOutput>(res);
  const flags = FLAG_DEFS.map((def) => {
    const value = out[def.key];
    return {
      key: String(def.key),
      value,
      label: def.label,
      active: def.active(value),
      severity: def.severity,
    };
  });
  const active = flags.filter((f) => f.active);
  const riskLevel = active.some((f) => f.severity === "danger")
    ? "danger"
    : active.some((f) => f.severity === "warning")
    ? "caution"
    : "normal";

  return {
    symbol,
    name: findByCode(symbol)?.name,
    market: out.rprs_mrkt_kor_name,
    sector: out.bstp_kor_isnm,
    price: num(parseNum(out.stck_prpr)),
    changeRate: num(parseNum(out.prdy_ctrt)),
    flags,
    riskLevel,
    notes: [
      "Trading status is read from the stock inquire-price response only.",
      "This tool does not expose any order, balance, or account endpoint.",
    ],
  };
}

function isYes(value: string | undefined): boolean {
  return value === "Y" || value === "1";
}

function nonZero(value: string | undefined): boolean {
  return value !== undefined && value !== "" && value !== "0" && value !== "00";
}

function nonZeroExceptNormal(value: string | undefined): boolean {
  return value !== undefined && value !== "" && value !== "0" && value !== "00" && value !== "55";
}

function num(n: number): number | undefined {
  return Number.isFinite(n) ? n : undefined;
}

