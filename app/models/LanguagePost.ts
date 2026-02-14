// models/LanguagePost.ts
// 改用 MongoDB 驅動，僅保留型別與預設種子資料

export type LanguagePostDoc = {
  _id?: string;
  username: string;
  answer: string;
  reason: string;
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export const LANGUAGE_POST_DEFAULTS: Array<
  Pick<LanguagePostDoc, "username" | "answer" | "reason">
> = [
  {
    username: "語言控",
    answer: "西班牙語",
    reason: "去南美旅行時想用西語聊天，貼近當地文化。",
  },
  {
    username: "Hana",
    answer: "日文",
    reason: "想不用字幕追動畫，也能閱讀日本設計文章。",
  },
];
