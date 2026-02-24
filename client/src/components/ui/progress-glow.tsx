import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressGlowProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export function ProgressGlow({
  value,
  max = 100,
  className,
  showLabel = false,
  label,
}: ProgressGlowProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-muted-foreground'>{label}</span>
          <span className='text-sm font-medium text-dp-teal'>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className='progress-glow'>
        <div
          className='progress-glow-fill transition-all duration-500 ease-out'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
