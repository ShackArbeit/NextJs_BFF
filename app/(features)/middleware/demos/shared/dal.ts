/**
 * DAL：資料存取層
 * - 集中管理外部來源、錯誤處理、(可擴充) retry / auth / tracing
 */

import { EXTERNAL_API_BASE, fetchJson } from "./api";
import { toPostDTOList, type PostDTO } from "./dto";

type ExternalPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function dalGetPostsRaw(limit = 5): Promise<ExternalPost[]> {
  const all = await fetchJson<ExternalPost[]>(`${EXTERNAL_API_BASE}/posts`);
  return all.slice(0, limit);
}

export async function dalGetPostsDTO(limit = 5): Promise<PostDTO[]> {
  // 先拿 raw，再做 DTO 收斂（你也可以改成在 query 時就 select 欄位）
  const raw = await fetchJson<unknown>(`${EXTERNAL_API_BASE}/posts`);
  const dtos = toPostDTOList(raw);
  return dtos.slice(0, limit);
}
