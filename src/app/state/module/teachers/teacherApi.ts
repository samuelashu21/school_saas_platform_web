import { api } from "@/app/state/api";

// ======================================================
// TYPES
// ======================================================

export interface TeacherAccount {
  id: string;
  name: string;
  email: string;
  mustChangePassword: boolean;
  createdAt?: string;
}

export interface School {
  id: string;
  name: string;
}

export interface Teacher {
  id: string;

  employeeId: string;

  accountId: string;

  schoolId: string;

  account: TeacherAccount;

  school: School;

  createdAt?: string;

  updatedAt?: string;
}

export interface CreateTeacherRequest {
  name: string;

  email: string;

  schoolId: string;
}

export interface UpdateTeacherRequest {
  id: string;

  name?: string;

  email?: string;

  schoolId?: string;
}

export interface ApiMessage {
  message: string;
}

// ======================================================
// TEACHER API
// ======================================================

export const teacherApi = api.injectEndpoints({
  endpoints: (build) => ({
    // ======================================================
    // GET ALL TEACHERS
    // ======================================================

    getTeachers: build.query<Teacher[], void>({
      query: () => "/teachers",

      providesTags: ["Teachers"],
    }),
 
    // ======================================================
    // GET SINGLE TEACHER
    // ======================================================

    getTeacherById: build.query<Teacher, string>({
      query: (id) => `/teachers/${id}`,

      providesTags: ["Teachers"],
    }),

    // ======================================================
    // CREATE TEACHER
    // ======================================================

    createTeacher: build.mutation<Teacher, CreateTeacherRequest>({
      query: (body) => ({
        url: "/teachers",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Teachers"],
    }),

    // ======================================================
    // UPDATE TEACHER
    // ======================================================

    updateTeacher: build.mutation<Teacher, UpdateTeacherRequest>({
      query: ({ id, ...body }) => ({
        url: `/teachers/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: ["Teachers"],
    }),

    // ======================================================
    // DELETE TEACHER
    // ======================================================

    deleteTeacher: build.mutation<ApiMessage, string>({
      query: (id) => ({
        url: `/teachers/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Teachers"],
    }),

    // ======================================================
    // FIRST LOGIN PASSWORD CREATION
    // ======================================================

    firstLogin: build.mutation<
      ApiMessage,
      {
        token: string;

        password: string;
      }
    >({
      query: (body) => ({
        url: "/teachers/first-login",

        method: "POST",

        body,
      }),
    }),

    // ======================================================
    // CHANGE PASSWORD
    // ======================================================

    changePassword: build.mutation<
      ApiMessage,
      {
        accountId: string;

        oldPassword: string;

        newPassword: string;
      }
    >({
      query: (body) => ({
        url: "/teachers/change-password",

        method: "POST",

        body,
      }),
    }),
  }),
});

// ======================================================
// EXPORT HOOKS
// ======================================================

export const {
  useGetTeachersQuery,

  useGetTeacherByIdQuery,

  useCreateTeacherMutation,

  useUpdateTeacherMutation,

  useDeleteTeacherMutation,

  useFirstLoginMutation,

  useChangePasswordMutation,
} = teacherApi;
