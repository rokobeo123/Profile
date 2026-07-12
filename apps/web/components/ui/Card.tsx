import * as React from "react";

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/5 border border-white/10 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col gap-1 mb-6 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-medium text-white ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-white/60 ${className}`}>
    {children}
  </p>
);
