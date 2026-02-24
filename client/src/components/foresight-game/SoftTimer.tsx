import { useState, useEffect } from 'react';
import { Clock, Hand, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SoftTimerProps {
  timeRemaining: number;
  totalTime: number;
  status: 'normal' | 'warning' | 'critical' | 'paused';
  onRequestExtension?: (reason: string) => void;
  showExtensionButton?: boolean;
  extensionPending?: boolean;
}

const EXTENSION_REASONS = [
  { id: 'refining', label: 'Refining idea' },
  { id: 'discussion', label: 'Team discussion' },
  { id: 'clarity', label: 'Needs clarity' },
  { id: 'complex', label: 'Complex analysis' },
];

export function SoftTimer({
  timeRemaining,
  totalTime,
  status,
  onRequestExtension,
  showExtensionButton = true,
  extensionPending = false,
}: SoftTimerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progress = (timeRemaining / totalTime) * 100;

  const getTimerColors = () => {
    switch (status) {
      case 'critical':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-500/50',
          text: 'text-red-400',
          ring: 'ring-red-500/30',
          progress: 'bg-red-500',
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/20',
          border: 'border-amber-500/50',
          text: 'text-amber-400',
          ring: 'ring-amber-500/30',
          progress: 'bg-amber-500',
        };
      case 'paused':
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/50',
          text: 'text-blue-400',
          ring: 'ring-blue-500/30',
          progress: 'bg-blue-500',
        };
      default:
        return {
          bg: 'bg-brand-green/20',
          border: 'border-brand-green/50',
          text: 'text-brand-bright-green',
          ring: 'ring-brand-green/30',
          progress: 'bg-brand-green',
        };
    }
  };

  const colors = getTimerColors();

  const handleRequestExtension = () => {
    if (onRequestExtension && selectedReason) {
      onRequestExtension(selectedReason);
      setIsDialogOpen(false);
      setSelectedReason('');
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${colors.bg} ${colors.border} border`}>
      <div className="relative">
        <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center ring-2 ${colors.ring}`}>
          <Clock className={`w-5 h-5 ${colors.text}`} />
        </div>
        <svg className="absolute inset-0 w-12 h-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-white/10"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${progress * 1.256} 125.6`}
            className={colors.text}
          />
        </svg>
      </div>

      <div className="flex-1">
        <div className={`text-2xl font-mono font-bold ${colors.text}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="text-xs text-muted-foreground">
          {status === 'paused' ? 'Timer Paused' : status === 'critical' ? 'Time Critical' : 'Time Remaining'}
        </div>
      </div>

      {status === 'critical' && (
        <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
      )}

      {showExtensionButton && onRequestExtension && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              disabled={extensionPending}
              data-testid="button-request-extension"
            >
              <Hand className="w-4 h-4" />
              <span className="hidden md:inline">
                {extensionPending ? 'Requested' : 'Request More Time'}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-brand-navy border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Continue Analysis</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select a reason for requesting additional time:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {EXTENSION_REASONS.map((reason) => (
                  <Button
                    key={reason.id}
                    variant={selectedReason === reason.id ? 'primary' : 'ghost'}
                    className="justify-start"
                    onClick={() => setSelectedReason(reason.id)}
                    data-testid={`button-reason-${reason.id}`}
                  >
                    {reason.label}
                  </Button>
                ))}
              </div>
              <Button
                className="w-full"
                onClick={handleRequestExtension}
                disabled={!selectedReason}
                data-testid="button-submit-extension"
              >
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {extensionPending && (
        <Badge variant="secondary" className="bg-amber-500/20 text-amber-400">
          Pending
        </Badge>
      )}
    </div>
  );
}
