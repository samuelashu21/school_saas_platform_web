export enum CourseAssignmentStatus {
  ACTIVE = "ACTIVE",

  INACTIVE = "INACTIVE",
}

export interface CourseAssignment {
  id: string;

  offeringId: string;

  teacherId: string;

  assignedBy: string;

  status: CourseAssignmentStatus;

  createdAt: string;
}

export interface CourseAssignmentAudit {
  id: string;

  assignmentId: string;

  action: string;

  actorId: string;

  createdAt: string;
} 