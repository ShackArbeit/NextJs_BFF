import { revalidatePath } from "next/cache";
import {
  type BoardKey,
  createFakePost,
  listFakePosts,
  listDeletedFakePosts,
  restoreFakePost,
  softDeleteFakePost,
} from "@/app/lib/fakedate";

export type { BoardKey };

export type PostInput = {
  username: string;
  answer: string;
  reason: string;
};

export type FieldErrors = Partial<Record<keyof PostInput, string>>;

export type ActionState<T = unknown> = {
  ok: boolean;
  message: string;
  errors?: FieldErrors;
  data?: T;
};

export type PostDTO = {
  _id: string;
  username: string;
  answer: string;
  reason: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const PATHS: Record<BoardKey, string> = {
  city: "/server-actions",
  marryAge: "/server-actions",
};

function parseFormData(formData: FormData): PostInput {
  return {
    username: String(formData.get("username") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    reason: String(formData.get("reason") ?? "").trim(),
  };
}


function validateInput(input: PostInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.username) errors.username = "請輸入使用者名稱";
  if (!input.answer) errors.answer = "請輸入你的答案";
  if (!input.reason) errors.reason = "請輸入原因";

  if (input.username.length > 30) errors.username = "名稱太長（最多 30 字）";
  if (input.answer.length > 50) errors.answer = "答案太長（最多 50 字）";
  if (input.reason.length > 300) errors.reason = "說明太長（最多 300 字）";

  return errors;
}

function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}


async function createPostForBoard(
  board: BoardKey,
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState<PostDTO>> {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const input = parseFormData(formData);
  const errors = validateInput(input);
  if (hasErrors(errors)) {
    return { ok: false, message: "欄位驗證失敗", errors };
  }
  const post = createFakePost(board, input);
  revalidatePath(PATHS[board]);
  return {
    ok: true,
    message: "已新增留言 🎉",
    data: {
      ...post,
    },
  };
}
async function listPostsForBoard(board: BoardKey, limit = 50): Promise<PostDTO[]> {
  return listFakePosts(board, limit);
}

export async function softDeletePost(board: BoardKey, id: string): Promise<ActionState> {
  "use server";
  const ok = softDeleteFakePost(board, id);
  if (!ok) return { ok: false, message: "找不到該留言，可能已被刪除" };
  revalidatePath(PATHS[board]);
  return { ok: true, message: "已刪除留言（Soft delete）" };
}

export async function restorePost(board: BoardKey, id: string): Promise<ActionState> {
  "use server";
  const ok = restoreFakePost(board, id);
  if (!ok) return { ok: false, message: "找不到該留言" };

  revalidatePath(PATHS[board]);
  return { ok: true, message: "已恢復留言" };
}

export async function listDeletedPosts(board: BoardKey, limit = 50): Promise<PostDTO[]> {
  "use server";
  return listDeletedFakePosts(board, limit);
}

export async function createCityPost(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState<PostDTO>> {
  "use server";
  return createPostForBoard("city", prevState, formData);
}

export async function listCityPosts(limit = 50): Promise<PostDTO[]> {
  "use server";
  return listPostsForBoard("city", limit);
}

export async function createMarryAgePost(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState<PostDTO>> {
  "use server";
  return createPostForBoard("marryAge", prevState, formData);
}

export async function listMarryAgePosts(limit = 50): Promise<PostDTO[]> {
  "use server";
  return listPostsForBoard("marryAge", limit);
}
