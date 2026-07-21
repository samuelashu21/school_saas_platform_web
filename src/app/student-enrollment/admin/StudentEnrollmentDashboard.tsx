"use client";


import {
  useState
} from "react";


import {
  PlusCircle
} from "lucide-react";


import Header from "@/app/(components)/Header";


import {
  useGetEnrollmentsQuery,
  useWithdrawStudentMutation
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";


import type {
  Enrollment
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



import StudentEnrollmentTable from "./StudentEnrollmentTable";


import EnrollmentToolbar from "./EnrollmentToolbar";


import CreateEnrollmentModal from "./CreateEnrollmentModal";


import EnrollmentDetailsModal from "./EnrollmentDetailsModal";



import PromoteStudentModal from "./PromoteStudentModal";

import RepeatStudentModal from "./RepeatStudentModal";

import ReadmitStudentModal from "./ReadmitStudentModal";






const StudentEnrollmentDashboard = () => {



  const {

    data,

    isLoading,

    isError,

    refetch

  } = useGetEnrollmentsQuery();




  const enrollments =
    data?.data ?? [];






  const [
    withdrawStudent

  ] = useWithdrawStudentMutation();







  const [
    search,
    setSearch

  ] = useState("");







  const [
    openCreate,
    setOpenCreate

  ] = useState(false);







  const [
    selectedEnrollment,
    setSelectedEnrollment

  ] = useState<Enrollment | null>(null);






  const [
    promoteEnrollment,
    setPromoteEnrollment

  ] = useState<Enrollment | null>(null);






  const [
    repeatEnrollment,
    setRepeatEnrollment

  ] = useState<Enrollment | null>(null);






  const [
    readmitEnrollment,
    setReadmitEnrollment

  ] = useState<Enrollment | null>(null);









  const filteredEnrollments =

    enrollments.filter((item) => {


      const student =
        item.student;



      const value = `

            ${student?.firstName ?? ""}

            ${student?.lastName ?? ""}

            ${student?.studentCode ?? ""}

            ${item.class?.name ?? ""}

            ${item.enrollmentType}

            ${item.status}

            `.toLowerCase();



      return value.includes(
        search.toLowerCase()
      );


    });









  const handleWithdraw = async (
    enrollment: Enrollment
  ) => {


    try {


      await withdrawStudent(
        enrollment.id
      ).unwrap();


      alert(
        "Student withdrawn successfully"
      );


      setSelectedEnrollment(null);

      refetch();



    } catch (error) {


      console.error(error);


      alert(
        "Withdrawal failed"
      );


    }


  };









  if (isLoading) {


    return (

      <div className="
            py-10
            text-gray-500
            ">

        Loading enrollments...

      </div>

    );

  }






  if (isError) {


    return (

      <div className="
            py-10
            text-red-500
            ">

        Failed loading enrollments.

      </div>

    );

  }









  return (


    <div className="
        w-full
        pb-10
        ">






      <div className="
            flex
            justify-between
            items-center
            mb-6
            ">



        <Header

          name="
                    Student Enrollment Management
                    "

        />






        <button


          onClick={() => setOpenCreate(true)}


          className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    bg-blue-600
                    text-white
                    rounded-xl
                    hover:bg-blue-700
                    "


        >


          <PlusCircle size={18} />


          New Enrollment


        </button>



      </div>









      <EnrollmentToolbar

        search={search}

        setSearch={setSearch}

      />









      <StudentEnrollmentTable


        enrollments={
          filteredEnrollments
        }


        onView={(item) => {

          setSelectedEnrollment(item);

        }}


      />









      {
        openCreate &&

        <CreateEnrollmentModal


          onClose={() => {

            setOpenCreate(false);

            refetch();

          }}


        />

      }









      {
        selectedEnrollment &&


        <EnrollmentDetailsModal


          enrollment={
            selectedEnrollment
          }



          onClose={() => {

            setSelectedEnrollment(null);

          }}



          onPromote={(item) => {

            setPromoteEnrollment(item);

            setSelectedEnrollment(null);

          }}



          onWithdraw={handleWithdraw}



          onTransfer={(item) => {

            alert(
              "Transfer modal not connected yet"
            );

          }}



        />

      }









      {
        promoteEnrollment &&


        <PromoteStudentModal


          enrollment={
            promoteEnrollment
          }


          onClose={() => {

            setPromoteEnrollment(null);

            refetch();

          }}


        />

      }









      {
        repeatEnrollment &&


        <RepeatStudentModal


          enrollment={
            repeatEnrollment
          }


          onClose={() => {

            setRepeatEnrollment(null);

            refetch();

          }}


        />

      }









      {
        readmitEnrollment &&


        <ReadmitStudentModal


          enrollment={
            readmitEnrollment
          }


          onClose={() => {

            setReadmitEnrollment(null);

            refetch();

          }}


        />

      }





    </div>


  );


};



export default StudentEnrollmentDashboard;