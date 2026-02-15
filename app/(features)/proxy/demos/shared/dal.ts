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
  const raw = await fetchJson<unknown>(`${EXTERNAL_API_BASE}/posts`);
  const dtos = toPostDTOList(raw);
  return dtos.slice(0, limit);
}
