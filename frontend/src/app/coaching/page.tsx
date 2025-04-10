import { Metadata } from 'next'
import { ReviewInputForm } from "@/components/reviews/ReviewInputForm";

export const metadata: Metadata = {
  title: 'Growth Center | Professional Development Platform',
  description: 'Access self-serve professional development tools, AI-powered planning, and progress tracking.',
}

export default function GrowthCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Growth Center</h1>
          <p className="mt-2 text-gray-600">
            Unlock your next step with self-serve assessments, AI-driven planning, and gamified progress tracking. No coaches required—your growth, your way.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Your Development Plan */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Development Plan</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">AI-Powered Plan</h3>
                      <p className="text-sm text-gray-500">Personalized by your assessment results and goals</p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      Refine with AI
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  + Start New Plan
                </button>
              </div>
            </div>

            {/* Progress & Check-Ins */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress & Check-Ins</h2>
              <div className="space-y-4">
                <ReviewInputForm />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Self-Serve Resources */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Self-Serve Resources</h2>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <h3 className="font-medium text-gray-900">Assessment Hub</h3>
                  <p className="text-sm text-gray-500">Complete validated assessments and view your results</p>
                </a>
                <a
                  href="#"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <h3 className="font-medium text-gray-900">AI Recommendations</h3>
                  <p className="text-sm text-gray-500">Get personalized suggestions for your career growth</p>
                </a>
                <a
                  href="#"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <h3 className="font-medium text-gray-900">Goal Setting Templates</h3>
                  <p className="text-sm text-gray-500">Use proven frameworks to set and achieve your goals</p>
                </a>
                <a
                  href="#"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <h3 className="font-medium text-gray-900">Development Exercises</h3>
                  <p className="text-sm text-gray-500">Practice activities for building new skills</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
