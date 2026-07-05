export type GradeScale = "A" | "B" | "C" | "D" | "F";

export interface AssessmentRecord {
  id: string;
  name: string; // e.g., "Midterm Exam", "Pop Quiz 2"
  weight: number; // e.g., 30 for 30%
  score: number;
  maxScore: number;
}

export interface SubjectGrade {
  id: string;
  subjectName: string;
  teacherName: string;
  assessments: AssessmentRecord[];
  finalNumericScore: number;
  letterGrade: GradeScale;
}