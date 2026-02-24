import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  Users,
  FileText,
  Target,
  Calendar,
  Settings,
  LogOut,
  Menu,
  Gamepad2,
  List,
  UserRoundCog,
  Info,
  Moon,
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
import futuristicBg from '@/assets/futuristic-bg.jpg';
import { LanguageSwitch } from './LanguageSwitch';
import { DesignModeToggle } from './DesignModeToggle';
import BrandLogo from './Brand-logo';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isAdmin = location.startsWith('/admin');

  const superAdminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'User Management', href: '/users' },
    { icon: Target, label: 'Future Scenario', href: '/scenarios' },
    { icon: Calendar, label: 'Future Retreat', href: '/retreats' },
    { icon: FileText, label: 'Reports Library', href: '/reports' },
    {
      icon: UserRoundCog,
      label: 'Roles Configuration',
      href: '/configuration',
    },
  ];

  const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'User Management', href: '/admin/users' },
    { icon: Gamepad2, label: 'Game Requests', href: '/admin/game-requests' },
    { icon: Target, label: 'Future Scenario', href: '/admin/scenarios' },
    { icon: Calendar, label: 'Future Retreat', href: '/admin/retreats' },
    { icon: List, label: 'Reports', href: '/admin/reports' },
  ];

  const navItems = isAdmin ? adminNavItems : superAdminNavItems;
  const userRole = isAdmin ? 'Admin (SFD)' : 'Super Admin';

  return (
    <div className='min-h-screen bg-background text-foreground relative overflow-hidden'>
      {/* BACKGROUND */}
      <div
        className='fixed inset-0 z-0'
        style={{
          backgroundImage: `url(${futuristicBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className='fixed inset-0 z-0 bg-background/40 backdrop-blur-[2px]' />

      {/* ================= HEADER (FULL WIDTH) ================= */}
      <header
        className='relative z-50 h-16 w-full flex items-center justify-between px-4
        bg-background/40 backdrop-blur-xl border-b border-white/5'
      >
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className='w-5 h-5' />
          </Button>

          <BrandLogo />
        </div>

        <div className='flex items-center gap-6'>
          <LanguageSwitch />
          <Button variant='ghost' size='icon'>
            <Moon className='w-5 h-5' />
          </Button>

          <DesignModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-3 pl-2 pr-4 py-1 rounded-full hover:bg-white/5 cursor-pointer'>
                <div className='w-9 h-9 rounded-full border border-brand-green/30 overflow-hidden'>
                  <video
                    src={avatarVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='w-full h-full object-cover'
                  />
                </div>
                <div>
                  <div className='text-sm font-semibold text-white'>User</div>
                  <div className='text-[10px] text-brand-bright-green font-bold uppercase'>
                    {userRole}
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLocation('/settings')}>
                <Settings className='mr-2 w-4 h-4' /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive'
                onClick={() => setLocation('/')}
              >
                <LogOut className='mr-2 w-4 h-4' /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ================= BODY (SIDEBAR + CONTENT) ================= */}
      <div className='relative z-40 flex w-full flex-1 overflow-hidden'>
        {/* SIDEBAR */}
        <aside
          className={cn(
            'bg-background/40 backdrop-blur-xl border-r border-white/5 shadow-xl',
            'transition-all duration-300 ease-in-out',
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
                      'flex items-center gap-4 px-3 py-3 rounded-lg cursor-pointer transition-all',
                      isActive
                        ? 'bg-brand-dark-green text-white'
                        : 'text-muted-foreground hover:bg-white/5',
                    )}
                  >
                    <item.icon className='w-5 h-5' />
                    {sidebarOpen && (
                      <span className='text-sm font-medium'>{item.label}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* <div className='mt-auto p-4 border-t border-white/5'>
            <div className='flex items-center gap-3 text-muted-foreground'>
              <Info className='w-4 h-4' />
              {sidebarOpen && <span className='text-sm'>Help & Support</span>}
            </div>
          </div> */}
        </aside>

        {/* MAIN CONTENT */}
        <main className='flex-1 overflow-auto'>
          <div className='p-6 lg:p-8'>
            <div className='max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700'>
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* ================= FOOTER ================= */}
      <footer
        className='relative z-40 h-12 w-full flex items-center justify-between px-8
        bg-background/50 backdrop-blur-md border-t border-white/5 text-[10px] uppercase tracking-widest text-muted-foreground'
      >
        <span className='flex items-center gap-2'>
          <Copyright className='w-3 h-3' />
          Copyright 2026 Dubai Police
        </span>
        <span>Version 2.5.0</span>
      </footer>
    </div>
  );
}
