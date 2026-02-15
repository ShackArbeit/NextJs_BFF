/**
 * 外部免費 API
 * - JSONPlaceholder: https://jsonplaceholder.typicode.com
 */

export const EXTERNAL_API_BASE = "https://jsonplaceholder.typicode.com";

export async function fetchJson<T>(
  input: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `fetch failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`
    );
  }

  return (await res.json()) as T;
}
