"use client";

import { useState } from "react";

import { useGetActiveRegistrationWindowQuery } from "@/app/state/module/studentRegistration/studentRegistrationApi";

import StudentEnrollmentForm from "./StudentEnrollmentForm";

import EnrollmentClosed from "./EnrollmentClosed";

import EnrollmentSuccess from "./EnrollmentSuccess";

const StudentEnrollmentPage = () => {
  const { data, isLoading } = useGetActiveRegistrationWindowQuery();
 
  const [success, setSuccess] = useState(false);

  if (isLoading) {
    return <div className="p-5">Checking enrollment availability...</div>;
  }

  if (!data?.open) {
    return <EnrollmentClosed />;
  }

  if (success) {
    return <EnrollmentSuccess />;
  }

  return <StudentEnrollmentForm onSuccess={() => setSuccess(true)} />; 
};

export default StudentEnrollmentPage;
