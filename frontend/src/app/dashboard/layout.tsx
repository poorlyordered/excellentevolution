import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Professional Development Platform',
  description: 'Your professional development journey overview',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
