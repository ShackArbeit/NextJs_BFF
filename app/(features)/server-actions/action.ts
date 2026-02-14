// actions/actions.ts
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongoose";

import CityPost from "@/app/models/CityPost";
import MarryAgePost from "@/models/MarryAgePost";
import SeasonPost from "@/models/SeasonPost";
import LanguagePost from "@/models/LanguagePost";
import TeaCoffeePost from "@/models/TeaCoffeePost";

export type BoardKey = "city" | "marryAge" | "season" | "language" | "teaCoffee";

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
  // soft delete fields
  isDeleted?: boolean;
  deletedAt?: string | null;

  createdAt?: string;
  updatedAt?: string;
};

/** =========================
 * Paths per board (for revalidatePath)
 * ========================= */

const PATHS: Record<BoardKey, string> = {
  city: "/boards/city",
  marryAge: "/boards/marry-age",
  season: "/boards/season",
  language: "/boards/language",
  teaCoffee: "/boards/tea-coffee",
};

/** =========================
 * Model map (key -> mongoose model)
 * ========================= */

const MODEL_MAP = {
  city: CityPost,
  marryAge: MarryAgePost,
  season: SeasonPost,
  language: LanguagePost,
  teaCoffee: TeaCoffeePost,
} as const;

type AnyModel = (typeof MODEL_MAP)[BoardKey];

/** =========================
 * Internal helpers
 * ========================= */

function parseFormData(formData: FormData): PostInput {
  return {
    username: String(formData.get("username") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    reason: String(formData.get("reason") ?? "").trim(),
  };
}

function validateInput(input: PostInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.username) errors.username = "請輸入使用者姓名";
  if (!input.answer) errors.answer = "請輸入你的答案";
  if (!input.reason) errors.reason = "請輸入原因";

  // optional length guards
  if (input.username.length > 30) errors.username = "姓名太長（最多 30 字）";
  if (input.answer.length > 50) errors.answer = "答案太長（最多 50 字）";
  if (input.reason.length > 300) errors.reason = "原因太長（最多 300 字）";

  return errors;
}

function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Convert mongoose doc/lean object to DTO
 * Works for both `create()` (doc) and `find().lean()` (plain object).
 */
function toDTO(obj: any): PostDTO {
  return {
    _id: String(obj._id),
    username: obj.username,
    answer: obj.answer,
    reason: obj.reason,

    isDeleted: Boolean(obj.isDeleted ?? false),
    deletedAt: obj.deletedAt ? new Date(obj.deletedAt).toISOString() : null,

    createdAt: obj.createdAt ? new Date(obj.createdAt).toISOString() : undefined,
    updatedAt: obj.updatedAt ? new Date(obj.updatedAt).toISOString() : undefined,
  };
}

/**
 * Shared create logic: validates, inserts into given model, then revalidates.
 */
async function createPostForBoard(
  board: BoardKey,
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState<PostDTO>> {
  const input = parseFormData(formData);
  const errors = validateInput(input);

  if (hasErrors(errors)) {
    return { ok: false, message: "欄位驗證失敗", errors };
  }

  await connectDB();
  const Model = MODEL_MAP[board] as unknown as AnyModel;

  // Soft delete defaults (requires your schema to have these fields with defaults)
  const doc = await (Model as any).create({
    ...input,
    isDeleted: false,
    deletedAt: null,
  });

  revalidatePath(PATHS[board]);

  return {
    ok: true,
    message: "已新增留言 ✅",
    data: toDTO(doc),
  };
}

/**
 * Shared list logic: excludes soft-deleted by default.
 */
async function listPostsForBoard(board: BoardKey, limit = 50): Promise<PostDTO[]> {
  await connectDB();
  const Model = MODEL_MAP[board] as unknown as AnyModel;

  const docs = await (Model as any)
    .find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return docs.map((d: any) => toDTO(d));
}

/** =========================
 * Soft delete / Restore (generic)
 * ========================= */

/**
 * Soft delete a post (anyone can do it in this demo design).
 * - Marks isDeleted=true and sets deletedAt.
 * - Revalidates the board page.
 */
export async function softDeletePost(board: BoardKey, id: string): Promise<ActionState> {
  "use server";

  await connectDB();
  const Model = MODEL_MAP[board] as unknown as AnyModel;

  const res = await (Model as any).findByIdAndUpdate(
    id,
    { $set: { isDeleted: true, deletedAt: new Date() } },
    { new: true }
  );

  if (!res) return { ok: false, message: "找不到該留言，可能已被刪除" };

  revalidatePath(PATHS[board]);
  return { ok: true, message: "已刪除留言（Soft delete）✅" };
}

/**
 * Restore a soft-deleted post (optional utility).
 */
export async function restorePost(board: BoardKey, id: string): Promise<ActionState> {
  "use server";

  await connectDB();
  const Model = MODEL_MAP[board] as unknown as AnyModel;

  const res = await (Model as any).findByIdAndUpdate(
    id,
    { $set: { isDeleted: false, deletedAt: null } },
    { new: true }
  );

  if (!res) return { ok: false, message: "找不到該留言" };

  revalidatePath(PATHS[board]);
  return { ok: true, message: "已還原留言 ✅" };
}

/**
 * List deleted posts for admin/debug (optional).
 */
export async function listDeletedPosts(board: BoardKey, limit = 50): Promise<PostDTO[]> {
  "use server";

  await connectDB();
  const Model = MODEL_MAP[board] as unknown as AnyModel;

  const docs = await (Model as any)
    .find({ isDeleted: true })
    .sort({ deletedAt: -1 })
    .limit(limit)
    .lean();

  return docs.map((d: any) => toDTO(d));
}

/** =========================
 * 5 boards: create + list
 * - Keep "use server" only on exported server actions used by forms/hooks.
 * - list* functions can also include "use server" for clarity.
 * ========================= */

// 1) City
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

// 2) MarryAge
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

// 3) Season
export async function createSeasonPost(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState<PostDTO>> {
  "use server";
  return createPostForBoard("season", prevState, formData);
}

export async function listSeasonPosts(limit = 50): Promise<PostDTO[]> {
  "use server";
  return listPostsForBoard("season", limit);
}

// 4) Language
export async function createLanguagePost(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState<PostDTO>> {
  "use server";
  return createPostForBoard("language", prevState, formData);
}

export async function listLanguagePosts(limit = 50): Promise<PostDTO[]> {
  "use server";
  return listPostsForBoard("language", limit);
}

// 5) TeaCoffee
export async function createTeaCoffeePost(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState<PostDTO>> {
  "use server";
  return createPostForBoard("teaCoffee", prevState, formData);
}

export async function listTeaCoffeePosts(limit = 50): Promise<PostDTO[]> {
  "use server";
  return listPostsForBoard("teaCoffee", limit);
}
