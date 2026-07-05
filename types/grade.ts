export enum GradeStatus {
  PENDING = "PENDING",

  CHAIR_APPROVED = "CHAIR_APPROVED",

  DEAN_APPROVED = "DEAN_APPROVED",

  REJECTED = "REJECTED",
}

export interface Grade {
  id: string;

  studentId: string;

  schoolId: string;

  offeringId: string;

  value: number;

  feedback?: string;

  status: GradeStatus;

  approvedByChairId?: string;

  approvedByDeanId?: string;

  isLocked: boolean;

  createdAt: string;
}

export interface GradeBreakdown {
  id: string;

  gradeId: string;

  assessmentTypeId: string;

  label: string;

  rawScore: number;

  maxScore: number;

  weight: number;

  contribution: number;

  createdAt: string;
}

export interface GradeAudit {
  id: string;

  gradeId: string;

  actorId: string;

  action: string;

  before?: number;

  after?: number;

  reason?: string;

  createdAt: string;
}

export interface GradeVersion {
  id: string;

  gradeId: string;

  value: number;

  breakdown: Record<string, unknown>;

  createdAt: string;
}

export interface CreateGradeDto {
  studentId: string;

  schoolId: string;

  offeringId: string;

  value: number;

  feedback?: string;
}

export interface UpdateGradeDto {
  value?: number;

  feedback?: string;
}