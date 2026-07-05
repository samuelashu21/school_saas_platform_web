export interface TranscriptTermData {
  termName: string; // e.g., "Fall 2024"
  gpa: number;
  creditsAttempted: number;
  creditsEarned: number;
  courses: {
    courseCode: string;
    courseName: string;
    credits: number;
    grade: string;
  }[];
}

export interface StudentTranscript {
  studentId: string;
  fullName: string;
  enrollmentDate: string;
  cumulativeGpa: number;
  totalCreditsEarned: number;
  terms: TranscriptTermData[];
}