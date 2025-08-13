'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';

interface ConfirmResetPasswordFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    code: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isPending: boolean;
}

export default function ConfirmResetPasswordForm({
  formData,
  onInputChange,
  onSubmit,
  onBack,
  isPending,
}: ConfirmResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Create new password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter the code we sent to {formData.email} and your new password
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reset-code">Reset Code</Label>
        <Input
          id="reset-code"
          type="text"
          placeholder="Enter reset code"
          value={formData.code}
          onChange={(e) => onInputChange('code', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="new-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            value={formData.password}
            onChange={(e) => onInputChange('password', e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-new-password">Confirm New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirm-new-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Resetting password...' : 'Reset password'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="inline h-4 w-4 mr-1" />
          Back to forgot password
        </button>
      </div>
    </form>
  );
}
