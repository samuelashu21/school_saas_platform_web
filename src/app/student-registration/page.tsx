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


  const normalizedRoles = useMemo(() => {

    const roles =
      currentUser?.roles ?? [];


    return roles.map((role: any) => {

      if (typeof role === "string") {
        return role.toUpperCase();
      }


      return role?.name?.toUpperCase() ?? "";

    });


  }, [currentUser]);




  useEffect(() => {


    if (!currentUser) {
      return;
    }



    const hasRole = (role: string) =>
      normalizedRoles.includes(role);



    // ADMIN WORKFLOW

    if (
      hasRole("SUPER_ADMIN") ||
      hasRole("SCHOOL_ADMIN")
    ) {

      router.replace(
        "/student-registration/approvals"
      );

      return;

    }




    // REGISTRAR WORKFLOW

    if (
      hasRole("REGISTRAR")
    ) {

      router.replace(
        "/student-registration/register"
      );

      return;

    }




    router.replace("/dashboard");


  }, [
    currentUser,
    normalizedRoles,
    router
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
                    h-10
                    w-10
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