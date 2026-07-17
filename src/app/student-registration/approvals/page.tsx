"use client";

import { useMemo, useState } from "react";
import Header from "@/app/(components)/Header";
import RoleGuard from "@/components/RoleGuard";
import RegistrationToolbar from "@/app/student-registration/components/RegistrationToolbar";
import StudentApprovalTable from "@/app/student-registration/components/StudentApprovalTable";
import {
  RegistrationStatus,
  Student,
  useGetPendingStudentsQuery,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

const ApprovalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | RegistrationStatus>("ALL");

  const { data, isLoading, isError } = useGetPendingStudentsQuery();

  const students = useMemo(() => data?.data ?? [], [data]);

  const filteredStudents = useMemo(() => {
    return students.filter((student: Student) => {
      const studentName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const code = student.studentCode.toLowerCase();
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch = query.length === 0 || studentName.includes(query) || code.includes(query);
      const matchesStatus = statusFilter === "ALL" || student.registrationStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, students]);

  return (
    <RoleGuard allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="w-full space-y-6 pb-6">
        <Header name="Student Approval" />

        <RegistrationToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          students={filteredStudents}
        />

        <StudentApprovalTable students={filteredStudents} isLoading={isLoading} isError={isError} />
      </div>
    </RoleGuard>
  );
};

export default ApprovalsPage;
