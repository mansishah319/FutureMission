import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Users, 
  Lightbulb, 
  Target, 
  FileText,
  Clock,
  CheckCircle,
  Download,
  BarChart3
} from 'lucide-react';

interface MissionMetrics {
  participants: number;
  focalTopics: number;
  selectedTopics: number;
  challenges: number;
  prioritizedChallenges: number;
  reports: number;
  totalDuration: string;
  phasesCompleted: number;
}

interface TimelineEvent {
  phase: string;
  title: string;
  timestamp: string;
  description: string;
}

interface MissionCompleteProps {
  gameTitle: string;
  metrics: MissionMetrics;
  timeline: TimelineEvent[];
  keyOutputs: string[];
  onDownloadReport?: () => void;
  onViewAnalytics?: () => void;
}

export function MissionComplete({
  gameTitle,
  metrics,
  timeline,
  keyOutputs,
  onDownloadReport,
  onViewAnalytics,
}: MissionCompleteProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-green/20 ring-4 ring-brand-green/30">
          <Trophy className="w-10 h-10 text-brand-bright-green" />
        </div>
        <div>
          <Badge className="bg-brand-green/20 text-brand-bright-green text-sm mb-2">
            MISSION COMPLETE
          </Badge>
          <h1 className="text-3xl font-bold text-white">{gameTitle}</h1>
          <p className="text-muted-foreground mt-2">
            Strategic simulation concluded successfully
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{metrics.participants}</div>
            <div className="text-xs text-muted-foreground">Officers</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <Lightbulb className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{metrics.selectedTopics}/{metrics.focalTopics}</div>
            <div className="text-xs text-muted-foreground">Topics Selected</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{metrics.prioritizedChallenges}/{metrics.challenges}</div>
            <div className="text-xs text-muted-foreground">Challenges Prioritized</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <FileText className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{metrics.reports}</div>
            <div className="text-xs text-muted-foreground">Reports Generated</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              Mission Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-2.5 w-3 h-3 rounded-full bg-brand-green border-2 border-brand-navy" />
                    <div className="text-xs text-muted-foreground mb-1">{event.timestamp}</div>
                    <div className="font-medium text-white">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-bright-green" />
              Key Outputs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {keyOutputs.map((output, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-brand-bright-green shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{output}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4">
        {onDownloadReport && (
          <Button 
            className="gap-2" 
            onClick={onDownloadReport}
            data-testid="button-download-report"
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        )}
        {onViewAnalytics && (
          <Button 
            variant="secondary" 
            className="gap-2"
            onClick={onViewAnalytics}
            data-testid="button-view-analytics"
          >
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </Button>
        )}
      </div>
    </div>
  );
}
