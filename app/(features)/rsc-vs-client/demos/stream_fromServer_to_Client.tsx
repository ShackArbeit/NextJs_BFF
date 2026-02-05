import { Suspense } from "react";
import ClientConsumePromise from "./parts/ClientConsumePromise";

type User = { id: number; name: string; email: string };

async function getUsersSlow(): Promise<User[]> {
  
  await new Promise((r) => setTimeout(r,3000));

  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return (await res.json()) as User[];
}

export default function StreamFromServerToClient() {
  const usersPromise = getUsersSlow();

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>
        ② Streaming：Server → Client（Suspense + use）
      </h2>

      <p style={{ margin: 0, color: "rgba(255,255,255,0.76)", lineHeight: 1.7 }}>
        這裡示範：Server 把 Promise 交給 Client，Client 用 React <code>use()</code> 直接消化，
        同時用 Suspense 讓 UI 先顯示 fallback 再逐步補上內容（更有 streaming 體感）。
      </p>

      <Suspense fallback={<LoadingBox />}>
        <ClientConsumePromise usersPromise={usersPromise} />
      </Suspense>
    </div>
  );
}

function LoadingBox() {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px dashed rgba(255,255,255,0.18)",
        background: "rgba(0,0,0,0.18)",
        padding: 14,
      }}
    >
      <div style={{ fontWeight: 900 }}>Loading…（Streaming fallback）</div>
      <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
        <Skeleton />
        <Skeleton />
        <Skeleton w="65%" />
      </div>
    </div>
  );
}

function Skeleton({ w = "100%" }: { w?: string }) {
  return (
    <div
      style={{
        width: w,
        height: 10,
        borderRadius: 999,
        background: "rgba(255,255,255,0.10)",
      }}
    />
  );
}

