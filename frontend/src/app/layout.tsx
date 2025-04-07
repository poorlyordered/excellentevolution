import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import LayoutContent from './LayoutContent'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Professional Development Platform',
  description: 'Personalized career development through AI-powered coaching and assessments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <LayoutContent>{children}</LayoutContent>
        </ClerkProvider>
      </body>
    </html>
  )
}
