import { Metadata } from 'next'
/**
 * TODO: Replace with Stack Auth session retrieval logic.
 * Example: import { getStackAuthSession } from "@/lib/stack-auth";
 */
type Session = { user: { id: string } } | null;

export const metadata: Metadata = {
  title: 'Dashboard | Professional Development Platform',
  description: 'Your professional development journey overview',
}

/**
 * TODO: Replace with Stack Auth session retrieval logic.
 * Example: import { getStackAuthSession } from "@/lib/stack-auth";
 */
import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get session
  // TODO: Replace with Stack Auth session retrieval
  const session = null as Session; // TODO: Replace with await getStackAuthSession();
  const userId = session?.user?.id ?? null;

  if (!userId) {
    redirect("/login");
  }

  // Fetch user profile
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, /* Add other required fields here */ },
  });

  // Define required fields for profile completeness
  const isProfileComplete = !!user?.name; // Add more checks as needed

  if (!isProfileComplete) {
    redirect("/profile");
  }

  return children;
}
