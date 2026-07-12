import React from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)]",
      secondary: "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-default)]",
      ghost: "hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)]",
      outline: "border border-[var(--color-border-default)] bg-transparent hover:bg-[var(--color-background-secondary)] text-[var(--color-text-primary)]",
      danger: "bg-[var(--color-error)] text-white hover:opacity-90",
      icon: "p-2",
    };

    const sizes = {
      sm: "h-9 px-3",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], variant !== 'icon' && sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
