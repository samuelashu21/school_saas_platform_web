"use client";

import { EnrollmentDistribution } from "@/types/analytics";

interface AnalyticsDistributionChartProps {
  data: EnrollmentDistribution[];
}

export function AnalyticsDistributionChart({ data }: AnalyticsDistributionChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = (item.count / maxCount) * 100;
        
        return (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span>{item.department}</span>
              <span className="text-muted-foreground font-mono">{item.count} Students</span>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}