import { api } from "../../api";

// ======================================
// TYPES
// ======================================

export interface GradeLevel {
  id: string;
  name: string;
  level: number; 
}

export interface Class {
  id: string;
  name: string;

  gradeLevelId: string;

  gradeLevel: GradeLevel;

  createdAt: string;
  updatedAt: string;

  _count?: {
    enrollments: number;
  };
}

export interface CreateClassRequest {
  name: string;
  gradeLevelId: string;
}

export interface UpdateClassRequest {
  id: string;
  name?: string;
  gradeLevelId?: string;
}

// ======================================
// API
// ======================================

export const classApi = api.injectEndpoints({
  endpoints: (build) => ({
    // ==========================
    // GET ALL CLASSES
    // ==========================

    getClasses: build.query<Class[], void>({
      query: () => "/classes",

      providesTags: ["Classes"],
    }),

    // ==========================
    // GET CLASS BY ID
    // ==========================

    getClassById: build.query<Class, string>({
      query: (id) => `/classes/${id}`,

      providesTags: (result, error, id) => [
        {
          type: "Classes",
          id,
        },
      ],
    }),

    // ==========================
    // CREATE CLASS
    // ==========================

    createClass: build.mutation<Class, CreateClassRequest>({
      query: (body) => ({
        url: "/classes",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Classes"],
    }),

    // ==========================
    // UPDATE CLASS
    // ==========================

    updateClass: build.mutation<Class, UpdateClassRequest>({
      query: ({ id, ...body }) => ({
        url: `/classes/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Classes",
          id,
        },
        "Classes",
      ],
    }),

    // ==========================
    // DELETE CLASS
    // ==========================

    deleteClass: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/classes/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Classes"],
    }),
  }),
});

// ======================================
// EXPORT HOOKS
// ======================================

export const {
  useGetClassesQuery,
  useGetClassByIdQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi;