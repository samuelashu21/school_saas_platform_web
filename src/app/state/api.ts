import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/redux";

// =============================
// COURSE TYPES
// =============================
 
export interface Subject {
  subjectId: string;
  name: string;
  code: string;
  credits: number;
}

export interface NewSubject {
  name: string;
  code: string;
  credits: number;
}

// =============================
// DASHBOARD TYPES
// =============================

export interface EnrollmentSummary {
  enrollmentSummaryId: string;
  totalStudents: number;
  changePercentage?: number;
  date: string;
}

export interface AttendanceSummary {
  attendanceSummaryId: string;
  averageAttendance: number;
  changePercentage?: number;
  date: string;
}

export interface AcademicMetrics {
  popularSubjects: Subject[];
  enrollmentSummary: EnrollmentSummary[];
  attendanceSummary: AttendanceSummary[];
}

// =============================
// AUTH / USER TYPES
// =============================

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// =============================
// USERS / RBAC TYPES
// =============================

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AssignRoleRequest {
  id: string;
  role: string;
}

// =============================
// STUDENT TYPES
// =============================

export interface Student {
  studentId: string;
  name: string;
  email: string;
}

// =============================
// API CONFIG
// =============================

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:3001";

// =============================
// API
// =============================

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).global.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["DashboardMetrics", "Subjects", "Users", "Students","Schools","StudentRegistration","StudentEnrollment","Classes","Grades","Teachers","TeacherSubjects","AcademicPeriods"],

  endpoints: (build) => ({
    // =====================
    // AUTH
    // =====================

    login: build.mutation<
      AuthResponse,
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    register: build.mutation<
      AuthResponse,
      {
        name: string;
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    getCurrentUser: build.query<AuthUser, void>({
      query: () => "/auth/me",
    }),

    // =====================
    // DASHBOARD
    // =====================

    getDashboardMetrics: build.query<AcademicMetrics, void>({
      query: () => "/dashboard",

      providesTags: ["DashboardMetrics"],
    }),

    // =====================
    // COURSES
    // =====================

    getSubjects: build.query<Subject[], string | void>({
      query: (search) => ({
        url: "/subjects",

        params: search
          ? {
              search,
            }
          : {},
      }),

      providesTags: ["Subjects"],
    }),

    createSubject: build.mutation<Subject, NewSubject>({
      query: (body) => ({
        url: "/subjects",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Subjects"],
    }),

    // =====================
    // USERS
    // =====================

    getUsers: build.query<User[], void>({
      query: () => "/users",

      providesTags: ["Users"],
    }),

    createUser: build.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: "/users",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Users"],
    }),

    assignRole: build.mutation<
      {
        message: string;
      },
      AssignRoleRequest
    >({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,

        method: "PUT",

        body: {
          role,
        },
      }),

      invalidatesTags: ["Users"],
    }),

    deleteUser: build.mutation<
      {
        message: string;
      },
      string
    >({
      query: (id) => ({
        url: `/users/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Users"],
    }),

    // =====================
    // StudentRegistration
    // =====================

    getStudents: build.query<Student[], void>({
      query: () => "/student-registration",
 
      providesTags: ["StudentRegistration"],
    }),
  }),
});

// =============================
// HOOK EXPORTS
// =============================

export const {
  // auth
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,

  // dashboard
  useGetDashboardMetricsQuery,

  // subjects
  useGetSubjectsQuery,
  useCreateSubjectMutation,

  // users
  useGetUsersQuery,
  useCreateUserMutation,
  useAssignRoleMutation,
  useDeleteUserMutation,

  // students
  useGetStudentsQuery,
} = api;
 