import { NextResponse } from "next/server";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "file is required" }, { status: 400 });

  const type = file.type || "";
  const isImage = type.startsWith("image/");
  const isVideo = type.startsWith("video/");
  if (!isImage && !isVideo) {
    return NextResponse.json({ error: "Only image or video files are allowed" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadsDir = join(process.cwd(), "public", "uploads");
  try {
    await stat(uploadsDir);
  } catch {
    await mkdir(uploadsDir, { recursive: true });
  }

  const orig = sanitizeFilename(file.name || `${Date.now()}`);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${orig}`;
  const targetPath = join(uploadsDir, filename);
  await writeFile(targetPath, buffer);

  const url = `/uploads/${filename}`;
  return NextResponse.json({ url });
}


