/**
 * DTO：輸出資料契約
 * 這裡示範：從外部 API 的 Post payload，收斂成 UI 只需要的欄位
 */

export type PostDTO = {
  id: number;
  title: string;
  summary: string; // 由 body 截斷產生，避免直接暴露完整 body
};

type UnknownRecord = Record<string, unknown>;

function isRecord(v: unknown): v is UnknownRecord {
  return typeof v === "object" && v !== null;
}

function toNumber(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function toString(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

function makeSummary(body: string, maxLen = 80) {
  const s = body.replace(/\s+/g, " ").trim();
  return s.length <= maxLen ? s : s.slice(0, maxLen) + "…";
}

/**
 * 從未知 payload 建立 DTO（欄位白名單 + runtime guard）
 * - 成功回傳 PostDTO
 * - 失敗回傳 null（表示外部資料不符合契約）
 */
export function toPostDTO(input: unknown): PostDTO | null {
  if (!isRecord(input)) return null;

  const id = toNumber(input.id);
  const title = toString(input.title);
  const body = toString(input.body);

  if (id === null || title === null || body === null) return null;

  return {
    id,
    title,
    summary: makeSummary(body),
  };
}

export function toPostDTOList(input: unknown): PostDTO[] {
  if (!Array.isArray(input)) return [];

  const out: PostDTO[] = [];
  for (const item of input) {
    const dto = toPostDTO(item);
    if (dto) out.push(dto);
  }
  return out;
}
