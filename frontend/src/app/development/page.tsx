import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Development Plan | Professional Development Platform',
  description: 'Track and manage your professional development goals and progress',
}

export default function DevelopmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Development Plan</h1>
          <p className="mt-2 text-gray-600">
            Track your progress and manage your professional development goals.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Development Plan */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Goals Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Goals</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">Improve Leadership Skills</h3>
                      <p className="text-sm text-gray-500">Due by Q2 2025</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      In Progress
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  + Add New Goal
                </button>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Overview</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-blue-600">Goals Set</div>
                    <div className="mt-1 text-2xl font-semibold text-blue-900">3</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-green-600">Completed</div>
                    <div className="mt-1 text-2xl font-semibold text-green-900">1</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-yellow-600">In Progress</div>
                    <div className="mt-1 text-2xl font-semibold text-yellow-900">2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <p className="text-sm text-blue-700">
                    Based on your MBTI results, consider focusing on developing your strategic thinking skills.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <p className="text-sm text-blue-700">
                    Your Enneagram type suggests you would excel in roles that involve mentoring others.
                  </p>
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
                  Schedule Review
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Export Development Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
