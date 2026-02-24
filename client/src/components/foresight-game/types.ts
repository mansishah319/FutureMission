export const FORESIGHT_PHASES = [
  'lobby',
  'focal_topics',
  'focal_voting',
  'theme_assignment',
  'challenges',
  'challenge_voting',
  'reports',
  'completed',
] as const;

export type ForesightPhase = (typeof FORESIGHT_PHASES)[number];

export const STEEP_THEMES = [
  'Social',
  'Technological',
  'Economic',
  'Environmental',
  'Political',
  'Security',
] as const;

export type SteepTheme = (typeof STEEP_THEMES)[number];

export interface Participant {
  id: string;
  name: string;
  department: string;
  avatar: string;
  status: 'joined' | 'typing' | 'submitted' | 'idle';
  assignedTheme?: SteepTheme;
}

export interface FocalTopic {
  id: string;
  title: string;
  description?: string;
  submittedBy: string;
  submitterName: string;
  status: 'submitted' | 'selected' | 'rejected';
  avgImpact?: number;
  avgUncertainty?: number;
  voteCount?: number;
  myVote?: { impact: number; uncertainty: number };
}

export interface Challenge {
  id: string;
  theme: SteepTheme;
  title: string;
  description?: string;
  whyItMatters?: string;
  timeHorizon?: string;
  submittedBy: string;
  submitterName: string;
  status: 'submitted' | 'consolidated' | 'selected';
  consolidatedInto?: string;
  avgImpact?: number;
  avgUncertainty?: number;
  voteCount?: number;
  myVote?: { impact: number; uncertainty: number };
}

export interface TimeExtensionRequest {
  id: string;
  playerId: string;
  playerName: string;
  reason?: string;
  status: 'pending' | 'approved' | 'ignored';
  approvedMinutes?: number;
}

export interface ForesightReport {
  id: string;
  playerId: string;
  theme: SteepTheme;
  situation?: string;
  risks?: string;
  opportunities?: string;
  signals?: string;
  recommendations?: string;
  completionPercent: number;
}

export interface GameState {
  id: string;
  title: string;
  objective: string;
  currentPhase: ForesightPhase;
  phaseTimeRemaining: number;
  phaseTimeLimit: number;
  totalDuration: number;
  timerStatus: 'normal' | 'warning' | 'critical' | 'paused';
}

export interface PhaseInfo {
  id: ForesightPhase;
  title: string;
  description: string;
  icon: string;
}

export const PHASE_INFO: Record<ForesightPhase, PhaseInfo> = {
  lobby: {
    id: 'lobby',
    title: 'Mission Briefing',
    description: 'Experts join and prepare for the strategic simulation',
    icon: 'Users',
  },
  focal_topics: {
    id: 'focal_topics',
    title: 'Focal Topics',
    description: 'What forces will shape this future?',
    icon: 'Lightbulb',
  },
  focal_voting: {
    id: 'focal_voting',
    title: 'Topic Evaluation',
    description: 'Rate topics by impact and uncertainty',
    icon: 'Vote',
  },
  theme_assignment: {
    id: 'theme_assignment',
    title: 'Theme Assignment',
    description: 'Strategic officers assigned to STEEP-Security themes',
    icon: 'Users',
  },
  challenges: {
    id: 'challenges',
    title: 'Challenge Analysis',
    description: 'Deep thinking on strategic challenges',
    icon: 'Target',
  },
  challenge_voting: {
    id: 'challenge_voting',
    title: 'Challenge Prioritization',
    description: 'Final evaluation of strategic challenges',
    icon: 'BarChart3',
  },
  reports: {
    id: 'reports',
    title: 'Strategic Reports',
    description: 'Capture insights and recommendations',
    icon: 'FileText',
  },
  completed: {
    id: 'completed',
    title: 'Mission Complete',
    description: 'Strategic simulation concluded',
    icon: 'Trophy',
  },
};
