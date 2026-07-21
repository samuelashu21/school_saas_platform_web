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

export type EnrollmentStatus = "ACTIVE" | "INACTIVE" | "COMPLETED";

export type EnrollmentType = "NEW_STUDENT" | "CONTINUING" | "TRANSFER";

// =================================
// DROPDOWNS
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
// ACCOUNT
// =================================

export interface StudentAccount {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  photo?: string;
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

  account?: StudentAccount;

  school?: {
    id: string;

    name: string;
  };

  parent?: {
    id: string;

    phone?: string;

    account?: StudentAccount;
  };

  registrations?: StudentRegistrationHistory[];

  enrollments?: StudentEnrollment[];

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
// REGISTRATION HISTORY
// =================================

export interface StudentRegistrationHistory {
  id: string;

  status: RegistrationStatus;

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
}

// =================================
// ENROLLMENT
// =================================

export interface StudentEnrollment {
  id: string;

  enrollmentType: EnrollmentType;

  status: EnrollmentStatus;

  class?: {
    id: string;

    name: string;
  };

  academicPeriod?: {
    id: string;

    academicYear: string;

    semester: string;
  };
}

// =================================
// REGISTRATION DETAILS
// =================================

export interface StudentRegistration {
  id: string;

  status: RegistrationStatus;

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
// RESPONSES
// =================================

export interface RegistrationResponse {
  message: string;

  data: {
    student: Student;

    registration: StudentRegistration;
  };
}

export interface StudentListResponse {
  data: Student[];

  total: number;
}

export interface RejectResponse {
  message: string;

  student: Student;
}

// =================================
// API
// =================================

export const studentRegistrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // =================================
    // ACTIVE WINDOW
    // =================================

    getActiveRegistrationWindow: builder.query<
      {
        open: boolean;

        message?: string;

        window?: any;
      },
      void
    >({
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
    // ALL STUDENTS ADMIN
    // =================================

    getAllRegisteredStudents: builder.query<StudentListResponse, void>({
      query: () => ({
        url: "/student-registration/students",

        method: "GET",
      }),

      providesTags: ["StudentRegistration"],
    }),

    // =================================
    // REGISTRAR STUDENTS
    // =================================

    getMyRegisteredStudents: builder.query<StudentListResponse, void>({
      query: () => ({
        url: "/student-registration/my-students",

        method: "GET",
      }),

      providesTags: ["StudentRegistration"],
    }),

    // =================================
    // PENDING APPROVALS
    // =================================

    getPendingStudents: builder.query<StudentListResponse, void>({
      query: () => ({
        url: "/student-registration/pending",

        method: "GET",
      }),

      providesTags: ["StudentRegistration"],
    }),

    // =================================
    // SINGLE REGISTRATION
    // =================================

    getRegistrationById: builder.query<
      {
        data: StudentRegistration;
      },
      string
    >({
      query: (id) => ({
        url: `/student-registration/${id}`,

        method: "GET",
      }),

      providesTags: ["StudentRegistration"],
    }),

    // =================================
    // APPROVE
    // =================================

    approveStudent: builder.mutation<
      {
        message: string;

        data: {
          updatedStudent: Student;
        };
      },
      { id: string }
    >({
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
      RejectResponse,
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

  useGetAllRegisteredStudentsQuery,

  useGetMyRegisteredStudentsQuery,

  useGetPendingStudentsQuery,

  useGetRegistrationByIdQuery,

  useApproveStudentMutation,

  useRejectStudentMutation,
} = studentRegistrationApi;
