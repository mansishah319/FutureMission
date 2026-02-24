import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, ArrowLeft, MailCheck } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import bgImage from '@/assets/futuristic-bg.jpg';
import { Button } from '@/components/ui/button';
import AuthOverlay from '@/components/AuthOverlay';

export default function LandingForgotPassword() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔒 Future: call forgot-password API here
    setSubmitted(true);
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
        <div className='mb-14'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-900 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]'>
              <ShieldCheck className='w-8 h-8 text-white' />
            </div>
          </div>

          <h1 className='text-4xl font-display font-bold tracking-tight text-white mb-3'>
            Reset Access
          </h1>

          <p className='text-muted-foreground text-lg font-light'>
            Enter your official email to receive a secure password reset code.
          </p>
        </div>

        <form onSubmit={handleReset} className='space-y-8 max-w-sm'>
          <div className='space-y-3 flex flex-col gap-1'>
            <Label
              htmlFor='email'
              className='text-xs font-semibold tracking-widest text-white uppercase '
            >
              Official Email
            </Label>

            <Input
              id='email'
              type='email'
              placeholder='officer@dubaipolice.gov.ae'
              className='bg-secondary/20 border-white/10 pl-4 h-14 text-base transition-all hover:bg-secondary/30 focus:bg-secondary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Link href='/verify'>
            <Button className='w-full h-12'>Send Reset Code</Button>
          </Link>

          <button
            type='button'
            onClick={() => setLocation('/login')}
            className='flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mt-6'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Sign In
          </button>
        </form>

        {/* <div className='max-w-sm space-y-6'>
          <div className='flex items-center gap-3'>
            <MailCheck className='w-6 h-6 text-primary' />
            <h2 className='text-xl font-semibold text-white'>
              Reset Link Sent
            </h2>
          </div>

          <p className='text-muted-foreground text-sm'>
            If an account exists for <span className='text-white'>{email}</span>
            , a secure password reset link has been sent.
          </p>

          <Button
            variant='secondary'
            className='w-full'
            onClick={() => setLocation('/login')}
          >
            Return to Sign In
          </Button>
        </div> */}

        {/* FOOTER */}
        <div className='mt-10 pt-8 border-t border-white/5 flex justify-between items-center text-xs font-mono text-muted-foreground/40'>
          <span>SECURE RECOVERY MODE</span>
          <span>ID: SYS-RESET-2026-DXB</span>
        </div>
      </div>
    </div>
  );
}
