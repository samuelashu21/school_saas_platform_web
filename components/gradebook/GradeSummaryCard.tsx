"use client";

import { SubjectGrade } from "@/types/grade";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GradeSummaryCardProps {
  gradeData: SubjectGrade;
}

export function GradeSummaryCard({ gradeData }: GradeSummaryCardProps) {
  // Determine color matching for the score output
  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-emerald-600";
    if (score >= 70) return "bg-blue-600";
    if (score >= 50) return "bg-amber-500";
    return "bg-destructive";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold">{gradeData.subjectName}</CardTitle>
            <CardDescription className="text-xs">Instructor: {gradeData.teacherName}</CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-slate-900 dark:text-zinc-50">
              {gradeData.letterGrade}
            </span>
            <span className="text-xs text-muted-foreground font-mono">{gradeData.finalNumericScore}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Progress 
            value={gradeData.finalNumericScore} 
            className="h-2"
            indicatorClassName={getProgressColor(gradeData.finalNumericScore)} 
          />
        </div>
        
        <div className="space-y-1.5 pt-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Assessments</p>
          {gradeData.assessments.map((assessment) => (
            <div key={assessment.id} className="flex justify-between items-center text-xs border-b border-dashed py-1 last:border-0">
              <span className="text-slate-600 dark:text-zinc-400 font-medium">{assessment.name}</span>
              <span className="font-mono text-muted-foreground">
                {assessment.score}/{assessment.maxScore} <span className="text-[10px]">({assessment.weight}%)</span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}