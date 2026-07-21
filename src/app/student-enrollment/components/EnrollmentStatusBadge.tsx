"use client";



import {

  EnrollmentStatus

} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";







interface Props {


  status: EnrollmentStatus;


}







export default function EnrollmentStatusBadge({

  status,

}: Props) {






  const styles = {


    ACTIVE:
      "bg-green-100 text-green-700",


    COMPLETED:
      "bg-blue-100 text-blue-700",


    TRANSFERRED:
      "bg-yellow-100 text-yellow-700",


    WITHDRAWN:
      "bg-red-100 text-red-700",


    PROMOTED:
      "bg-purple-100 text-purple-700",



  };







  return (


    <span

      className={`

        inline-flex

        items-center

        rounded-full

        px-3

        py-1

        text-xs

        font-semibold

        ${styles[status]}

      `}

    >


      {status}


    </span>


  );


} 