import { NextRequest, NextResponse } from "next/server";
/**
 * TODO: Replace with Stack Auth session retrieval logic.
 * Example: import { getStackAuthSession } from "@/lib/stack-auth";
 */
type Session = { user: { email: string } } | null;
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  // TODO: Replace with Stack Auth session retrieval
  const session = null as Session; // await getStackAuthSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { name },
  });

  return NextResponse.json({ success: true });
}