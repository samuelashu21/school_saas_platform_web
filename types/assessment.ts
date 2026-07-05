export interface AssessmentType {
  id: string;

  schoolId: string;

  name: string;

  code: string;

  maxScore: number;

  isActive: boolean;

  createdAt: string;
}

export interface AssessmentScore {
  id: string;

  studentId: string;

  offeringId: string;

  assessmentTypeId: string;

  score: number;

  createdBy: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateAssessmentTypeDto {
  schoolId: string;

  name: string;

  code: string;

  maxScore: number;
}

export interface CreateAssessmentScoreDto {
  studentId: string;

  offeringId: string;

  assessmentTypeId: string;

  score: number;
} 