export type TeacherStatus = "ACTIVE" | "ON_LEAVE" | "RETIRED";

export interface Teacher {
  id: string;
  teacherId: string; // Institutional ID (e.g., TCH-2026-042)
  firstName: string;
  lastName: string;
  email: string;
  department: string; // e.g., "Mathematics", "Sciences", "Humanities"
  status: TeacherStatus;
  joiningDate: string;
  activeSectionsCount: number; // Number of classes currently assigned
}