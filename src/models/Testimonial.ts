import mongoose, { Schema, models, model } from "mongoose";

export type TestimonialDoc = {
  _id: string;
  name: string;
  location?: string;
  rating?: number;
  text: string;
  isVideo?: boolean;
  verified?: boolean;
  imageUrl?: string;
  videoUrl?: string;
  ratingsCount?: number;
  ratingsSum?: number;
  createdAt: Date;
  updatedAt: Date;
};

const TestimonialSchema = new Schema<TestimonialDoc>(
  {
    name: { type: String, required: true },
    location: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    text: { type: String, required: true },
    isVideo: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    imageUrl: { type: String },
    videoUrl: { type: String },
    ratingsCount: { type: Number, default: 0 },
    ratingsSum: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial =
  (models.Testimonial as mongoose.Model<TestimonialDoc>) ||
  model<TestimonialDoc>("Testimonial", TestimonialSchema);


