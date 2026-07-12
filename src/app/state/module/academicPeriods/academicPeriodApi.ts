import { api } from "../../api";


export interface AcademicPeriod {

  id:string;

  academicYear:string;

  semester:string;

  startDate:string;

  endDate:string;

  isActive:boolean;

  createdAt:string;

  updatedAt:string;

}



export interface CreateAcademicPeriodRequest {

  academicYear:string;

  semester:string;

  startDate:string;

  endDate:string;

  isActive?:boolean;

}



export const academicPeriodApi =
api.injectEndpoints({

 endpoints:(builder)=>({


 // =========================================
 // GET ALL
 // =========================================

 getAcademicPeriods:
 builder.query<AcademicPeriod[],void>({

  query:()=>"/academic-periods",

  providesTags:["AcademicPeriods"]

 }),



 // =========================================
 // CURRENT ACTIVE PERIOD
 // =========================================

 getCurrentAcademicPeriod:
 builder.query<AcademicPeriod,void>({

  query:()=>"/academic-periods/current",

  providesTags:["AcademicPeriods"]

 }),



 // =========================================
 // CREATE GLOBAL PERIOD
 // =========================================

 createAcademicPeriod:

 builder.mutation<
 {
  message:string;
  period:AcademicPeriod;
 },
 CreateAcademicPeriodRequest
 >({

 query:(body)=>({

  url:"/academic-periods",

  method:"POST",

  body

 }),

 invalidatesTags:["AcademicPeriods"]

 }),



 // =========================================
 // SET ACTIVE
 // =========================================

 setCurrentAcademicPeriod:

 builder.mutation<
 {message:string},
 string
 >({

 query:(id)=>({

  url:`/academic-periods/${id}/current`,

  method:"PUT"

 }),

 invalidatesTags:["AcademicPeriods"]

 }),




 // =========================================
 // UPDATE
 // =========================================

 updateAcademicPeriod:

 builder.mutation({

 query:({
  id,
  ...body
 })=>({

  url:`/academic-periods/${id}`,

  method:"PUT",

  body

 }),

 invalidatesTags:["AcademicPeriods"]

 }),




 // =========================================
 // DELETE
 // =========================================

 deleteAcademicPeriod:

 builder.mutation<void,string>({

 query:(id)=>({

  url:`/academic-periods/${id}`,

  method:"DELETE"

 }),

 invalidatesTags:["AcademicPeriods"]

 })


 })

});




export const {

 useGetAcademicPeriodsQuery,

 useGetCurrentAcademicPeriodQuery,

 useCreateAcademicPeriodMutation,

 useSetCurrentAcademicPeriodMutation,

 useUpdateAcademicPeriodMutation,

 useDeleteAcademicPeriodMutation,


}=academicPeriodApi;