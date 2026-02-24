import { Layout } from '@/components/Layout';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  Shield,
  Plus,
  Pencil,
  LayoutDashboard,
  Users,
  Target,
  Calendar,
  FileText,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

const rolesList = [
  { id: 'gm', name: 'Game Master (GM)' },
  { id: 'dgm', name: 'Deputy Game Master (DGM)' },
  { id: 'gc', name: 'Game coordinator ( GC)' },
  { id: 'dc', name: 'Department Coordinator (DC)' },
  { id: 'fd', name: 'Future Designer (FD)' },
  { id: 'expert', name: 'Expert' },
];

const menuPermissions = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'user-management', label: 'User Management', icon: Users },
  { id: 'scenario-planning', label: 'Future Scenario', icon: Target },
  { id: 'scenario-retreat', label: 'Future Retreat', icon: Calendar },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const functionPermissions = [
  'Create User',
  'Edit User',
  'Delete User',
  'Create Scenario',
  'Edit Scenario',
  'Approve Scenario',
  'Generate Reports',
];

export default function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState(rolesList[0].id);

  const [currentTab, setCurrentTab] = useState('roles');

  return (
    <Layout>
      <div className='space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-2'>
              Roles & Permissions
            </h1>
            <p className='text-muted-foreground'>
              Configure access control across the Strategic Foresight Platform
            </p>
          </div>
        </div>

        <Tabs defaultValue='roles' className='w-full space-y-6'>
          <TabsList className='bg-white/5 border border-white/10 p-1 w-auto inline-flex rounded-lg'>
            <TabsTrigger
              value='roles'
              className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2'
            >
              Roles Config
            </TabsTrigger>
            <TabsTrigger
              value='permissions'
              className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2'
            >
              Permission Config
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='roles'
            className='space-y-6 animate-in fade-in slide-in-from-bottom-2'
          >
            <GlassCard className='p-6 space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                  <Shield className='w-5 h-5 text-primary' />
                  System Roles
                </h2>
                <Button className='bg-primary hover:bg-primary/90'>
                  <Plus className='w-4 h-4 mr-2' />
                  Add Role
                </Button>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                {rolesList.map((role) => (
                  <Card
                    key={role.id}
                    className='glass-card hover:bg-white/[0.03] transition-colors relative'
                  >
                    <CardContent className='p-2 flex items-center justify-between '>
                      <div>
                        <h3 className='text-lg font-bold text-white'>
                          {role.name}
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                          Role-based access configuration
                        </p>
                      </div>
                    </CardContent>
                    <div className='absolute top-2 right-2'>
                      <Button
                        size='sm'
                        variant='tertiary'
                        className='border-white/10'
                      >
                        <Pencil className='w-4 h-4' />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent
            value='permissions'
            className='space-y-6 animate-in fade-in slide-in-from-bottom-2'
          >
            <GlassCard className='p-6 space-y-8'>
              {/* Role Selector */}
              <div className='flex items-center gap-4'>
                <span className='text-sm text-muted-foreground'>
                  Select Role:
                </span>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className='w-64 bg-white/5 border-white/10'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rolesList.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Menu Permissions */}
              <div className='space-y-4'>
                <h3 className='text-lg font-bold text-white'>
                  Menu Permissions
                </h3>

                <div className='grid md:grid-cols-2 gap-4'>
                  {menuPermissions.map((menu) => (
                    <div
                      key={menu.id}
                      className='flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10'
                    >
                      <div className='flex items-center gap-3'>
                        <menu.icon className='w-4 h-4 text-primary' />
                        <span className='text-white'>{menu.label}</span>
                      </div>
                      <Switch />
                    </div>
                  ))}
                </div>
              </div>

              {/* Functional Permissions */}
              <div className='space-y-4'>
                <h3 className='text-lg font-bold text-white'>
                  Functional Permissions
                </h3>

                <div className='grid md:grid-cols-2 gap-4'>
                  {functionPermissions.map((permission) => (
                    <div
                      key={permission}
                      className='flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10'
                    >
                      <span className='text-white'>{permission}</span>
                      <Switch />
                    </div>
                  ))}
                </div>
              </div>

              {/* Save */}
              <div className='flex justify-end'>
                <Button>Save Permissions</Button>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
