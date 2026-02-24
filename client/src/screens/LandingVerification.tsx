import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  MailCheck,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import bgImage from '@/assets/futuristic-bg.jpg';
import { Button } from '@/components/ui/button';
import AuthOverlay from '@/components/AuthOverlay';

export default function LandingOtpVerification() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const email = 'officer@dubaipolice.gov.ae';

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    return `${name[0]}${'•'.repeat(Math.max(name.length - 2, 3))}${name.slice(
      -1,
    )}@${domain}`;
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🔐 Future: Verify OTP API
    setTimeout(() => {
      setLoading(false);
      setLocation('/reset-password');
    }, 1000);
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

      {/* Right Panel */}
      <div className='w-full lg:w-[500px] xl:w-[600px] flex flex-col justify-center px-8 sm:px-12 md:px-20 z-10 bg-background/40 backdrop-blur-[24px] border-l border-white/5 shadow-2xl order-1 lg:order-2'>
        {/* Header */}
        <div className='mb-14'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-900 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]'>
              <ShieldCheck className='w-8 h-8 text-white' />
            </div>
          </div>

          <h1 className='text-4xl font-display font-bold tracking-tight text-white mb-3'>
            OTP Verification
          </h1>

          <p className='text-muted-foreground text-lg font-light'>
            Enter the 6-digit verification code sent to your official email.
          </p>
        </div>

        <div className='mb-10 '>
          <div className='flex items-center gap-3'>
            <MailCheck className='w-6 h-6 text-primary' />
            <h2 className='text-xl font-semibold text-white'>
              VERIFICATION OTP SEND TO
            </h2>
          </div>
          {/* <p className='text-[10px] uppercase tracking-widest text-muted-foreground mb-1'>
            Verification code sent to
          </p> */}
          <p className='text-base font-mono text-muted-foreground'>
            {maskEmail(email)}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleVerify} className='space-y-8 max-w-sm'>
          <div className='space-y-3 flex flex-col gap-1'>
            <Label
              htmlFor='otp'
              className='text-xs font-semibold tracking-widest text-white uppercase'
            >
              One Time Password
            </Label>

            <div className='relative group'>
              <Input
                id='otp'
                type='text'
                inputMode='numeric'
                maxLength={6}
                placeholder='••••••'
                className='tracking-[0.6em] text-center text-lg font-mono bg-secondary/20 border-white/10 h-14 transition-all group-hover:bg-secondary/30 focus:bg-secondary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl'
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
              <KeyRound className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50' />
            </div>
          </div>

          <Link href='/reset'>
            {' '}
            <Button type='submit' className='w-full h-12'>
              {loading ? 'Verifying...' : 'Verify OTP'}
              <ArrowRight className='ml-2 w-5 h-5' />
            </Button>
          </Link>

          <div className='flex justify-between items-center text-xs mt-6'>
            <button
              type='button'
              onClick={() => setLocation('/forgot-password')}
              className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              Change Email
            </button>

            <button
              type='button'
              className='text-primary hover:text-primary/80 transition-colors font-medium'
            >
              Resend OTP
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className='mt-10 pt-8 border-t border-white/5 flex justify-between items-center text-xs font-mono text-muted-foreground/40'>
          <span>SECURE VERIFICATION MODE</span>
          <span>ID: SYS-OTP-2026-DXB</span>
        </div>
      </div>
    </div>
  );
}
