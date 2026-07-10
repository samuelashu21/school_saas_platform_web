"use client";

import { School } from "@/app/state/module/schools/schoolApi";

import {
  Building2,
  Users,
  GraduationCap,
  Trash2,
  Edit,
} from "lucide-react";

import { useDeleteSchoolMutation } from "@/app/state/module/schools/schoolApi";


interface Props {

  schools: School[];

  onEdit: (school: School) => void;

}



const SchoolTable = ({
  schools,
  onEdit,

}: Props) => {


  const [
    deleteSchool

  ] = useDeleteSchoolMutation();




  const handleDelete = async (id: string) => {


    const confirmDelete = window.confirm(
      "Delete this school?"
    );


    if (!confirmDelete) return;



    try {

      await deleteSchool(id).unwrap();


    } catch (error) {

      console.error(error);

    }


  };





  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-100
      shadow-sm
      overflow-hidden
      "
    >


      <table
        className="
        w-full
        text-sm
        "
      >


        <thead
          className="
          bg-gray-50
          "
        >

          <tr>


            <th className="p-4 text-left">
              School
            </th>


            <th className="p-4 text-left">
              Address
            </th>


            <th className="p-4 text-left">
              Students
            </th>


            <th className="p-4 text-left">
              Teachers
            </th>


            <th className="p-4 text-center">
              Action
            </th>


          </tr>


        </thead>





        <tbody>


          {
            schools.map((school)=>(


              <tr

                key={school.id}

                className="
                border-t
                hover:bg-gray-50
                "

              >



                <td className="p-4">


                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >


                    <div

                      className="
                      w-10
                      h-10
                      rounded-xl
                      bg-blue-50
                      flex
                      items-center
                      justify-center
                      "

                    >


                      <Building2

                        className="
                        w-5
                        h-5
                        text-blue-600
                        "

                      />


                    </div>





                    <div>


                      <p
                        className="
                        font-semibold
                        text-gray-800
                        "
                      >

                        {school.name}

                      </p>



                      <p
                        className="
                        text-xs
                        text-gray-400
                        "
                      >

                        ID: {school.id}

                      </p>


                    </div>



                  </div>



                </td>





                <td
                  className="
                  p-4
                  text-gray-600
                  "
                >

                  {
                    school.address || "-"
                  }

                </td>






                <td className="p-4">


                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    "
                  >


                    <GraduationCap

                      className="
                      w-4
                      h-4
                      text-blue-600
                      "

                    />


                    {
                      school._count?.students ?? 0
                    }


                  </div>



                </td>







                <td className="p-4">


                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    "
                  >


                    <Users

                      className="
                      w-4
                      h-4
                      text-green-600
                      "

                    />


                    {
                      school._count?.teachers ?? 0
                    }


                  </div>


                </td>






                <td
                  className="
                  p-4
                  text-center
                  "
                >


                  <div
                    className="
                    flex
                    justify-center
                    gap-2
                    "
                  >



                    {/* EDIT */}

                    <button

                      onClick={() => onEdit(school)}

                      className="
                      text-blue-600
                      hover:bg-blue-50
                      p-2
                      rounded-lg
                      "

                      title="Edit School"

                    >


                      <Edit
                        className="
                        w-4
                        h-4
                        "
                      />


                    </button>






                    {/* DELETE */}

                    <button

                      onClick={() => handleDelete(school.id)}

                      className="
                      text-red-500
                      hover:bg-red-50
                      p-2
                      rounded-lg
                      "

                      title="Delete School"

                    >


                      <Trash2

                        className="
                        w-4
                        h-4
                        "

                      />


                    </button>




                  </div>



                </td>



              </tr>


            ))
          }



        </tbody>



      </table>



    </div>

  );


};



export default SchoolTable; 