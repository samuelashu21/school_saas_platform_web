"use client";

import { useState } from "react";
import { SubjectGrade } from "@/types/grade";
import { GradeSummaryCard } from "@/components/gradebook/GradeSummaryCard";
import { Button } from "@/components/ui/button";
import { Download, SlidersHorizontal, Award } from "lucide-react";

const mockGrades: SubjectGrade[] = [
  {
    id: "g1",
    subjectName: "Advanced Mathematics",
    teacherName: "Dr. Elizabeth Vance",
    finalNumericScore: 92.4,
    letterGrade: "A",
    assessments: [
      { id: "a1", name: "Calculus Exam 1", weight: 40, score: 37, maxScore: 40 },
      { id: "a2", name: "Trigonometry Project", weight: 30, score: 28, maxScore: 30 },
      { id: "a3", name: "Weekly Homework Avg", weight: 30, score: 27.4, maxScore: 30 },
    ]
  },
  {
    id: "g2",
    subjectName: "AP Honors Physics",
    teacherName: "Prof. Marcus Brody",
    finalNumericScore: 88.5,
    letterGrade: "B",
    assessments: [
      { id: "p1", name: "Thermodynamics Quiz", weight: 30, score: 25, maxScore: 30 },
      { id: "p2", name: "Lab Report: Momentum", weight: 30, score: 29, maxScore: 30 },
      { id: "p3", name: "Midterm Examination", weight: 40, score: 34.5, maxScore: 40 },
    ]
  },
  {
    id: "g3",
    subjectName: "English Literature & Composition",
    teacherName: "Sarah Jenkins",
    finalNumericScore: 74.2,
    letterGrade: "C",
    assessments: [
      { id: "e1", name: "Shakespearian Essay", weight: 50, score: 35, maxScore: 50 },
      { id: "e2", name: "Vocabulary Quiz 4", weight: 20, score: 18, maxScore: 20 },
      { id: "e3", name: "Oral Presentation", weight: 30, score: 21.2, maxScore: 30 },
    ]
  }
];

export default function GradesPage() {
  const [selectedTerm, setSelectedTerm] = useState("Semester 1 - Fall");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gradebook Ledger</h2>
          <p className="text-muted-foreground">Monitor real-time course configurations, assessment parameters, and grade evaluations.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Report Card
          </Button>
        </div>
      </div>

      {/* Overview Aggregation Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800/50 rounded-lg p-4 border flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-md text-primary">
          <Award className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wide">Calculated Term GPA</p>
          <p className="text-2xl font-black">3.67 <span className="text-sm font-normal text-muted-foreground">/ 4.00 Scale</span></p>
        </div>
      </div>

      {/* Control Selector Bar */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex gap-2">
          <select 
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="px-3 py-1.5 border rounded-md bg-card text-xs font-medium outline-none focus:ring-1 focus:ring-primary"
          >
            <option>Semester 1 - Fall</option>
            <option>Semester 2 - Spring</option>
          </select>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          <SlidersHorizontal className="mr-2 h-3.5 w-3.5" /> Structure View
        </Button>
      </div>

      {/* Subject Grades Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockGrades.map((grade) => (
          <GradeSummaryCard key={grade.id} gradeData={grade} />
        ))}
      </div>
    </div>
  );
}