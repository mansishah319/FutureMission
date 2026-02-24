import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  FileText,
  Target,
  LogOut,
  Menu,
  Gamepad2,
  Settings,
  Copyright,
  Moon,
  Trophy,
  BellDotIcon,
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
import { ScrollArea } from '@/components/ui/scroll-area';
import avatarVideo from '@assets/generated_videos/animated_dubai_police_officer_avatar.mp4';
import { LanguageSwitch } from './LanguageSwitch';
import futuristicBg from '@/assets/futuristic-bg.jpg';
import BrandLogo from './Brand-logo';
import { notifications } from '@/data/notifications';

interface LayoutGMProps {
  children: React.ReactNode;
}

export function LayoutGM({ children }: LayoutGMProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/gm/dashboard' },
    { icon: Gamepad2, label: 'Game Requests', href: '/gm/requests' },
    { icon: Target, label: 'Games', href: '/gm/games' },
    { icon: FileText, label: 'Reports / Recap', href: '/gm/reports' },
    { icon: Trophy, label: 'Leaderboard', href: '/gm/leaderboard' },
  ];

  return (
    <div className='min-h-screen bg-background text-foreground relative overflow-hidden'>
      {/* BACKGROUND */}
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

      {/* HEADER */}
      <header className='relative z-50 h-18 flex items-center justify-between px-4 bg-background/40 backdrop-blur-xl border-b border-white/5'>
        <div className='flex items-center gap-4'>
          <Menu
            className='w-5 h-5 cursor-pointer'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <BrandLogo />
        </div>

        <div className='flex items-center gap-4'>
          <LanguageSwitch />

          {/* 🔔 NOTIFICATION DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='relative'>
                <BellDotIcon className='w-5 h-5' />
                <span className='absolute top-1 right-1 w-2 h-2 bg-brand-bright-green rounded-full animate-pulse' />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align='end'
              className='w-96 bg-card/95 backdrop-blur-xl border-white/10 shadow-2xl'
            >
              <DropdownMenuLabel className='flex justify-between'>
                Notifications
                <span className='text-xs text-muted-foreground'>
                  {notifications.filter((n) => !n.isRead).length} unread
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className='bg-white/10' />

              <ScrollArea className='h-72'>
                <div className='space-y-1 p-1'>
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        'p-3 rounded-lg transition cursor-pointer',
                        n.isRead
                          ? 'hover:bg-white/5'
                          : 'bg-brand-green/10 hover:bg-brand-green/20',
                      )}
                    >
                      <div className='flex justify-between'>
                        <span className='font-semibold'>{n.title}</span>
                        <span className='text-xs text-muted-foreground'>
                          {n.time}
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground mt-1'>
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <DropdownMenuSeparator className='bg-white/10' />

              <DropdownMenuItem
                onClick={() => setLocation('/gm/notifications')}
                className='justify-center text-brand-bright-green font-semibold'
              >
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant='ghost' size='icon'>
            <Moon className='w-5 h-5' />
          </Button>

          {/* USER */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-2 cursor-pointer'>
                <div className='w-9 h-9 rounded-full overflow-hidden'>
                  <video src={avatarVideo} autoPlay loop muted />
                </div>
                <div>
                  <div className='text-sm font-semibold'>User</div>
                  <div className='text-[10px] text-brand-bright-green'>
                    Game Master
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setLocation('/settings')}>
                <Settings className='w-4 h-4 mr-2' /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLocation('/')}
                className='text-destructive'
              >
                <LogOut className='w-4 h-4 mr-2' /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* BODY */}
      <div className='flex min-h-[calc(100vh-4.5rem)] relative z-40'>
        <aside
          className={cn(
            'bg-background/40 backdrop-blur-xl border-r border-white/5 transition-all',
            sidebarOpen ? 'w-64' : 'w-20',
          )}
        >
          <nav className='p-4 space-y-2'>
            {navItems.map((item) => {
              const isActive = location.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      'flex items-center gap-4 p-3 rounded-lg',
                      isActive
                        ? 'bg-brand-dark-green text-white'
                        : 'hover:bg-white/5',
                    )}
                  >
                    <item.icon className='w-5 h-5' />
                    {sidebarOpen && item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className='flex-1 overflow-auto p-6'>
          <div className='max-w-[1600px] mx-auto'>{children}</div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className='h-12 flex justify-between items-center px-8 text-xs bg-background/50 backdrop-blur border-t border-white/5'>
        <span className='flex items-center gap-1'>
          <Copyright className='w-3 h-3' /> 2026 Dubai Police
        </span>
        <span>Version 2.5.0</span>
      </footer>
    </div>
  );
}
