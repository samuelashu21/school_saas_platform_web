"use client";

import { useState } from "react";

import Header from "@/app/(components)/Header";

import { PlusCircle } from "lucide-react";

import { useGetEnrollmentsQuery } from "@/app/state/module/studentEnrollment/studentEnrollmentApi";

import StudentEnrollmentTable from "./StudentEnrollmentTable";

import EnrollmentToolbar from "./EnrollmentToolbar";

const StudentEnrollmentDashboard = () => {
  const {
    data: enrollments = [],
    isLoading,
    isError,
  } = useGetEnrollmentsQuery();

  const [search, setSearch] = useState("");

  const filteredEnrollments = enrollments.filter((student) => {
    const value = `${student.student.firstName}
       ${student.student.lastName}
       ${student.student.studentCode}`.toLowerCase();

    return value.includes(search.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="py-5 text-gray-500">Loading enrolled students...</div>
    );
  }

  if (isError) {
    return <div className="py-5 text-red-500">Failed loading enrollments.</div>;
  }

  return (
    <div className="w-full pb-5">
      <div
        className="
      flex
      justify-between
      items-center
      mb-6
      "
      >
        <Header name="Student Enrollment Management" />
      </div>

      <EnrollmentToolbar search={search} setSearch={setSearch} />

      <StudentEnrollmentTable enrollments={filteredEnrollments} />
    </div>
  );
}; 

export default StudentEnrollmentDashboard;
