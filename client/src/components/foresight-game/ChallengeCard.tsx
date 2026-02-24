import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Target, X } from 'lucide-react';
import type { SteepTheme, Challenge } from './types';
import { STEEP_THEMES } from './types';

const TIME_HORIZONS = [
  { value: 'short', label: '1-2 Years' },
  { value: 'medium', label: '3-5 Years' },
  { value: 'long', label: '5-10 Years' },
  { value: 'beyond', label: '10+ Years' },
];

const THEME_COLORS: Record<SteepTheme, string> = {
  Social: 'bg-pink-500/20 text-pink-400',
  Technological: 'bg-blue-500/20 text-blue-400',
  Economic: 'bg-green-500/20 text-green-400',
  Environmental: 'bg-emerald-500/20 text-emerald-400',
  Political: 'bg-purple-500/20 text-purple-400',
  Security: 'bg-red-500/20 text-red-400',
};

interface ChallengeCardProps {
  mode: 'input' | 'display';
  challenge?: Challenge;
  defaultTheme?: SteepTheme;
  onSubmit?: (data: {
    title: string;
    description: string;
    whyItMatters: string;
    timeHorizon: string;
    theme: SteepTheme;
  }) => void;
  onRemove?: (id: string) => void;
  isSubmitting?: boolean;
}

export function ChallengeCard({
  mode,
  challenge,
  defaultTheme,
  onSubmit,
  onRemove,
  isSubmitting = false,
}: ChallengeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    whyItMatters: '',
    timeHorizon: 'medium',
    theme: defaultTheme || 'Technological' as SteepTheme,
  });

  const handleSubmit = () => {
    if (formData.title.trim() && onSubmit) {
      onSubmit({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        whyItMatters: formData.whyItMatters.trim(),
      });
      setFormData({
        title: '',
        description: '',
        whyItMatters: '',
        timeHorizon: 'medium',
        theme: defaultTheme || 'Technological',
      });
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
              data-testid="button-add-challenge"
            >
              <Plus className="w-5 h-5" />
              Add a strategic challenge
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-bright-green" />
                <span className="font-medium text-white">New Challenge</span>
              </div>
              
              <Input
                placeholder="Challenge title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-white/5 border-white/20"
                data-testid="input-challenge-title"
              />
              
              <Textarea
                placeholder="Description - What is this challenge about?"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-white/5 border-white/20 min-h-[80px]"
                data-testid="input-challenge-description"
              />
              
              <Textarea
                placeholder="Why it matters - What makes this significant?"
                value={formData.whyItMatters}
                onChange={(e) => setFormData(prev => ({ ...prev, whyItMatters: e.target.value }))}
                className="bg-white/5 border-white/20 min-h-[60px]"
                data-testid="input-challenge-why"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Select
                  value={formData.theme}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, theme: v as SteepTheme }))}
                >
                  <SelectTrigger className="bg-white/5 border-white/20" data-testid="select-challenge-theme">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {STEEP_THEMES.map(theme => (
                      <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={formData.timeHorizon}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, timeHorizon: v }))}
                >
                  <SelectTrigger className="bg-white/5 border-white/20" data-testid="select-challenge-horizon">
                    <SelectValue placeholder="Time Horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_HORIZONS.map(h => (
                      <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={!formData.title.trim() || isSubmitting}
                  data-testid="button-submit-challenge"
                >
                  {isSubmitting ? 'Adding...' : 'Add Challenge'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsExpanded(false);
                    setFormData({
                      title: '',
                      description: '',
                      whyItMatters: '',
                      timeHorizon: 'medium',
                      theme: defaultTheme || 'Technological',
                    });
                  }}
                  data-testid="button-cancel-challenge"
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

  if (!challenge) return null;

  const themeColor = THEME_COLORS[challenge.theme] || 'bg-white/10 text-white';
  const horizonLabel = TIME_HORIZONS.find(h => h.value === challenge.timeHorizon)?.label || challenge.timeHorizon;

  return (
    <Card 
      className={`bg-white/5 border-white/10 transition-all ${
        challenge.status === 'selected' ? 'ring-2 ring-brand-green' : ''
      }`}
      data-testid={`challenge-card-${challenge.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-green/20 rounded-lg shrink-0">
            <Target className="w-4 h-4 text-brand-bright-green" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={themeColor}>{challenge.theme}</Badge>
              {challenge.timeHorizon && (
                <Badge variant="secondary">{horizonLabel}</Badge>
              )}
            </div>
            <h4 className="font-medium text-white">{challenge.title}</h4>
            {challenge.description && (
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
            )}
            {challenge.whyItMatters && (
              <p className="text-sm text-amber-400/80 italic">"{challenge.whyItMatters}"</p>
            )}
            {challenge.submitterName && (
              <p className="text-xs text-muted-foreground">
                by {challenge.submitterName}
              </p>
            )}
          </div>
          {challenge.status === 'selected' && (
            <Badge className="bg-brand-green/20 text-brand-bright-green shrink-0">
              Prioritized
            </Badge>
          )}
          {onRemove && (
            <Button
              size="icon"
              variant="ghost"
              className="shrink-0"
              onClick={() => onRemove(challenge.id)}
              data-testid={`button-remove-challenge-${challenge.id}`}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
