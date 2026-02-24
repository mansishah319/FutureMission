import { CheckCircle2, Circle, Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export const RETREAT_STAGES = [
  { id: "registration", label: "Setup", icon: "users" },
  { id: "obstacles", label: "Obstacles", icon: "alert-triangle" },
  { id: "challenges", label: "Challenges", icon: "target" },
  { id: "risks", label: "Risks", icon: "alert-octagon" },
  { id: "opportunities", label: "Opportunities", icon: "lightbulb" },
  { id: "priorities", label: "Priorities", icon: "list-ordered" },
  { id: "goals", label: "Goals", icon: "trophy" },
  { id: "partnerships", label: "Partners", icon: "handshake" },
  { id: "services", label: "Services", icon: "settings" },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "reporting", label: "Report", icon: "file-text" },
  { id: "completed", label: "Done", icon: "check-circle" },
] as const;

interface StageProgressBarProps {
  currentStage: string;
  completedStages?: string[];
  lockedStages?: string[];
  onStageClick?: (stageId: string) => void;
  compact?: boolean;
}

export function StageProgressBar({
  currentStage,
  completedStages = [],
  lockedStages = [],
  onStageClick,
  compact = false,
}: StageProgressBarProps) {
  const currentIndex = RETREAT_STAGES.findIndex(s => s.id === currentStage);
  
  return (
    <div className="w-full" data-testid="stage-progress-bar">
      <div className={cn(
        "flex items-center gap-1",
        compact ? "justify-between" : "justify-start flex-wrap gap-2"
      )}>
        {RETREAT_STAGES.map((stage, index) => {
          const isCompleted = completedStages.includes(stage.id) || index < currentIndex;
          const isCurrent = stage.id === currentStage;
          const isLocked = lockedStages.includes(stage.id);
          const isUpcoming = index > currentIndex;
          
          return (
            <div
              key={stage.id}
              className={cn(
                "flex items-center gap-1 cursor-pointer transition-all",
                compact ? "flex-col" : "flex-row",
                isUpcoming && "opacity-40"
              )}
              onClick={() => !isLocked && onStageClick?.(stage.id)}
              data-testid={`stage-${stage.id}`}
            >
              <div className={cn(
                "flex items-center justify-center rounded-full transition-all",
                compact ? "w-8 h-8" : "w-10 h-10",
                isCompleted && "bg-brand-green text-white",
                isCurrent && !isCompleted && "bg-brand-navy text-white ring-2 ring-brand-green ring-offset-2",
                isUpcoming && "bg-muted text-muted-foreground",
                isLocked && "bg-amber-500/20 text-amber-600"
              )}>
                {isLocked ? (
                  <Lock className={compact ? "w-3 h-3" : "w-4 h-4"} />
                ) : isCompleted ? (
                  <CheckCircle2 className={compact ? "w-4 h-4" : "w-5 h-5"} />
                ) : isCurrent ? (
                  <Clock className={compact ? "w-3 h-3" : "w-4 h-4"} />
                ) : (
                  <Circle className={compact ? "w-3 h-3" : "w-4 h-4"} />
                )}
              </div>
              
              {!compact && (
                <span className={cn(
                  "text-xs font-medium",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {stage.label}
                </span>
              )}
              
              {index < RETREAT_STAGES.length - 1 && !compact && (
                <div className={cn(
                  "w-8 h-0.5 mx-1",
                  isCompleted ? "bg-brand-green" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>
      
      {compact && (
        <div className="text-center mt-2">
          <span className="text-sm font-medium text-foreground">
            {RETREAT_STAGES.find(s => s.id === currentStage)?.label || currentStage}
          </span>
        </div>
      )}
    </div>
  );
}
