"use client"

import { usePathname } from 'next/navigation'

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Check if the current route is not an auth route */}
      {!pathname?.startsWith('/login') && !pathname?.startsWith('/register') ? (
        <>
          {/* Top Navigation */}
          <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <span className="text-xl font-bold text-gray-900">PDP</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a
                      href="/dashboard"
                      className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/assessments"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Assessments
                    </a>
                    <a
                      href="/development"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Development
                    </a>
                    <a
                      href="/coaching"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Coaching
                    </a>
                    <a
                      href="/reports"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Reports
                    </a>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="relative ml-3">
                    <div>
                      <button
                        type="button"
                        className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Menu Button */}
          <div className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <a
                href="/dashboard"
                className="block border-l-4 border-blue-500 bg-blue-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700"
              >
                Dashboard
              </a>
              <a
                href="/assessments"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Assessments
              </a>
              <a
                href="/development"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Development
              </a>
              <a
                href="/coaching"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Coaching
              </a>
              <a
                href="/reports"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Reports
              </a>
            </div>
          </div>
        </>
      ) : null}

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer - only show on non-auth pages */}
      {!pathname?.startsWith('/login') && !pathname?.startsWith('/register') ? (
        <footer className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 pt-4">
              <p className="text-center text-sm text-gray-500">
                © 2025 Professional Development Platform. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      ) : null}
    </div>
  )
}
