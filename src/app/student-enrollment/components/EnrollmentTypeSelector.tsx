"use client";


import {

  EnrollmentType

} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";







interface Props {


  value: EnrollmentType;


  onChange:(

    value:EnrollmentType

  )=>void;


}







export default function EnrollmentTypeSelector({

  value,

  onChange,

}:Props){





  return (


    <div>


      <label className="
        mb-1
        block
        text-sm
        font-medium
      ">


        Enrollment Type


      </label>







      <select


        value={value}


        onChange={(e)=>

          onChange(

            e.target.value as EnrollmentType

          )

        }


        className="
          w-full
          rounded-lg
          border
          px-3
          py-2
        "


      >




        <option value="NEW_STUDENT">


          New Student


        </option>






        <option value="PROMOTION">


          Promotion


        </option>






        <option value="TRANSFER">


          Transfer


        </option>






        <option value="REPEAT">


          Repeat


        </option>






        <option value="READMISSION">


          Readmission


        </option>





      </select>





    </div>


  );


}