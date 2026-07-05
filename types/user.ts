import { UserRole } from "./auth";

export interface User {
  id: string;

  email: string;

  role: UserRole;
  
  schoolId?: string | null;

  isActive: boolean;

  lastLoginAt?: string | null;

  createdAt: string;

  updatedAt: string;

  student?: StudentProfile;

  teacher?: TeacherProfile;
}

export interface StudentProfile {
  id: string;

  firstName: string;

  lastName: string;

  grade: number;
}

export interface TeacherProfile {
  id: string;

  firstName: string;

  lastName: string;
} 