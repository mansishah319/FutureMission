import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: 'green' | 'teal' | 'gold' | 'none';
  animate?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = 'none',
  animate = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card',
        glow === 'green' && 'glow-green',
        glow === 'teal' && 'glow-teal',
        glow === 'gold' && 'glow-gold',
        animate && 'animate-pulse-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
