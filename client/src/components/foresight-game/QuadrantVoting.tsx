import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Check, ArrowUp, ArrowRight } from 'lucide-react';

interface VotableItem {
  id: string;
  title: string;
  description?: string;
  avgImpact?: number;
  avgUncertainty?: number;
  voteCount?: number;
  myVote?: { impact: number; uncertainty: number };
}

interface QuadrantVotingProps {
  items: VotableItem[];
  onVote: (itemId: string, impact: number, uncertainty: number) => void;
  onSubmitAll?: () => void;
  readOnly?: boolean;
  showAverages?: boolean;
}

export function QuadrantVoting({
  items,
  onVote,
  onSubmitAll,
  readOnly = false,
  showAverages = false,
}: QuadrantVotingProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [tempVotes, setTempVotes] = useState<Record<string, { impact: number; uncertainty: number }>>({});

  const getItemPosition = (item: VotableItem) => {
    const vote = tempVotes[item.id] || item.myVote;
    if (!vote && !showAverages) return null;
    
    const impact = vote?.impact ?? item.avgImpact ?? 3;
    const uncertainty = vote?.uncertainty ?? item.avgUncertainty ?? 3;
    
    return {
      left: `${(impact - 1) * 25}%`,
      bottom: `${(uncertainty - 1) * 25}%`,
    };
  };

  const handleVoteChange = (itemId: string, field: 'impact' | 'uncertainty', value: number) => {
    setTempVotes(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        impact: prev[itemId]?.impact ?? 3,
        uncertainty: prev[itemId]?.uncertainty ?? 3,
        [field]: value,
      },
    }));
  };

  const handleConfirmVote = (itemId: string) => {
    const vote = tempVotes[itemId];
    if (vote) {
      onVote(itemId, vote.impact, vote.uncertainty);
      setActiveItem(null);
    }
  };

  const allVoted = items.every(item => item.myVote || tempVotes[item.id]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="relative aspect-square bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
          
          <div className="absolute left-2 bottom-1/2 text-xs text-muted-foreground transform -translate-y-4 flex items-center gap-1">
            <ArrowUp className="w-3 h-3" />
            High Uncertainty
          </div>
          <div className="absolute left-2 top-1/2 text-xs text-muted-foreground transform translate-y-4">
            Low Uncertainty
          </div>
          <div className="absolute bottom-2 left-1/2 text-xs text-muted-foreground transform translate-x-4 flex items-center gap-1">
            High Impact
            <ArrowRight className="w-3 h-3" />
          </div>
          <div className="absolute bottom-2 right-1/2 text-xs text-muted-foreground transform -translate-x-4">
            Low Impact
          </div>

          <div className="absolute top-2 left-2 text-xs font-medium text-amber-400">Monitor</div>
          <div className="absolute top-2 right-2 text-xs font-medium text-red-400">Critical Focus</div>
          <div className="absolute bottom-8 left-2 text-xs font-medium text-muted-foreground">Low Priority</div>
          <div className="absolute bottom-8 right-2 text-xs font-medium text-brand-bright-green">Strategic</div>

          {items.map((item, index) => {
            const position = getItemPosition(item);
            if (!position) return null;
            
            return (
              <div
                key={item.id}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                  activeItem === item.id 
                    ? 'ring-2 ring-brand-green scale-125 z-10' 
                    : 'hover:scale-110'
                } ${
                  item.myVote 
                    ? 'bg-brand-green text-white' 
                    : 'bg-blue-500 text-white'
                }`}
                style={{ left: position.left, bottom: position.bottom }}
                onClick={() => !readOnly && setActiveItem(item.id)}
                data-testid={`quadrant-item-${item.id}`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {items.map((item, index) => {
            const isActive = activeItem === item.id;
            const vote = tempVotes[item.id] || item.myVote;
            
            return (
              <Card 
                key={item.id} 
                className={`bg-white/5 border-white/10 transition-all ${
                  isActive ? 'ring-2 ring-brand-green' : ''
                }`}
                data-testid={`voting-card-${item.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      item.myVote 
                        ? 'bg-brand-green text-white' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white mb-1">{item.title}</h4>
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      )}
                      
                      {!readOnly && isActive && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Impact</span>
                              <Badge variant="secondary">{vote?.impact || 3}/5</Badge>
                            </div>
                            <Slider
                              value={[vote?.impact || 3]}
                              min={1}
                              max={5}
                              step={1}
                              onValueChange={([v]) => handleVoteChange(item.id, 'impact', v)}
                              data-testid={`slider-impact-${item.id}`}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Uncertainty</span>
                              <Badge variant="secondary">{vote?.uncertainty || 3}/5</Badge>
                            </div>
                            <Slider
                              value={[vote?.uncertainty || 3]}
                              min={1}
                              max={5}
                              step={1}
                              onValueChange={([v]) => handleVoteChange(item.id, 'uncertainty', v)}
                              data-testid={`slider-uncertainty-${item.id}`}
                            />
                          </div>
                          <Button 
                            className="w-full gap-2"
                            onClick={() => handleConfirmVote(item.id)}
                            data-testid={`button-confirm-vote-${item.id}`}
                          >
                            <Check className="w-4 h-4" />
                            Confirm Vote
                          </Button>
                        </div>
                      )}

                      {showAverages && item.avgImpact !== undefined && (
                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <span className="text-muted-foreground">
                            Avg Impact: <span className="text-white">{item.avgImpact?.toFixed(1)}</span>
                          </span>
                          <span className="text-muted-foreground">
                            Avg Uncertainty: <span className="text-white">{item.avgUncertainty?.toFixed(1)}</span>
                          </span>
                          <span className="text-muted-foreground">
                            Votes: <span className="text-white">{item.voteCount}</span>
                          </span>
                        </div>
                      )}

                      {item.myVote && !isActive && (
                        <div className="mt-2 flex items-center gap-2">
                          <Badge className="bg-brand-green/20 text-brand-bright-green">
                            Your vote: {item.myVote.impact}/{item.myVote.uncertainty}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {!readOnly && !isActive && !item.myVote && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveItem(item.id)}
                        data-testid={`button-vote-${item.id}`}
                      >
                        Vote
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {onSubmitAll && allVoted && (
        <div className="flex justify-center">
          <Button 
            size="md" 
            className="gap-2"
            onClick={onSubmitAll}
            data-testid="button-submit-all-votes"
          >
            <Check className="w-5 h-5" />
            Submit All Votes
          </Button>
        </div>
      )}
    </div>
  );
}
