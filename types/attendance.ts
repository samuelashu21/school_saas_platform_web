export interface Attendance {
  id: string;

  studentId: string;

  schoolId: string;

  classId: string;

  date: string;

  status: string;

  student?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateAttendanceDto {
  studentId: string;

  schoolId: string;

  classId: string;

  date: string;

  status: string;
}

export interface UpdateAttendanceDto {
  status?: string;

  date?: string;
}