'use client';
import { useUser, useStackApp, UserButton } from "@stackframe/stack";

export default function ProfilePage() {
  const user = useUser();
  const app = useStackApp();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <UserButton />
              <div>
                <p className="font-semibold">{user.displayName ?? "unnamed user"}</p>
                <p className="text-gray-600 text-sm">{user.primaryEmail}</p>
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => user.signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p>You are not logged in</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => app.redirectToSignIn()}
            >
              Sign in
            </button>
            <button
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              onClick={() => app.redirectToSignUp()}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
