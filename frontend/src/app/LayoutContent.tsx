"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link' // Import Link for client-side navigation
import clsx from 'clsx' // Import clsx for conditional classes

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/assessments', label: 'Assessments' },
    { href: '/development', label: 'Development' },
    { href: '/coaching', label: 'Coaching' },
    { href: '/reports', label: 'Reports' },
  ];
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
                    <span className="text-xl font-bold text-gray-900">NFS</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navLinks.map((link) => (
                      <Link // Use Next.js Link for client-side routing
                        key={link.href}
                        href={link.href}
                        className={clsx(
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                          pathname === link.href
                            ? "border-blue-500 text-gray-900" // Active styles
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" // Inactive styles
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
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
              {navLinks.map((link) => (
                <Link // Use Next.js Link for client-side routing
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                    pathname === link.href
                      ? "border-blue-500 bg-blue-50 text-blue-700" // Active styles
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800" // Inactive styles
                  )}
                >
                  {link.label}
                </Link>
              ))}
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
