// models/CityPost.ts
import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

const CityPostSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, maxlength: 30 },
    answer: { type: String, required: true, trim: true, maxlength: 50 }, // 城市名稱
    reason: { type: String, required: true, trim: true, maxlength: 300 },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true, // createdAt / updatedAt
    versionKey: false,
  }
);

CityPostSchema.index({ createdAt: -1 });


export type CityPostDoc = InferSchemaType<typeof CityPostSchema>;

const CityPost: Model<CityPostDoc> =
  (mongoose.models.CityPost as Model<CityPostDoc>) ||
  mongoose.model<CityPostDoc>("CityPost", CityPostSchema);

export default CityPost;
