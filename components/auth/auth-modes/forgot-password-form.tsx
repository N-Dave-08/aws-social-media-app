'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  formData: {
    email: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isPending: boolean;
}

export default function ForgotPasswordForm({
  formData,
  onInputChange,
  onSubmit,
  onBack,
  isPending,
}: ForgotPasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Reset your password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email address and we'll send you a reset code
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="reset-email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Sending code...' : 'Send reset code'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="inline h-4 w-4 mr-1" />
          Back to sign in
        </button>
      </div>
    </form>
  );
}
