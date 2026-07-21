"use client";


import EnrollmentWizard from "./EnrollmentWizard";



export default function CreateEnrollmentPage() {



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


          Create Student Enrollment


        </h1>




        <p className="
          mt-1
          text-sm
          text-gray-500
        ">


          Select approved students and assign them to classes.


        </p>



      </div>







      <EnrollmentWizard />







    </div>


  );


}