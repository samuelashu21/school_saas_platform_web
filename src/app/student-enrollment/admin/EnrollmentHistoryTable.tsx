"use client";


import {

  Enrollment

} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



import EnrollmentStatusBadge from "../components/EnrollmentStatusBadge";







interface Props {


  enrollment: Enrollment;


}







export default function EnrollmentHistoryTable({

  enrollment,

}: Props) {






  return (


    <div className="
      overflow-x-auto
      border
      rounded-xl
    ">



      <table className="
        w-full
        text-sm
      ">



        <thead className="
          bg-gray-50
          border-b
        ">



          <tr>


            <th className="
              p-3
              text-left
            ">

              Student

            </th>



            <th className="
              p-3
              text-left
            ">

              School

            </th>



            <th className="
              p-3
              text-left
            ">

              Class

            </th>



            <th className="
              p-3
              text-left
            ">

              Period

            </th>



            <th className="
              p-3
              text-left
            ">

              Type

            </th>



            <th className="
              p-3
              text-left
            ">

              Status

            </th>



            <th className="
              p-3
              text-left
            ">

              Date

            </th>



          </tr>



        </thead>







        <tbody>


          <tr className="
            border-b
          ">



            <td className="
              p-3
            ">


              {

                enrollment.student.account?.firstName

              }

              {" "}

              {

                enrollment.student.account?.lastName

              }


            </td>







            <td className="
              p-3
            ">


              {

                enrollment.school.name

              }


            </td>








            <td className="
              p-3
            ">


              {

                enrollment.class.name

              }


            </td>








            <td className="
              p-3
            ">


              {

                enrollment.academicPeriod.academicYear

              }


            </td>








            <td className="
              p-3
            ">


              {

                enrollment.enrollmentType

              }


            </td>








            <td className="
              p-3
            ">


              <EnrollmentStatusBadge

                status={enrollment.status}

              />


            </td>








            <td className="
              p-3
            ">


              {

                new Date(

                  enrollment.createdAt

                ).toLocaleDateString()

              }


            </td>







          </tr>





        </tbody>





      </table>







      <div className="
        p-4
        text-sm
        text-gray-500
      ">


        Full history will be loaded from enrollment history API when implemented.



      </div>






    </div>


  );


}