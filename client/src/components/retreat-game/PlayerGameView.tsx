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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Send,
  Plus,
  Trash2,
  TrendingUp,
  BarChart3,
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
}

interface Submission {
  id: string;
  title: string;
  description: string;
}

interface Consolidation {
  id: string;
  title: string;
  description: string;
  avgImpact: number;
  avgProbability: number;
  voteCount: number;
  myVote?: { impact: number; probability: number };
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

interface PlayerGameViewProps {
  currentStage: string;
  stagePhase: 'submissions' | 'consolidation' | 'voting';
  currentPlayer: Expert;
  otherPlayers?: Expert[];
  mySubmissions: Submission[];
  consolidations: Consolidation[];
  finalReport?: FinalReport;
  maxSubmissions?: number;
  onSubmit?: (data: { title: string; description: string }) => void;
  onDeleteSubmission?: (id: string) => void;
  onVote?: (
    consolidationId: string,
    impact: number,
    probability: number,
  ) => void;
  onSubmitAllVotes?: () => void;
  isSubmitting?: boolean;
}

export function PlayerGameView({
  currentStage,
  stagePhase,
  currentPlayer,
  otherPlayers = [],
  mySubmissions,
  consolidations,
  finalReport,
  maxSubmissions = 3,
  onSubmit,
  onDeleteSubmission,
  onVote,
  onSubmitAllVotes,
  isSubmitting = false,
}: PlayerGameViewProps) {
  const [newSubmission, setNewSubmission] = useState({
    title: '',
    description: '',
  });
  const [playerVotes, setPlayerVotes] = useState<
    Record<string, { impact: number; probability: number }>
  >({});

  const stageInfo = STAGE_INFO[currentStage] || STAGE_INFO.registration;
  const StageIcon = stageInfo.icon;
  const canSubmitMore = mySubmissions.length < maxSubmissions;

  const handleSubmit = () => {
    if (newSubmission.title.trim() && onSubmit) {
      onSubmit(newSubmission);
      setNewSubmission({ title: '', description: '' });
    }
  };

  const handleVote = (
    itemId: string,
    type: 'impact' | 'probability',
    value: number,
  ) => {
    const newVotes = {
      ...playerVotes,
      [itemId]: {
        ...playerVotes[itemId],
        [type]: value,
      },
    };
    setPlayerVotes(newVotes);
    if (onVote && newVotes[itemId].impact && newVotes[itemId].probability) {
      onVote(itemId, newVotes[itemId].impact, newVotes[itemId].probability);
    }
  };

  if (currentStage === 'registration') {
    return (
      <div className='space-y-6'>
        <Card className='glass-card border-none bg-gradient-to-br from-brand-green/10 to-transparent'>
          <CardHeader className='text-center'>
            <div className='mx-auto p-4 bg-brand-green/20 rounded-full w-fit mb-4'>
              <CheckCircle className='w-12 h-12 text-brand-bright-green' />
            </div>
            <CardTitle className='text-2xl'>You're Registered!</CardTitle>
            <CardDescription>
              Waiting for the Game Master to start the session
            </CardDescription>
          </CardHeader>
          <CardContent className='text-center'>
            <div className='inline-flex items-center gap-3 p-4 bg-white/5 rounded-lg mb-6'>
              <Avatar className='h-12 w-12'>
                <AvatarFallback className='bg-brand-green/20 text-brand-bright-green'>
                  {currentPlayer.avatar}
                </AvatarFallback>
              </Avatar>
              <div className='text-left'>
                <p className='font-medium text-white'>{currentPlayer.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {currentPlayer.department}
                </p>
              </div>
            </div>
            <div className='flex items-center justify-center gap-2 text-muted-foreground'>
              <Clock className='w-4 h-4 animate-pulse' />
              <span>Waiting for session to begin...</span>
            </div>
            {otherPlayers.length > 0 && (
              <div className='mt-6 pt-6 border-t border-white/10'>
                <p className='text-sm text-muted-foreground mb-2'>
                  Other Participants
                </p>
                <div className='flex justify-center gap-2 flex-wrap'>
                  {otherPlayers.map((p) => (
                    <Avatar key={p.id} className='h-8 w-8'>
                      <AvatarFallback className='text-xs bg-white/10'>
                        {p.avatar}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            )}
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
                  Thank you for your participation!
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
                Download Report
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
        <Card className='glass-card border-none text-center'>
          <CardContent className='py-12'>
            <div className='mx-auto p-4 bg-amber-500/20 rounded-full w-fit mb-4'>
              <FileText className='w-12 h-12 text-amber-400' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-2'>
              Report Being Generated
            </h3>
            <p className='text-muted-foreground max-w-md mx-auto'>
              The Game Master is compiling the final strategic report
            </p>
            <div className='mt-6 p-4 bg-white/5 rounded-lg inline-block'>
              <p className='text-sm text-muted-foreground'>
                Your Contributions:{' '}
                <span className='text-white font-medium'>
                  {mySubmissions.length} submissions
                </span>
              </p>
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
          <div className='flex items-center gap-3'>
            <div className='p-3 rounded-lg bg-white/10'>
              <StageIcon className={`w-6 h-6 ${stageInfo.color}`} />
            </div>
            <div className='flex-1'>
              <CardTitle>{stageInfo.title}</CardTitle>
              <CardDescription>{stageInfo.question}</CardDescription>
            </div>
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
                ? 'Submit Ideas'
                : stagePhase === 'consolidation'
                  ? 'Awaiting Consolidation'
                  : 'Vote Now'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {stagePhase === 'submissions' && (
        <div className='space-y-6'>
          <Card className='glass-card border-none'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Plus className='w-5 h-5' />
                Add Your Submission
              </CardTitle>
              <CardDescription>
                You can submit up to {maxSubmissions} items (
                {mySubmissions.length}/{maxSubmissions} used)
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='text-sm text-muted-foreground mb-2 block'>
                  Title
                </label>
                <Input
                  placeholder='Enter a concise title...'
                  value={newSubmission.title}
                  onChange={(e) =>
                    setNewSubmission((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className='bg-white/5 border-white/10'
                  disabled={!canSubmitMore}
                  data-testid='input-submission-title'
                />
              </div>
              <div>
                <label className='text-sm text-muted-foreground mb-2 block'>
                  Description
                </label>
                <Textarea
                  placeholder='Provide details and context...'
                  value={newSubmission.description}
                  onChange={(e) =>
                    setNewSubmission((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className='bg-white/5 border-white/10 min-h-[100px]'
                  disabled={!canSubmitMore}
                  data-testid='input-submission-description'
                />
              </div>
              <Button
                className='w-full gap-2'
                onClick={handleSubmit}
                disabled={
                  !canSubmitMore || !newSubmission.title.trim() || isSubmitting
                }
                data-testid='button-submit-idea'
              >
                <Send className='w-4 h-4' />
                {isSubmitting ? 'Submitting...' : 'Submit Idea'}
              </Button>
            </CardContent>
          </Card>

          {mySubmissions.length > 0 && (
            <Card className='glass-card border-none'>
              <CardHeader>
                <CardTitle>Your Submissions</CardTitle>
                <CardDescription>
                  Items you've submitted for this stage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {mySubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className='p-4 bg-white/5 rounded-lg border border-white/10'
                      data-testid={`my-submission-${sub.id}`}
                    >
                      <div className='flex items-start justify-between gap-4'>
                        <div className='flex-1 min-w-0'>
                          <h4 className='font-medium text-white mb-1'>
                            {sub.title}
                          </h4>
                          <p className='text-sm text-muted-foreground'>
                            {sub.description}
                          </p>
                        </div>
                        {onDeleteSubmission && (
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 text-red-400 shrink-0'
                            onClick={() => onDeleteSubmission(sub.id)}
                            data-testid={`button-delete-${sub.id}`}
                          >
                            <Trash2 className='w-4 h-4' />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {stagePhase === 'consolidation' && (
        <Card className='glass-card border-none text-center'>
          <CardContent className='py-12'>
            <div className='mx-auto p-4 bg-amber-500/20 rounded-full w-fit mb-4'>
              <Clock className='w-12 h-12 text-amber-400 animate-pulse' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-2'>
              Submissions Locked
            </h3>
            <p className='text-muted-foreground max-w-md mx-auto'>
              The Coordinator is reviewing and consolidating all submissions.
              Voting will begin shortly.
            </p>
            <div className='mt-6 p-4 bg-white/5 rounded-lg inline-block'>
              <p className='text-sm text-muted-foreground'>
                Your submissions:{' '}
                <span className='text-white font-medium'>
                  {mySubmissions.length}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {stagePhase === 'voting' && (
        <div className='space-y-4'>
          <Card className='glass-card border-none'>
            <CardHeader>
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div>
                  <CardTitle className='flex items-center gap-2'>
                    <Vote className='w-5 h-5 text-green-400' />
                    Cast Your Votes
                  </CardTitle>
                  <CardDescription>
                    Rate each item on Impact (1-5) and Probability (1-5)
                  </CardDescription>
                </div>
                <Badge className='bg-green-500/20 text-green-400'>
                  {
                    Object.keys(playerVotes).filter(
                      (k) =>
                        playerVotes[k]?.impact && playerVotes[k]?.probability,
                    ).length
                  }
                  /{consolidations.length} Voted
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {consolidations.map((con) => {
            const myVote = playerVotes[con.id] ||
              con.myVote || { impact: 0, probability: 0 };
            return (
              <Card
                key={con.id}
                className='glass-card border-none'
                data-testid={`voting-card-${con.id}`}
              >
                <CardContent className='pt-6'>
                  <h4 className='font-semibold text-white mb-2'>{con.title}</h4>
                  <p className='text-sm text-muted-foreground mb-6'>
                    {con.description}
                  </p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='text-sm text-muted-foreground mb-3 block'>
                        Impact (1-5)
                      </label>
                      <div className='flex gap-2'>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Button
                            key={n}
                            variant='ghost'
                            size='sm'
                            className={`w-10 h-10 ${myVote.impact === n ? 'bg-red-500/30 text-red-400 border border-red-500/50' : 'bg-white/5'}`}
                            onClick={() => handleVote(con.id, 'impact', n)}
                            data-testid={`button-impact-${con.id}-${n}`}
                          >
                            {n}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className='text-sm text-muted-foreground mb-3 block'>
                        Probability (1-5)
                      </label>
                      <div className='flex gap-2'>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Button
                            key={n}
                            variant='ghost'
                            size='sm'
                            className={`w-10 h-10 ${myVote.probability === n ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50' : 'bg-white/5'}`}
                            onClick={() => handleVote(con.id, 'probability', n)}
                            data-testid={`button-probability-${con.id}-${n}`}
                          >
                            {n}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Button
            className='w-full gap-2'
            size='md'
            onClick={onSubmitAllVotes}
            data-testid='button-submit-votes'
          >
            <CheckCircle className='w-5 h-5' />
            Submit All Votes
          </Button>
        </div>
      )}
    </div>
  );
}
