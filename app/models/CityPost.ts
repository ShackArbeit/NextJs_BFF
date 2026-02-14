
export type CityPostDoc = {
  _id?: string;
  username: string;
  answer: string;
  reason: string;
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export const CITY_POST_DEFAULTS: Array<Pick<CityPostDoc, "username" | "answer" | "reason">> = [
  {
    username: "旅人Nina",
    answer: "京都",
    reason: "寺廟與小巷充滿故事，慢步調最適合放空。",
  },
  {
    username: "Ray",
    answer: "台北",
    reason: "深夜想吃都找得到，雨天也有捷運到處晃。",
  },
];
