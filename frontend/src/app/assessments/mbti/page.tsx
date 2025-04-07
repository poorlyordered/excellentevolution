'use client'

import React from 'react'

export default function MBTIInputPage() {
  type MBTIType = 'INTP' | 'ENTP' | 'ISFJ' | 'ESFJ' | 'INFJ' | 'ENFJ' | 'ISTP' | 'ESTP' |
                  'INFP' | 'ENFP' | 'ISTJ' | 'ESTJ' | 'INTJ' | 'ENTJ' | 'ISFP' | 'ESFP';

  type CognitiveFunctions = {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
  };

  const [selectedType, setSelectedType] = React.useState<MBTIType | ''>('');

  // Cognitive functions mapping for each MBTI type
  const cognitiveMapping: Record<MBTIType, CognitiveFunctions> = {
    'INTP': { dominant: 'Ti', auxiliary: 'Ne', tertiary: 'Si', inferior: 'Fe' },
    'ENTP': { dominant: 'Ne', auxiliary: 'Ti', tertiary: 'Fe', inferior: 'Si' },
    'ISFJ': { dominant: 'Si', auxiliary: 'Fe', tertiary: 'Ti', inferior: 'Ne' },
    'ESFJ': { dominant: 'Fe', auxiliary: 'Si', tertiary: 'Ne', inferior: 'Ti' },
    'INFJ': { dominant: 'Ni', auxiliary: 'Fe', tertiary: 'Ti', inferior: 'Se' },
    'ENFJ': { dominant: 'Fe', auxiliary: 'Ni', tertiary: 'Se', inferior: 'Ti' },
    'ISTP': { dominant: 'Ti', auxiliary: 'Se', tertiary: 'Ni', inferior: 'Fe' },
    'ESTP': { dominant: 'Se', auxiliary: 'Ti', tertiary: 'Fe', inferior: 'Ni' },
    'INFP': { dominant: 'Fi', auxiliary: 'Ne', tertiary: 'Si', inferior: 'Te' },
    'ENFP': { dominant: 'Ne', auxiliary: 'Fi', tertiary: 'Te', inferior: 'Si' },
    'ISTJ': { dominant: 'Si', auxiliary: 'Te', tertiary: 'Fi', inferior: 'Ne' },
    'ESTJ': { dominant: 'Te', auxiliary: 'Si', tertiary: 'Ne', inferior: 'Fi' },
    'INTJ': { dominant: 'Ni', auxiliary: 'Te', tertiary: 'Fi', inferior: 'Se' },
    'ENTJ': { dominant: 'Te', auxiliary: 'Ni', tertiary: 'Se', inferior: 'Fi' },
    'ISFP': { dominant: 'Fi', auxiliary: 'Se', tertiary: 'Ni', inferior: 'Te' },
    'ESFP': { dominant: 'Se', auxiliary: 'Fi', tertiary: 'Te', inferior: 'Ni' }
  };

  // Handle type selection
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as MBTIType | '';
    setSelectedType(type);
    const form = e.target.form;
    if (!form) return;

    if (type) {
      // Extract E/I preference
      const energySource = type[0] === 'E' ? 'E' : 'I';
      form.energySource.value = energySource;
      form.energyStrength.value = energySource === 'E' ? '5' : '4';

      // Extract S/N preference
      const informationGathering = type[1] === 'S' ? 'S' : 'N';
      form.informationGathering.value = informationGathering;
      form.informationStrength.value = informationGathering === type[1] ? '5' : '3';

      // Extract T/F preference
      const decisionMaking = type[2] === 'T' ? 'T' : 'F';
      form.decisionMaking.value = decisionMaking;
      form.decisionStrength.value = decisionMaking === type[2] ? '5' : '3';

      // Extract J/P preference
      const lifestyle = type[3] === 'J' ? 'J' : 'P';
      form.lifestyle.value = lifestyle;
      form.lifestyleStrength.value = lifestyle === type[3] ? '5' : '3';
    } else {
      // Clear all fields if no type is selected
      form.energySource.value = '';
      form.energyStrength.value = '';
      form.informationGathering.value = '';
      form.informationStrength.value = '';
      form.decisionMaking.value = '';
      form.decisionStrength.value = '';
      form.lifestyle.value = '';
      form.lifestyleStrength.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">MBTI Assessment Results</h1>
          <p className="mt-2 text-gray-600">
            Input your MBTI (Myers-Briggs Type Indicator®) assessment results below. Don&apos;t have your results yet?{' '}
            <a 
              href="https://www.16personalities.com" 
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
                Your MBTI Type
              </label>
              <select
                id="primaryType"
                name="primaryType"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                onChange={handleTypeChange}
                value={selectedType}
              >
                <option value="">Select your type</option>
                {[
                  'INTJ', 'INTP', 'ENTJ', 'ENTP',
                  'INFJ', 'INFP', 'ENFJ', 'ENFP',
                  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
                  'ISTP', 'ISFP', 'ESTP', 'ESFP'
                ].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Energy Source */}
            <div>
              <label htmlFor="energySource" className="block text-sm font-medium text-gray-700">
                Energy Source Preference
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <select
                  id="energySource"
                  name="energySource"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Select preference</option>
                  <option value="E">Extraversion (E)</option>
                  <option value="I">Introversion (I)</option>
                </select>
                <select
                  id="energyStrength"
                  name="energyStrength"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Strength</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num} - {num === 1 ? 'Mild' : num === 5 ? 'Strong' : 'Moderate'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Information Gathering */}
            <div>
              <label htmlFor="informationGathering" className="block text-sm font-medium text-gray-700">
                Information Gathering Preference
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <select
                  id="informationGathering"
                  name="informationGathering"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Select preference</option>
                  <option value="S">Sensing (S)</option>
                  <option value="N">Intuition (N)</option>
                </select>
                <select
                  id="informationStrength"
                  name="informationStrength"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Strength</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num} - {num === 1 ? 'Mild' : num === 5 ? 'Strong' : 'Moderate'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Decision Making */}
            <div>
              <label htmlFor="decisionMaking" className="block text-sm font-medium text-gray-700">
                Decision Making Preference
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <select
                  id="decisionMaking"
                  name="decisionMaking"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Select preference</option>
                  <option value="T">Thinking (T)</option>
                  <option value="F">Feeling (F)</option>
                </select>
                <select
                  id="decisionStrength"
                  name="decisionStrength"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Strength</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num} - {num === 1 ? 'Mild' : num === 5 ? 'Strong' : 'Moderate'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lifestyle */}
            <div>
              <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700">
                Lifestyle Preference
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <select
                  id="lifestyle"
                  name="lifestyle"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Select preference</option>
                  <option value="J">Judging (J)</option>
                  <option value="P">Perceiving (P)</option>
                </select>
                <select
                  id="lifestyleStrength"
                  name="lifestyleStrength"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
                >
                  <option value="">Strength</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num} - {num === 1 ? 'Mild' : num === 5 ? 'Strong' : 'Moderate'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cognitive Functions */}
            {selectedType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cognitive Functions
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Dominant Function</div>
                    <div className="text-base text-gray-900 font-medium">
                      {cognitiveMapping[selectedType].dominant}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Auxiliary Function</div>
                    <div className="text-base text-gray-900 font-medium">
                      {cognitiveMapping[selectedType].auxiliary}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Tertiary Function</div>
                    <div className="text-base text-gray-900 font-medium">
                      {cognitiveMapping[selectedType].tertiary}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Inferior Function</div>
                    <div className="text-base text-gray-900 font-medium">
                      {cognitiveMapping[selectedType].inferior}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                  placeholder="Share any additional insights or reflections about your MBTI results..."
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
          <h2 className="text-lg font-semibold text-blue-900 mb-2">About MBTI Assessment</h2>
          <p className="text-blue-700 mb-4">
            The Myers-Briggs Type Indicator® (MBTI®) is a personality assessment that helps you identify your natural preferences in four areas:
          </p>
          <ul className="list-disc list-inside text-blue-700 space-y-2">
            <li>How you focus your attention and get energy (Extraversion or Introversion)</li>
            <li>How you take in information (Sensing or Intuition)</li>
            <li>How you make decisions (Thinking or Feeling)</li>
            <li>How you organize your life (Judging or Perceiving)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
