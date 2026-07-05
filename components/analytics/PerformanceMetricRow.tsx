"use client";

import { PerformanceDemographic } from "@/types/analytics";

interface PerformanceMetricRowProps {
  demographic: PerformanceDemographic;
}

export function PerformanceMetricRow({ demographic }: PerformanceMetricRowProps) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-0">
      <div>
        <h4 className="text-sm font-semibold">{demographic.cohortName}</h4>
        <p className="text-xs text-muted-foreground">Total Cohort: {demographic.totalStudents}</p>
      </div>
      <div className="flex items-center gap-6 text-right">
        <div>
          <p className="text-xs text-muted-foreground">Avg Score</p>
          <p className="text-sm font-mono font-bold">{demographic.averageScore}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Passing Rate</p>
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ${
            demographic.passingRate >= 90 
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" 
              : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
          }`}>
            {demographic.passingRate}%
          </span>
        </div>
      </div>
    </div>
  );
}