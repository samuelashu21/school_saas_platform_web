import { api } from "../../api";

// =====================================================
// TYPES
// =====================================================

export interface EnrollmentStudent {
  id: string;

  studentCode: string;

  firstName: string;
 
  lastName: string;

  gender?: string;

  dateOfBirth?: string;
}

export interface EnrollmentClass {
  id: string;

  name: string;
}

export interface EnrollmentSchool {
  id: string;

  name: string;
}

export interface StudentEnrollment {
  id: string;

  studentId: string;

  student: EnrollmentStudent;

  schoolId: string;

  school: EnrollmentSchool;

  classId: string;

  class: EnrollmentClass;

  academicYear: string;

  semester: string;

  enrollmentType: "NEW" | "CONTINUING" | "TRANSFER";

  status: string;

  createdAt: string;

  updatedAt: string;
}

// =====================================================
// CREATE REQUEST
// =====================================================

export interface CreateEnrollmentRequest {
  enrollmentType: "NEW" | "CONTINUING" | "TRANSFER";

  // existing student

  studentId?: string;

  // new student information

  firstName?: string;

  lastName?: string;

  gender?: string;

  dateOfBirth?: string;

  // parent information (future expansion)

  parentName?: string;

  parentPhone?: string;

  schoolId: string;

  classId: string;

  academicYear: string;

  semester: string;
}

// =====================================================
// RESPONSE
// =====================================================

export interface EnrollmentResponse {
  message: string;

  enrollment: StudentEnrollment;
}

// =====================================================
// API
// =====================================================

export const studentEnrollmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    // =====================================================
    // CREATE ENROLLMENT
    // =====================================================

    createEnrollment: build.mutation<
      EnrollmentResponse,
      CreateEnrollmentRequest
    >({
      query: (body) => ({
        url: "/student-enrollment",

        method: "POST",

        body,
      }), 

      invalidatesTags: ["StudentEnrollment"],
    }),

    // =====================================================
    // GET ALL ENROLLMENTS
    // =====================================================

    getEnrollments: build.query<StudentEnrollment[], void>({
      query: () => "/student-enrollment",

      providesTags: ["StudentEnrollment"],
    }),

    // =====================================================
    // GET SINGLE ENROLLMENT
    // =====================================================

    getEnrollmentById: build.query<StudentEnrollment, string>({
      query: (id) => `/student-enrollment/${id}`,
    }),

    // =====================================================
    // DELETE ENROLLMENT
    // =====================================================

    deleteEnrollment: build.mutation<
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

// =====================================================
// EXPORT HOOKS
// =====================================================

export const {
  useCreateEnrollmentMutation,

  useGetEnrollmentsQuery,

  useGetEnrollmentByIdQuery,

  useDeleteEnrollmentMutation,
} = studentEnrollmentApi;
