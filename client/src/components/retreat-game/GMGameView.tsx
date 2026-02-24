import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Users,
  AlertTriangle,
  Target,
  Shield,
  Lightbulb,
  Flag,
  Crosshair,
  Handshake,
  Briefcase,
  FolderKanban,
  FileText,
  CheckCircle,
  Clock,
  Vote,
  Lock,
  Send,
  Crown,
  TrendingUp,
  BarChart3,
  Plus,
  Eye,
  Play,
  Settings,
  Unlock,
  Trash2,
  Edit,
  Merge,
} from 'lucide-react';

const STAGE_INFO: Record<
  string,
  { title: string; icon: typeof Users; color: string; question: string }
> = {
  registration: {
    title: 'Registration',
    icon: Users,
    color: 'text-blue-400',
    question: '',
  },
  obstacles: {
    title: 'Work Obstacles',
    icon: AlertTriangle,
    color: 'text-red-400',
    question: "What are the main obstacles hindering your department's work?",
  },
  challenges: {
    title: 'Future Challenges',
    icon: Target,
    color: 'text-orange-400',
    question: 'What challenges do you foresee in the next 5-10 years?',
  },
  risks: {
    title: 'Potential Risks',
    icon: Shield,
    color: 'text-yellow-400',
    question: 'What risks could impact organizational security?',
  },
  opportunities: {
    title: 'Opportunities',
    icon: Lightbulb,
    color: 'text-green-400',
    question: 'What opportunities could enhance our capabilities?',
  },
  priorities: {
    title: 'Priorities',
    icon: Flag,
    color: 'text-purple-400',
    question: 'What should be our top strategic priorities?',
  },
  goals: {
    title: 'Strategic Goals',
    icon: Crosshair,
    color: 'text-cyan-400',
    question: 'What goals should we aim for by 2030?',
  },
  partnerships: {
    title: 'Partnerships',
    icon: Handshake,
    color: 'text-pink-400',
    question: 'What partnerships would strengthen our mission?',
  },
  services: {
    title: 'Services',
    icon: Briefcase,
    color: 'text-indigo-400',
    question: 'What new services should we develop?',
  },
  projects: {
    title: 'Projects',
    icon: FolderKanban,
    color: 'text-teal-400',
    question: 'What key projects should we initiate?',
  },
  reporting: {
    title: 'Reporting',
    icon: FileText,
    color: 'text-amber-400',
    question: '',
  },
  completed: {
    title: 'Completed',
    icon: CheckCircle,
    color: 'text-brand-bright-green',
    question: '',
  },
};

interface Expert {
  id: string;
  name: string;
  department: string;
  avatar: string;
  status?: string;
}

interface Submission {
  id: string;
  title: string;
  description: string;
  playerName: string;
  playerId: string;
}

interface Consolidation {
  id: string;
  title: string;
  description: string;
  avgImpact: number;
  avgProbability: number;
  voteCount: number;
}

interface FinalReport {
  title: string;
  executiveSummary: string;
  keyFindings: string[];
  recommendations: string[];
  participants: number;
  stagesCompleted: number;
  totalSubmissions: number;
  consolidatedItems: number;
}

interface GMGameViewProps {
  currentStage: string;
  stagePhase: 'submissions' | 'consolidation' | 'voting';
  players: Expert[];
  submissions: Submission[];
  consolidations: Consolidation[];
  finalReport?: FinalReport;
  joinCode?: string;
  onLockSubmissions?: () => void;
  onUnlock?: () => void;
  onStartVoting?: () => void;
  onFinalize?: () => void;
  onNextStage?: () => void;
  onAddParticipant?: () => void;
  onRemoveParticipant?: (id: string) => void;
  onStartSession?: () => void;
  onAddConsolidation?: () => void;
  onEditConsolidation?: (id: string) => void;
  onMergeConsolidation?: (id: string) => void;
}

export function GMGameView({
  currentStage,
  stagePhase,
  players,
  submissions,
  consolidations,
  finalReport,
  joinCode = 'RETREAT2030',
  onLockSubmissions,
  onUnlock,
  onStartVoting,
  onFinalize,
  onNextStage,
  onAddParticipant,
  onRemoveParticipant,
  onStartSession,
  onAddConsolidation,
  onEditConsolidation,
  onMergeConsolidation,
}: GMGameViewProps) {
  const stageInfo = STAGE_INFO[currentStage] || STAGE_INFO.registration;
  const StageIcon = stageInfo.icon;

  if (currentStage === 'registration') {
    return (
      <div className='space-y-6'>
        <Card className='glass-card border-none'>
          <CardHeader>
            <div className='flex items-center justify-between flex-wrap gap-4'>
              <div>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='w-5 h-5 text-blue-400' />
                  Participant Management
                </CardTitle>
                <CardDescription>
                  Monitor and manage participant registration
                </CardDescription>
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='secondary'
                  size='sm'
                  className='gap-2'
                  onClick={onAddParticipant}
                  data-testid='button-add-participant'
                >
                  <Plus className='w-4 h-4' />
                  Add Participant
                </Button>
                <Button
                  className='gap-2'
                  onClick={onStartSession}
                  data-testid='button-start-session'
                >
                  <Play className='w-4 h-4' />
                  Start Session
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {players.map((player) => (
                <div
                  key={player.id}
                  className='flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10'
                  data-testid={`player-card-${player.id}`}
                >
                  <Avatar className='h-10 w-10'>
                    <AvatarFallback className='bg-brand-green/20 text-brand-bright-green'>
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium text-white truncate'>
                      {player.name}
                    </p>
                    <p className='text-sm text-muted-foreground truncate'>
                      {player.department}
                    </p>
                  </div>
                  <Badge variant='secondary' className='shrink-0'>
                    <CheckCircle className='w-3 h-3 mr-1' />
                    Ready
                  </Badge>
                  {onRemoveParticipant && (
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 shrink-0'
                      onClick={() => onRemoveParticipant(player.id)}
                      data-testid={`button-remove-${player.id}`}
                    >
                      <Trash2 className='w-4 h-4 text-muted-foreground' />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className='mt-6 p-4 bg-brand-green/10 rounded-lg border border-brand-green/20'>
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className='flex items-center gap-2 text-brand-bright-green'>
                  <CheckCircle className='w-5 h-5' />
                  <span className='font-medium'>
                    {players.length} participants registered
                  </span>
                </div>
                <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                  <span>
                    Join Code:{' '}
                    <span className='font-mono text-white'>{joinCode}</span>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStage === 'completed' && finalReport) {
    return (
      <div className='space-y-6'>
        <Card className='glass-card border-none bg-gradient-to-br from-brand-green/20 to-transparent'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-brand-green/20 rounded-lg'>
                <CheckCircle className='w-8 h-8 text-brand-bright-green' />
              </div>
              <div>
                <CardTitle className='text-2xl text-white'>
                  {finalReport.title}
                </CardTitle>
                <CardDescription>
                  Session completed successfully
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='p-4 bg-white/5 rounded-lg text-center'>
                <p className='text-3xl font-bold text-brand-bright-green'>
                  {finalReport.participants}
                </p>
                <p className='text-sm text-muted-foreground'>Participants</p>
              </div>
              <div className='p-4 bg-white/5 rounded-lg text-center'>
                <p className='text-3xl font-bold text-brand-bright-green'>
                  {finalReport.stagesCompleted}
                </p>
                <p className='text-sm text-muted-foreground'>Stages</p>
              </div>
              <div className='p-4 bg-white/5 rounded-lg text-center'>
                <p className='text-3xl font-bold text-brand-bright-green'>
                  {finalReport.totalSubmissions}
                </p>
                <p className='text-sm text-muted-foreground'>Submissions</p>
              </div>
              <div className='p-4 bg-white/5 rounded-lg text-center'>
                <p className='text-3xl font-bold text-brand-bright-green'>
                  {finalReport.consolidatedItems}
                </p>
                <p className='text-sm text-muted-foreground'>Consolidated</p>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-white'>
                Executive Summary
              </h3>
              <p className='text-muted-foreground'>
                {finalReport.executiveSummary}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-3'>
                <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
                  <TrendingUp className='w-5 h-5 text-blue-400' />
                  Key Findings
                </h3>
                <ul className='space-y-2'>
                  {finalReport.keyFindings.map((finding, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-2 text-sm text-muted-foreground'
                    >
                      <CheckCircle className='w-4 h-4 text-brand-bright-green mt-0.5 shrink-0' />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='space-y-3'>
                <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
                  <Target className='w-5 h-5 text-amber-400' />
                  Recommendations
                </h3>
                <ul className='space-y-2'>
                  {finalReport.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-2 text-sm text-muted-foreground'
                    >
                      <span className='text-brand-bright-green font-bold'>
                        {i + 1}.
                      </span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='flex gap-4 pt-4 flex-wrap'>
              <Button className='gap-2' data-testid='button-download-report'>
                <FileText className='w-4 h-4' />
                Download Full Report
              </Button>
              <Button
                variant='secondary'
                className='gap-2'
                data-testid='button-view-analytics'
              >
                <BarChart3 className='w-4 h-4' />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStage === 'reporting') {
    return (
      <div className='space-y-6'>
        <Card className='glass-card border-none'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <FileText className='w-5 h-5 text-amber-400' />
              Report Generation
            </CardTitle>
            <CardDescription>
              Consolidating all stage data into final strategic report
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              {[
                'obstacles',
                'challenges',
                'risks',
                'opportunities',
                'priorities',
                'goals',
                'partnerships',
                'services',
                'projects',
              ].map((stage, i) => {
                const info = STAGE_INFO[stage];
                const Icon = info.icon;
                return (
                  <div
                    key={stage}
                    className='flex items-center gap-4 p-3 bg-white/5 rounded-lg'
                  >
                    <div className='p-2 rounded-lg bg-white/10'>
                      <Icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div className='flex-1'>
                      <p className='font-medium text-white'>{info.title}</p>
                      <p className='text-sm text-muted-foreground'>
                        {3 + i} consolidated items
                      </p>
                    </div>
                    <Badge className='bg-brand-green/20 text-brand-bright-green border-brand-green/30'>
                      <CheckCircle className='w-3 h-3 mr-1' />
                      Complete
                    </Badge>
                    <Progress value={100} className='w-24 h-2' />
                  </div>
                );
              })}
            </div>
            <div className='p-4 bg-brand-green/10 rounded-lg border border-brand-green/20'>
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className='flex items-center gap-2 text-brand-bright-green'>
                  <CheckCircle className='w-5 h-5' />
                  <span className='font-medium'>
                    Report generation complete
                  </span>
                </div>
                <Button
                  className='gap-2'
                  onClick={onNextStage}
                  data-testid='button-view-final-report'
                >
                  <FileText className='w-4 h-4' />
                  View Final Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <Card className='glass-card border-none'>
        <CardHeader>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                <Settings className='w-5 h-5' />
                Stage Controls
              </CardTitle>
              <CardDescription>
                Manage the current stage workflow
              </CardDescription>
            </div>
            <div className='flex gap-2 flex-wrap'>
              {stagePhase === 'submissions' && (
                <>
                  <Button
                    variant='secondary'
                    size='sm'
                    className='gap-2'
                    data-testid='button-extend-time'
                  >
                    <Clock className='w-4 h-4' />
                    Extend Time
                  </Button>
                  <Button
                    className='gap-2'
                    onClick={onLockSubmissions}
                    data-testid='button-lock-submissions'
                  >
                    <Lock className='w-4 h-4' />
                    Lock Submissions
                  </Button>
                </>
              )}
              {stagePhase === 'consolidation' && (
                <>
                  <Button
                    variant='secondary'
                    size='sm'
                    className='gap-2'
                    onClick={onUnlock}
                    data-testid='button-unlock'
                  >
                    <Unlock className='w-4 h-4' />
                    Unlock
                  </Button>
                  <Button
                    className='gap-2'
                    onClick={onStartVoting}
                    data-testid='button-start-voting'
                  >
                    <Vote className='w-4 h-4' />
                    Start Voting
                  </Button>
                </>
              )}
              {stagePhase === 'voting' && (
                <>
                  <Button
                    variant='secondary'
                    size='sm'
                    className='gap-2'
                    data-testid='button-extend-voting'
                  >
                    <Clock className='w-4 h-4' />
                    Extend Voting
                  </Button>
                  <Button
                    className='gap-2'
                    onClick={onFinalize}
                    data-testid='button-finalize'
                  >
                    <CheckCircle className='w-4 h-4' />
                    Finalize & Next Stage
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4 flex-wrap'>
            <div className='flex-1 min-w-[200px]'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-sm text-muted-foreground'>
                  Current Phase:
                </span>
                <Badge
                  className={
                    stagePhase === 'submissions'
                      ? 'bg-blue-500/20 text-blue-400'
                      : stagePhase === 'consolidation'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-green-500/20 text-green-400'
                  }
                >
                  {stagePhase === 'submissions'
                    ? 'Collecting Submissions'
                    : stagePhase === 'consolidation'
                      ? 'Coordinator Consolidation'
                      : 'Voting in Progress'}
                </Badge>
              </div>
              <Progress
                value={
                  stagePhase === 'submissions'
                    ? 33
                    : stagePhase === 'consolidation'
                      ? 66
                      : 100
                }
                className='h-2'
              />
            </div>
            <div className='text-center px-4 border-l border-white/10'>
              <p className='text-2xl font-bold text-white'>
                {submissions.length}
              </p>
              <p className='text-xs text-muted-foreground'>Submissions</p>
            </div>
            <div className='text-center px-4 border-l border-white/10'>
              <p className='text-2xl font-bold text-white'>
                {consolidations.length}
              </p>
              <p className='text-xs text-muted-foreground'>Consolidated</p>
            </div>
            <div className='text-center px-4 border-l border-white/10'>
              <p className='text-2xl font-bold text-white'>
                {players.length}/{players.length}
              </p>
              <p className='text-xs text-muted-foreground'>Voted</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue='submissions' className='space-y-4'>
        <TabsList className='bg-white/5'>
          <TabsTrigger
            value='submissions'
            className='gap-2'
            data-testid='tab-submissions'
          >
            <Send className='w-4 h-4' />
            All Submissions ({submissions.length})
          </TabsTrigger>
          <TabsTrigger
            value='consolidation'
            className='gap-2'
            data-testid='tab-consolidation'
          >
            <Crown className='w-4 h-4' />
            Consolidation ({consolidations.length})
          </TabsTrigger>
          <TabsTrigger
            value='voting'
            className='gap-2'
            data-testid='tab-voting'
          >
            <Vote className='w-4 h-4' />
            Voting Results
          </TabsTrigger>
          <TabsTrigger
            value='participants'
            className='gap-2'
            data-testid='tab-participants'
          >
            <Users className='w-4 h-4' />
            Participant Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value='submissions' className='space-y-4'>
          <Card className='glass-card border-none'>
            <CardHeader>
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div>
                  <CardTitle>Expert Submissions</CardTitle>
                  <CardDescription>
                    Review all submissions from participants
                  </CardDescription>
                </div>
                <Badge
                  className={
                    stagePhase !== 'submissions'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }
                >
                  {stagePhase !== 'submissions' ? (
                    <Lock className='w-3 h-3 mr-1' />
                  ) : (
                    <Clock className='w-3 h-3 mr-1' />
                  )}
                  {stagePhase !== 'submissions' ? 'Locked' : 'Open'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {submissions.map((sub) => (
                  <Card
                    key={sub.id}
                    className='bg-white/5 border-white/10'
                    data-testid={`submission-card-${sub.id}`}
                  >
                    <CardContent className='pt-4'>
                      <div className='flex items-start gap-3 mb-3'>
                        <Avatar className='h-8 w-8'>
                          <AvatarFallback className='text-xs bg-brand-green/20'>
                            {sub.playerName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-white truncate'>
                            {sub.playerName}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            2 min ago
                          </p>
                        </div>
                        <Button variant='ghost' size='icon' className='h-7 w-7'>
                          <Eye className='w-4 h-4' />
                        </Button>
                      </div>
                      <h4 className='font-semibold text-white mb-2'>
                        {sub.title}
                      </h4>
                      <p className='text-sm text-muted-foreground line-clamp-2'>
                        {sub.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='consolidation' className='space-y-4'>
          <Card className='glass-card border-none'>
            <CardHeader>
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div>
                  <CardTitle>Consolidated Items</CardTitle>
                  <CardDescription>
                    Coordinator-merged items ready for voting
                  </CardDescription>
                </div>
                <Button
                  variant='secondary'
                  size='sm'
                  className='gap-2'
                  onClick={onAddConsolidation}
                  data-testid='button-add-consolidation'
                >
                  <Plus className='w-4 h-4' />
                  Add Consolidation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {consolidations.map((con) => (
                  <Card
                    key={con.id}
                    className='bg-white/5 border-white/10'
                    data-testid={`consolidation-card-${con.id}`}
                  >
                    <CardContent className='pt-4'>
                      <div className='flex items-start justify-between mb-3 gap-4'>
                        <div className='flex-1 min-w-0'>
                          <h4 className='font-semibold text-white mb-1'>
                            {con.title}
                          </h4>
                          <p className='text-sm text-muted-foreground'>
                            {con.description}
                          </p>
                        </div>
                        <div className='flex gap-2 shrink-0'>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8'
                            onClick={() => onEditConsolidation?.(con.id)}
                            data-testid={`button-edit-${con.id}`}
                          >
                            <Edit className='w-4 h-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8'
                            onClick={() => onMergeConsolidation?.(con.id)}
                            data-testid={`button-merge-${con.id}`}
                          >
                            <Merge className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                      {stagePhase === 'voting' && (
                        <div className='flex items-center gap-6 mt-4 pt-4 border-t border-white/10 flex-wrap'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm text-muted-foreground'>
                              Impact:
                            </span>
                            <span className='text-lg font-bold text-red-400'>
                              {con.avgImpact.toFixed(1)}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm text-muted-foreground'>
                              Probability:
                            </span>
                            <span className='text-lg font-bold text-blue-400'>
                              {con.avgProbability.toFixed(1)}
                            </span>
                          </div>
                          <Badge variant='secondary'>
                            {con.voteCount} votes
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='voting' className='space-y-4'>
          <Card className='glass-card border-none'>
            <CardHeader>
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div>
                  <CardTitle>Voting Results</CardTitle>
                  <CardDescription>
                    Impact and probability ratings from all participants
                  </CardDescription>
                </div>
                <Badge className='bg-brand-green/20 text-brand-bright-green'>
                  <CheckCircle className='w-3 h-3 mr-1' />
                  {consolidations.length > 0 ? 'Voting Complete' : 'No Data'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {consolidations.map((con) => {
                  const totalScore = con.avgImpact * con.avgProbability;
                  return (
                    <div
                      key={con.id}
                      className='p-4 bg-white/5 rounded-lg border border-white/10'
                      data-testid={`result-${con.id}`}
                    >
                      <div className='flex items-center justify-between mb-3 flex-wrap gap-2'>
                        <h4 className='font-semibold text-white'>
                          {con.title}
                        </h4>
                        <div className='flex items-center gap-2'>
                          <span className='text-2xl font-bold text-brand-bright-green'>
                            {totalScore.toFixed(1)}
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            Priority Score
                          </span>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <div className='flex items-center justify-between mb-1'>
                            <span className='text-sm text-muted-foreground'>
                              Impact
                            </span>
                            <span className='text-sm font-medium text-red-400'>
                              {con.avgImpact.toFixed(1)}/5
                            </span>
                          </div>
                          <Progress
                            value={con.avgImpact * 20}
                            className='h-2'
                          />
                        </div>
                        <div>
                          <div className='flex items-center justify-between mb-1'>
                            <span className='text-sm text-muted-foreground'>
                              Probability
                            </span>
                            <span className='text-sm font-medium text-blue-400'>
                              {con.avgProbability.toFixed(1)}/5
                            </span>
                          </div>
                          <Progress
                            value={con.avgProbability * 20}
                            className='h-2'
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='participants' className='space-y-4'>
          <Card className='glass-card border-none'>
            <CardHeader>
              <CardTitle>Participant Activity</CardTitle>
              <CardDescription>
                Track participant progress in this stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {players.map((player) => {
                  const playerSubs = submissions.filter(
                    (s) => s.playerId === player.id,
                  );
                  const hasVoted = player.status === 'voted';
                  return (
                    <div
                      key={player.id}
                      className='flex items-center gap-4 p-3 bg-white/5 rounded-lg flex-wrap'
                      data-testid={`participant-row-${player.id}`}
                    >
                      <Avatar className='h-10 w-10'>
                        <AvatarFallback className='bg-brand-green/20 text-brand-bright-green'>
                          {player.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1 min-w-[120px]'>
                        <p className='font-medium text-white'>{player.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          {player.department}
                        </p>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div className='text-center'>
                          <p className='text-lg font-bold text-white'>
                            {playerSubs.length}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            Submissions
                          </p>
                        </div>
                        <Badge
                          className={
                            hasVoted
                              ? 'bg-brand-green/20 text-brand-bright-green'
                              : 'bg-amber-500/20 text-amber-400'
                          }
                        >
                          {hasVoted ? (
                            <CheckCircle className='w-3 h-3 mr-1' />
                          ) : (
                            <Clock className='w-3 h-3 mr-1' />
                          )}
                          {hasVoted ? 'Voted' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
