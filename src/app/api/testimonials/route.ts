import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";
import { memoryStore } from "@/lib/memory-store";

const schema = z.object({
  name: z.string().min(1),
  location: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  text: z.string().min(10),
  isVideo: z.boolean().optional(),
  imageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
});

export async function GET() {
  const hasDb = Boolean(process.env.MONGODB_URI);
  if (hasDb) {
    await connectToDatabase();
    const items = await Testimonial.find().sort({ createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ items });
  }
  return NextResponse.json({ items: memoryStore.slice(-50).reverse() });
}

export async function POST(req: Request) {
  const hasDb = Boolean(process.env.MONGODB_URI);
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  if (hasDb) {
    await connectToDatabase();
    const created = await Testimonial.create({ ...parsed.data });
    return NextResponse.json({ item: created }, { status: 201 });
  }
  const created = { _id: `${Date.now()}`, verified: false, ...parsed.data };
  memoryStore.push(created);
  return NextResponse.json({ item: created }, { status: 201 });
}


