import Modal from "@/app/(features)/routing/_components/Modal";

export default async function InterceptedPhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Modal title={`Intercepted Modal - Photo #${id}`}>
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <img
          src={`https://picsum.photos/id/${id}/1000/600`}
          alt={`picsum ${id}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <div style={{ marginTop: 12, opacity: 0.8, lineHeight: 1.7 }}>
        這個頁面是 Intercepting Routes 的重點：  
        URL 是 <code>/routing/demos/photos/{id}</code>，但在 <code>/routing</code> 這層以 modal 呈現。
      </div>
    </Modal>
  );
}
