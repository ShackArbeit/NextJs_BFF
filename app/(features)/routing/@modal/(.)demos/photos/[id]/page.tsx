import Modal from "@/app/(features)/routing/_components/Modal";

export default async function InterceptedPhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Modal title={`攔截視窗 - 照片 #${id}`}>
      <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04]">
        <img
          src={`https://picsum.photos/id/${id}/1000/600`}
          alt={`picsum ${id}`}
          className="block h-auto w-full"
        />
      </div>
      <div className="mt-3 leading-[1.7] text-white/80">
        URL 是 <code className="rounded bg-white/10 px-1 text-white">/routing/demos/photos/{id}</code>,
        但在 <code className="rounded bg-white/10 px-1 text-white">/routing</code> 以彈窗呈現.
      </div>
    </Modal>
  );
}
