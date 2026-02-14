

export type TeaCoffeePostDoc = {
  _id?: string;
  username: string;
  answer: string;
  reason: string;
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export const TEACOFFEE_POST_DEFAULTS: Array<
  Pick<TeaCoffeePostDoc, "username" | "answer" | "reason">
> = [
  {
    username: "飲品控",
    answer: "珍奶",
    reason: "珍珠的嚼勁讓下午瞬間放鬆。",
  },
  {
    username: "Sam",
    answer: "美式咖啡",
    reason: "喜歡清爽的風味，醒腦又不過甜。",
  },
];
