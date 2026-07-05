export enum SemesterType {
  SEMESTER_I = "SEMESTER_I",

  SEMESTER_II = "SEMESTER_II",

  SUMMER = "SUMMER",
}

export interface Semester {
  id: string;

  academicYearId: string;

  type: SemesterType;

  startDate: string;

  endDate: string;

  active: boolean;

  createdAt: string;
}

export interface SemesterRegistration {
  id: string;

  studentId: string;

  semesterId: string;

  status: string;

  createdAt: string;
}

export interface CreateSemesterDto {
  academicYearId: string;

  type: SemesterType;

  startDate: string;

  endDate: string;
} 