export type PostDTO = {
  id: number;
  title: string;
  summary: string; 
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
