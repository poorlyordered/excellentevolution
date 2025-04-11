import { NextRequest, NextResponse } from "next/server";
/**
 * TODO: Replace with Stack Auth session retrieval logic.
 * Example: import { getStackAuthSession } from "@/lib/stack-auth";
 */
type Session = { user: { email: string } } | null;
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // TODO: Replace with Stack Auth session retrieval
  const session = null as Session; // await getStackAuthSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse multipart form data
  const formData = await req.formData();
  const file = formData.get("avatar") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Validate file type and size (max 2MB, png/jpg/jpeg)
  if (
    !["image/png", "image/jpeg", "image/jpg"].includes(file.type) ||
    file.size > 2 * 1024 * 1024
  ) {
    return NextResponse.json({ error: "Invalid file type or size" }, { status: 400 });
  }

  // Save file to /public/avatars/{userId}.{ext}
  const ext = file.type.split("/")[1];
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const fileName = `${user.id}.${ext}`;
  const filePath = path.join(process.cwd(), "public", "avatars", fileName);
  const arrayBuffer = await file.arrayBuffer();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));

  // Update user record
  const avatarUrl = `/avatars/${fileName}`;
  await prisma.user.update({
    where: { id: user.id },
    data: { avatarUrl },
  });

  return NextResponse.json({ success: true, avatarUrl });
}