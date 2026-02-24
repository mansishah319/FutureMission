import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Participant } from './types';

interface PresenceListProps {
  participants: Participant[];
  showStatus?: boolean;
  compact?: boolean;
}

const STATUS_COLORS: Record<Participant['status'], string> = {
  joined: 'bg-blue-500',
  typing: 'bg-amber-500 animate-pulse',
  submitted: 'bg-brand-green',
  idle: 'bg-white/30',
};

const STATUS_LABELS: Record<Participant['status'], string> = {
  joined: 'Joined',
  typing: 'Typing...',
  submitted: 'Submitted',
  idle: 'Idle',
};

export function PresenceList({ 
  participants, 
  showStatus = true,
  compact = false 
}: PresenceListProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <div className="flex -space-x-2">
          {participants.slice(0, 5).map((p) => (
            <Avatar key={p.id} className="w-8 h-8 border-2 border-brand-navy">
              <AvatarFallback className="bg-brand-green/20 text-brand-bright-green text-xs">
                {p.avatar}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        {participants.length > 5 && (
          <span className="text-sm text-muted-foreground ml-2">
            +{participants.length - 5} more
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Strategic Officers ({participants.length})
        </span>
      </div>
      <div className="grid gap-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-3 p-2 bg-white/5 rounded-lg"
            data-testid={`participant-${participant.id}`}
          >
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-brand-green/20 text-brand-bright-green">
                  {participant.avatar}
                </AvatarFallback>
              </Avatar>
              {showStatus && (
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-brand-navy ${STATUS_COLORS[participant.status]}`}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {participant.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {participant.department}
              </p>
            </div>
            {showStatus && (
              <Badge 
                variant="secondary" 
                className={`text-xs ${
                  participant.status === 'submitted' 
                    ? 'bg-brand-green/20 text-brand-bright-green' 
                    : participant.status === 'typing'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-white/10'
                }`}
              >
                {STATUS_LABELS[participant.status]}
              </Badge>
            )}
            {participant.assignedTheme && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                {participant.assignedTheme}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
