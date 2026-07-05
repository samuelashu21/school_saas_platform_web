export interface PerformanceDemographic {
  cohortName: string; // e.g., "Grade 10"
  averageScore: number;
  passingRate: number; // Percentage value
  totalStudents: number;
}

export interface EnrollmentDistribution {
  department: string; // e.g., "Sciences", "Humanities"
  count: number;
}

export interface AnalyticsSummary {
  termName: string;
  retentionRate: number;
  gpaDistribution: PerformanceDemographic[];
  enrollmentByDepartment: EnrollmentDistribution[];
}