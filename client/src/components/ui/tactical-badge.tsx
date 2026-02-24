import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface TacticalBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}

export function TacticalBadge({ children, variant = 'default', className, pulse = false }: TacticalBadgeProps) {
  const variantClasses: Record<BadgeVariant, string> = {
    default: 'badge-tactical',
    success: 'badge-tactical',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'bg-dp-teal/20 border border-dp-teal/40 text-dp-cyan',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
        variantClasses[variant],
        pulse && 'animate-pulse',
        className
      )}
    >
      {children}
    </span>
  );
}
