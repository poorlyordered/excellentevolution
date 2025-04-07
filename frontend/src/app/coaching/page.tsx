import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coaching | Professional Development Platform',
  description: 'Schedule and manage your professional coaching sessions',
}

export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Coaching Center</h1>
          <p className="mt-2 text-gray-600">
            Schedule coaching sessions and access professional development resources.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Sessions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">Career Strategy Session</h3>
                      <p className="text-sm text-gray-500">Thursday, February 15, 2025</p>
                      <p className="text-sm text-gray-500">2:00 PM - 3:00 PM CST</p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  + Schedule New Session
                </button>
              </div>
            </div>

            {/* Session History */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Session History</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">Initial Assessment Review</h3>
                      <p className="text-sm text-gray-500">January 10, 2025</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Reviewed MBTI and Enneagram results, discussed career goals
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coach Profile */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Coach</h2>
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900">Sarah Johnson</h3>
                <p className="text-sm text-gray-500">Professional Development Coach</p>
                <p className="mt-2 text-sm text-gray-600">
                  15+ years experience in career development and leadership coaching
                </p>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Coaching Resources</h2>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <h3 className="font-medium text-gray-900">Session Preparation Guide</h3>
                  <p className="text-sm text-gray-500">Tips for making the most of your sessions</p>
                </a>
                <a
                  href="#"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <h3 className="font-medium text-gray-900">Goal Setting Framework</h3>
                  <p className="text-sm text-gray-500">Templates and examples for effective goals</p>
                </a>
                <a
                  href="#"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <h3 className="font-medium text-gray-900">Development Exercises</h3>
                  <p className="text-sm text-gray-500">Practice activities for skill building</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
