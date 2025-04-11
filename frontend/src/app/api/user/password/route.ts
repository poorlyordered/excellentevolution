import { NextRequest, NextResponse } from "next/server";
/**
 * TODO: Replace with Stack Auth session retrieval logic.
 * Example: import { getStackAuthSession } from "@/lib/stack-auth";
 */
type Session = { user: { email: string } } | null;
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

export async function PATCH(req: NextRequest) {
  // TODO: Replace with Stack Auth session retrieval
  const session = null as Session; // await getStackAuthSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Both current and new password are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || !user.hashedPassword) {
    return NextResponse.json({ error: "User not found or password not set" }, { status: 404 });
  }

  const isValid = await compare(currentPassword, user.hashedPassword);
  if (!isValid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 403 });
  }

  const newHashed = await hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { hashedPassword: newHashed },
  });

  return NextResponse.json({ success: true });
}