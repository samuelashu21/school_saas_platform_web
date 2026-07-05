export enum ProgramType {
  REGULAR = "REGULAR",

  EXTENSION = "EXTENSION",
}
 
export interface AcademicYear {
  id: string;
 
  schoolId: string;

  name: string;

  startDate: string;

  endDate: string;

  active: boolean;

  createdAt: string;
}

export interface CreateAcademicYearDto {
  schoolId: string;

  name: string;

  startDate: string;

  endDate: string;
}