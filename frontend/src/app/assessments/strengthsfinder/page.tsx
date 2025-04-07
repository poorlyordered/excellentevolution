import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StrengthsFinder Assessment Input | Professional Development Platform',
  description: 'Input your StrengthsFinder assessment results',
}

export default function StrengthsFinderInputPage() {
  // All 34 CliftonStrengths themes
  const allStrengths = [
    'Achiever', 'Activator', 'Adaptability', 'Analytical', 'Arranger',
    'Belief', 'Command', 'Communication', 'Competition', 'Connectedness',
    'Consistency', 'Context', 'Deliberative', 'Developer', 'Discipline',
    'Empathy', 'Focus', 'Futuristic', 'Harmony', 'Ideation',
    'Includer', 'Individualization', 'Input', 'Intellection', 'Learner',
    'Maximizer', 'Positivity', 'Relator', 'Responsibility', 'Restorative',
    'Self-Assurance', 'Significance', 'Strategic', 'Woo'
  ].sort()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">StrengthsFinder Results</h1>
          <p className="mt-2 text-gray-600">
            Input your CliftonStrengths (formerly StrengthsFinder) assessment results below. Don&apos;t have your results yet?{' '}
            <a 
              href="https://www.gallup.com/cliftonstrengths/en/home.aspx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Take the assessment here
            </a>
          </p>
        </div>

        <form className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Top 5 Strengths */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Your Top 5 Strengths
              </label>
              {[1, 2, 3, 4, 5].map((position) => (
                <div key={position} className="mb-4">
                  <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {position}
                    </span>
                    <div className="ml-4 flex-grow">
                      <select
                        id={`strength${position}`}
                        name={`strength${position}`}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                      >
                        <option value="">Select strength</option>
                        {allStrengths.map((strength) => (
                          <option key={strength} value={strength}>{strength}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 ml-12">
                    <label htmlFor={`strength${position}Description`} className="block text-xs text-gray-500 mb-1">
                      How this strength manifests in your work (Optional)
                    </label>
                    <textarea
                      id={`strength${position}Description`}
                      name={`strength${position}Description`}
                      rows={2}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe how you use this strength..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Domain Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dominant Domains
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Based on your top 5 strengths, which domains are most prevalent?
              </p>
              <div className="space-y-4">
                {[
                  { id: 'strategic', label: 'Strategic Thinking', desc: 'Absorbing and analyzing information' },
                  { id: 'executing', label: 'Executing', desc: 'Getting things done' },
                  { id: 'influencing', label: 'Influencing', desc: 'Taking charge and speaking up' },
                  { id: 'relationship', label: 'Relationship Building', desc: 'Building strong relationships' }
                ].map((domain) => (
                  <div key={domain.id} className="flex items-center">
                    <select
                      id={`${domain.id}Strength`}
                      name={`${domain.id}Strength`}
                      className="block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                    >
                      <option value="">Rank</option>
                      <option value="1">First</option>
                      <option value="2">Second</option>
                      <option value="3">Third</option>
                      <option value="4">Fourth</option>
                    </select>
                    <div className="ml-3">
                      <label htmlFor={`${domain.id}Strength`} className="block text-sm font-medium text-gray-700">
                        {domain.label}
                      </label>
                      <p className="text-xs text-gray-500">{domain.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Insights */}
            <div>
              <label htmlFor="insights" className="block text-sm font-medium text-gray-700">
                Additional Insights (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  id="insights"
                  name="insights"
                  rows={4}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Share any additional insights or reflections about your StrengthsFinder results..."
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Results
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">About CliftonStrengths Assessment</h2>
          <p className="text-blue-700 mb-4">
            The CliftonStrengths assessment helps you discover and develop your natural talents into strengths. Understanding your strengths helps you:
          </p>
          <ul className="list-disc list-inside text-blue-700 space-y-2">
            <li>Identify your natural patterns of thinking, feeling, and behaving</li>
            <li>Develop strategies to apply your strengths in your work</li>
            <li>Understand how your strengths complement team dynamics</li>
            <li>Build more effective relationships and achieve better outcomes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
