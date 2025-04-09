'use client'

import { useUser, SignOutButton } from "@clerk/nextjs";
import { ReviewInputForm } from "@/components/reviews/ReviewInputForm"; // Import the form

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.firstName || 'User'}!</h1>
            <p className="text-gray-600 mt-2">Track your professional development journey</p>
          </div>
          <SignOutButton>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500">
              Sign Out
            </button>
          </SignOutButton>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Assessment Status Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessments</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Big Five (OCEAN)</span>
                <span className="text-blue-600">Not Started</span> {/* TODO: Fetch actual status */}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Holland Code (RIASEC)</span>
                <span className="text-blue-600">Not Started</span> {/* TODO: Fetch actual status */}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">DiSC</span>
                <span className="text-blue-600">Not Started</span> {/* TODO: Fetch actual status */}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">TalentSmartEQ EI</span>
                <span className="text-blue-600">Not Started</span> {/* TODO: Fetch actual status */}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Career Values Scale</span>
                <span className="text-blue-600">Not Started</span> {/* TODO: Fetch actual status */}
              </div>
              {/* Optional: 16PF can be added here if logic allows */}
            </div>
            <a
              href="/assessments"
              className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-500"
            >
              Start Assessments →
            </a>
          </div>

          {/* Development Plan Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Development Plan</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="text-gray-900">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
            <a
              href="/development"
              className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-500"
            >
              View Development Plan →
            </a>
          </div>

          {/* Coaching Sessions Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Coaching Sessions</h2>
            <p className="text-gray-600 mb-4">No upcoming sessions scheduled</p>
            <a
              href="/coaching"
              className="inline-block text-sm text-blue-600 hover:text-blue-500"
            >
              Schedule a Session →
            </a>
          </div>

          {/* Quarterly Review Input Card */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2 lg:col-span-1"> {/* Adjust span as needed */}
            <ReviewInputForm />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/assessments"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50"
            >
              <span className="text-gray-900">Take Assessment</span>
            </a>
            <a
              href="/development"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50"
            >
              <span className="text-gray-900">Update Goals</span>
            </a>
            <a
              href="/coaching"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50"
            >
              <span className="text-gray-900">Book Coaching</span>
            </a>
            <a
              href="/reports"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50"
            >
              <span className="text-gray-900">View Reports</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
