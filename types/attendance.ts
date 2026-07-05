export type AttendanceStatus = "PRESENT" | "ABSENT" | "TARDY" | "EXCUSED";

export interface DailyAttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface AttendanceAnalyticsSummary {
  presentCount: number;
  absentCount: number;
  tardyCount: number;
  excusedCount: number;
  totalPercentage: number;
}