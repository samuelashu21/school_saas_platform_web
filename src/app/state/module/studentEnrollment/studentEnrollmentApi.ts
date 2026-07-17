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

  enrollmentType: string;

  status: string;

  createdAt: string;

  student: Student;

  class: Class;

  academicPeriod: AcademicPeriod;
}

// ===================================
// CREATE REQUEST
// ===================================

export interface CreateEnrollmentRequest {
  enrollmentType: "NEW" | "NEW_STUDENT" | "TRANSFER";

  studentId?: string;

  firstName?: string;

  lastName?: string;

  gender?: string;

  dateOfBirth?: string;

  parentName?: string;

  parentPhone?: string;

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
    // ===================================

    getEnrollments: builder.query<Enrollment[], void>({
      query: () => "/student-enrollment",

      providesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // GET ONE ENROLLMENT
    // ===================================

    getEnrollmentById: builder.query<Enrollment, string>({
      query: (id) => `/student-enrollment/${id}`,

      providesTags: ["StudentEnrollment"],
    }),

    // ===================================
    // CREATE ENROLLMENT
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
});

export const {
  useGetEnrollmentsQuery,

  useGetEnrollmentByIdQuery,

  useCreateEnrollmentMutation,

  useDeleteEnrollmentMutation,
} = studentEnrollmentApi;
 