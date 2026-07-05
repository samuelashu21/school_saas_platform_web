export interface SchoolClass {
  id: string;

  name: string;

  grade: number;

  schoolId: string;
}
 
export interface Enrollment {
  id: string;

  studentId: string;

  classId: string;

  createdAt: string;
}

export interface CreateClassDto {
  name: string;

  grade: number;

  schoolId: string;
}

export interface UpdateClassDto {
  name?: string;

  grade?: number;
}