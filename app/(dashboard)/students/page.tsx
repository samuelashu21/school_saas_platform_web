"use client";

import { useState } from "react";
import { Student } from "@/types/student";
import { StudentTableRow } from "@/components/tables/StudentTableRow";
import { AddStudentForm } from "@/components/forms/AddStudentForm";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, ArrowLeft } from "lucide-react";

const initialMockStudents: Student[] = [
  { id: "s1", studentId: "STU-2026-001", firstName: "Alex", lastName: "Rivera", email: "alex.rivera@school.edu", grade: "Grade 11", status: "ENROLLED", attendanceRate: 94.2, gpa: 3.8 },
  { id: "s2", studentId: "STU-2026-002", firstName: "Marcus", lastName: "Vance", email: "m.vance@school.edu", grade: "Grade 12", status: "PROBATION", attendanceRate: 78.5, gpa: 2.1 },
  { id: "s3", studentId: "STU-2026-003", firstName: "Chloe", lastName: "Miller", email: "chloe.m@school.edu", grade: "Grade 10", status: "ENROLLED", attendanceRate: 98.1, gpa: 3.9 }
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialMockStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  // Filter roster items dynamically
  const filteredStudents = students.filter((student) => 
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Callback to execution stream upon successful form completion
  const handleAddSuccess = () => {
    // In a production environment, this triggers an automatic re-validation re-fetch.
    // Here we gracefully clear the visibility states to reveal updated data logs.
    setIsAddingStudent(false);
  };

  if (isAddingStudent) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsAddingStudent(false)}
            className="text-xs text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Student Roster
          </Button>
        </div>
        <AddStudentForm 
          onSuccess={handleAddSuccess} 
          onCancel={() => setIsAddingStudent(false)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Directory Title and Action Blocks */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Registry</h2>
          <p className="text-muted-foreground">Monitor performance indexes, audit operational status logs, and manage profile forms.</p>
        </div>
        <Button 
          onClick={() => setIsAddingStudent(true)}
          className="w-full sm:w-auto shrink-0 shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Onboard New Student
        </Button>
      </div>

      {/* Control Filter Bars */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name or institutional ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Responsive Layout Table View */}
      <div className="rounded-md border bg-card overflow-x-auto shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/50 border-b select-none">
            <tr>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle w-32">Student ID</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle">Full Name</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle hidden md:table-cell">Email Address</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle w-28">Standing</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle text-center w-28">Attendance</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle text-center w-24">GPA</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle w-32">Status</th>
              <th className="h-10 px-4 align-middle w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentTableRow key={student.id} student={student} />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="h-32 text-center text-muted-foreground text-xs">
                  No registered active students match the specified search parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}