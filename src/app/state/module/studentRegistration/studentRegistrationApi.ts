import { api } from "../../api";

// =================================
// TYPES
// =================================

export type RegistrationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "INACTIVE";

// =================================
// DROPDOWN TYPES
// =================================

export interface RegistrationSchool {
  id: string;
  name: string;
}

export interface RegistrationGrade {
  id: string;
  name: string;
  level: number;
}

export interface RegistrationClass {
  id: string;
  name: string;

  gradeLevel?: {
    id: string;
    name: string;
  };
}

export interface RegistrationAcademicPeriod {
  id: string;
  academicYear: string;
  semester: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

// =================================
// STUDENT
// =================================

export interface Student {
  id: string;
  studentCode: string;

  firstName: string;
  lastName: string;

  gender?: string;
  dateOfBirth?: string;

  registrationStatus: RegistrationStatus;

  schoolId: string;

  account?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo?: string;
  };

  school?: {
    id: string;
    name: string;
  };

  parent?: {
    id: string;
    phone?: string;

    account?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };

  registrations?: {
    id: string;
    status: string;

    class?: {
      id: string;
      name: string;

      gradeLevel?: {
        id: string;
        name: string;
      };
    };

    academicPeriod?: {
      id: string;
      academicYear: string;
      semester: string;
    };
  }[];

  enrollments?: {
    id: string;
    enrollmentType: string;
    status: string;

    class?: {
      id: string;
      name: string;
    };

    academicPeriod?: {
      id: string;
      academicYear: string;
      semester: string;
    };
  }[];

  approvedBy?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  approvedAt?: string;

  createdAt: string;
  updatedAt: string;
}

// =================================
// REGISTRATION DETAILS
// =================================

export interface StudentRegistration {
  id: string;

  status: string;

  approvedAt?: string;

  rejectedAt?: string;

  rejectionReason?: string;

  createdAt: string;

  updatedAt: string;

  student: Student;

  school: {
    id: string;
    name: string;
  };

  class: {
    id: string;
    name: string;

    gradeLevel?: {
      id: string;
      name: string;
      level?: number;
    };
  };

  academicPeriod: {
    id: string;
    academicYear: string;
    semester: string;
    startDate?: string;
    endDate?: string;
  };
}

// =================================
// CREATE REQUEST
// =================================

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;

  gender?: string;
  dateOfBirth?: string;

  studentEmail?: string;

  schoolId: string;
  classId: string;
  academicPeriodId: string;

  parentFirstName?: string;
  parentLastName?: string;
  parentEmail?: string;
  parentPhone?: string;
}

// =================================
// RESPONSE
// =================================

export interface RegistrationResponse {
  message: string;

  data: {
    student: Student;
    registration: StudentRegistration;
  };
}

// =================================
// API
// =================================

export const studentRegistrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // =================================
    // ACTIVE WINDOW
    // =================================

    getActiveRegistrationWindow: builder.query<any, void>({
      query: () => ({
        url: "/student-registration/windows/active",
        method: "GET",
      }),
    }),

    // =================================
    // DROPDOWNS
    // =================================

    getRegistrationSchools: builder.query<RegistrationSchool[], void>({
      query: () => ({
        url: "/student-registration/schools",
        method: "GET",
      }),
    }),

    getSchoolGrades: builder.query<RegistrationGrade[], string>({
      query: (schoolId) => ({
        url: `/student-registration/schools/${schoolId}/grades`,
        method: "GET",
      }),
    }),

    getGradeClasses: builder.query<RegistrationClass[], string>({
      query: (gradeId) => ({
        url: `/student-registration/grades/${gradeId}/classes`,
        method: "GET",
      }),
    }),

    getRegistrationAcademicPeriods: builder.query<
      RegistrationAcademicPeriod[],
      void
    >({
      query: () => ({
        url: "/student-registration/academic-periods",
        method: "GET",
      }),
    }),

    // =================================
    // REGISTER STUDENT
    // =================================

    registerStudent: builder.mutation<
      RegistrationResponse,
      CreateStudentRequest
    >({
      query: (body) => ({
        url: "/student-registration/register",
        method: "POST",
        body,
      }),

      invalidatesTags: ["StudentRegistration"],
    }),

    // =================================
    // STUDENTS
    // =================================

    // =================================
// ALL REGISTERED STUDENTS (ADMIN)
// =================================

getAllRegisteredStudents: builder.query<
  {
    data: Student[];
    total: number;
  },
  void
>({
  query: () => ({
    url: "/student-registration/students",
    method: "GET",
  }),

  providesTags: ["StudentRegistration"],
}),

        // =================================
    // MY REGISTERED STUDENTS (REGISTRAR)
    // =================================

    getMyRegisteredStudents: builder.query<
      {
        data: Student[];
        total: number;
      },
      void
    >({
      query: () => ({
        url: "/student-registration/my-students",
        method: "GET",
      }),

      providesTags: ["StudentRegistration"],
    }),

    // =================================
    // PENDING
    // =================================

    getPendingStudents: builder.query<
      {
        data: Student[];
        total: number;
      },
      void
    >({
      query: () => ({
        url: "/student-registration/pending",
        method: "GET",
      }),

      providesTags: ["StudentRegistration"],
    }),

    // =================================
    // SINGLE REGISTRATION
    // =================================

    getRegistrationById: builder.query<StudentRegistration, string>({
      query: (id) => ({
        url: `/student-registration/${id}`,
        method: "GET",
      }),

      providesTags: ["StudentRegistration"],
    }),

    
    // =================================
    // APPROVE
    // =================================

    approveStudent: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/student-registration/${id}/approve`,
        method: "PUT",
      }),

      invalidatesTags: ["StudentRegistration"],
    }),

    // =================================
    // REJECT
    // =================================

    rejectStudent: builder.mutation<
      any,
      {
        id: string;
        reason?: string;
      }
    >({
      query: ({ id, reason }) => ({
        url: `/student-registration/${id}/reject`,
        method: "PUT",
        body: {
          reason,
        },
      }),

      invalidatesTags: ["StudentRegistration"],
    }),
  }),

  overrideExisting: false,
});
 
// =================================
// HOOKS
// =================================

export const {
  useGetActiveRegistrationWindowQuery,

  useGetRegistrationSchoolsQuery,
  useGetSchoolGradesQuery,
  useGetGradeClassesQuery,
  useGetRegistrationAcademicPeriodsQuery,

  useRegisterStudentMutation,


  // ADMIN
  useGetAllRegisteredStudentsQuery,


  // REGISTRAR
  useGetMyRegisteredStudentsQuery,


  useGetPendingStudentsQuery,
  useGetRegistrationByIdQuery,

  useApproveStudentMutation,
  useRejectStudentMutation,

} = studentRegistrationApi;
