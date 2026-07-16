import { api } from "../../api";

// ======================================================
// TYPES
// ======================================================

export interface AcademicPeriod {
  id: string;

  academicYear: string;

  semester: string;

  startDate: string;

  endDate: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface AcademicPeriodPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface AcademicPeriodListResponse {
  data: AcademicPeriod[];

  pagination: AcademicPeriodPagination;
}

export interface AcademicPeriodFilterParams {
  academicYear?: string;

  semester?: string;

  activeOnly?: boolean;

  startDate?: string;

  endDate?: string;

  sort?: "newest" | "oldest" | "academicYear";

  page?: number;

  limit?: number;
}

export interface CreateAcademicPeriodRequest {
  academicYear: string;

  semester: string;

  startDate: string;

  endDate: string;

  isActive?: boolean;
}

export interface UpdateAcademicPeriodRequest {
  id: string;

  academicYear?: string;

  semester?: string;

  startDate?: string;

  endDate?: string;
}

export interface AcademicPeriodResponse {
  message: string;

  period: AcademicPeriod;
}

// ======================================================
// API
// ======================================================

export const academicPeriodApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ======================================================
    // GET ALL PERIODS
    // ======================================================

    getAcademicPeriods: builder.query<
      AcademicPeriodListResponse,
      AcademicPeriodFilterParams | void
    >({
      query: (params) => ({
        url: "/academic-periods",

        params: params ?? {},
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.data.map((period) => ({
                type: "AcademicPeriods" as const,

                id: period.id,
              })),

              {
                type: "AcademicPeriods",
                id: "LIST",
              },
            ]
          : [
              {
                type: "AcademicPeriods",
                id: "LIST",
              },
            ],
    }),

    // ======================================================
    // CURRENT ACTIVE PERIOD
    // ======================================================

    getCurrentAcademicPeriod: builder.query<AcademicPeriod, void>({
      query: () => "/academic-periods/current",

      providesTags: [
        {
          type: "AcademicPeriods",
          id: "CURRENT",
        },
      ],
    }),

    // ======================================================
    // CREATE
    // ======================================================

    createAcademicPeriod: builder.mutation<
      AcademicPeriodResponse,
      CreateAcademicPeriodRequest
    >({
      query: (body) => ({
        url: "/academic-periods",

        method: "POST",

        body,
      }),

      invalidatesTags: [
        {
          type: "AcademicPeriods",
          id: "LIST",
        },
      ],
    }),

    // ======================================================
    // SET CURRENT ACTIVE
    // ======================================================

    setCurrentAcademicPeriod: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/academic-periods/${id}/current`,

        method: "PUT",
      }),

      invalidatesTags: (result, error, id) => [
        {
          type: "AcademicPeriods",
          id: "LIST",
        },

        {
          type: "AcademicPeriods",
          id,
        },

        {
          type: "AcademicPeriods",
          id: "CURRENT",
        },
      ],
    }),

    // ======================================================
    // UPDATE
    // ======================================================

    updateAcademicPeriod: builder.mutation<
      AcademicPeriodResponse,
      UpdateAcademicPeriodRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/academic-periods/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "AcademicPeriods",
          id: "LIST",
        },

        {
          type: "AcademicPeriods",
          id,
        },
      ],
    }),

    // ======================================================
    // DELETE
    // ======================================================

    deleteAcademicPeriod: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/academic-periods/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: (result, error, id) => [
        {
          type: "AcademicPeriods",
          id: "LIST",
        },

        {
          type: "AcademicPeriods",
          id,
        },
      ],
    }),
  }),
});

export const {
  useGetAcademicPeriodsQuery,

  useLazyGetAcademicPeriodsQuery,

  useGetCurrentAcademicPeriodQuery,

  useCreateAcademicPeriodMutation,

  useSetCurrentAcademicPeriodMutation,

  useUpdateAcademicPeriodMutation,

  useDeleteAcademicPeriodMutation,
} = academicPeriodApi;
 