'use client';

import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports.js';

// Configure Amplify on the client side
Amplify.configure(awsconfig);

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
