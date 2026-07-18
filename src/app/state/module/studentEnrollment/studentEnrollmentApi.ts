import { api } from "../../api";

// ===================================
// TYPES
// ===================================

export interface Class {
  id: string;

  name: string;
}

export interface Student {
  id: string;

  studentCode: string;

  firstName: string;

  lastName: string;

  account?: {
    firstName: string;

    lastName: string;

    email: string;
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

export interface Enrollment {
  id: string;

  studentId: string;

  schoolId: string;

  classId: string;

  academicPeriodId: string;

  enrollmentType: "NEW_STUDENT" | "TRANSFER" | "PROMOTION";

  status: "ACTIVE" | "COMPLETED" | "TRANSFERRED" | "WITHDRAWN" | "PROMOTED";

  enrolledAt: string;

  leftAt?: string;

  promotionNote?: string;

  createdAt: string;

  updatedAt: string;

  student: Student;

  school: School;

  class: Class;

  academicPeriod: AcademicPeriod;
}

// ===================================
// CREATE ENROLLMENT REQUEST
// ===================================

export interface CreateEnrollmentRequest {
  enrollmentType: "NEW_STUDENT" | "TRANSFER" | "PROMOTION";

  studentId: string;

  schoolId: string;

  classId: string;
}

// ===================================
// API
// ===================================

export const studentEnrollmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ===================================
    // GET ALL ENROLLMENTS
    // GET /student-enrollment
    // ===================================

    getEnrollments: builder.query<Enrollment[], void>({
      query: () => ({
        url: "/student-enrollment",

        method: "GET",
      }),

      providesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // GET ENROLLMENT BY ID
    // GET /student-enrollment/:id
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
    // POST /student-enrollment
    //
    // Used for:
    // - transfer
    // - promotion
    // - manual enrollment
    //
    // New students are created
    // through registration approval
    // ===================================

    createEnrollment: builder.mutation<
      {
        message: string;

        enrollment: Enrollment;
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

    // ===================================
    // DELETE ENROLLMENT
    // DELETE /student-enrollment/:id
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
  useGetEnrollmentsQuery,

  useGetEnrollmentByIdQuery,

  useCreateEnrollmentMutation,

  useDeleteEnrollmentMutation, 
} = studentEnrollmentApi;
