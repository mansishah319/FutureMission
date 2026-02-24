import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Lock, User, Shield, Moon, Globe } from 'lucide-react';
import avatarVideo from '@assets/generated_videos/animated_dubai_police_officer_avatar.mp4';

export default function Settings() {
  return (
    <Layout>
      <div className='space-y-8 max-w-4xl mx-auto'>
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>Settings</h1>
          <p className='text-muted-foreground'>
            Manage your account preferences and system configurations
          </p>
        </div>

        <div className='grid gap-8'>
          {/* Profile Section */}
          <Card className='glass-card border-none'>
            <CardHeader>
              <CardTitle className='text-white flex items-center gap-2'>
                <User className='w-5 h-5 text-brand-bright-green' />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal details and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex flex-col md:flex-row gap-8 items-start'>
                <div className='flex flex-col items-center gap-4'>
                  <div className='w-32 h-32 rounded-full border-4 border-brand-green/30 shadow-[0_0_20px_rgba(38,208,124,0.2)] overflow-hidden relative'>
                    <video
                      src={avatarVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <Button
                    variant='secondary'
                    className='border-white/10 hover:bg-white/5 text-white w-full'
                  >
                    Change Avatar
                  </Button>
                </div>

                <div className='flex-1 grid gap-4 w-full'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label>First Name</Label>
                      <Input
                        defaultValue='Admin'
                        className='bg-secondary/30 border-white/10'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label>Last Name</Label>
                      <Input
                        defaultValue='User'
                        className='bg-secondary/30 border-white/10'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label>Email Address</Label>
                    <Input
                      defaultValue='admin@dubaipolice.gov.ae'
                      className='bg-secondary/30 border-white/10'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Department</Label>
                    <Input
                      defaultValue='Strategic Foresight Dept'
                      disabled
                      className='bg-secondary/30 border-white/5 opacity-50'
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className='glass-card border-none'>
            <CardHeader>
              <CardTitle className='text-white flex items-center gap-2'>
                <Bell className='w-5 h-5 text-brand-bright-green' />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base text-white'>Email Alerts</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive daily summaries of game requests
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className='bg-white/5' />
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base text-white'>
                    System Notifications
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    In-app alerts for critical updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className='glass-card border-none'>
            <CardHeader>
              <CardTitle className='text-white flex items-center gap-2'>
                <Shield className='w-5 h-5 text-brand-bright-green' />
                Security
              </CardTitle>
              <CardDescription>
                Manage password and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Button
                variant='secondary'
                className='border-white/10 hover:bg-white/5 text-white w-full justify-start'
              >
                <Lock className='w-4 h-4 mr-2' /> Change Password
              </Button>
              <Button
                variant='secondary'
                className='border-white/10 hover:bg-white/5 text-white w-full justify-start'
              >
                <Globe className='w-4 h-4 mr-2' /> Active Sessions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
