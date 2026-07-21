"use client";

import {
  useState
} from "react";


import {

  EnrollmentType,

  useCreateEnrollmentMutation,

  useGetEnrollmentClassesQuery,

} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";




interface Props {

  selectedStudents:string[];

  onBack:()=>void;

}





export default function EnrollmentForm({

  selectedStudents,

  onBack,

}:Props){





  const [

    createEnrollment,

    {

      isLoading

    }

  ] = useCreateEnrollmentMutation();





  const {

    data:classData,

    isLoading:classesLoading,

  } = useGetEnrollmentClassesQuery();







  const [

    classId,

    setClassId

  ] = useState("");





  const [

    academicPeriodId,

    setAcademicPeriodId

  ] = useState("");





  const [

    schoolId,

    setSchoolId

  ] = useState("");





  const [

    enrollmentType,

    setEnrollmentType

  ] = useState<EnrollmentType>(

    "NEW_STUDENT"

  );





  const [

    error,

    setError

  ] = useState("");





  const [

    success,

    setSuccess

  ] = useState("");








  const submit = async()=>{


    try{


      setError("");

      setSuccess("");




      if(

        !schoolId ||

        !classId ||

        !academicPeriodId

      ){

        setError(

          "School, class and academic period are required."

        );

        return;

      }





      if(selectedStudents.length===0){


        setError(

          "Please select students."

        );

        return;


      }







      await Promise.all(

        selectedStudents.map(

          studentId =>


            createEnrollment({

              studentId,

              schoolId,

              classId,

              academicPeriodId,

              enrollmentType,

            }).unwrap()

        )

      );






      setSuccess(

        "Students enrolled successfully."

      );



    }

    catch(err:any){


      setError(

        err?.data?.message ||

        "Enrollment failed."

      );


    }


  };









  return (


    <div className="space-y-6">





      <div className="
        rounded-lg
        bg-gray-50
        p-4
      ">


        <p className="
          text-sm
          text-gray-500
        ">

          Selected Students

        </p>


        <p className="font-semibold">


          {selectedStudents.length}

          {" "}

          students selected


        </p>


      </div>







      {
        error && (

          <div className="
            rounded-lg
            bg-red-50
            p-3
            text-sm
            text-red-600
          ">

            {error}

          </div>

        )
      }








      {
        success && (

          <div className="
            rounded-lg
            bg-green-50
            p-3
            text-sm
            text-green-600
          ">

            {success}

          </div>

        )
      }










      <div>


        <label className="
          block
          mb-1
          text-sm
          font-medium
        ">

          School ID

        </label>



        <input


          value={schoolId}


          onChange={(e)=>

            setSchoolId(

              e.target.value

            )

          }


          placeholder="School ID"


          className="
            w-full
            rounded-lg
            border
            px-3
            py-2
          "


        />


      </div>










      <div>


        <label className="
          block
          mb-1
          text-sm
          font-medium
        ">

          Class

        </label>





        <select


          value={classId}


          onChange={(e)=>

            setClassId(

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
            classesLoading && (

              <option>

                Loading...

              </option>

            )
          }






          {
            classData?.data.map(

              cls=>(

                <option

                  key={cls.id}

                  value={cls.id}

                >

                  {cls.name}

                  {" - "}

                  {cls.gradeLevel?.name}


                </option>

              )

            )
          }



        </select>


      </div>









      <div>


        <label className="
          block
          mb-1
          text-sm
          font-medium
        ">

          Academic Period ID

        </label>




        <input


          value={academicPeriodId}


          onChange={(e)=>

            setAcademicPeriodId(

              e.target.value

            )

          }


          placeholder="Academic Period ID"


          className="
            w-full
            rounded-lg
            border
            px-3
            py-2
          "


        />


      </div>









      <div>


        <label className="
          block
          mb-1
          text-sm
          font-medium
        ">

          Enrollment Type

        </label>






        <select


          value={enrollmentType}


          onChange={(e)=>

            setEnrollmentType(

              e.target.value as EnrollmentType

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


          <option value="NEW_STUDENT">

            New Student

          </option>



          <option value="TRANSFER">

            Transfer

          </option>



          <option value="PROMOTION">

            Promotion

          </option>



          <option value="REPEAT">

            Repeat

          </option>



          <option value="READMISSION">

            Readmission

          </option>



        </select>


      </div>









      <div className="
        flex
        justify-end
        gap-3
      ">



        <button


          onClick={onBack}


          className="
            rounded-lg
            border
            px-5
            py-2
          "


        >

          Back


        </button>







        <button


          onClick={submit}


          disabled={isLoading}


          className="
            rounded-lg
            bg-blue-600
            px-5
            py-2
            text-white
            disabled:opacity-50
          "


        >


          {
            isLoading

            ?

            "Saving..."

            :

            "Create Enrollment"
          }


        </button>



      </div>





    </div>


  );


}