import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Lightbulb, X } from 'lucide-react';

interface FocalTopicCardProps {
  mode: 'input' | 'display';
  topic?: {
    id: string;
    title: string;
    description?: string;
    submitterName?: string;
    status?: string;
  };
  onSubmit?: (title: string, description: string) => void;
  onRemove?: (id: string) => void;
  isSubmitting?: boolean;
}

export function FocalTopicCard({
  mode,
  topic,
  onSubmit,
  onRemove,
  isSubmitting = false,
}: FocalTopicCardProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (title.trim() && onSubmit) {
      onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  if (mode === 'input') {
    return (
      <Card className="bg-white/5 border-white/10 border-dashed">
        <CardContent className="p-4">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full flex items-center justify-center gap-2 py-6 text-muted-foreground hover:text-white transition-colors"
              data-testid="button-add-topic"
            >
              <Plus className="w-5 h-5" />
              Add a focal topic
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-brand-bright-green" />
                <span className="font-medium text-white">New Focal Topic</span>
              </div>
              <Input
                placeholder="What force will shape this future?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/5 border-white/20"
                data-testid="input-topic-title"
              />
              <Textarea
                placeholder="Brief description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/5 border-white/20 min-h-[60px]"
                data-testid="input-topic-description"
              />
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={!title.trim() || isSubmitting}
                  data-testid="button-submit-topic"
                >
                  {isSubmitting ? 'Adding...' : 'Add Topic'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsExpanded(false);
                    setTitle('');
                    setDescription('');
                  }}
                  data-testid="button-cancel-topic"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!topic) return null;

  return (
    <Card 
      className={`bg-white/5 border-white/10 transition-all ${
        topic.status === 'selected' ? 'ring-2 ring-brand-green' : ''
      }`}
      data-testid={`topic-card-${topic.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-green/20 rounded-lg shrink-0">
            <Lightbulb className="w-4 h-4 text-brand-bright-green" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-white mb-1">{topic.title}</h4>
            {topic.description && (
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            )}
            {topic.submitterName && (
              <p className="text-xs text-muted-foreground mt-2">
                by {topic.submitterName}
              </p>
            )}
          </div>
          {topic.status === 'selected' && (
            <Badge className="bg-brand-green/20 text-brand-bright-green shrink-0">
              Selected
            </Badge>
          )}
          {onRemove && (
            <Button
              size="icon"
              variant="ghost"
              className="shrink-0"
              onClick={() => onRemove(topic.id)}
              data-testid={`button-remove-topic-${topic.id}`}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
