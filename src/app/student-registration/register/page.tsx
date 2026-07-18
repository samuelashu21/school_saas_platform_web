"use client";

import Header from "@/app/(components)/Header";
import RoleGuard from "@/app/(components)/RoleGuard";

import StudentRegistrationForm from "@/app/student-registration/components/StudentRegistrationForm";


const RegisterStudentPage = () => {


  return (

    <RoleGuard allowedRoles={["REGISTRAR"]}>


      <main
        className="
        mx-auto
        w-full
        max-w-5xl
        px-4
        py-8
        sm:px-6
        lg:px-8
        "
      >


        {/* PAGE HEADER */}

        <div
          className="
          mb-8
          "
        >

          <Header name="Register Student" />


          <p
            className="
            mt-2
            text-sm
            text-gray-500
            "
          >
            Create a new student registration record.
            Student credentials will be generated after successful registration.
          </p>


        </div>





        {/* REGISTRATION FORM */}

        <section
          className="
          rounded-xl
          border
          bg-white
          p-6
          shadow-sm
          "
        >

          <StudentRegistrationForm />

        </section>



      </main>

 
    </RoleGuard>

  );


};


export default RegisterStudentPage;