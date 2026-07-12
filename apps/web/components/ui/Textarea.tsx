import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm text-white/60 font-medium">{label}</label>}
        <textarea
          ref={ref}
          className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-colors min-h-[100px] resize-y ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
