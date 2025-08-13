# Custom Authentication System

This directory contains a completely custom authentication UI built with Amplify auth hooks and shadcn/ui components.

## Components

### `AuthForm.tsx`
The main authentication form component that handles:
- Sign In
- Sign Up
- Email verification
- Password reset
- Password reset confirmation

### `AuthWrapper.tsx`
A wrapper component that:
- Checks authentication status
- Shows the auth form when not authenticated
- Shows children (authenticated content) when authenticated

### `Dashboard.tsx`
A sample authenticated dashboard that shows:
- User information
- Sign out functionality
- Placeholder for app content

## Features

✅ **Custom UI**: Built entirely with shadcn/ui components  
✅ **Amplify Backend**: Uses Amplify's authentication services  
✅ **Responsive Design**: Mobile-friendly with Tailwind CSS  
✅ **Error Handling**: User-friendly error messages  
✅ **Loading States**: Shows loading indicators during operations  
✅ **Password Visibility**: Toggle password visibility  
✅ **Form Validation**: Client-side validation  
✅ **Accessibility**: Proper labels and ARIA attributes  

## Usage

### Basic Setup
```tsx
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { Dashboard } from '@/components/dashboard/dashboard';

function App() {
  return (
    <AuthWrapper>
      <Dashboard />
    </AuthWrapper>
  );
}
```

### Custom Authenticated Content
```tsx
import { AuthWrapper } from '@/components/auth/auth-wrapper';

function App() {
  return (
    <AuthWrapper>
      {/* Your authenticated app content goes here */}
      <YourAppComponent />
    </AuthWrapper>
  );
}
```

## Amplify Configuration

Make sure your Amplify backend is properly configured with:
- User Pool (Cognito)
- Identity Pool
- Proper authentication triggers

## Styling

The components use Tailwind CSS classes and can be easily customized by:
- Modifying the className props
- Updating the Tailwind config
- Adding custom CSS variables

## Icons

All icons are from Lucide React, following the project's icon standards.

## Dependencies

- `@aws-amplify/ui-react` - Amplify UI components and hooks
- `aws-amplify` - Amplify core functionality
- `@/components/ui/*` - shadcn/ui components
- `lucide-react` - Icons 