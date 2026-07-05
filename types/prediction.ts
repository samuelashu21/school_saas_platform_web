export interface StudentPrediction {
  id: string;

  studentId: string;

  schoolId: string;

  riskLevel: number;

  confidence: number;

  attendanceRate: number;

  avgGrade: number;

  submissionRate: number;

  createdAt: string;
}