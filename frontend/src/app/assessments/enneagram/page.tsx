import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enneagram Assessment Input | Professional Development Platform',
  description: 'Input your Enneagram assessment results',
}

export default function EnneagramInputPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Enneagram Assessment Results</h1>
          <p className="mt-2 text-gray-600">
            Input your Enneagram assessment results below. Don&apos;t have your results yet?{' '}
            <a 
              href="https://www.enneagraminstitute.com" 
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
            {/* Primary Type */}
            <div>
              <label htmlFor="primaryType" className="block text-sm font-medium text-gray-700">
                Primary Enneagram Type
              </label>
              <select
                id="primaryType"
                name="primaryType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
              >
                <option value="">Select your type</option>
                {[
                  '1 - The Reformer',
                  '2 - The Helper',
                  '3 - The Achiever',
                  '4 - The Individualist',
                  '5 - The Investigator',
                  '6 - The Loyalist',
                  '7 - The Enthusiast',
                  '8 - The Challenger',
                  '9 - The Peacemaker'
                ].map((type) => (
                  <option key={type} value={type.split(' ')[0]}>{type}</option>
                ))}
              </select>
            </div>

            {/* Wing */}
            <div>
              <label htmlFor="wing" className="block text-sm font-medium text-gray-700">
                Wing
              </label>
              <select
                id="wing"
                name="wing"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
              >
                <option value="">Select your wing</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>Type {num}</option>
                ))}
              </select>
            </div>

            {/* Instinctual Variant */}
            <div>
              <label htmlFor="instinctualVariant" className="block text-sm font-medium text-gray-700">
                Instinctual Variant
              </label>
              <div className="mt-1 space-y-4">
                {[
                  { id: 'sp', label: 'Self-Preservation (SP)' },
                  { id: 'sx', label: 'Sexual/One-to-One (SX)' },
                  { id: 'so', label: 'Social (SO)' }
                ].map((variant) => (
                  <div key={variant.id} className="flex items-center">
                    <select
                      id={`${variant.id}Strength`}
                      name={`${variant.id}Strength`}
                      className="block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                    >
                      <option value="">Rank</option>
                      <option value="1">First</option>
                      <option value="2">Second</option>
                      <option value="3">Third</option>
                    </select>
                    <label htmlFor={`${variant.id}Strength`} className="ml-3 text-sm text-gray-700">
                      {variant.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tritype */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tritype
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="headType" className="block text-xs text-gray-500 mb-1">
                    Head Type (5,6,7)
                  </label>
                  <select
                    id="headType"
                    name="headType"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                  >
                    <option value="">Select</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="heartType" className="block text-xs text-gray-500 mb-1">
                    Heart Type (2,3,4)
                  </label>
                  <select
                    id="heartType"
                    name="heartType"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                  >
                    <option value="">Select</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="gutType" className="block text-xs text-gray-500 mb-1">
                    Gut Type (1,8,9)
                  </label>
                  <select
                    id="gutType"
                    name="gutType"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </div>
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
                  placeholder="Share any additional insights or reflections about your Enneagram results..."
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
          <h2 className="text-lg font-semibold text-blue-900 mb-2">About Enneagram Assessment</h2>
          <p className="text-blue-700 mb-4">
            The Enneagram is a powerful tool for personal and professional development that helps you understand:
          </p>
          <ul className="list-disc list-inside text-blue-700 space-y-2">
            <li>Your core motivations and fears</li>
            <li>How you relate to others and handle stress</li>
            <li>Your natural strengths and potential growth areas</li>
            <li>Your instinctual variants and how they influence your behavior</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
