import { api } from "../../api";

// ===================================
// ENUM TYPES
// ===================================

export type EnrollmentType =
  | "NEW_STUDENT"
  | "PROMOTION"
  | "TRANSFER"
  | "REPEAT"
  | "READMISSION";

export type EnrollmentStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "TRANSFERRED"
  | "WITHDRAWN"
  | "PROMOTED";

// ===================================
// BASIC TYPES
// ===================================

export interface Class {
  id: string;

  name: string;

  gradeLevel?: {
    id: string;
    name: string;
  };
}

export interface School {
  id: string;

  name: string;
}

export interface AcademicPeriod {
  id: string;

  academicYear: string;

  semester: string;
}

export interface Account {
  id: string;

  firstName: string;

  lastName: string;

  email: string;
}

 export interface Student {

  id:string;

  studentCode:string;


  firstName:string;

  lastName:string;


  schoolId:string;


  school?:School;


  registrationStatus:
    | "PENDING"
    | "APPROVED"
    | "ACTIVE"
    | "REJECTED"
    | "INACTIVE";


  account?:Account;


  parent?:{
    id:string;

    account?:Account;
  };

}

// ===================================
// ENROLLMENT
// ===================================

export interface Enrollment {
  id: string;

  studentId: string;

  schoolId: string;

  classId: string;

  academicPeriodId: string;

  enrollmentType: EnrollmentType;

  status: EnrollmentStatus;

  enrolledAt: string;

  leftAt?: string;

  isCurrent: boolean;

  remarks?: string;

  createdAt: string;

  updatedAt: string;

  student: Student;

  school: School;

  class: Class;

  academicPeriod: AcademicPeriod;

  enrolledBy?: Account;
}

export interface EnrollmentClass {
  id: string;

  name: string;

  gradeLevel?: {
    id: string;

    name: string;

    level: number;
  };
}

// ===================================
// ELIGIBLE STUDENTS RESPONSE
// ===================================

export interface EligibleStudentsResponse {
  data: Student[];

  total: number;
}

export interface EnrollmentPagination {
  page: number;

  pageSize: number;

  total: number;

  totalPages: number;
}

export interface EnrollmentListResponse {
  data: Enrollment[];

  pagination: EnrollmentPagination;
}

// ===================================
// CREATE REQUEST
// ===================================

export interface CreateEnrollmentRequest {
  studentId: string;

  schoolId: string;

  classId: string;

  academicPeriodId: string;

  enrollmentType: EnrollmentType;
}

// ===================================
// PROMOTION REQUEST
// ===================================

export interface PromotionRequest {
  classId: string;

  academicPeriodId: string;
}

// ===================================
// TRANSFER REQUEST
// ===================================

export interface TransferRequest {
  schoolId: string;

  classId: string;

  academicPeriodId: string;
}

// ===================================
// READMISSION REQUEST
// ===================================

export interface ReadmissionRequest {
  academicPeriodId: string;
}

// ===================================
// API
// ===================================

export const studentEnrollmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ===================================
    // GET ELIGIBLE STUDENTS
    // ===================================

    getEligibleStudents: builder.query<EligibleStudentsResponse, void>({
      query: () => ({
        url: "/student-enrollment/eligible-students",

        method: "GET",
      }),

      providesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // GET ALL ENROLLMENTS
    // ===================================

    getEnrollments: builder.query<
      EnrollmentListResponse,
      {
        page?: number;

        pageSize?: number;

        search?: string;

        status?: EnrollmentStatus | "";

        schoolId?: string;

        classId?: string;

        academicPeriodId?: string;

        sortBy?: string;

        sortOrder?: "asc" | "desc";
      }
    >({
      query: (params) => ({
        url: "/student-enrollment",

        method: "GET",

        params,
      }),

      providesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // GET BY ID
    // ===================================

    getEnrollmentById: builder.query<Enrollment, string>({
      query: (id) => ({
        url: `/student-enrollment/${id}`,

        method: "GET",
      }),

      providesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // CREATE ENROLLMENT
    // ===================================

    createEnrollment: builder.mutation<
      {
        message: string;

        data: Enrollment;
      },
      CreateEnrollmentRequest
    >({
      query: (body) => ({
        url: "/student-enrollment",

        method: "POST",

        body,
      }),

      invalidatesTags: ["StudentEnrollment"],
    }),

    updateEnrollmentStatus: builder.mutation<
      {
        message: string;
        enrollment: Enrollment;
      },
      {
        id: string;
        status:
          | "ACTIVE"
          | "COMPLETED"
          | "TRANSFERRED"
          | "WITHDRAWN"
          | "PROMOTED";

        remarks?: string;
      }
    >({
      query: (body) => ({
        url: `/student-enrollment/${body.id}/status`,

        method: "PATCH",

        body,
      }),

      invalidatesTags: ["StudentEnrollment"],
    }),

    getEnrollmentClasses: builder.query<
      {
        data: EnrollmentClass[];

        total: number;
      },
      void
    >({
      query: () => ({
        url: "/student-enrollment/classes",

        method: "GET",
      }),

      providesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // PROMOTE STUDENT
    // ===================================

    promoteStudent: builder.mutation<
      {
        message: string;

        data: Enrollment;
      },
      {
        id: string;

        body: PromotionRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `/student-enrollment/${id}/promote`,

        method: "PUT",

        body,
      }),

      invalidatesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // TRANSFER STUDENT
    // ===================================

    transferStudent: builder.mutation<
      {
        message: string;
      },
      {
        id: string;

        body: TransferRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `/student-enrollment/${id}/transfer`,

        method: "PUT",

        body,
      }),

      invalidatesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // WITHDRAW STUDENT
    // ===================================

    withdrawStudent: builder.mutation<
      {
        message: string;
      },
      string
    >({
      query: (id) => ({
        url: `/student-enrollment/${id}/withdraw`,

        method: "PUT",
      }),

      invalidatesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // READMIT STUDENT
    // ===================================

    readmitStudent: builder.mutation<
      {
        message: string;

        data: Enrollment;
      },
      {
        id: string;

        body: ReadmissionRequest;
      }
    >({
      query: ({ id, body }) => ({
        url: `/student-enrollment/${id}/readmit`,

        method: "PUT",

        body,
      }),

      invalidatesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // DELETE
    // ===================================

    deleteEnrollment: builder.mutation<
      {
        message: string;
      },
      string
    >({
      query: (id) => ({
        url: `/student-enrollment/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["StudentEnrollment"],
    }),
  }),

  overrideExisting: false,
});

// ===================================
// HOOKS
// ===================================

export const {
  useGetEligibleStudentsQuery,

  useGetEnrollmentsQuery,

  useGetEnrollmentByIdQuery,

  useCreateEnrollmentMutation,

  usePromoteStudentMutation,

  useTransferStudentMutation,

  useWithdrawStudentMutation,

  useReadmitStudentMutation,

  useUpdateEnrollmentStatusMutation,

  useDeleteEnrollmentMutation,
  useGetEnrollmentClassesQuery,
} = studentEnrollmentApi;
