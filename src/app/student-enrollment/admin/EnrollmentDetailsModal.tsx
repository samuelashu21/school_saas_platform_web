"use client";


import {

  Enrollment

} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



import EnrollmentStatusBadge from "../components/EnrollmentStatusBadge";

import EnrollmentHistoryTable from "./EnrollmentHistoryTable";







interface Props {


  enrollment: Enrollment;


  onClose:()=>void;


}







export default function EnrollmentDetailsModal({

  enrollment,

  onClose,

}:Props){





  return (


    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      p-4
    ">



      <div className="
        bg-white
        rounded-2xl
        w-full
        max-w-4xl
        max-h-[90vh]
        overflow-y-auto
        shadow-xl
      ">





        {/* HEADER */}

        <div className="
          flex
          justify-between
          items-center
          p-6
          border-b
        ">



          <div>


            <h2 className="
              text-xl
              font-bold
              text-gray-800
            ">


              Enrollment Details


            </h2>



            <p className="
              text-sm
              text-gray-500
            ">


              {enrollment.student.studentCode}


            </p>


          </div>






          <button

            onClick={onClose}

            className="
              text-gray-500
              hover:text-red-600
              text-xl
            "

          >

            ✕


          </button>




        </div>









        {/* STUDENT INFORMATION */}


        <div className="
          p-6
          grid
          md:grid-cols-2
          gap-5
        ">




          <div>


            <h3 className="
              font-semibold
              text-gray-700
              mb-2
            ">


              Student


            </h3>




            <p>


              Name:

              {" "}


              {

                enrollment.student.account?.firstName

              }


              {" "}


              {

                enrollment.student.account?.lastName

              }


            </p>




            <p>


              Code:

              {" "}


              {

                enrollment.student.studentCode

              }


            </p>





            <p>


              Email:

              {" "}


              {

                enrollment.student.account?.email

              }


            </p>



          </div>









          <div>


            <h3 className="
              font-semibold
              text-gray-700
              mb-2
            ">


              Parent


            </h3>






            <p>


              {

                enrollment.student.parent?.account?.firstName

              }


              {" "}


              {

                enrollment.student.parent?.account?.lastName

              }


            </p>






            <p>


              {

                enrollment.student.parent?.account?.email

              }


            </p>





          </div>






        </div>










        {/* ENROLLMENT INFORMATION */}



        <div className="
          px-6
          pb-6
        ">



          <h3 className="
            font-semibold
            text-gray-700
            mb-3
          ">


            Enrollment


          </h3>






          <div className="
            grid
            md:grid-cols-2
            gap-4
            bg-gray-50
            rounded-xl
            p-4
          ">




            <p>


              School:

              {" "}


              {

                enrollment.school.name

              }


            </p>





            <p>


              Class:

              {" "}


              {

                enrollment.class.name

              }


            </p>





            <p>


              Academic Period:

              {" "}


              {

                enrollment.academicPeriod.academicYear

              }


            </p>






            <p>


              Type:

              {" "}


              {

                enrollment.enrollmentType

              }


            </p>







            <div>


              Status:

              {" "}


              <EnrollmentStatusBadge

                status={enrollment.status}

              />



            </div>





          </div>



        </div>









        {/* HISTORY */}


        <div className="
          p-6
          border-t
        ">



          <h3 className="
            font-semibold
            text-gray-700
            mb-4
          ">


            Enrollment History


          </h3>






          <EnrollmentHistoryTable

            enrollment={enrollment}

          />





        </div>








      </div>





    </div>


  );


} 