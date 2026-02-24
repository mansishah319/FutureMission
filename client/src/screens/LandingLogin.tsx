import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import bgImage from '@/assets/futuristic-bg.jpg';
import { Button } from '@/components/ui/button';
import AuthOverlay from '@/components/AuthOverlay';

export default function LandingLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      setLocation('/admin/game-requests');
    } else if (
      email.includes('fd') ||
      email.includes('designer') ||
      email.includes('retreat')
    ) {
      setLocation('/fd/dashboard');
    } else if (email.includes('gm') || email.includes('game')) {
      setLocation('/gm/dashboard');
    } else if (email.includes('officer') || email.includes('player')) {
      setLocation('/player/dashboard');
    } else {
      setLocation('/dashboard');
    }
  };

  return (
    <div className='min-h-screen w-full flex bg-background text-foreground overflow-hidden relative'>
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

      <div className='w-full lg:w-[500px] xl:w-[600px] flex flex-col justify-center px-8 sm:px-12 md:px-20 z-10 bg-background/40 backdrop-blur-[24px] border-l border-white/5 shadow-2xl order-1 lg:order-2'>
        <div className='mb-16'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-900 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]'>
              <ShieldCheck className='w-8 h-8 text-white' />
            </div>
          </div>
          <h1 className='text-4xl font-display font-bold tracking-tight text-white mb-3'>
            Welcome Back
          </h1>
          <p className='text-muted-foreground text-lg font-light '>
            Enter your credentials to access the Strategic Foresight Platform.
          </p>
        </div>

        <form onSubmit={handleLogin} className='space-y-8 max-w-sm'>
          <div className='space-y-3 flex flex-col gap-1'>
            <Label
              htmlFor='email'
              className='text-xs font-semibold tracking-widest text-white uppercase'
            >
              Official Email
            </Label>
            <div className='relative group'>
              <Input
                id='email'
                type='email'
                placeholder='officer@dubaipolice.gov.ae'
                className='bg-secondary/20 border-white/10 pl-4 h-14 text-base transition-all group-hover:bg-secondary/30 focus:bg-secondary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <p className='text-[10px] text-muted-foreground/40 font-mono pl-1'>
              ADMIN: "admin@sfd.ae" | GM: "gm@sfd.ae" | PLAYER:
              "officer@dubaipolice.gov.ae"
            </p> */}
          </div>

          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <Label
                htmlFor='password'
                className='text-xs font-semibold tracking-widest text-white uppercase'
              >
                Password
              </Label>
              <Link
                href='/forgot'
                className='text-xs text-primary hover:text-primary/80 transition-colors font-medium'
              >
                Forgot Password?
              </Link>
            </div>
            <div className='relative group'>
              <Input
                id='password'
                type='password'
                placeholder='••••••••••••'
                className='bg-secondary/20 border-white/10 pl-4 h-14 text-base transition-all group-hover:bg-secondary/30 focus:bg-secondary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl'
              />
              <Lock className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50' />
            </div>
          </div>

          <Button type='submit' className='w-full h-12'>
            Sign In <ArrowRight className='ml-2 w-5 h-5' />
          </Button>
          <p className='text-[10px] text-muted-foreground/40 font-mono pl-1'>
            ADMIN: "admin@sfd.ae" | GM: "gm@sfd.ae" <br />
            FUTURE DESIGNER: "fd@sfd.ae" | PLAYER: "officer@dubaipolice.gov.ae"
          </p>
        </form>

        <div className='mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-xs font-mono text-muted-foreground/40'>
          <span>SECURE CONNECTION</span>
          <span>ID: SYS-2026-DXB</span>
        </div>
      </div>
    </div>
  );
}
