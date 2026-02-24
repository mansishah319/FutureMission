import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Clock,
  ChevronRight,
  Target,
  Timer,
  Clock1,
  CheckCircle2,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'border-primary/30 text-primary bg-primary/10';
    case 'In Progress':
      return 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10';
    case 'Yet to Start':
      return 'border-white/10 text-muted-foreground bg-white/5';
    default:
      return 'border-white/10 text-muted-foreground bg-white/5';
  }
};

export default function ScenarioRetreat() {
  const statsCards = [
    {
      title: 'Total Retreats',
      value: 10,
      icon: Target,
      color: 'from-dp-green to-dp-teal',
      trend: '+2',
    },
    {
      title: 'Pending Retreats',
      value: 8,
      icon: Timer,
      color: 'from-dp-teal to-blue-500',
      trend: '+12',
    },

    {
      title: 'In Progress Retreats',
      value: 5,
      icon: Clock1,
      color: 'from-dp-gold to-amber-600',
      trend: '-1',
    },
    {
      title: ' Completed Retreats',
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
              Future Retreats
            </h1>
            <p className='text-muted-foreground'>
              Coordinate strategic workshops and brainstorming sessions
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

        <div className='space-y-6'>
          {/* Active Retreat */}
          <div className='relative overflow-hidden rounded-xl border border-primary/30 bg-card/40 backdrop-blur-md'>
            <div className='absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]'></div>
            <div className='p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between'>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Badge className='bg-primary text-primary-foreground hover:bg-primary/90'>
                    In Progress
                  </Badge>
                  <span className='text-sm text-primary font-mono tracking-wider animate-pulse'>
                    ● SESSION IN PROGRESS
                  </span>
                </div>
                <div>
                  <h2 className='text-2xl font-display font-bold text-white mb-2'>
                    Future of Public Safety 2035
                  </h2>
                  <p className='text-muted-foreground max-w-2xl'>
                    High-level strategic session focusing on integrating
                    autonomous systems and AI into public safety protocols.
                  </p>
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

          <h3 className='text-xl font-bold text-white mt-8 mb-4'>
            Upcoming Retreats
          </h3>

          <div className='grid gap-4'>
            {[
              {
                title: 'Cyber Defense Strategy Workshop',
                date: 'Nov 05, 2026',
                location: 'Digital HQ',
                attendees: 15,
                status: 'Yet to Start',
              },
              {
                title: 'Smart Traffic Management Protocols',
                date: 'Nov 18, 2026',
                location: 'Command Center',
                attendees: 30,
                status: 'Yet to Start',
              },
              {
                title: 'Community Policing AI Integration',
                date: 'Dec 02, 2026',
                location: 'Training Academy',
                attendees: 45,
                status: 'Completed',
              },
            ].map((retreat, i) => (
              <Card
                key={i}
                className='glass-card hover:bg-white/[0.02] transition-colors cursor-pointer group'
              >
                <CardContent className='p-4 flex items-center justify-between'>
                  <div className='flex items-center gap-6'>
                    <div className='flex flex-col items-center justify-center w-16 h-16 rounded bg-white/5 border border-white/10'>
                      <span className='text-xs text-muted-foreground uppercase'>
                        {retreat.date.split(' ')[0]}
                      </span>
                      <span className='text-xl font-bold text-white'>
                        {retreat.date.split(' ')[1].replace(',', '')}
                      </span>
                    </div>
                    <div>
                      <h4 className='text-lg font-bold text-white group-hover:text-primary transition-colors'>
                        {retreat.title}
                      </h4>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground mt-1'>
                        <span className='flex items-center gap-1'>
                          <MapPin className='w-3 h-3' /> {retreat.location}
                        </span>
                        <span className='flex items-center gap-1'>
                          <Users className='w-3 h-3' /> {retreat.attendees}{' '}
                          Attending
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Badge
                      variant='secondary'
                      className={getStatusColor(retreat.status)}
                    >
                      {retreat.status}
                    </Badge>
                    <ChevronRight className='w-5 h-5 text-muted-foreground group-hover:text-white transition-colors' />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
