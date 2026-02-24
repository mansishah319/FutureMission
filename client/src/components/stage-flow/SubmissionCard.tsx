import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Trash2, Edit2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionCardProps {
  id: string;
  title: string;
  description?: string | null;
  playerName: string;
  playerDepartment?: string;
  theme?: string | null;
  status?: string;
  isOwner?: boolean;
  isSelected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onSelect?: () => void;
  showActions?: boolean;
}

export function SubmissionCard({
  id,
  title,
  description,
  playerName,
  playerDepartment,
  theme,
  status = "active",
  isOwner = false,
  isSelected = false,
  onEdit,
  onDelete,
  onSelect,
  showActions = true,
}: SubmissionCardProps) {
  const isMerged = status === "merged";
  
  return (
    <Card 
      className={cn(
        "relative transition-all hover-elevate",
        isSelected && "ring-2 ring-brand-green",
        isMerged && "opacity-50"
      )}
      data-testid={`submission-card-${id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold text-sm line-clamp-2 flex-1">{title}</h4>
          
          {onSelect && (
            <Button
              size="icon"
              variant={isSelected ? "primary" : "secondary"}
              className="h-6 w-6 min-w-6 shrink-0"
              onClick={onSelect}
              data-testid={`select-submission-${id}`}
            >
              {isSelected ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
            </Button>
          )}
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span className="truncate max-w-[100px]">{playerName}</span>
          </div>
          
          {theme && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {theme}
            </Badge>
          )}
        </div>
        
        {isMerged && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 text-[10px]"
          >
            Merged
          </Badge>
        )}
        
        {showActions && isOwner && !isMerged && (
          <div className="flex items-center gap-1 mt-3 pt-2 border-t">
            {onEdit && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={onEdit}
                data-testid={`edit-submission-${id}`}
              >
                <Edit2 className="w-3 h-3 mr-1" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-destructive"
                onClick={onDelete}
                data-testid={`delete-submission-${id}`}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
