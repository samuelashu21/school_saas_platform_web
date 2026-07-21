"use client";


import {
  useState
} from "react";


import {
  Student,
  useGetEligibleStudentsQuery,
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";





interface Props {


  onSelectStudent:(

    student:Student

  )=>void;



  selectedStudent:Student | null;


}








export default function EligibleStudentTable({

  onSelectStudent,

  selectedStudent,

}:Props){





  const {

    data,

    isLoading,

    isError,

  } = useGetEligibleStudentsQuery();







  const [

    search,

    setSearch

  ] = useState("");









  const students = data?.data ?? [];









  const filteredStudents = students.filter(

    (student)=>{


      const name =

        `${

          student.account?.firstName ?? ""

        }

        ${

          student.account?.lastName ?? ""

        }`

        .toLowerCase();





      const code =

        student.studentCode.toLowerCase();





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

      <div className="
        p-6
      ">

        Loading eligible students...

      </div>

    );


  }









  if(isError){


    return (

      <div className="
        p-6
        text-red-600
      ">


        Failed loading eligible students.


      </div>

    );


  }











  return (


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


            setSearch(

              e.target.value

            )


          }


          placeholder="
            Search student code or name...
          "


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



              <th className="
                p-4
                text-left
              ">

                Select

              </th>





              <th className="
                p-4
                text-left
              ">

                Student Code

              </th>






              <th className="
                p-4
                text-left
              ">

                Student Name

              </th>






              <th className="
                p-4
                text-left
              ">

                Parent

              </th>






              <th className="
                p-4
                text-left
              ">

                School

              </th>






              <th className="
                p-4
                text-left
              ">

                Status

              </th>





            </tr>


          </thead>









          <tbody>



            {


              filteredStudents.map(

                (student:Student)=>(



                  <tr

                    key={student.id}

                    className={`

                      border-b

                      hover:bg-gray-50

                      cursor-pointer


                      ${

                        selectedStudent?.id === student.id

                        ?

                        "bg-blue-50"

                        :

                        ""

                      }

                    `}


                    onClick={()=>


                      onSelectStudent(student)


                    }


                  >






                    <td className="p-4">


                      <input


                        type="radio"


                        checked={

                          selectedStudent?.id === student.id

                        }


                        onChange={()=>


                          onSelectStudent(student)


                        }


                      />



                    </td>









                    <td className="p-4">


                      {

                        student.studentCode

                      }


                    </td>









                    <td className="p-4">


                      <div className="
                        font-medium
                      ">


                        {

                          student.account?.firstName

                        }

                        {" "}

                        {

                          student.account?.lastName

                        }


                      </div>


                    </td>









                    <td className="p-4">


                      {

                        student.parent?.account

                        ?

                        `${

                          student.parent.account.firstName

                        }

                        ${

                          student.parent.account.lastName

                        }`

                        :

                        "-"

                      }


                    </td>









                    <td className="p-4">


                      {

                        student.school?.name

                      }


                    </td>









                    <td className="p-4">


                      <span className="
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-xs
                        text-green-700
                      ">


                        APPROVED


                      </span>


                    </td>








                  </tr>


                )


              )


            }




          </tbody>





        </table>







      </div>









      {

        filteredStudents.length === 0 && (


          <div className="
            p-8
            text-center
            text-gray-500
          ">


            No eligible students found.


          </div>


        )


      }






    </div>


  );


}