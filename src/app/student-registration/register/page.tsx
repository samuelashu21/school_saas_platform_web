"use client";

import Header from "@/app/(components)/Header";
import StudentRegistrationForm from "@/app/student-registration/components/StudentRegistrationForm";
import RoleGuard from "@/components/RoleGuard";

const RegisterStudentPage = () => {
  return (
    <RoleGuard allowedRoles={["REGISTRAR"]}>
      <div className="w-full space-y-6 pb-6">
        <Header name="Register Student" />
        <StudentRegistrationForm />
      </div>
    </RoleGuard>
  );
};

export default RegisterStudentPage;
