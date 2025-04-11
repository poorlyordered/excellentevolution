import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Professional Development Platform',
  description: 'Your professional development journey overview',
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get session
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

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
