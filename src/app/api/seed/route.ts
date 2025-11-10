import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";
import { memoryStore } from "@/lib/memory-store";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const hasDb = Boolean(process.env.MONGODB_URI);
  const samples = [
    {
      name: "Amina",
      location: "Gaza City",
      rating: 5,
      text: "Our spirit remains unshaken. We continue to hope and to build.",
      verified: true,
      isVideo: false,
    },
    {
      name: "Yousef",
      location: "Rafah",
      rating: 4,
      text: "Even in hardship, we stand together and lift each other up.",
      verified: true,
      isVideo: true,
    },
    {
      name: "Sara",
      location: "Khan Younis",
      rating: 5,
      text: "Our voices carry love, memory, and a future for our children.",
      verified: false,
      isVideo: false,
    },
  ];

  if (hasDb) {
    await connectToDatabase();
    // Clear small sample and insert
    await Testimonial.deleteMany({ text: { $regex: /Our spirit|Even in hardship|Our voices carry/ } });
    const created = await Testimonial.insertMany(samples);
    return NextResponse.json({ count: created.length });
  }

  const created = samples.map((s) => ({ _id: `${Date.now()}-${Math.random()}`, ...s }));
  memoryStore.push(...created);
  return NextResponse.json({ count: created.length });
}


