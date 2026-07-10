import { api } from "../../api";


// =============================
// SCHOOL TYPES
// =============================

export interface School {

  id: string;

  name: string;

  address?: string;

  phone?: string;

  createdAt: string;

  grades?: GradeLevel[];

  _count?: {
    students:number;
    teachers:number;
  };

}



export interface GradeLevel {

  id:string;

  name:string;

  level:number;

}



export interface CreateSchoolRequest {

  name:string;

  address?:string;

  phone?:string;

}



export interface UpdateSchoolRequest {

  id:string;

  name?:string;

  address?:string;

  phone?:string;

}



// =============================
// SCHOOL API
// =============================


export const schoolApi = api.injectEndpoints({

  endpoints:(build)=>({



    // =====================
    // GET ALL SCHOOLS
    // =====================


    getSchools:
    build.query<School[], void>({

      query:()=>"/schools",


      providesTags:[
        "Schools"
      ],


    }),




    // =====================
    // GET SCHOOL BY ID
    // =====================


    getSchoolById:
    build.query<School,string>({


      query:(id)=>
        `/schools/${id}`,


      providesTags:(result,error,id)=>[

        {
          type:"Schools",
          id
        }

      ],


    }),





    // =====================
    // CREATE SCHOOL
    // =====================


    createSchool:
    build.mutation<
      School,
      CreateSchoolRequest
    >({


      query:(body)=>({


        url:"/schools",


        method:"POST",


        body,


      }),



      invalidatesTags:[

        "Schools"

      ],


    }),





    // =====================
    // UPDATE SCHOOL
    // =====================


    updateSchool:
    build.mutation<
      School,
      UpdateSchoolRequest
    >({



      query:({
        id,
        ...body
      })=>({


        url:`/schools/${id}`,


        method:"PUT",


        body,


      }),



      invalidatesTags:(result,error,{id})=>[


        {
          type:"Schools",
          id
        },


        "Schools"


      ],



    }),






    // =====================
    // DELETE SCHOOL
    // =====================


    deleteSchool:
    build.mutation<
      {
        message:string
      },
      string
    >({



      query:(id)=>({


        url:`/schools/${id}`,


        method:"DELETE",


      }),



      invalidatesTags:[

        "Schools"

      ],



    }),



  }),


});





// =============================
// HOOK EXPORTS
// =============================


export const {

  useGetSchoolsQuery,

  useGetSchoolByIdQuery,

  useCreateSchoolMutation,

  useUpdateSchoolMutation,

  useDeleteSchoolMutation,


}=schoolApi; 