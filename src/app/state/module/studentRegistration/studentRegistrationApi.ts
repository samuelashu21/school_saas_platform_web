import { api } from "../../api";


// =============================
// TYPES
// =============================


export interface StudentRegistrationWindow {

  id:string;

  name:string;

  startDate:string;

  endDate:string;

  isActive:boolean;

  createdBy:string;

  createdAt:string;

  updatedAt:string;

}





export interface RegistrationResponse {

  data: StudentRegistrationWindow[];

  total:number;

  page:number;

  limit:number;

  totalPages:number;

}





export interface CreateStudentRegistrationRequest {

  name:string;

  startDate:string;

  endDate:string;

}





export interface UpdateStudentRegistrationRequest {

  id:string;

  name?:string;

  startDate?:string;

  endDate?:string;

  isActive?:boolean;

}





export interface RegistrationQuery {

  page?:number;

  limit?:number;

  search?:string;

  sort?:
  "name"
  |
  "startDate"
  |
  "endDate";


  order?:
  "asc"
  |
  "desc";

}





// =============================
// API
// =============================


export const studentRegistrationApi =
api.injectEndpoints({


 endpoints:(build)=>({




// =================================
// GET ALL WINDOWS
// =================================


getRegistrationWindows:

build.query<
RegistrationResponse,
RegistrationQuery | void
>({

query:(params)=>({

url:"/student-registration",

params:params ?? undefined

}),


providesTags:[
"StudentRegistration"
],

}),






// =================================
// GET ACTIVE WINDOW
// =================================


getActiveRegistrationWindow:

build.query<

{

 open:boolean;

 message?:string;

 window?:StudentRegistrationWindow;

},

void

>({


 query:()=>"/student-registration/active",


}),







// =================================
// CREATE
// =================================


createRegistrationWindow:

build.mutation<

StudentRegistrationWindow,

CreateStudentRegistrationRequest

>({


 query:(body)=>({


   url:"/student-registration",

   method:"POST",

   body,


 }),



 invalidatesTags:[

  "StudentRegistration"

 ],



}),







// =================================
// UPDATE
// =================================


updateRegistrationWindow:

build.mutation<

StudentRegistrationWindow,

UpdateStudentRegistrationRequest

>({


 query:({id,...body})=>({


   url:`/student-registration/${id}`,

   method:"PUT",

   body,


 }),



 invalidatesTags:[

  "StudentRegistration"

 ],



}),







// =================================
// DELETE
// =================================


deleteRegistrationWindow:

build.mutation<

{

 message:string;

},

string

>({



 query:(id)=>({


   url:`/student-registration/${id}`,

   method:"DELETE",


 }),




 invalidatesTags:[

  "StudentRegistration"

 ],



}),





 }),



});







// =============================
// EXPORT HOOKS
// =============================


export const {


useGetRegistrationWindowsQuery,


useGetActiveRegistrationWindowQuery,


useCreateRegistrationWindowMutation,


useUpdateRegistrationWindowMutation,


useDeleteRegistrationWindowMutation,



}=studentRegistrationApi;