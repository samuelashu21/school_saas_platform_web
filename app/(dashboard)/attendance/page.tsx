"use client";

import { useState } from "react";
import { DailyAttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { AttendanceRow } from "@/components/tables/AttendanceRow";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Clock, CalendarDays, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialRoster: DailyAttendanceRecord[] = [
  { id: "r1", studentId: "STU-2026-001", studentName: "Alice Smith", date: "2026-07-04", status: "PRESENT" },
  { id: "r2", studentId: "STU-2026-002", studentName: "Benjamin Jones", date: "2026-07-04", status: "TARDY", notes: "Late school bus" },
  { id: "r3", studentId: "STU-2026-003", studentName: "Chloe Miller", date: "2026-07-04", status: "ABSENT" },
  { id: "r4", studentId: "STU-2026-004", studentName: "Daniel Davis", date: "2026-07-04", status: "EXCUSED", notes: "Medical appointment" },
];

export default function AttendancePage() {
  const [roster, setRoster] = useState<DailyAttendanceRecord[]>(initialRoster);
  const [currentDate, setCurrentDate] = useState("2026-07-04");

  const handleStatusChange = (id: string, newStatus: AttendanceStatus) => {
    setRoster(prev => prev.map(record => 
      record.id === id ? { ...record, status: newStatus } : record
    ));
  };

  // Compute stats on the fly based on user clicks
  const stats = roster.reduce(
    (acc, record) => {
      if (record.status === "PRESENT") acc.present++;
      else if (record.status === "ABSENT") acc.absent++;
      else if (record.status === "TARDY") acc.tardy++;
      else if (record.status === "EXCUSED") acc.excused++;
      return acc;
    },
    { present: 0, absent: 0, tardy: 0, excused: 0 }
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance Ledger</h2>
          <p className="text-muted-foreground">Track dynamic daily enrollment parameters and manage absence validations.</p>
        </div>
        <Button size="sm" className="shadow-sm">
          <Save className="mr-2 h-4 w-4" /> Save Roster Verification
        </Button>
      </div>

      {/* Aggregate Micro-stats bar */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Present</p>
              <p className="text-xl font-bold">{stats.present}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Unexcused Absences</p>
              <p className="text-xl font-bold">{stats.absent}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-8 w-8 text-amber-500 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Tardy</p>
              <p className="text-xl font-bold">{stats.tardy}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <CalendarDays className="h-8 w-8 text-blue-500 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Excused</p>
              <p className="text-xl font-bold">{stats.excused}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roster Controls */}
      <div className="flex items-center gap-2 border-b pb-3">
        <input 
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          className="px-3 py-1.5 border rounded-md bg-card text-xs font-semibold outline-none focus:ring-1 focus:ring-primary"
        />
        <span className="text-xs text-muted-foreground font-medium">Class: Homeroom 10-B</span>
      </div>

      {/* Roster Table Grid */}
      <div className="rounded-md border bg-card overflow-x-auto shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/50 border-b select-none">
            <tr>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle w-32">Student ID</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle w-64">Student Name</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle">Attendance Performance Flag</th>
              <th className="h-10 px-4 font-medium text-muted-foreground align-middle hidden sm:table-cell">Administrative Notes</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((record) => (
              <AttendanceRow 
                key={record.id} 
                record={record} 
                onStatusChange={handleStatusChange} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}