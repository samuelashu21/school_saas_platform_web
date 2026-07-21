"use client";

import {
  useState
} from "react";


import EligibleStudentTable from "./EligibleStudentTable";

import EnrollmentForm from "./EnrollmentForm";


import {
  Student
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";





export default function EnrollmentWizard(){



  const [

    selectedStudent,

    setSelectedStudent

  ] = useState<Student | null>(null);





  const [

    step,

    setStep

  ] = useState(1);





  return (


    <div className="space-y-6">






      {/* STEP HEADER */}



      <div className="flex items-center gap-4">





        <div

          className={`

            flex

            items-center

            justify-center

            w-10

            h-10

            rounded-full

            font-semibold

            ${
              step === 1

              ?

              "bg-blue-600 text-white"

              :

              "bg-gray-200 text-gray-600"

            }

          `}

        >

          1

        </div>





        <span className="text-sm font-medium">

          Select Student

        </span>







        <div className="flex-1 h-px bg-gray-300"/>







        <div

          className={`

            flex

            items-center

            justify-center

            w-10

            h-10

            rounded-full

            font-semibold

            ${
              step === 2

              ?

              "bg-blue-600 text-white"

              :

              "bg-gray-200 text-gray-600"

            }

          `}

        >

          2

        </div>






        <span className="text-sm font-medium">

          Enrollment Details

        </span>




      </div>









      {/* STEP 1 */}

      {

        step === 1 && (



          <div className="space-y-4">






            <EligibleStudentTable


              selectedStudent={selectedStudent}


              onSelectStudent={

                setSelectedStudent

              }


            />








            <div className="flex justify-end">



              <button


                disabled={!selectedStudent}


                onClick={()=>setStep(2)}


                className="

                  rounded-lg

                  bg-blue-600

                  px-6

                  py-3

                  text-white

                  disabled:opacity-50

                "


              >

                Continue


              </button>




            </div>







          </div>




        )

      }













      {/* STEP 2 */}



      {

        step === 2 && selectedStudent && (





          <EnrollmentForm


            selectedStudents={[

              selectedStudent.id

            ]}



            onBack={()=>{


              setStep(1);


            }}



          />






        )

      }








    </div>



  );


}