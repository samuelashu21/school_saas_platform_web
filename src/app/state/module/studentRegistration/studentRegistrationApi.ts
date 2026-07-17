import { api } from "../../api";

// =================================
// STUDENT TYPES
// =================================

export type RegistrationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "INACTIVE";

export interface Student {
  id: string;

  studentCode: string;

  firstName: string;

  lastName: string;

  gender?: string;

  dateOfBirth?: string;

  registrationStatus: RegistrationStatus;

  schoolId: string;

  approvedById?: string;

  approvedAt?: string;

  createdAt: string;

  updatedAt: string;
}

// =================================
// RESPONSE
// =================================

export interface StudentRegistrationResponse {
  data: Student[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

// =================================
// CREATE REGISTRATION
// =================================

export interface CreateStudentRequest {
  firstName: string;

  lastName: string;

  gender?: string;

  dateOfBirth?: string;

  studentCode: string;

  schoolId: string;

  parentId?: string;
}

// =================================
// APPROVAL
// =================================

export interface ApproveStudentRequest {
  id: string;
}

export interface RejectStudentRequest {
  id: string;

  reason?: string;
}

// =================================
// API
// =================================

export const studentRegistrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET STUDENTS WAITING APPROVAL

    getPendingStudents: build.query<StudentRegistrationResponse, void>({
      query: () => "/students/pending",

      providesTags: ["StudentRegistration"], 
    }),

    // REGISTER STUDENT

    registerStudent: build.mutation<Student, CreateStudentRequest>({
      query: (body) => ({
        url: "/students/register",

        method: "POST",

        body,
      }),

      invalidatesTags: ["StudentRegistration"],
    }),

    // APPROVE STUDENT

    approveStudent: build.mutation<Student, ApproveStudentRequest>({
      query: ({ id }) => ({
        url: `/students/${id}/approve`,

        method: "PATCH",
      }),

      invalidatesTags: ["StudentRegistration"],
    }),

    // REJECT STUDENT

    rejectStudent: build.mutation<Student, RejectStudentRequest>({
      query: ({ id, ...body }) => ({
        url: `/students/${id}/reject`,

        method: "PATCH",

        body,
      }),

      invalidatesTags: ["StudentRegistration"],
    }),
  }),
});

export const {
  useGetPendingStudentsQuery,

  useRegisterStudentMutation,

  useApproveStudentMutation,

  useRejectStudentMutation,  
} = studentRegistrationApi;
