export enum SubmissionStatus {
  DRAFT = "DRAFT",

  SUBMITTED = "SUBMITTED",

  GRADED = "GRADED",

  LOCKED = "LOCKED",
}

export interface Submission {
  id: string;

  assignmentId: string;

  studentId: string;

  schoolId: string;

  content?: string;

  submittedAt: string;

  grade?: number;

  feedback?: string;

  status: SubmissionStatus;

  attempt: number;
}

export interface CreateSubmissionDto {
  assignmentId: string;

  studentId: string;

  schoolId: string;

  content?: string;
}

export interface GradeSubmissionDto {
  grade: number;

  feedback?: string;
}