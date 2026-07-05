export interface Subject {
  id: string;

  name: string;

  code?: string;

  classId: string;

  creditHours: number;

  description?: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CreateSubjectDto {
  name: string;

  code?: string;

  classId: string;

  creditHours: number;

  description?: string;
}

export interface UpdateSubjectDto {
  name?: string;

  code?: string;

  creditHours?: number;

  description?: string;

  isActive?: boolean;
} 