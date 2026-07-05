import { ProgramType } from "./academic-year";
import { User } from "./user";

export interface Student {
  id: string;

  userId: string; 

  schoolId: string;

  firstName: string;

  lastName: string;

  grade: number;

  program: ProgramType;

  user?: User;

  createdAt?: string;
}

export interface CreateStudentDto {
  userId: string;

  schoolId: string;

  firstName: string;

  lastName: string;

  grade: number;

  program: ProgramType;
}

export interface UpdateStudentDto {
  firstName?: string;

  lastName?: string;

  grade?: number;

  program?: ProgramType;
}