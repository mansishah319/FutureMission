import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  ShieldCheck,
  Menu,
  Compass,
  Settings,
  Moon,
  Table2,
  Copyright,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import avatarVideo from '@assets/generated_videos/animated_dubai_police_officer_avatar.mp4';
import { LanguageSwitch } from './LanguageSwitch';
import { DesignModeToggle } from './DesignModeToggle';
import futuristicBg from '@/assets/futuristic-bg.jpg';
import BrandLogo from './Brand-logo';

interface LayoutFDProps {
  children: React.ReactNode;
}

export function LayoutFD({ children }: LayoutFDProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/fd/dashboard' },
    { icon: Compass, label: 'Create Retreat', href: '/fd/create-retreat' },
    { icon: Table2, label: 'My Retreats', href: '/fd/retreats' },
    { icon: FileText, label: 'Reports', href: '/fd/reports' },
  ];

  return (
    <div className='min-h-screen bg-background text-foreground relative overflow-hidden font-sans'>
      <div
        className='fixed inset-0 z-0'
        style={{
          backgroundImage: `url(${futuristicBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className='fixed inset-0 z-0 bg-background/40 backdrop-blur-[2px]' />

      <header
        className='relative z-50 h-18 w-full flex items-center justify-between px-4
        bg-background/40 backdrop-blur-xl border-b border-white/5'
      >
        <div className='flex items-center gap-4'>
          <div
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='text-muted-foreground hover:text-foreground hover:bg-white/5 cursor-pointer p-2 rounded'
          >
            <Menu className='w-5 h-5' />
          </div>

          <BrandLogo />
        </div>

        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-1'>
            <DesignModeToggle />
            <LanguageSwitch />
            <div>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-foreground hover:bg-white/5'
              >
                <Moon className='w-5 h-5' />
              </Button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-3 pl-2 pr-4 py-1 h-auto hover:bg-white/5 rounded-full border border-transparent transition-all cursor-pointer'>
                <div className='w-9 h-9 rounded-full border-2 border-brand-green/20 ring-2 ring-transparent group-hover:ring-brand-green/30 transition-all overflow-hidden relative'>
                  <video
                    src={avatarVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex flex-col items-start text-left'>
                  <span className='text-sm font-semibold leading-none tracking-tight text-white'>
                    User
                  </span>
                  <span className='text-[10px] text-brand-bright-green uppercase tracking-wider font-bold mt-1'>
                    Future Designer
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-56 bg-card/95 backdrop-blur-xl border-white/10 shadow-2xl'
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-white/10' />
              <DropdownMenuItem className='cursor-pointer focus:bg-brand-green/20 focus:text-brand-bright-green'>
                <Settings className='mr-2 w-4 h-4' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer focus:bg-destructive/10 focus:text-destructive text-destructive'
                onClick={() => setLocation('/')}
              >
                <LogOut className='mr-2 w-4 h-4' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className='relative z-10 flex min-h-[calc(100vh-4.5rem)]'>
        <aside
          className={cn(
            'bg-sidebar/80 backdrop-blur-xl border-r border-white/5 transition-all duration-500 ease-in-out flex flex-col',
            sidebarOpen ? 'w-64' : 'w-20',
          )}
        >
          <nav className='flex-1 py-8 px-4 space-y-2'>
            {navItems.map((item) => {
              const isActive =
                location === item.href || location.startsWith(item.href + '/');

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={cn(
                      'flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-300 group cursor-pointer',
                      isActive
                        ? 'bg-brand-green/10 text-brand-bright-green border-l-2 border-brand-bright-green'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.02]',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'w-5 h-5 transition-colors duration-300',
                        isActive
                          ? 'text-brand-bright-green drop-shadow-[0_0_8px_rgba(38,208,124,0.5)]'
                          : 'text-muted-foreground/70 group-hover:text-foreground',
                      )}
                    />
                    {sidebarOpen && (
                      <span className='font-medium text-sm tracking-wide'>
                        {item.label}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

       
        </aside>

        <main className='flex-1 flex flex-col min-w-0 bg-transparent'>
          <div className='flex-1 overflow-auto p-8 lg:p-10'>
            <div className='max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700'>
              {children}
            </div>
          </div>
        </main>

        {/* ================= FOOTER (FULL WIDTH) ================= */}
        <footer
          className='relative z-40 h-12 w-full flex items-center justify-between px-8
        bg-background/50 backdrop-blur-md border-t border-white/5 text-[10px] uppercase tracking-widest text-muted-foreground'
        >
          <span className='flex items-center gap-2'>
            <Copyright className='w-3 h-3' />
            Copyright 2026, Dubai Police
          </span>
          <span>Version 2.5.0</span>
        </footer>
      </div>
    </div>
  );
}
