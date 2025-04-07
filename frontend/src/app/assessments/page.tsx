import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assessments | Professional Development Platform',
  description: 'Take personality and professional assessments to understand your strengths and growth areas',
}

export default function AssessmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
          <p className="mt-2 text-gray-600">
            Complete these assessments to receive personalized insights and development recommendations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Big Five (OCEAN) */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Big Five (OCEAN)</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  10-15 min
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Measure your core personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="https://www.truity.com/test/big-five-personality-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Take Assessment
                </a>
                <a
                  href="/assessments/bigfive"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Input Results
                </a>
              </div>
            </div>
            <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Status: Not Started
              </div>
            </div>
          </div>

          {/* 16PF (optional) */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">16PF (optional)</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  25-30 min
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Explore 16 primary personality factors to gain deeper insights into your behavior and preferences.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="https://www.16personalities.com/free-personality-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Take Assessment
                </a>
                <a
                  href="/assessments/16pf"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Input Results
                </a>
              </div>
            </div>
            <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Status: Not Started
              </div>
            </div>
          </div>

          {/* Holland Code (RIASEC) */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Holland Code (RIASEC)</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  10-15 min
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Identify your career interests across six categories: Realistic, Investigative, Artistic, Social, Enterprising, Conventional.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="https://www.truity.com/test/holland-code-career-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Take Assessment
                </a>
                <a
                  href="/assessments/holland"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Input Results
                </a>
              </div>
            </div>
            <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Status: Not Started
              </div>
            </div>
          </div>

          {/* DiSC */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">DiSC</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  15-20 min
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Understand your workplace behavior style: Dominance, Influence, Steadiness, Conscientiousness.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="https://www.truity.com/test/disc-personality-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Take Assessment
                </a>
                <a
                  href="/assessments/disc"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Input Results
                </a>
              </div>
            </div>
            <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Status: Not Started
              </div>
            </div>
          </div>

          {/* TalentSmartEQ EI Appraisal */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">TalentSmartEQ EI Appraisal</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  10-15 min
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Assess your emotional intelligence skills to improve self-awareness, self-management, social awareness, and relationship management.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="https://www.talentsmarteq.com/test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Take Assessment
                </a>
                <a
                  href="/assessments/eq"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Input Results
                </a>
              </div>
            </div>
            <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Status: Not Started
              </div>
            </div>
          </div>

          {/* Career Values Scale */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Career Values Scale</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  10-15 min
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Clarify what you value most in your career to guide your professional decisions and satisfaction.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="https://www.truity.com/test/career-values-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Take Assessment
                </a>
                <a
                  href="/assessments/values"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Input Results
                </a>
              </div>
            </div>
            <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Status: Not Started
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">How to Complete Your Assessments</h2>
          <div className="text-blue-700 space-y-4">
            <p>
              Follow these steps to complete each assessment:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Click the &quot;Take Assessment&quot; button to visit the official assessment provider</li>
              <li>Complete the assessment on their platform (you may need to create an account or purchase the assessment)</li>
              <li>Once you have your results, return here and click &quot;Input Results&quot; to record them in our system</li>
              <li>Fill out the detailed form to help us understand your results and provide personalized insights</li>
            </ol>
            <p className="mt-4">
              Your combined assessment results will create a comprehensive view of your personality,
              motivations, and strengths. We&apos;ll use this information to provide personalized development
              recommendations and career insights tailored specifically to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
