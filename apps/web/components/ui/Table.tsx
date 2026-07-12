import * as React from "react";

export const Table = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/5 border border-white/10 rounded-xl overflow-x-auto ${className}`}>
    <table className="w-full text-left border-collapse">
      {children}
    </table>
  </div>
);

export const Thead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-black/20 border-b border-white/10 text-white/60 text-sm">
    {children}
  </thead>
);

export const Th = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`p-4 font-medium whitespace-nowrap ${className}`}>
    {children}
  </th>
);

export const Tbody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-white/5">
    {children}
  </tbody>
);

export const Tr = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <tr className={`hover:bg-white/5 transition-colors ${className}`}>
    {children}
  </tr>
);

export const Td = ({ children, className = "", ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`p-4 ${className}`} {...props}>
    {children}
  </td>
);
