'use client';

import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { Dashboard } from '@/components/dashboard/dashboard';

function HomePage() {
  return (
    <AuthWrapper>
      <Dashboard />
    </AuthWrapper>
  );
}

export default HomePage;
