import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary: "bg-white text-black hover:bg-white/90",
      secondary: "bg-white/10 text-white hover:bg-white/20",
      danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20",
      ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
