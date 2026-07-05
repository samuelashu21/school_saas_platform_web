"use client";

import { StudentTranscript } from "@/types/transcript";

interface OfficialTranscriptViewProps {
  data: StudentTranscript;
}

export function OfficialTranscriptView({ data }: OfficialTranscriptViewProps) {
  return (
    <div className="bg-white text-zinc-950 p-8 border rounded-lg shadow-sm print:border-0 print:shadow-none print:p-0">
      {/* Official Institutional Header */}
      <div className="text-center space-y-2 border-b-2 border-zinc-900 pb-6">
        <h3 className="text-xl font-black uppercase tracking-wider">EduManage Academic Institution</h3>
        <p className="text-xs font-mono text-zinc-500">Office of the Registrar • Official Academic Transcript Record</p>
      </div>

      {/* Student Profile Identity Section */}
      <div className="grid grid-cols-2 gap-4 my-6 text-sm border-b pb-4">
        <div className="space-y-1">
          <p><span className="font-semibold text-zinc-500">Student Name:</span> {data.fullName}</p>
          <p><span className="font-semibold text-zinc-500">Student ID:</span> <span className="font-mono">{data.studentId}</span></p>
        </div>
        <div className="space-y-1 text-right">
          <p><span className="font-semibold text-zinc-500">Cumulative GPA:</span> <span className="font-bold">{data.cumulativeGpa.toFixed(2)}</span></p>
          <p><span className="font-semibold text-zinc-500">Total Credits:</span> {data.totalCreditsEarned}</p>
        </div>
      </div>

      {/* Historical Terms Stack Loop */}
      <div className="space-y-6">
        {data.terms.map((term, index) => (
          <div key={index} className="space-y-2 break-inside-avoid">
            <div className="flex justify-between items-center border-b border-zinc-300 bg-zinc-50 px-2 py-1">
              <span className="font-bold text-xs uppercase tracking-wide">{term.termName}</span>
              <span className="text-xs font-mono">Term GPA: {term.gpa.toFixed(2)} | Credits: {term.creditsEarned}</span>
            </div>
            
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-zinc-500 border-b">
                  <th className="py-1 font-semibold w-24">Code</th>
                  <th className="py-1 font-semibold">Course Description</th>
                  <th className="py-1 font-semibold text-center w-16">Credits</th>
                  <th className="py-1 font-semibold text-right w-16">Mark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {term.courses.map((course, cIdx) => (
                  <tr key={cIdx}>
                    <td className="py-1.5 font-mono text-zinc-600">{course.courseCode}</td>
                    <td className="py-1.5">{course.courseName}</td>
                    <td className="py-1.5 text-center">{course.credits.toFixed(1)}</td>
                    <td className="py-1.5 text-right font-bold">{course.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Institutional Security Notice Footer */}
      <div className="mt-12 pt-4 border-t border-zinc-300 text-[10px] text-zinc-400 text-center font-mono">
        This document is an accurate compilation of student performance files. Alterations render this record void.
      </div>
    </div>
  );
}