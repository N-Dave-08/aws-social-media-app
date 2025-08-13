'use client';

import { withAuthenticator } from '@aws-amplify/ui-react';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to your Social Media App!
      </h1>
      <p className="text-gray-600">
        You are now authenticated and can access the app.
      </p>
      {/* Your app content */}
    </div>
  );
}

export default withAuthenticator(HomePage);
