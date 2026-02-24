import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  Clock,
  Users,
  ArrowRight,
  BrainCircuit,
  Globe,
  Shield,
  Zap,
  Target,
  Timer,
  Clock1,
  CheckCircle2,
  CalendarIcon,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

const scenarios = [
  {
    title: 'Urban Mobility 2030',
    description:
      'Analyzing the impact of autonomous drone taxis on city infrastructure and traffic patterns.',
    progress: 75,
    status: 'In Progress',
    statusMsg: '● SESSION IN PROGRESS',
    team: 12,
    daysLeft: 14,
    icon: Zap,
    color: 'text-yellow-400',
  },
  {
    title: 'Cyber Resilience Framework',
    description:
      'Developing robust defense mechanisms against quantum computing threats to national security.',
    progress: 30,
    status: 'Yet to Start',
    statusMsg: '● WAITING FOR APPROVAL',
    team: 8,
    daysLeft: 45,
    icon: Shield,
    color: 'text-primary',
  },
  {
    title: 'Global Supply Chain AI',
    description:
      'Foresight into AI-driven supply chain disruptions and autonomous logistics corridors.',
    progress: 100,
    status: 'Completed',
    statusMsg: '● REPORT PUBLISHED',
    team: 15,
    daysLeft: 0,
    icon: Globe,
    color: 'text-blue-400',
  },
  {
    title: 'Smart City Cognitive Grid',
    description:
      'Integration of IoT sensors with cognitive computing for real-time public safety monitoring.',
    progress: 10,
    status: 'Yet to Start',
    statusMsg: '● WAITING FOR APPROVAL',
    team: 4,
    daysLeft: 60,
    icon: BrainCircuit,
    color: 'text-purple-400',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'border-primary/30 text-primary bg-primary/10';
    case 'In Progress':
      return 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10';
    default:
      return 'border-white/10 text-muted-foreground bg-white/5';
  }
};

export default function ScenarioPlanning() {
  const statsCards = [
    {
      title: 'Total Scenarios',
      value: 10,
      icon: Target,
      color: 'from-dp-green to-dp-teal',
      trend: '+2',
    },
    {
      title: 'Pending Scenarios',
      value: 8,
      icon: Timer,
      color: 'from-dp-teal to-blue-500',
      trend: '+12',
    },

    {
      title: 'In Progress Scenarios',
      value: 5,
      icon: Clock1,
      color: 'from-dp-gold to-amber-600',
      trend: '-1',
    },
    {
      title: ' Completed Scenarios',
      value: 7,
      icon: CheckCircle2,
      color: 'from-dp-success to-emerald-600',
      trend: '+1',
    },
  ];
  return (
    <Layout>
      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-white mb-2'>
              Future Scenario
            </h1>
            <p className='text-muted-foreground'>
              Create, monitor and analyze strategic foresight scenarios
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {statsCards.map((stat, index) => (
            <GlassCard
              key={stat.title}
              className='p-6 group hover:glow-teal transition-all duration-300'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='flex items-start justify-between'>
                <div>
                  <div className='text-3xl font-bold text-foreground'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-muted-foreground mt-1'>
                    {stat.title}
                  </div>
                </div>
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br',
                    stat.color,
                  )}
                >
                  <stat.icon className='w-6 h-6 text-white' />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className='grid grid-cols-1 gap-6'>
          {scenarios.map((scenario, i) => (
            <div className='relative overflow-hidden rounded-xl border border-primary/30 bg-card/40 backdrop-blur-md'>
              <div className='absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]'></div>
              <div className='p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <Badge
                      variant='secondary'
                      className={`${getStatusColor(
                        scenario.status,
                      )} transition-colors`}
                    >
                      {scenario.status}
                    </Badge>
                    <span className='text-sm text-primary font-mono tracking-wider animate-pulse'>
                      {scenario.statusMsg}
                    </span>
                  </div>
                  <div>
                    <h2 className='text-2xl font-display font-bold text-white mb-2'>
                      {scenario.title}
                    </h2>
                    <p className='text-muted-foreground max-w-2xl'>
                      {scenario.description}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-xs text-muted-foreground'>
                      <span>Progress</span>
                      <span>{scenario.progress}%</span>
                    </div>
                    <Progress
                      value={scenario.progress}
                      className='h-1.5 bg-secondary/50'
                    />
                  </div>
                  <div className='flex flex-wrap gap-6 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-2'>
                      <CalendarIcon className='w-4 h-4 text-primary' />
                      <span>Oct 12-14, 2026</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4 text-primary' />
                      <span>09:00 - 17:00</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <MapPin className='w-4 h-4 text-primary' />
                      <span>Innovation Hub, Hall A</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Users className='w-4 h-4 text-primary' />
                      <span>24 Participants</span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-3 w-full md:w-auto'>
                  <Button className='w-full md:w-40 bg-white/10 hover:bg-white/20 text-white border border-white/10'>
                    View Agenda
                  </Button>
                  <Button>Join Session</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
