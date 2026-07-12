// app/state/module/teacherSubjects/teacherSubjectApi.ts

import { api } from "../../api";

export interface TeacherSubject {
  id: string;

  teacher: { 
    id: string;

    employeeId: string;

    account: {
      name: string;
      email: string;
    };

    school: {
      id: string;
      name: string;
    };
  };

  subject: {
    id: string;
    name: string;
    code: string;
  };

  createdAt: string;
}

export interface AssignSubjectRequest {
  teacherId: string;
  subjectId: string;
}

export const teacherSubjectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ======================================================
    // GET ALL ASSIGNMENTS
    // ======================================================

    getTeacherSubjectAssignments: builder.query<TeacherSubject[], void>({
      query: () => "/teacher-subjects",

      providesTags: ["TeacherSubjects"],
    }),

    // ======================================================
    // GET SUBJECTS OF A TEACHER
    // ======================================================

    getTeacherSubjects: builder.query<TeacherSubject[], string>({
      query: (teacherId) => `/teacher-subjects/teacher/${teacherId}`,

      providesTags: ["TeacherSubjects"],
    }),

    // ======================================================
    // GET MY SUBJECTS
    // ======================================================

    getMySubjects: builder.query<TeacherSubject[], void>({
      query: () => "/teacher-subjects/me",

      providesTags: ["TeacherSubjects"],
    }),

    // ======================================================
    // ASSIGN SUBJECT
    // ======================================================

    assignSubject: builder.mutation<
      { message: string; assignment: TeacherSubject },
      AssignSubjectRequest
    >({
      query: (body) => ({
        url: "/teacher-subjects",
        method: "POST",
        body,
      }),

      invalidatesTags: ["TeacherSubjects"],
    }),

    // ======================================================
    // REMOVE ASSIGNMENT
    // ======================================================

    removeAssignment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/teacher-subjects/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["TeacherSubjects"],
    }),
  }),
});

export const {
  useGetTeacherSubjectAssignmentsQuery,
  useGetTeacherSubjectsQuery,
  useGetMySubjectsQuery,
  useAssignSubjectMutation,
  useRemoveAssignmentMutation,
} = teacherSubjectApi;  