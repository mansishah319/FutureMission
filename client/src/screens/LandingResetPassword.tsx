import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';
import bgImage from '@/assets/futuristic-bg.jpg';
import { Button } from '@/components/ui/button';
import AuthOverlay from '@/components/AuthOverlay';

export default function LandingResetPassword() {
  const [, setLocation] = useLocation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordsMatch = password.length >= 8 && password === confirmPassword;

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch) return;

    // 🔐 Future: Call reset password API here
    setSuccess(true);

    setTimeout(() => {
      setLocation('/login');
    }, 2000);
  };

  return (
    <div className='min-h-screen w-full flex bg-background text-foreground overflow-hidden relative'>
      {/* Background */}
      <div
        className='fixed inset-0 z-0'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className='fixed inset-0 z-0 bg-background/40 backdrop-blur-[2px]' />

      <AuthOverlay />

      {/* Panel */}
      <div className='w-full lg:w-[500px] xl:w-[600px] flex flex-col justify-center px-8 sm:px-12 md:px-20 z-10 bg-background/40 backdrop-blur-[24px] border-l border-white/5 shadow-2xl order-1 lg:order-2'>
        {/* Header */}
        <div className='mb-14'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-900 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]'>
              <ShieldCheck className='w-8 h-8 text-white' />
            </div>
          </div>

          <h1 className='text-4xl font-display font-bold tracking-tight text-white mb-3'>
            Create New Password
          </h1>

          <p className='text-muted-foreground text-lg font-light'>
            Choose a strong password to secure your account.
          </p>
        </div>

        {/* FORM */}
        {!success ? (
          <form onSubmit={handleReset} className='space-y-8 max-w-sm'>
            {/* New Password */}
            <div className='space-y-3 flex flex-col gap-1'>
              <Label
                htmlFor='password'
                className='text-xs font-semibold tracking-widest text-white uppercase'
              >
                New Password
              </Label>
              <div className='relative group'>
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••••••'
                  className='bg-secondary/20 border-white/10 pl-4 h-14 transition-all group-hover:bg-secondary/30 focus:bg-secondary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50' />
              </div>
            </div>

            {/* Confirm Password */}
            <div className='space-y-3 flex flex-col gap-1'>
              <Label
                htmlFor='confirmPassword'
                className='text-xs font-semibold tracking-widest text-white uppercase'
              >
                Confirm Password
              </Label>
              <div className='relative group'>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='••••••••••••'
                  className='bg-secondary/20 border-white/10 pl-4 h-14 transition-all group-hover:bg-secondary/30 focus:bg-secondary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Lock className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50' />
              </div>
            </div>

            {/* Hint */}
            <p className='text-[11px] text-muted-foreground/60 font-mono'>
              Password must be at least 8 characters long.
            </p>

            <Button
              type='submit'
              className='w-full h-12'
              disabled={!passwordsMatch}
            >
              Reset Password
              <ArrowRight className='ml-2 w-5 h-5' />
            </Button>
          </form>
        ) : (
          /* SUCCESS STATE */
          <div className='max-w-sm space-y-6'>
            <div className='flex items-center gap-3'>
              <CheckCircle2 className='w-6 h-6 text-primary' />
              <h2 className='text-xl font-semibold text-white'>
                Password Updated
              </h2>
            </div>

            <p className='text-muted-foreground text-sm'>
              Your password has been successfully reset. Redirecting to sign in…
            </p>
          </div>
        )}

        {/* Footer */}
        <div className='mt-10 pt-8 border-t border-white/5 flex justify-between items-center text-xs font-mono text-muted-foreground/40'>
          <span>SECURE PASSWORD MODE</span>
          <span>ID: SYS-RESET-2026-DXB</span>
        </div>
      </div>
    </div>
  );
}
