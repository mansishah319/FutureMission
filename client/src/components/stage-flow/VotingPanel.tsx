import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VotingPanelProps {
  itemId: string;
  itemTitle: string;
  onSubmitVote: (impact: number, probability: number) => void;
  isSubmitting?: boolean;
  hasVoted?: boolean;
  existingImpact?: number;
  existingProbability?: number;
}

export function VotingPanel({
  itemId,
  itemTitle,
  onSubmitVote,
  isSubmitting = false,
  hasVoted = false,
  existingImpact,
  existingProbability,
}: VotingPanelProps) {
  const [impact, setImpact] = useState(existingImpact || 3);
  const [probability, setProbability] = useState(existingProbability || 3);
  
  const handleSubmit = () => {
    onSubmitVote(impact, probability);
  };
  
  return (
    <Card className="w-full max-w-md" data-testid={`voting-panel-${itemId}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold line-clamp-2">
          {itemTitle}
        </CardTitle>
        {hasVoted && (
          <Badge variant="secondary" className="w-fit">
            <Check className="w-3 h-3 mr-1" />
            Voted
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-brand-navy" />
            <span className="text-sm font-medium">Impact</span>
            <Badge variant="outline" className="ml-auto">{impact}/5</Badge>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={`impact-${value}`}
                size="sm"
                variant={impact === value ? "primary" : "secondary"}
                className={cn(
                  "flex-1 h-10 text-lg font-bold min-w-8",
                  impact === value && "bg-brand-navy"
                )}
                onClick={() => setImpact(value)}
                disabled={hasVoted}
                data-testid={`impact-vote-${value}`}
              >
                {value}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            1 = Very Low, 5 = Very High
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-brand-green" />
            <span className="text-sm font-medium">Probability</span>
            <Badge variant="outline" className="ml-auto">{probability}/5</Badge>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={`probability-${value}`}
                size="sm"
                variant={probability === value ? "primary" : "secondary"}
                className={cn(
                  "flex-1 h-10 text-lg font-bold min-w-8",
                  probability === value && "bg-brand-green"
                )}
                onClick={() => setProbability(value)}
                disabled={hasVoted}
                data-testid={`probability-vote-${value}`}
              >
                {value}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            1 = Unlikely, 5 = Very Likely
          </p>
        </div>
        
        {!hasVoted && (
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
            data-testid="submit-vote-button"
          >
            {isSubmitting ? "Submitting..." : "Submit Vote"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
