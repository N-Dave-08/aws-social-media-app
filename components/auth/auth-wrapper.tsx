'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { AuthForm } from './auth-form';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { authStatus } = useAuthenticator();

  // Show auth form if not authenticated
  if (authStatus !== 'authenticated') {
    return <AuthForm />;
  }

  // Show children (authenticated content) if authenticated
  return <>{children}</>;
}
