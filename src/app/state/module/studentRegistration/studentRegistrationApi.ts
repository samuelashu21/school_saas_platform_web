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

export interface Student {
  id: string;
  studentCode: string;

  firstName: string;
  lastName: string;

  gender?: string;
  dateOfBirth?: string;

  registrationStatus: RegistrationStatus;

  schoolId: string;
  parentId?: string;

  school?: {
    id: string;
    name: string;
  };

  parent?: {
    id: string;
    name?: string;
    account?: {
      name?: string;
    };
  };

  approvedById?: string;
  approvedAt?: string;

  createdAt: string;
  updatedAt: string;
}

// =================================
// PAGED RESPONSE
// =================================

export interface StudentRegistrationResponse {
  data: Student[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =================================
// REGISTER
// =================================

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  studentCode: string;

  schoolId: string;

  gender?: string;
  dateOfBirth?: string;

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
  endpoints: (builder) => ({
    // ============================
    // Registrar
    // ============================

    registerStudent: builder.mutation<Student, CreateStudentRequest>({
      query: (body) => ({
        url: "/students/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["StudentRegistration"],
    }),

    // ============================
    // Pending Students
    // ============================

    getPendingStudents: builder.query<StudentRegistrationResponse, void>({
      query: () => ({
        url: "/students/pending",
        method: "GET",
      }),
      providesTags: ["StudentRegistration"],
    }),

    // ============================
    // Approve
    // ============================

    approveStudent: builder.mutation<Student, ApproveStudentRequest>({
      query: ({ id }) => ({
        url: `/students/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["StudentRegistration"],
    }),

    // ============================
    // Reject
    // ============================

    rejectStudent: builder.mutation<Student, RejectStudentRequest>({
      query: ({ id, reason }) => ({
        url: `/students/${id}/reject`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["StudentRegistration"],
    }),

    // ============================
    // Approved Students
    // ============================

    getApprovedStudents: builder.query<StudentRegistrationResponse, void>({
      query: () => ({
        url: "/students/approved",
        method: "GET",
      }),
      providesTags: ["StudentRegistration"],
    }),

    // ============================
    // Rejected Students
    // ============================

    getRejectedStudents: builder.query<StudentRegistrationResponse, void>({
      query: () => ({
        url: "/students/rejected",
        method: "GET",
      }),
      providesTags: ["StudentRegistration"],
    }),

    // ============================
    // Student Details
    // ============================

    getStudentById: builder.query<Student, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: ["StudentRegistration"],
    }),
  }),
});
 
// =================================
// HOOKS
// =================================

export const {
  useRegisterStudentMutation,

  useGetPendingStudentsQuery,

  useApproveStudentMutation,

  useRejectStudentMutation,

  useGetApprovedStudentsQuery,

  useGetRejectedStudentsQuery,

  useGetStudentByIdQuery,
} = studentRegistrationApi; 