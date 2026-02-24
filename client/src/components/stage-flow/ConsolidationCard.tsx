import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BarChart2, Trophy, Check, Merge } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsolidationCardProps {
  id: string;
  title: string;
  description?: string | null;
  groupName?: string | null;
  coordinatorName?: string;
  mergedCount: number;
  avgImpact?: number | null;
  avgProbability?: number | null;
  totalVotes?: number;
  rank?: number | null;
  isSelected?: boolean;
  onSelect?: () => void;
  onVote?: () => void;
  showVoting?: boolean;
}

export function ConsolidationCard({
  id,
  title,
  description,
  groupName,
  coordinatorName,
  mergedCount,
  avgImpact,
  avgProbability,
  totalVotes = 0,
  rank,
  isSelected = false,
  onSelect,
  onVote,
  showVoting = false,
}: ConsolidationCardProps) {
  const score = (avgImpact && avgProbability) 
    ? ((avgImpact + avgProbability) / 2).toFixed(1)
    : null;
    
  return (
    <Card 
      className={cn(
        "relative transition-all hover-elevate",
        isSelected && "ring-2 ring-brand-green bg-brand-green/5",
        rank && rank <= 3 && "border-amber-500/30"
      )}
      data-testid={`consolidation-card-${id}`}
    >
      {rank && rank <= 3 && (
        <div className="absolute -top-2 -left-2 z-10">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
            rank === 1 && "bg-yellow-500 text-white",
            rank === 2 && "bg-gray-400 text-white",
            rank === 3 && "bg-amber-700 text-white"
          )}>
            <Trophy className="w-4 h-4" />
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-semibold line-clamp-2">
            {title}
          </CardTitle>
          
          {onSelect && (
            <Button
              size="icon"
              variant={isSelected ? "primary" : "secondary"}
              className="h-6 w-6 min-w-6 shrink-0"
              onClick={onSelect}
              data-testid={`select-consolidation-${id}`}
            >
              <Check className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        {groupName && (
          <Badge variant="secondary" className="w-fit text-xs">
            {groupName}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="pb-4">
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
        )}
        
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Merge className="w-3 h-3" />
            <span>{mergedCount} merged</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{totalVotes} votes</span>
          </div>
          
          {score && (
            <div className="flex items-center gap-1 ml-auto">
              <BarChart2 className="w-3 h-3 text-brand-green" />
              <span className="font-semibold text-brand-green">{score}</span>
            </div>
          )}
        </div>
        
        {(avgImpact || avgProbability) && (
          <div className="flex items-center gap-4 mt-3 pt-2 border-t">
            {avgImpact && (
              <div className="flex-1">
                <span className="text-[10px] text-muted-foreground block">Impact</span>
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-navy rounded-full"
                      style={{ width: `${(avgImpact / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{avgImpact.toFixed(1)}</span>
                </div>
              </div>
            )}
            
            {avgProbability && (
              <div className="flex-1">
                <span className="text-[10px] text-muted-foreground block">Probability</span>
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-green rounded-full"
                      style={{ width: `${(avgProbability / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{avgProbability.toFixed(1)}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {showVoting && onVote && (
          <Button
            size="sm"
            variant="secondary"
            className="w-full mt-3"
            onClick={onVote}
            data-testid={`vote-consolidation-${id}`}
          >
            <BarChart2 className="w-3 h-3 mr-1" />
            Vote
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
