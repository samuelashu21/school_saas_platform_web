export interface DashboardSummary {
  totalStudents: number;

  totalTeachers: number;

  totalClasses: number;

  totalSubjects: number;

  activeAcademicYear: string;

  activeSemester: string;
}

export interface DashboardCard {
  title: string;

  value: number | string;

  icon?: string;

  change?: number;
}