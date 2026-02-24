import { ShieldCheck } from 'lucide-react';
import React from 'react';
import SFG_LOGO from '@/assets/sfg_logo.png';
import POLICE_LOGO from '@/assets/dubai_police_logo.png';
import GOVERNMENT_LOGO from '@/assets/dubai_govt_logo.png';

export default function AuthOverlay() {
  return (
    <div className='hidden lg:flex flex-1 relative bg-transparent overflow-hidden order-2 lg:order-1'>
      {/* <div
          className='absolute inset-0 bg-cover bg-center opacity-60 mix-blend-color-dodge scale-105 animate-in fade-in zoom-in duration-1000'
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div> */}
      <div className='absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80'></div>

      {/* Animated Overlay Elements */}
      <div className='absolute top-12 left-12 flex flex-col items-start gap-2'>
        {/* <div className='flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10'>
          <span className='w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#10b981]'></span>
          <span className='text-xs font-mono text-primary tracking-[0.2em] font-bold'>
            SYSTEM ONLINE
          </span>
        </div> */}

        <div>
          <div className='flex items-center gap-8'>
            <div className='flex'>
              <img src={SFG_LOGO} alt='SFG Logo' className='w-auto h-14' />
            </div>
            <div className='flex'>
              <img src={POLICE_LOGO} alt='SFG Logo' className='w-auto h-20' />
            </div>
            <div className='flex'>
              <img
                src={GOVERNMENT_LOGO}
                alt='SFG Logo'
                className='w-auto h-20'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-24 left-16 max-w-xl'>
        <h3 className='text-5xl font-display font-bold text-white mb-6 leading-tight drop-shadow-2xl'>
          Shaping the Future <br />
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200'>
            of Security
          </span>
        </h3>
        <p className='text-lg text-muted-foreground leading-relaxed max-w-md border-l-2 border-primary/50 pl-6'>
          Advanced scenario modeling and strategic foresight capabilities
          enabling proactive decision making for a safer tomorrow.
        </p>
      </div>
    </div>
  );
}
