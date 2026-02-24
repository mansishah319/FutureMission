import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------
   BUTTON VARIANTS – STRICTLY FOLLOWING DESIGN GUIDE
------------------------------------------------------------ */

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center cursor-pointer',
    'whitespace-nowrap font-medium',
    'rounded-md',
    'disabled:pointer-events-none',
    'disabled:opacity-40',
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
    // RTL icon swap
    'rtl:flex-row-reverse',
  ].join(' '),
  {
    variants: {
      variant: {
        /* ---------------- PRIMARY ---------------- */
        primary: [
          'bg-primary text-primary-foreground',
          'border border-primary',
          'hover:bg-primary-hover',
          'active:bg-primary-active',
          // 'disabled:bg-muted disabled:border-muted',
        ].join(' '),

        /* ---------------- SECONDARY ---------------- */
        secondary: [
          'bg-transparent text-primary',
          'border border-primary',
          'hover:bg-primary/5',
          'active:bg-primary/10',
          // 'disabled:border-muted disabled:text-muted-foreground',
        ].join(' '),

        /* ---------------- TERTIARY ---------------- */
        tertiary: [
          'bg-primary/10 text-primary',
          'border border-transparent',
          'hover:bg-primary/15',
          'active:bg-primary/20',
          // 'disabled:bg-muted disabled:text-muted-foreground',
        ].join(' '),

        /* ---------------- TEXT ---------------- */
        text: [
          'bg-transparent text-primary',
          'border border-transparent',
          'hover:bg-primary/10',
          'active:bg-primary/15',
          // 'disabled:text-muted-foreground',
        ].join(' '),

        /* ---------------- FAB ---------------- */
        fab: [
          'rounded-full',
          'bg-primary text-primary-foreground',
          'hover:bg-primary-hover',
          'active:bg-primary-active',
          // 'disabled:shadow-none',
        ].join(' '),
        ghost: [
          'bg-transparent',
          'border-transparent',
          'hover:bg-transparent/5',
          'active:bg-transparent/10',
          // 'disabled:border-muted disabled:text-muted-foreground',
        ],
      },

      size: {
        /* ---------------- MD ---------------- */
        md: [
          'h-12 min-w-[92px]',
          'px-8',
          'text-sm',
          '[&_svg]:size-5',
          'gap-2',
        ].join(' '),

        /* ---------------- SM ---------------- */
        sm: [
          'h-10 min-w-[75px]',
          'px-6',
          'text-xs',
          '[&_svg]:size-4',
          'gap-2',
        ].join(' '),

        /* ---------------- XS ---------------- */
        xs: [
          'h-9 min-w-[70px]',
          'px-5',
          'text-xs',
          '[&_svg]:size-4',
          'gap-1.5',
        ].join(' '),

        /* ---------------- ICON ONLY ---------------- */
        icon: ['h-12 w-12', 'p-0'].join(' '),

        /* ---------------- FAB SIZES ---------------- */
        'fab-md': 'h-12 w-12 text-sm',
        'fab-sm': 'h-10 w-10 text-xs',
        'fab-xs': 'h-9 w-9 text-xs',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/* ------------------------------------------------------------
   TYPES
------------------------------------------------------------ */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/* ------------------------------------------------------------
   COMPONENT
------------------------------------------------------------ */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
