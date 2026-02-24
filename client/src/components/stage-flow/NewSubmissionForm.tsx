import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

const THEMES = [
  "Technology",
  "Social", 
  "Economic",
  "Environmental",
  "Political",
  "Security"
] as const;

interface NewSubmissionFormProps {
  stageProgressId: string;
  tableId: string;
  playerId: string;
  stageName: string;
  maxSubmissions: number;
  currentCount: number;
  onSubmit: (data: { title: string; description: string; theme?: string }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function NewSubmissionForm({
  stageProgressId,
  tableId,
  playerId,
  stageName,
  maxSubmissions,
  currentCount,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: NewSubmissionFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState<string | undefined>();
  
  const canSubmit = title.trim().length > 0 && currentCount < maxSubmissions;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      theme,
    });
  };
  
  const remainingSlots = maxSubmissions - currentCount;
  
  return (
    <Card className="border-dashed" data-testid="new-submission-form">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Add {stageName}</CardTitle>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={onCancel}
            data-testid="cancel-submission-button"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {remainingSlots} of {maxSubmissions} slots remaining
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="title" className="text-xs">Title</Label>
            <Input
              id="title"
              placeholder={`Enter ${stageName.toLowerCase()} title...`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              data-testid="submission-title-input"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-xs">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={500}
              className="resize-none"
              data-testid="submission-description-input"
            />
          </div>
          
          <div>
            <Label htmlFor="theme" className="text-xs">Theme (optional)</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger data-testid="submission-theme-select">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                {THEMES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="flex-1"
              disabled={!canSubmit || isSubmitting}
              data-testid="submit-submission-button"
            >
              <Plus className="w-3 h-3 mr-1" />
              {isSubmitting ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
