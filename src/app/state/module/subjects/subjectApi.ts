import { api } from "../../api";

export interface Subject {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export const subjectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query<Subject[], void>({
      query: () => "/subjects", 

      providesTags: ["Subjects"],
    }),
 
    getSubject: builder.query<Subject, string>({
      query: (id) => `/subjects/${id}`,

      providesTags: ["Subjects"],
    }),

    createSubject: builder.mutation<
      Subject,
      {
        name: string;
        code: string;
      }
    >({
      query: (body) => ({
        url: "/subjects",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Subjects"],
    }),

    updateSubject: builder.mutation<
      Subject,
      {
        id: string;
        name: string;
        code: string;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/subjects/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Subjects"],
    }),

    deleteSubject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/subjects/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Subjects"],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi; 