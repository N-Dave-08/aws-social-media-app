'use client';

import { useState, Suspense, lazy } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  signIn,
  signUp,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
} from 'aws-amplify/auth';
import { Alert } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

// Lazy load auth mode components
const SignInForm = lazy(() => import('./auth-modes/sign-in-form'));
const SignUpForm = lazy(() => import('./auth-modes/sign-up-form'));
const ConfirmSignUpForm = lazy(
  () => import('./auth-modes/confirm-sign-up-form')
);
const ForgotPasswordForm = lazy(
  () => import('./auth-modes/forgot-password-form')
);
const ConfirmResetPasswordForm = lazy(
  () => import('./auth-modes/confirm-reset-password-form')
);

type AuthMode =
  | 'signIn'
  | 'signUp'
  | 'forgotPassword'
  | 'confirmSignUp'
  | 'confirmResetPassword';

export function AuthForm() {
  const [authMode, setAuthMode] = useState<AuthMode>('signIn');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { isPending } = useAuthenticator();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await signIn({ username: formData.email, password: formData.password });
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
          },
        },
      });
      setAuthMode('confirmSignUp');
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: formData.code,
      });
      setAuthMode('signIn');
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
      });
    } catch (error) {
      console.error('Confirmation error:', error);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ username: formData.email });
      setAuthMode('confirmResetPassword');
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  const handleConfirmResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await confirmResetPassword({
        username: formData.email,
        confirmationCode: formData.code,
        newPassword: formData.password,
      });
      setAuthMode('signIn');
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
      });
    } catch (error) {
      console.error('Confirm reset password error:', error);
    }
  };

  const renderContent = () => {
    const commonProps = {
      formData,
      onInputChange: handleInputChange,
      onSubmit: null,
      onBack: () => setAuthMode('signIn'),
      isPending,
      showPassword: false,
      setShowPassword: () => {},
      showConfirmPassword: false,
      setShowConfirmPassword: () => {},
    };

    switch (authMode) {
      case 'signIn':
        return (
          <Suspense
            fallback={
              <div className="text-center py-8">Loading sign in form...</div>
            }
          >
            <SignInForm
              {...commonProps}
              onSubmit={handleSignIn}
              onForgotPassword={() => setAuthMode('forgotPassword')}
              onSignUp={() => setAuthMode('signUp')}
            />
          </Suspense>
        );
      case 'signUp':
        return (
          <Suspense
            fallback={
              <div className="text-center py-8">Loading sign up form...</div>
            }
          >
            <SignUpForm
              {...commonProps}
              onSubmit={handleSignUp}
              onSignIn={() => setAuthMode('signIn')}
            />
          </Suspense>
        );
      case 'confirmSignUp':
        return (
          <Suspense
            fallback={
              <div className="text-center py-8">
                Loading confirmation form...
              </div>
            }
          >
            <ConfirmSignUpForm
              {...commonProps}
              onSubmit={handleConfirmSignUp}
              onBack={() => setAuthMode('signUp')}
            />
          </Suspense>
        );
      case 'forgotPassword':
        return (
          <Suspense
            fallback={
              <div className="text-center py-8">
                Loading forgot password form...
              </div>
            }
          >
            <ForgotPasswordForm
              {...commonProps}
              onSubmit={handleForgotPassword}
              onBack={() => setAuthMode('signIn')}
            />
          </Suspense>
        );
      default:
        return (
          <Suspense
            fallback={
              <div className="text-center py-8">
                Loading reset password form...
              </div>
            }
          >
            <ConfirmResetPasswordForm
              {...commonProps}
              onSubmit={handleConfirmResetPassword}
              onBack={() => setAuthMode('forgotPassword')}
            />
          </Suspense>
        );
    }
  };

  const getTitle = () => {
    switch (authMode) {
      case 'signIn':
        return 'Welcome back';
      case 'signUp':
        return 'Create account';
      case 'confirmSignUp':
        return 'Verify email';
      case 'forgotPassword':
        return 'Reset password';
      default:
        return 'Create new password';
    }
  };

  const getDescription = () => {
    switch (authMode) {
      case 'signIn':
        return 'Sign in to your account';
      case 'signUp':
        return 'Get started with your free account';
      case 'confirmSignUp':
        return 'Check your email for the verification code';
      case 'forgotPassword':
        return "We'll help you get back into your account";
      case 'confirmResetPassword':
        return 'Enter your new password below';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{getTitle()}</h1>
          <p className="mt-2 text-sm">{getDescription()}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{getTitle()}</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="mb-4">
              {success}
            </Alert>
          )}
          <CardContent>{renderContent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
