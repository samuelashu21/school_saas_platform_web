"use client";

import {
  Eye,
  Trash2,
  UserRound
} from "lucide-react";


import {
  useDeleteEnrollmentMutation
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";


import type {
  Enrollment,
  EnrollmentStatus
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



interface Props {

  enrollments: Enrollment[];

  onView: (
    enrollment: Enrollment
  ) => void;

}



const StudentEnrollmentTable = ({
  enrollments,
  onView,

}: Props) => {


  const [
    deleteEnrollment

  ] = useDeleteEnrollmentMutation();




  const handleDelete = async (
    id: string
  ) => {


    const confirmed =
      window.confirm(
        "Delete this enrollment?"
      );


    if (!confirmed)
      return;



    try {


      await deleteEnrollment(id).unwrap();


    } catch (error) {


      console.error(error);


      alert(
        "Failed deleting enrollment"
      );


    }


  };






  const statusStyle = (
    status: EnrollmentStatus
  ) => {


    const styles: Record<
      EnrollmentStatus,
      string
    > = {


      ACTIVE:
        "bg-green-50 text-green-600",


      PROMOTED:
        "bg-blue-50 text-blue-600",


      TRANSFERRED:
        "bg-purple-50 text-purple-600",


      WITHDRAWN:
        "bg-red-50 text-red-600",


      COMPLETED:
        "bg-gray-100 text-gray-600",

    };


    return styles[status];

  };






  return (

    <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-x-auto
        ">


      <table className="
                w-full
                text-sm
            ">


        <thead className="
                    bg-gray-50
                ">


          <tr>


            <th className="p-4 text-left">
              Student
            </th>


            <th className="p-4 text-left">
              Code
            </th>


            <th className="p-4 text-left">
              Parent
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


            <th className="p-4 text-center">
              Actions
            </th>


          </tr>


        </thead>





        <tbody>


          {

            enrollments.length === 0 ?


              (

                <tr>

                  <td

                    colSpan={8}

                    className="
                                    text-center
                                    py-8
                                    text-gray-400
                                "

                  >

                    No enrollments found.

                  </td>


                </tr>


              )


              :


              enrollments.map((item) => {


                const student =
                  item.student;



                return (

                  <tr

                    key={item.id}

                    className="
                                    border-t
                                    hover:bg-gray-50
                                "

                  >




                    <td className="p-4">


                      <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">


                        <div className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-blue-50
                                            flex
                                            items-center
                                            justify-center
                                        ">


                          <UserRound

                            className="
                                                    w-5
                                                    h-5
                                                    text-blue-600
                                                "

                          />


                        </div>



                        <p className="
                                            font-semibold
                                            text-gray-800
                                        ">


                          {student.firstName}

                          {" "}

                          {student.lastName}


                        </p>


                      </div>


                    </td>





                    <td className="p-4">

                      {student.studentCode}

                    </td>





                    <td className="p-4">

                      {
                        student.parent?.account

                          ?

                          `${student.parent.account.firstName}
                                        ${student.parent.account.lastName}`

                          :

                          "Not assigned"
                      }

                    </td>





                    <td className="p-4">

                      {item.class?.name || "-"}

                    </td>





                    <td className="p-4">

                      {
                        item.academicPeriod

                          ?

                          `${item.academicPeriod.academicYear}
                                        -
                                        ${item.academicPeriod.semester}`

                          :

                          "-"
                      }

                    </td>





                    <td className="p-4">


                      <span className="
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-blue-50
                                        text-blue-600
                                        text-xs
                                        font-semibold
                                    ">

                        {item.enrollmentType}

                      </span>


                    </td>





                    <td className="p-4">


                      <span

                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${statusStyle(item.status)}
                                        `}

                      >

                        {item.status}

                      </span>


                    </td>





                    <td className="p-4">


                      <div className="
                                        flex
                                        justify-center
                                        gap-2
                                    ">


                        <button

                          onClick={() =>
                            onView(item)
                          }

                          className="
                                                p-2
                                                rounded-lg
                                                text-blue-600
                                                hover:bg-blue-50
                                            "

                        >

                          <Eye size={16} />

                        </button>





                        <button

                          onClick={() =>
                            handleDelete(item.id)
                          }

                          className="
                                                p-2
                                                rounded-lg
                                                text-red-500
                                                hover:bg-red-50
                                            "

                        >

                          <Trash2 size={16} />

                        </button>


                      </div>


                    </td>



                  </tr>

                );


              })

          }


        </tbody>


      </table>


    </div>

  );


};


export default StudentEnrollmentTable;