import * as React from "react"
import { cn } from "../utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "danger" | "success" | "warning" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus"
  const variants = {
    default: "border-transparent bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-default)]",
    secondary: "border-transparent bg-[var(--color-accent-soft)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-soft)]",
    danger: "border-transparent bg-[var(--color-error)] text-white hover:opacity-80",
    success: "border-transparent bg-[var(--color-success)] text-white hover:opacity-80",
    warning: "border-transparent bg-[var(--color-warning)] text-white hover:opacity-80",
    outline: "text-[var(--color-text-primary)] border-[var(--color-border-default)]"
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
