import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";
import { memoryStore } from "@/lib/memory-store";

const schema = z.object({ rating: z.number().min(1).max(5) });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const hasDb = Boolean(process.env.MONGODB_URI);
  if (hasDb) {
    await connectToDatabase();
    const doc = await Testimonial.findById(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    doc.ratingsCount = (doc.ratingsCount || 0) + 1;
    doc.ratingsSum = (doc.ratingsSum || 0) + parsed.data.rating;
    await doc.save();
    return NextResponse.json({ ok: true, avg: doc.ratingsSum / doc.ratingsCount });
  }

  const it = memoryStore.find((x) => x._id === id);
  if (!it) return NextResponse.json({ error: "Not found" }, { status: 404 });
  it.ratingsCount = (it.ratingsCount || 0) + 1;
  it.ratingsSum = (it.ratingsSum || 0) + parsed.data.rating;
  return NextResponse.json({ ok: true, avg: it.ratingsSum / it.ratingsCount });
}


