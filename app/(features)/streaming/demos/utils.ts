export async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

export function nowLabel() {
  const d = new Date()
  return d.toLocaleString()
}
