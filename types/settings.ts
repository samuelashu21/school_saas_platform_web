export interface SystemConfiguration {
  institutionName: string;
  activeAcademicYearId: string;
  activeSemesterId: string;
  enforceAttendanceThreshold: boolean;
  minimumAttendancePercentage: number;
  gradingScaleType: "STANDARD_LETTER" | "NUMERIC_ONLY" | "PASS_FAIL";
}