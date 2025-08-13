'use client';

import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';

function HomePage() {
  const { signOut, user } = useAuthenticator((context) => [context.user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome to your Social Media App!
        </h1>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600">
              Welcome, {user.username}
            </span>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
      <p className="text-gray-600">
        You are now authenticated and can access the app.
      </p>
      <p className="mt-4">social media app</p>
    </div>
  );
}

export default withAuthenticator(HomePage);
