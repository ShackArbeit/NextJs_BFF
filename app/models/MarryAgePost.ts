// models/MarryAgePost.ts
// 改用 MongoDB 驅動，僅保留型別與預設種子資料

export type MarryAgePostDoc = {
  _id?: string;
  username: string;
  answer: string;
  reason: string;
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export const MARRYAGE_POST_DEFAULTS: Array<
  Pick<MarryAgePostDoc, "username" | "answer" | "reason">
> = [
  {
    username: "Alex",
    answer: "30 歲",
    reason: "先把事業和理財基礎打穩，再組成家庭。",
  },
  {
    username: "Chloe",
    answer: "28 歲",
    reason: "覺得兩人共同成長的時間更長、熱情也高。",
  },
];
