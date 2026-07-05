"use client";

import { useState } from "react";
import { StudentTranscript } from "@/types/transcript";
import { OfficialTranscriptView } from "@/components/transcript/OfficialTranscriptView";
import { Button } from "@/components/ui/button";
import { Printer, ShieldAlert, FileSearch } from "lucide-react";

const mockTranscript: StudentTranscript = {
  studentId: "STU-2026-001",
  fullName: "Alice Smith",
  enrollmentDate: "2024-09-01",
  cumulativeGpa: 3.86,
  totalCreditsEarned: 24.0,
  terms: [
    {
      termName: "Fall 2025 Semester",
      gpa: 3.90,
      creditsAttempted: 12.0,
      creditsEarned: 12.0,
      courses: [
        { courseCode: "MATH-401", courseName: "Advanced Calculus & Real Analysis", credits: 4.0, grade: "A" },
        { courseCode: "PHYS-302", courseName: "Quantum Mechanics Foundations", credits: 4.0, grade: "A-" },
        { courseCode: "LIT-201", courseName: "Shakespearian Literature Systems", credits: 4.0, grade: "A" }
      ]
    },
    {
      termName: "Spring 2025 Semester",
      gpa: 3.82,
      creditsAttempted: 12.0,
      creditsEarned: 12.0,
      courses: [
        { courseCode: "MATH-302", courseName: "Linear Algebra Fundamentals", credits: 4.0, grade: "B+" },
        { courseCode: "PHYS-301", courseName: "Classical Thermodynamics", credits: 4.0, grade: "A" },
        { courseCode: "COMP-102", courseName: "Data Structures & Algorithmic Design", credits: 4.0, grade: "A" }
      ]
    }
  ]
};

export default function TranscriptsPage() {
  const [searchTarget, setSearchTarget] = useState("STU-2026-001");
  const [activeTranscript, setActiveTranscript] = useState<StudentTranscript | null>(mockTranscript);

  const triggerBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:m-0 print:p-0">
      {/* Configuration Header Elements */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transcript Generator</h2>
          <p className="text-muted-foreground">Audit historic terminal performance data and compile signed official academic files.</p>
        </div>
        <Button onClick={triggerBrowserPrint} className="shrink-0 shadow-sm">
          <Printer className="mr-2 h-4 w-4" /> Print Transcript / Save PDF
        </Button>
      </div>

      {/* Target Search Profile Input Bar */}
      <div className="flex items-center gap-2 max-w-md print:hidden">
        <div className="relative flex-1">
          <FileSearch className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search student ID..." 
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="secondary">Load Record</Button>
      </div>

      {/* Security alert notification bar */}
      <div className="bg-amber-50 dark:bg-zinc-900 border border-amber-200 dark:border-zinc-800 p-3 rounded-md flex items-start gap-3 print:hidden">
        <ShieldAlert className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-900 dark:text-zinc-400 leading-normal">
          <strong>Security Notice:</strong> Generation tracking pipelines monitor and stamp this profile view. Use the layout settings tool below to strip system metadata filters before rendering physical client hardcopies.
        </p>
      </div>

      {/* Document View Area */}
      {activeTranscript ? (
        <div className="max-w-4xl mx-auto border rounded-xl bg-card p-4 print:border-0 print:p-0 print:bg-transparent">
          <OfficialTranscriptView data={activeTranscript} />
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
          Query an active identifier to preview official registrar transcript engines.
        </div>
      )}
    </div>
  );
}