export interface Assignment {
  id: string;

  title: string;

  description?: string;

  schoolId: string;

  dueDate: string;

  offeringId: string;

  createdAt: string;
}

export interface CreateAssignmentDto {
  title: string;

  description?: string;

  schoolId: string;

  dueDate: string;

  offeringId: string;
}

export interface UpdateAssignmentDto {
  title?: string;

  description?: string;

  dueDate?: string;
}