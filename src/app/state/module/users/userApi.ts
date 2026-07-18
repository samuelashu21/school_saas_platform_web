import { api } from "../../api";

// =====================================================
// USER ROLES
// =====================================================

export type UserRole =
  | "SUPER_ADMIN"
  | "SCHOOL_ADMIN"
  | "VICE_PRINCIPAL"
  | "REGISTRAR"
  | "ADMISSION_OFFICER"
  | "EXAM_COORDINATOR"
  | "TEACHER"
  | "CLASS_TEACHER"
  | "STUDENT"
  | "PARENT";

// =====================================================
// USER MODEL
// =====================================================

export interface User {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  photo?: string | null;

  address?: string | null;

  isActive: boolean;

  schoolId?: string | null;

  mustChangePassword: boolean;

  createdAt: string;

  roles: {
    role: {
      id: string;

      name: UserRole;
    };
  }[];

  school?: {
    id: string;

    name: string;
  } | null;
}

// =====================================================
// CREATE USER TYPES
// =====================================================

export interface CreateUserRequest {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  address?: string;

  role: UserRole;

  schoolId?: string;

  photo?: File;
}

// =====================================================
// UPDATE USER TYPES
//
// PUT /users/:id
//
// Supports:
// - profile update
// - role update
// - account status update
// - photo update
//
// =====================================================

export interface UpdateUserRequest {
  id: string;

  firstName?: string;

  lastName?: string;

  email?: string;

  address?: string;

  schoolId?: string;

  role?: UserRole;

  isActive?: boolean;

  photo?: File;
}

// =====================================================
// DELETE USER
// =====================================================

export interface DeleteUserRequest {
  id: string;
}

// =====================================================
// API
// =====================================================

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // =====================================================
    // GET ALL USERS
    // =====================================================

    getUsers: builder.query<User[], void>({
      query: () => "/users",

      providesTags: ["Users"],
    }),

    // =====================================================
    // GET SINGLE USER
    // =====================================================

    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,

      providesTags: (_result, _error, id) => [
        {
          type: "Users",
          id,
        },
      ],
    }),

    // =====================================================
    // CREATE USER
    //
    // FormData:
    //
    // firstName
    // lastName
    // email
    // password
    // address
    // role
    // schoolId
    // photo
    //
    // =====================================================

    createUser: builder.mutation<
      {
        message: string;

        user: User;
      },
      FormData
    >({
      query: (data) => ({
        url: "/users",

        method: "POST",

        body: data,
      }),

      invalidatesTags: ["Users"],
    }),

    // =====================================================
    // UPDATE USER
    //
    // Single endpoint:
    //
    // PUT /users/:id
    //
    // Supports:
    //
    // firstName
    // lastName
    // email
    // address
    // schoolId
    // role
    // isActive
    // photo
    //
    // =====================================================

    updateUser: builder.mutation<
      {
        message: string;

        user: User;
      },
      {
        id: string;

        data: FormData;
      }
    >({
      query: ({
        id,

        data,
      }) => ({
        url: `/users/${id}`,

        method: "PUT",

        body: data,
      }),

      invalidatesTags: (_result, _error, arg) => [
        "Users",

        {
          type: "Users",

          id: arg.id,
        },
      ],
    }),

    // =====================================================
    // DELETE USER
    //
    // DELETE /users/:id
    //
    // =====================================================

    deleteUser: builder.mutation<
      {
        message: string;
      },
      DeleteUserRequest
    >({
      query: ({ id }) => ({
        url: `/users/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Users"],
    }),
  }),

  overrideExisting: false,
});

// =====================================================
// HOOKS
// =====================================================

export const {
  useGetUsersQuery,

  useGetUserQuery,

  useCreateUserMutation,

  useUpdateUserMutation, 

  useDeleteUserMutation,
} = userApi;
