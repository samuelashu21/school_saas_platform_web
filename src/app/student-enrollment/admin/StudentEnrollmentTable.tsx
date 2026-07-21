"use client";

import {
  useState
} from "react";


import {
  Enrollment
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";


import EnrollmentStatusBadge from "../components/EnrollmentStatusBadge";

import EnrollmentActions from "../components/EnrollmentActions";





interface Props {


  enrollments: Enrollment[];



  onView:(

    enrollment:Enrollment

  )=>void;



  onPromote:(

    enrollment:Enrollment

  )=>void;



  onTransfer:(

    enrollment:Enrollment

  )=>void;



  onReadmit:(

    enrollment:Enrollment

  )=>void;



  onWithdraw:(

    enrollment:Enrollment

  )=>void;



  onDelete:(

    enrollment:Enrollment

  )=>void;



  onSort:(

    column:string

  )=>void;



  sortBy:string;



  sortOrder:

    "asc" | "desc";


}







export default function StudentEnrollmentTable({

  enrollments,

  onView,

  onPromote,

  onTransfer,

  onReadmit,

  onWithdraw,

  onDelete,

  onSort,

  sortBy,

  sortOrder,

}:Props){





  const [

    search,

    setSearch

  ] = useState("");






  const [

    selected,

    setSelected

  ] = useState<string[]>([]);








  const filtered = enrollments.filter(

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









  const toggleRow = (

    id:string

  )=>{


    setSelected(

      previous =>


        previous.includes(id)


        ?


        previous.filter(

          item=>item!==id

        )


        :


        [

          ...previous,

          id

        ]

    );


  };











  const toggleAll = ()=>{


    if(

      selected.length === filtered.length

    ){


      setSelected([]);


    }

    else{


      setSelected(

        filtered.map(

          item=>item.id

        )

      );


    }


  };











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
        flex
        justify-between
        items-center
      ">





        <input


          value={search}


          onChange={(e)=>

            setSearch(

              e.target.value

            )

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







        {

          selected.length > 0 && (


            <span className="
              text-sm
              text-blue-600
              font-medium
            ">


              {selected.length} selected


            </span>


          )


        }






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




              <th className="p-4">


                <input


                  type="checkbox"


                  checked={

                    filtered.length > 0 &&

                    selected.length === filtered.length

                  }


                  onChange={toggleAll}


                />


              </th>






              <th

                onClick={()=>
                  onSort("student")
                }

                className="
                  p-4
                  text-left
                  cursor-pointer
                "

              >

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

                Status

              </th>






              <th className="p-4 text-left">

                Actions

              </th>





            </tr>



          </thead>









          <tbody>





          {

            filtered.map(

              (enrollment)=>(



                <tr

                  key={enrollment.id}

                  className="
                    border-b
                    hover:bg-gray-50
                  "

                >






                  <td className="p-4">


                    <input


                      type="checkbox"


                      checked={

                        selected.includes(

                          enrollment.id

                        )

                      }


                      onChange={()=>


                        toggleRow(

                          enrollment.id

                        )


                      }


                    />


                  </td>









                  <td className="p-4">


                    <div className="font-medium">


                      {

                        enrollment.student.account?.firstName

                      }

                      {" "}

                      {

                        enrollment.student.account?.lastName

                      }


                    </div>





                    <div className="
                      text-xs
                      text-gray-500
                    ">


                      {

                        enrollment.student.studentCode

                      }


                    </div>



                  </td>









                  <td className="p-4">


                    {

                      enrollment.school.name

                    }


                  </td>









                  <td className="p-4">


                    {

                      enrollment.class.name

                    }


                  </td>









                  <td className="p-4">


                    {

                      enrollment.academicPeriod.academicYear

                    }


                    {" - "}


                    {

                      enrollment.academicPeriod.semester

                    }


                  </td>









                  <td className="p-4">


                    <EnrollmentStatusBadge


                      status={enrollment.status}


                    />


                  </td>









                  <td className="p-4">


                    <EnrollmentActions


                      enrollment={enrollment}


                      onView={onView}


                      onPromote={onPromote}


                      onTransfer={onTransfer}


                      onReadmit={onReadmit}


                      onWithdraw={onWithdraw}


                      onDelete={onDelete}


                    />


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


            No enrollments found.


          </div>


        )


      }







    </div>


  );


}