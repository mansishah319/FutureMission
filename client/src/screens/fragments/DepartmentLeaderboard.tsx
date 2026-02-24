import { useQuery } from '@tanstack/react-query';
import { GlassCard } from '@/components/ui/glass-card';
import { ProgressGlow } from '@/components/ui/progress-glow';
import { Trophy, Medal, Award, Users, Gamepad2, Building, Loader2 } from 'lucide-react';

interface DepartmentAnalytics {
  department: string;
  totalPoints: number;
  participantCount: number;
  gamesParticipated: number;
  retreatsCount: number;
  topPerformer: { id: string; displayName: string; points: number } | null;
  avgScore: number;
}

const getRankIcon = (index: number) => {
  if (index === 0) return <Trophy className='w-5 h-5 text-yellow-400' />;
  if (index === 1) return <Medal className='w-5 h-5 text-gray-300' />;
  if (index === 2) return <Award className='w-5 h-5 text-amber-600' />;
  return <span className='text-muted-foreground font-mono text-sm'>#{index + 1}</span>;
};

export function DepartmentLeaderboard() {
  const { data: analytics = [], isLoading } = useQuery<DepartmentAnalytics[]>({
    queryKey: ['/api/leaderboard/department-analytics'],
  });

  const maxPoints = analytics[0]?.totalPoints || 1;

  if (isLoading) {
    return (
      <GlassCard className='p-6'>
        <div className='flex items-center justify-center h-48'>
          <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className='p-6'>
      <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
        <Building className='w-5 h-5 text-brand-bright-green' />
        Department Leaderboard
      </h3>

      <div className='space-y-4'>
        {analytics.map((item, index) => (
          <div
            key={item.department}
            data-testid={`row-department-${index}`}
            className='flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover-elevate'
          >
            <div className='w-8 flex justify-center'>
              {getRankIcon(index)}
            </div>

            <div className='flex-1'>
              <div className='flex justify-between text-sm font-medium mb-1'>
                <span className='text-white'>{item.department}</span>
                <span className='text-brand-bright-green'>{item.totalPoints.toLocaleString()} pts</span>
              </div>
              <ProgressGlow value={(item.totalPoints / maxPoints) * 100} />
              <div className='flex gap-4 mt-2 text-xs text-muted-foreground'>
                <span className='flex items-center gap-1'>
                  <Users className='w-3 h-3' /> {item.participantCount} members
                </span>
                <span className='flex items-center gap-1'>
                  <Gamepad2 className='w-3 h-3' /> {item.gamesParticipated} games
                </span>
                {item.topPerformer && (
                  <span className='text-yellow-400'>
                    Top: {item.topPerformer.displayName}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
