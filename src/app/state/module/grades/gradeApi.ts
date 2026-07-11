import { api } from "../../api";


// =============================
// GRADE TYPES
// =============================


export interface School {

  id:string;

  name:string;

}



export interface Grade {

  id:string;

  name:string;

  level:number;

  schoolId:string;

  school:School;

  _count?:{

    classes:number;

  };

  createdAt:string;

  updatedAt:string;

}



export interface CreateGradeRequest {

  name:string;

  level:number;

  schoolId:string;

}



export interface UpdateGradeRequest {

  id:string;

  name?:string;

  level?:number;

}
 
// =============================
// GRADE API
// =============================


export const gradeApi = api.injectEndpoints({

 endpoints:(build)=>({



// =====================
// GET ALL GRADES
// =====================


getGrades:
build.query<Grade[], string | void>({

 query:(schoolId)=>({

   url:"/grades",

   params: schoolId
   ? {
      schoolId
     }
   : {},

 }),


 providesTags:[
   "Grades"
 ],


}),





// =====================
// GET SINGLE GRADE
// =====================


getGradeById:
build.query<Grade,string>({

 query:(id)=>
 `/grades/${id}`,

 providesTags:(result,error,id)=>[

 {
  type:"Grades",
  id
 }

 ],


}),





// =====================
// CREATE GRADE
// =====================


createGrade:
build.mutation<
 Grade,
 CreateGradeRequest
>({

 query:(body)=>({

   url:"/grades",

   method:"POST",

   body,

 }),


 invalidatesTags:[
  "Grades"
 ],


}),





// =====================
// UPDATE GRADE
// =====================


updateGrade:
build.mutation<
 Grade,
 UpdateGradeRequest
>({

 query:({
   id,
   ...body
 })=>({

   url:`/grades/${id}`,

   method:"PUT",

   body,

 }),


 invalidatesTags:[
  "Grades"
 ],


}),





// =====================
// DELETE GRADE
// =====================


deleteGrade:
build.mutation<
 {
  message:string
 },
 string
>({

 query:(id)=>({

   url:`/grades/${id}`,

   method:"DELETE",

 }),


 invalidatesTags:[
  "Grades"
 ],


}),



 }),


});


// =============================
// HOOKS
// =============================


export const {

 useGetGradesQuery,

 useGetGradeByIdQuery,

 useCreateGradeMutation,

 useUpdateGradeMutation,

 useDeleteGradeMutation,


}=gradeApi;