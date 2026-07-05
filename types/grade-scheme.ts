export interface GradeScheme {
  id: string;

  schoolId: string;

  name: string;

  program?: "REGULAR" | "EXTENSION";

  isActive: boolean;

  createdAt: string;
} 

export interface GradeSchemeItem {
  id: string;

  schemeId: string;

  typeId: string;

  weight: number;

  maxScore: number;
}