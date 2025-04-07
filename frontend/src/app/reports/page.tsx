import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reports & Analytics | Professional Development Platform',
  description: 'View your assessment results, progress reports, and development insights',
}

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600">
            Review your assessment results and track your professional development progress.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Results */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Assessment Results</h2>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Export Results
                </button>
              </div>
              <div className="space-y-6">
                {/* MBTI Results */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">MBTI Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-blue-700">Personality Type</div>
                      <div className="mt-1 text-2xl font-bold text-blue-900">INTJ</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-blue-700">Primary Function</div>
                      <div className="mt-1 text-lg font-semibold text-blue-900">Introverted Intuition</div>
                    </div>
                  </div>
                </div>

                {/* Enneagram Results */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Enneagram Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-purple-700">Core Type</div>
                      <div className="mt-1 text-2xl font-bold text-purple-900">Type 5</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-purple-700">Wing</div>
                      <div className="mt-1 text-lg font-semibold text-purple-900">6w5</div>
                    </div>
                  </div>
                </div>

                {/* StrengthsFinder Results */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Top 5 Strengths</h3>
                  <div className="space-y-2">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-700">Strategic</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-700">Learner</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-700">Analytical</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-700">Achiever</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-700">Input</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quarterly Reviews */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quarterly Reviews</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-green-50 p-4">
                  <h3 className="font-medium text-green-900">Q4 2024 Review</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Completed on December 15, 2024
                  </p>
                  <a
                    href="#"
                    className="mt-2 text-sm font-medium text-green-700 hover:text-green-900"
                  >
                    View Report →
                  </a>
                </div>
                <div className="border-l-4 border-green-500 bg-green-50 p-4">
                  <h3 className="font-medium text-green-900">Q3 2024 Review</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Completed on September 15, 2024
                  </p>
                  <a
                    href="#"
                    className="mt-2 text-sm font-medium text-green-700 hover:text-green-900"
                  >
                    View Report →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Download All Reports
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Share Progress Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
