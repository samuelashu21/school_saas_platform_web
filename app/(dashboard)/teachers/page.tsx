"use client";

import { useState } from "react";
import { Teacher } from "@/types/teacher";
import { TeacherTableRow } from "@/components/tables/TeacherTableRow";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";

const mockTeachers: Teacher[] = [
  { id: "t1", teacherId: "TCH-2026-001", firstName: "Alan", lastName: "Grant", email: "alan.grant@school.edu", department: "Sciences", status: "ACTIVE", joiningDate: "2020-09-01", activeSectionsCount: 4 },
  { id: "t2", teacherId: "TCH-2026-002", firstName: "Elizabeth", lastName: "Vance", email: "e.vance@school.edu", department: "Mathematics", status: "ACTIVE", joiningDate: "2018-01-15", activeSectionsCount: 3 },
  { id: "t3", teacherId: "TCH-2026-003", firstName: "Sarah", lastName: "Jenkins", email: "s.jenkins@school.edu", department: "Humanities", status: "ACTIVE", joiningDate: "2022-08-20", activeSectionsCount: 5 },
  { id: "t4", teacherId: "TCH-2026-004", firstName: "Marcus", lastName: "Brody", email: "m.brody@school.edu", department: "Sciences", status: "ON_LEAVE", joiningDate: "2015-06-01", activeSectionsCount: 0 }
];

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = mockTeachers.filter((teacher) => 
    `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Directory Title and Action Blocks */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Faculty Directory</h2>
          <p className="text-muted-foreground">Manage active educators, assign operational departments, and audit workload distributions.</p>
        </div>
        <Button className="w-full sm:w-auto shrink-0 shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Onboard Instructor
        </Button>
      </div>

      {/* Control Filter Bars */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Responsive Layout Directory Table */}
      <div className="rounded-md border bg-card overflow-x-auto shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/50 border-b select-none">
            <tr>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle w-32">Faculty ID</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle">Full Name</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle hidden md:table-cell">Email Address</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle">Department</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle text-center w-32">Workload</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle w-32">Status</th>
              <th className="h-10 px-4 align-middle w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TeacherTableRow key={teacher.id} teacher={teacher} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="h-32 text-center text-muted-foreground text-xs">
                  No instructor records match the specified query filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}