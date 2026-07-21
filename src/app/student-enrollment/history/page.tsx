"use client";


import {
  useState
} from "react";


import {

  useGetEnrollmentsQuery,

  Enrollment,

} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";




export default function EnrollmentHistoryPage(){



  const [

    search,

    setSearch

  ] = useState("");




  const {

    data,

    isLoading,

    isError,

  } = useGetEnrollmentsQuery({

    page:1,

    pageSize:100,

  });





  const enrollments = data?.data ?? [];





  const history = enrollments.filter(

    (item)=>


      [

        "COMPLETED",

        "TRANSFERRED",

        "WITHDRAWN",

        "PROMOTED"

      ]

      .includes(item.status)


  );







  const filtered = history.filter(

    (item)=>{


      const name =

        `${

          item.student.account?.firstName ?? ""

        }

        ${

          item.student.account?.lastName ?? ""

        }`

        .toLowerCase();




      const code =

        item.student.studentCode.toLowerCase();




      const value =

        search.toLowerCase();




      return (

        name.includes(value)

        ||

        code.includes(value)

      );


    }

  );







  if(isLoading){


    return (

      <div className="p-6">

        Loading enrollment history...

      </div>

    );


  }








  if(isError){


    return (

      <div className="
        p-6
        text-red-600
      ">

        Failed loading enrollment history.

      </div>

    );


  }







  return (


    <div className="space-y-6">





      <div>


        <h1 className="
          text-2xl
          font-bold
        ">

          Enrollment History

        </h1>



        <p className="
          text-sm
          text-gray-500
        ">

          Previous student enrollment records

        </p>


      </div>









      <div className="
        rounded-xl
        border
        bg-white
        overflow-hidden
      ">






        <div className="
          p-4
          border-b
        ">


          <input


            value={search}


            onChange={(e)=>

              setSearch(e.target.value)

            }


            placeholder="Search student..."


            className="
              w-full
              max-w-md
              rounded-lg
              border
              px-4
              py-2
            "


          />


        </div>









        <div className="
          overflow-x-auto
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


                <th className="p-4 text-left">
                  Student
                </th>


                <th className="p-4 text-left">
                  School
                </th>


                <th className="p-4 text-left">
                  Class
                </th>


                <th className="p-4 text-left">
                  Academic Period
                </th>


                <th className="p-4 text-left">
                  Type
                </th>


                <th className="p-4 text-left">
                  Status
                </th>


                <th className="p-4 text-left">
                  Date
                </th>


              </tr>


            </thead>







            <tbody>


              {

                filtered.map(

                  (item:Enrollment)=>(


                    <tr

                      key={item.id}

                      className="
                        border-b
                        hover:bg-gray-50
                      "

                    >




                      <td className="p-4">


                        <div className="
                          font-medium
                        ">


                          {
                            item.student.account?.firstName
                          }

                          {" "}

                          {
                            item.student.account?.lastName
                          }


                        </div>



                        <div className="
                          text-xs
                          text-gray-500
                        ">


                          {
                            item.student.studentCode
                          }


                        </div>


                      </td>







                      <td className="p-4">


                        {
                          item.school.name
                        }


                      </td>







                      <td className="p-4">


                        {
                          item.class.name
                        }


                      </td>







                      <td className="p-4">


                        {
                          item.academicPeriod.academicYear
                        }


                        {" - "}


                        {
                          item.academicPeriod.semester
                        }


                      </td>







                      <td className="p-4">


                        {

                          item.enrollmentType

                        }


                      </td>







                      <td className="p-4">


                        <span className="
                          rounded-full
                          bg-gray-100
                          px-3
                          py-1
                          text-xs
                        ">


                          {

                            item.status

                          }


                        </span>


                      </td>







                      <td className="p-4">


                        {

                          new Date(

                            item.updatedAt

                          ).toLocaleDateString()

                        }


                      </td>






                    </tr>


                  )


                )

              }


            </tbody>



          </table>




        </div>







        {
          filtered.length === 0 && (


            <div className="
              p-8
              text-center
              text-gray-500
            ">


              No enrollment history found.


            </div>


          )
        }







      </div>





    </div>


  );

}