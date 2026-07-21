"use client";


import {

  useState

} from "react";



import {

  useGetEnrollmentClassesQuery,

} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";







interface Props {


  classId:string;


  academicPeriodId:string;


  onClassChange:(

    value:string

  )=>void;


  onAcademicPeriodChange:(

    value:string

  )=>void;


}







export default function AcademicSelectionFields({

  classId,

  academicPeriodId,

  onClassChange,

  onAcademicPeriodChange,

}:Props){





  const {

    data,

    isLoading,

  } = useGetEnrollmentClassesQuery();








  return (


    <div className="
      space-y-4
    ">







      <div>


        <label className="
          mb-1
          block
          text-sm
          font-medium
        ">


          Class


        </label>







        <select


          value={classId}


          onChange={(e)=>

            onClassChange(

              e.target.value

            )

          }


          className="
            w-full
            rounded-lg
            border
            px-3
            py-2
          "


        >



          <option value="">


            Select Class


          </option>







          {

            isLoading && (


              <option>


                Loading...


              </option>


            )

          }







          {

            data?.data.map(

              (cls)=>(


                <option

                  key={cls.id}

                  value={cls.id}

                >



                  {

                    cls.name

                  }


                  {


                    cls.gradeLevel &&

                    ` - ${cls.gradeLevel.name}`


                  }



                </option>


              )


            )


          }




        </select>


      </div>









      <div>


        <label className="
          mb-1
          block
          text-sm
          font-medium
        ">


          Academic Period


        </label>







        <input


          value={academicPeriodId}


          onChange={(e)=>

            onAcademicPeriodChange(

              e.target.value

            )

          }


          placeholder="
            Enter academic period ID
          "


          className="
            w-full
            rounded-lg
            border
            px-3
            py-2
          "


        />


      </div>







    </div>


  );


}