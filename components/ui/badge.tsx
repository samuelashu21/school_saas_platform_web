// components/ui/badge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface LocalBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}
 
export function Badge({ children, variant = "default", className }: LocalBadgeProps) {
  const styles = {
    default: "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
    destructive: "bg-red-500 text-slate-50 dark:bg-red-900 dark:text-slate-50",
    outline: "text-slate-950 border border-slate-200 dark:text-slate-50 dark:border-slate-800"
  };

  return (
    <span className={cn("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors", styles[variant], className)}>
      {children}
    </span>
  );
}