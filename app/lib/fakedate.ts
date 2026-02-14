import { randomUUID } from "crypto";
import { CITY_POST_DEFAULTS } from "@/app/models/CityPost";
import { MARRYAGE_POST_DEFAULTS } from "@/app/models/MarryAgePost";
import { SEASON_POST_DEFAULTS } from "@/app/models/SeasonPost";
import { LANGUAGE_POST_DEFAULTS } from "@/app/models/LanguagePost";
import { TEACOFFEE_POST_DEFAULTS } from "@/app/models/TeaCoffeePost";

export type BoardKey = "city" | "marryAge" | "season" | "language" | "teaCoffee";

export type FakePost = {
  _id: string;
  board: BoardKey;
  username: string;
  answer: string;
  reason: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

function nowISO() {
  return new Date().toISOString();
}

function seedBoard(board: BoardKey, defaults: Array<{ username: string; answer: string; reason: string }>): FakePost[] {
  return defaults.map((seed) => ({
    _id: randomUUID(),
    board,
    username: seed.username,
    answer: seed.answer,
    reason: seed.reason,
    isDeleted: false,
    deletedAt: null,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  }));
}

export const fakeData: FakePost[] = [
  ...seedBoard("city", CITY_POST_DEFAULTS),
  ...seedBoard("marryAge", MARRYAGE_POST_DEFAULTS),
  ...seedBoard("season", SEASON_POST_DEFAULTS),
  ...seedBoard("language", LANGUAGE_POST_DEFAULTS),
  ...seedBoard("teaCoffee", TEACOFFEE_POST_DEFAULTS),
];

export function listFakePosts(board: BoardKey, limit = 50, includeDeleted = false): FakePost[] {
  return fakeData
    .filter((p) => p.board === board && (includeDeleted || !p.isDeleted))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

export function createFakePost(board: BoardKey, input: { username: string; answer: string; reason: string }): FakePost {
  const post: FakePost = {
    _id: randomUUID(),
    board,
    username: input.username,
    answer: input.answer,
    reason: input.reason,
    isDeleted: false,
    deletedAt: null,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };
  fakeData.unshift(post);
  return post;
}

export function softDeleteFakePost(board: BoardKey, id: string): boolean {
  const found = fakeData.find((p) => p.board === board && p._id === id);
  if (!found) return false;
  found.isDeleted = true;
  found.deletedAt = nowISO();
  found.updatedAt = nowISO();
  return true;
}

export function restoreFakePost(board: BoardKey, id: string): boolean {
  const found = fakeData.find((p) => p.board === board && p._id === id);
  if (!found) return false;
  found.isDeleted = false;
  found.deletedAt = null;
  found.updatedAt = nowISO();
  return true;
}

export function listDeletedFakePosts(board: BoardKey, limit = 50): FakePost[] {
  return fakeData
    .filter((p) => p.board === board && p.isDeleted)
    .sort((a, b) => (a.deletedAt && b.deletedAt && a.deletedAt < b.deletedAt ? 1 : -1))
    .slice(0, limit);
}
