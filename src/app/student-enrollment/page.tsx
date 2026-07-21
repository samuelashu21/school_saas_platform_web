"use client";


import Link from "next/link";


import {

  Users,

  FilePlus,

  LayoutDashboard,

} from "lucide-react";







export default function StudentEnrollmentPage() {





  return (


    <div className="
      p-6
      space-y-6
    ">





      <div>


        <h1 className="
          text-2xl
          font-bold
          text-gray-800
        ">


          Student Enrollment


        </h1>



        <p className="
          mt-1
          text-sm
          text-gray-500
        ">


          Manage student enrollment, class assignment, promotion, transfer and withdrawal.


        </p>



      </div>









      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      ">







        <Link

          href="/student-enrollment/admin"

          className="
            rounded-xl
            border
            bg-white
            p-6
            shadow-sm
            transition
            hover:shadow-md
            hover:border-blue-500
          "

        >



          <div className="
            flex
            items-center
            gap-4
          ">



            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-blue-100
            ">


              <LayoutDashboard

                className="
                  h-6
                  w-6
                  text-blue-600
                "

              />


            </div>






            <div>


              <h2 className="
                font-semibold
                text-gray-800
              ">


                Enrollment Dashboard


              </h2>




              <p className="
                text-sm
                text-gray-500
              ">


                View all enrollments and manage student status.


              </p>



            </div>






          </div>






        </Link>









        <Link

          href="/student-enrollment/create"

          className="
            rounded-xl
            border
            bg-white
            p-6
            shadow-sm
            transition
            hover:shadow-md
            hover:border-green-500
          "

        >



          <div className="
            flex
            items-center
            gap-4
          ">



            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-green-100
            ">


              <FilePlus

                className="
                  h-6
                  w-6
                  text-green-600
                "

              />


            </div>






            <div>


              <h2 className="
                font-semibold
                text-gray-800
              ">


                Create Enrollment


              </h2>




              <p className="
                text-sm
                text-gray-500
              ">


                Enroll approved students into classes.


              </p>



            </div>






          </div>






        </Link>







      </div>









      <div className="
        rounded-xl
        bg-gray-50
        border
        p-6
      ">



        <div className="
          flex
          items-center
          gap-3
        ">


          <Users

            className="
              h-5
              w-5
              text-gray-600
            "

          />



          <h3 className="
            font-semibold
          ">


            Enrollment Workflow


          </h3>



        </div>








        <div className="
          mt-4
          grid
          grid-cols-1
          md:grid-cols-5
          gap-3
          text-sm
        ">




          <div className="
            rounded-lg
            bg-white
            p-3
            border
          ">


            Approved Student


          </div>






          <div className="
            rounded-lg
            bg-white
            p-3
            border
          ">


            Select Class


          </div>






          <div className="
            rounded-lg
            bg-white
            p-3
            border
          ">


            Create Enrollment


          </div>






          <div className="
            rounded-lg
            bg-white
            p-3
            border
          ">


            Active Student


          </div>






          <div className="
            rounded-lg
            bg-white
            p-3
            border
          ">


            Manage History


          </div>






        </div>






      </div>







    </div>


  );


}