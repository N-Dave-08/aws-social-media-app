'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface ConfirmSignUpFormProps {
  formData: {
    email: string;
    code: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isPending: boolean;
}

export default function ConfirmSignUpForm({
  formData,
  onInputChange,
  onSubmit,
  onBack,
  isPending,
}: ConfirmSignUpFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Verify your email</h2>
        <p className="text-sm text-gray-600 mb-4">
          We sent a verification code to {formData.email}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Verification Code</Label>
        <Input
          id="code"
          type="text"
          placeholder="Enter verification code"
          value={formData.code}
          onChange={(e) => onInputChange('code', e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Verifying...' : 'Verify email'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="inline h-4 w-4 mr-1" />
          Back to sign up
        </button>
      </div>
    </form>
  );
}
