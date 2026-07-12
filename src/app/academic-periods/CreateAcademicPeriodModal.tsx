"use client";

import { useState } from "react";

import {
  useCreateAcademicPeriodMutation,
} from "@/app/state/module/academicPeriods/academicPeriodApi";


interface Props {
  onClose: () => void;
}


export default function CreateAcademicPeriodModal({
  onClose,
}: Props) {


  const [
    createPeriod,
    {
      isLoading
    }
  ] = useCreateAcademicPeriodMutation();




  const currentYear =
    new Date().getFullYear();



  // Current + future academic years only
  const academicYears = [

    `${currentYear}/${currentYear + 1}`,

    `${currentYear + 1}/${currentYear + 2}`,

  ];





  const [form, setForm] = useState({

    academicYear:
      `${currentYear}/${currentYear + 1}`,

    semester:
      "SEMESTER_1",

    startDate:
      "",

    endDate:
      "",

    isActive:
      true,

  });







  const submit = async () => {


    if (

      !form.academicYear ||

      !form.semester ||

      !form.startDate ||

      !form.endDate

    ) {

      return;

    }





    try {


      await createPeriod({

        ...form,

      }).unwrap();




      onClose();



    } catch(error) {


      console.error(
        "Failed creating academic period",
        error
      );


    }


  };









  return (

    <div
      className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
"
    >


      <div
        className="
bg-white
rounded-xl
shadow-lg
p-6
w-full
max-w-md
"
      >



        <h2
          className="
text-xl
font-bold
mb-5
"
        >

          Create Global Academic Period

        </h2>







        {/* Academic Year */}

        <label
          className="
block
mb-2
font-medium
"
        >

          Academic Year

        </label>



        <select

          value={
            form.academicYear
          }

          onChange={(e)=>

            setForm({

              ...form,

              academicYear:
                e.target.value,

            })

          }


          className="
border
rounded-lg
p-3
w-full
mb-4
"

        >


          {
            academicYears.map(
              (year)=>(

                <option
                  key={year}
                  value={year}
                >

                  {year}

                </option>

              )
            )
          }


        </select>









        {/* Semester */}


        <label
          className="
block
mb-2
font-medium
"
        >

          Semester

        </label>



        <select

          value={
            form.semester
          }

          onChange={(e)=>

            setForm({

              ...form,

              semester:
                e.target.value,

            })

          }


          className="
border
rounded-lg
p-3
w-full
mb-4
"

        >


          <option value="SEMESTER_1">
            Semester 1
          </option>


          <option value="SEMESTER_2">
            Semester 2
          </option>


        </select>










        {/* Start Date */}


        <label
          className="
block
mb-2
font-medium
"
        >

          Start Date

        </label>



        <input

          type="date"

          value={
            form.startDate
          }

          onChange={(e)=>

            setForm({

              ...form,

              startDate:
                e.target.value,

            })

          }


          className="
border
rounded-lg
p-3
w-full
mb-4
"

        />









        {/* End Date */}


        <label
          className="
block
mb-2
font-medium
"
        >

          End Date

        </label>



        <input

          type="date"

          value={
            form.endDate
          }

          onChange={(e)=>

            setForm({

              ...form,

              endDate:
                e.target.value,

            })

          }


          className="
border
rounded-lg
p-3
w-full
mb-5
"

        />









        {/* Active */}


        <label
          className="
flex
items-center
gap-2
mb-5
"
        >

          <input

            type="checkbox"

            checked={
              form.isActive
            }

            onChange={(e)=>

              setForm({

                ...form,

                isActive:
                  e.target.checked,

              })

            }

          />


          Set as current active period


        </label>









        <div
          className="
flex
justify-end
gap-3
"
        >



          <button

            onClick={onClose}

            className="
px-4
py-2
rounded-lg
bg-gray-200
"

          >

            Cancel

          </button>






          <button

            disabled={
              isLoading
            }

            onClick={submit}

            className="
px-4
py-2
rounded-lg
bg-blue-600
text-white
hover:bg-blue-700
disabled:opacity-50
"

          >

            {
              isLoading
              ? "Creating..."
              : "Create"
            }


          </button>



        </div>




      </div>


    </div>

  );

}