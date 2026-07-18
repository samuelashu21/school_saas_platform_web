"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/app/redux";


export default function StudentRegistrationRedirectPage() {


  const router = useRouter();


  const currentUser =
    useAppSelector(
      (state) => state.global.currentUser
    );



  const roles =
    currentUser?.roles ?? [];





  const normalizedRoles =
    useMemo(() => {


      return roles.map((role: any) => {


        if (typeof role === "string") {

          return role.toUpperCase();

        }



        return role?.name?.toUpperCase() ?? "";

      });



    }, [roles]);







  useEffect(() => {


    if (!currentUser) {

      return;

    }




    const isSuperAdmin =
      normalizedRoles.includes(
        "SUPER_ADMIN"
      );



    const isSchoolAdmin =
      normalizedRoles.includes(
        "SCHOOL_ADMIN"
      );



    const isRegistrar =
      normalizedRoles.includes(
        "REGISTRAR"
      );





    // =====================================
    // APPROVAL DASHBOARD
    // =====================================


    if (
      isSuperAdmin ||
      isSchoolAdmin
    ) {

      router.replace(
        "/student-registration/approvals"
      );

      return;

    }





    // =====================================
    // REGISTRATION FORM
    // =====================================


    if (isRegistrar) {

      router.replace(
        "/student-registration/register"
      );

      return;

    }





    // =====================================
    // OTHER USERS
    // =====================================


    router.replace(
      "/dashboard"
    );



  }, [
    currentUser,
    normalizedRoles,
    router,
  ]);








  return (

    <div
      className="
      flex
      h-screen
      items-center
      justify-center
      "
    >

      <div className="text-center">


        <div
          className="
          mx-auto
          mb-4
          h-8
          w-8
          animate-spin
          rounded-full
          border-4
          border-blue-600
          border-t-transparent
          "
        />



        <p
          className="
          text-sm
          text-gray-500
          "
        >
          Loading student registration...
        </p>


      </div>


    </div>

  );

}