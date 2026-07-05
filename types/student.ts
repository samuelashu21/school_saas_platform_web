export type StudentStatus = "ACTIVE" | "SUSPENDED" | "GRADUATED" | "DROPPED";

export interface Student {
  id: string;
  studentId: string; // Institutional ID (e.g., STU-2026-004)
  firstName: string;
  lastName: string;
  email: string;
  gradeLevel: string; // e.g., "Grade 10", "Grade 11"
  status: StudentStatus;
  enrollmentDate: string;
}