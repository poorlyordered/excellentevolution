import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication | Professional Development Platform',
  description: 'Secure access to your professional development journey',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Professional Development Platform
          </h1>
        </div>
        {children}
      </div>
    </div>
  )
}
