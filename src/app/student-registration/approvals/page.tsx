"use client";

import { useMemo, useState } from "react";

import Header from "@/app/(components)/Header";
import RoleGuard from "@/app/(components)/RoleGuard";

import RegistrationToolbar from "@/app/student-registration/components/RegistrationToolbar";
import StudentApprovalTable from "@/app/student-registration/components/StudentApprovalTable";

import {
  RegistrationStatus,
  Student,
  useGetPendingStudentsQuery,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";



const ApprovalsPage = () => {


  const [
    searchTerm,
    setSearchTerm
  ] = useState("");



  const [
    statusFilter,
    setStatusFilter
  ] = useState<
    "ALL" | RegistrationStatus
  >("ALL");





  const {
    data,
    isLoading,
    isError,

  } = useGetPendingStudentsQuery();






  const students = useMemo(
    () =>
      data?.data ?? [],
    [data]
  );








  const filteredStudents = useMemo(() => {


    const query =
      searchTerm
        .trim()
        .toLowerCase();



    return students.filter(
      (student: Student) => {



        const fullName =
          `${student.firstName} ${student.lastName}`
            .toLowerCase();



        const studentCode =
          student.studentCode
            .toLowerCase();





        const matchesSearch =
          !query ||
          fullName.includes(query) ||
          studentCode.includes(query);





        const matchesStatus =
          statusFilter === "ALL" ||
          student.registrationStatus === statusFilter;





        return (
          matchesSearch &&
          matchesStatus
        );


      }
    );


  }, [
    students,
    searchTerm,
    statusFilter
  ]);









  return (


    <RoleGuard
      allowedRoles={[
        "SCHOOL_ADMIN",
        "SUPER_ADMIN"
      ]}
    >


      <main
        className="
        mx-auto
        w-full
        max-w-[1600px]
        px-4
        py-8
        sm:px-6
        lg:px-8
        space-y-6
        "
      >



        {/* HEADER */}

        <div>


          <Header
            name="Student Approval"
          />


          <p
            className="
            mt-2
            text-sm
            text-gray-500
            "
          >

            Review pending student registrations
            and approve or reject applications.

          </p>


        </div>








        {/* SEARCH / FILTER / EXPORT */}


        <RegistrationToolbar

          searchTerm={searchTerm}

          onSearchChange={setSearchTerm}

          statusFilter={statusFilter}

          onStatusFilterChange={setStatusFilter}

          students={filteredStudents}

        />









        {/* APPROVAL TABLE */}


        <StudentApprovalTable

          students={filteredStudents}

          isLoading={isLoading}

          isError={isError}

        />





      </main>


    </RoleGuard>


  );


}; 



export default ApprovalsPage;