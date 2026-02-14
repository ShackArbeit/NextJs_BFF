

export type SeasonPostDoc = {
  _id?: string;
  username: string;
  answer: string;
  reason: string;
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export const SEASON_POST_DEFAULTS: Array<
  Pick<SeasonPostDoc, "username" | "answer" | "reason">
> = [
  {
    username: "Mia",
    answer: "秋天",
    reason: "氣溫舒服、楓葉漂亮，最適合散步。",
  },
  {
    username: "Leo",
    answer: "夏天",
    reason: "喜歡海邊和戶外活動，陽光讓人充滿能量。",
  },
];
