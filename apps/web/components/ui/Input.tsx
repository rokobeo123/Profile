import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm text-white/60 font-medium">{label}</label>}
        <input
          ref={ref}
          className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-colors ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
