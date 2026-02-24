import { 
  Users, 
  Lightbulb, 
  Vote, 
  Target, 
  BarChart3, 
  FileText, 
  Trophy,
  CheckCircle
} from 'lucide-react';
import type { ForesightPhase } from './types';
import { PHASE_INFO } from './types';

interface PhaseIndicatorProps {
  currentPhase: ForesightPhase;
  onPhaseClick?: (phase: ForesightPhase) => void;
  interactive?: boolean;
}

const PHASE_ORDER: ForesightPhase[] = [
  'lobby',
  'focal_topics',
  'focal_voting',
  'theme_assignment',
  'challenges',
  'challenge_voting',
  'reports',
  'completed'
];

const PHASE_ICONS: Record<ForesightPhase, typeof Users> = {
  lobby: Users,
  focal_topics: Lightbulb,
  focal_voting: Vote,
  theme_assignment: Users,
  challenges: Target,
  challenge_voting: BarChart3,
  reports: FileText,
  completed: Trophy,
};

export function PhaseIndicator({ 
  currentPhase, 
  onPhaseClick,
  interactive = false 
}: PhaseIndicatorProps) {
  const currentIndex = PHASE_ORDER.indexOf(currentPhase);

  return (
    <div className="flex items-center gap-1 p-2 bg-white/5 rounded-lg overflow-x-auto">
      {PHASE_ORDER.map((phase, index) => {
        const Icon = PHASE_ICONS[phase];
        const info = PHASE_INFO[phase];
        const isActive = phase === currentPhase;
        const isCompleted = index < currentIndex;
        const isFuture = index > currentIndex;

        return (
          <div key={phase} className="flex items-center">
            <button
              onClick={() => interactive && onPhaseClick?.(phase)}
              disabled={!interactive}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all
                ${isActive 
                  ? 'bg-brand-navy text-white ring-2 ring-brand-green scale-105' 
                  : isCompleted 
                    ? 'bg-brand-green/20 text-brand-bright-green' 
                    : 'bg-white/5 text-muted-foreground'
                }
                ${interactive && !isActive ? 'hover:bg-white/10 cursor-pointer' : ''}
              `}
              data-testid={`phase-${phase}`}
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-bright-green' : ''}`} />
              )}
              <span className="text-sm font-medium hidden lg:inline">{info.title}</span>
              <span className="text-xs font-medium lg:hidden">{index + 1}</span>
            </button>
            {index < PHASE_ORDER.length - 1 && (
              <div className={`w-4 h-0.5 mx-1 ${isCompleted ? 'bg-brand-green' : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
