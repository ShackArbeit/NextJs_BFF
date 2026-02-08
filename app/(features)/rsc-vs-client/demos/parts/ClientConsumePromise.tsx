"use client";

import { use } from "react";
type User = { id: number; name: string; email: string };

export default function ClientConsumePromise(props: {
  usersPromise: Promise<User[]>;
}) {
  const users = use(props.usersPromise);

  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.03)",
        padding: 18, 
        display: "grid",
        gap: 14, 
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 16 }}>Client：use(promise) 後的資料</div>

      <div style={{ display: "grid", gap: 12 }}>
        {users.slice(0, 6).map((u) => (
          <div
            key={u.id}
            style={{
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(0,0,0,0.16)",
              padding: 14,
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 15 }}>{u.name}</div>
            <div style={{ opacity: 0.75, marginTop: 8, fontSize: 14 }}>{u.email}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 14, opacity: 0.65, lineHeight: 1.8 }}>
        ✅ <b>Suspense fallback</b> 會先出現，Promise resolve 後這裡才 render。
        這就是「漸進式呈現」的體感，使用者不需要等待整個頁面加載完成就能看到部分內容。
      </div>
    </div>
  );
}
