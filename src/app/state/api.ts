import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/redux";

// =============================
// COURSE TYPES
// =============================

export interface Course {
  courseId: string;
  name: string;
  code: string;
  credits: number;
}
 
export interface NewCourse {
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
  popularCourses: Course[];
  enrollmentSummary: EnrollmentSummary[];
  attendanceSummary: AttendanceSummary[];
}

// =============================
// USER / RBAC TYPES
// =============================

export interface UserRole {
  role: {
    name: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
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
// AUTH TYPES
// =============================

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
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

  tagTypes: ["DashboardMetrics", "Courses", "Users", "Students"],

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

    getCourses: build.query<Course[], string | void>({
      query: (search) => ({
        url: "/courses",

        params: search
          ? {
              search,
            }
          : {},
      }),

      providesTags: ["Courses"],
    }),

    createCourse: build.mutation<Course, NewCourse>({
      query: (body) => ({
        url: "/courses",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Courses"],
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

    assignRole: build.mutation<any, AssignRoleRequest>({
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
    // STUDENTS
    // =====================

    getStudents: build.query<Student[], void>({
      query: () => "/students",

      providesTags: ["Students"],
    }),
  }),
});

export const {
  // auth
  useLoginMutation,
  useRegisterMutation,

  // dashboard
  useGetDashboardMetricsQuery,

  // courses
  useGetCoursesQuery,
  useCreateCourseMutation,

  // users
  useGetUsersQuery,
  useCreateUserMutation,
  useAssignRoleMutation,
  useDeleteUserMutation,

  // students
  useGetStudentsQuery,
} = api;
