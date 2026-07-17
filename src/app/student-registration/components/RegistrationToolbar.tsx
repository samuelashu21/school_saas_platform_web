"use client";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileSpreadsheet, FileText, Search } from "lucide-react";
import type { RegistrationStatus, Student } from "@/app/state/module/studentRegistration/studentRegistrationApi";

interface RegistrationToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: "ALL" | RegistrationStatus;
  onStatusFilterChange: (value: "ALL" | RegistrationStatus) => void;
  students: Student[];
}

const RegistrationToolbar = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  students,
}: RegistrationToolbarProps) => {
  const exportToExcel = () => {
    const rows = students.map((student) => ({
      StudentName: `${student.firstName} ${student.lastName}`,
      StudentCode: student.studentCode, 
      Gender: student.gender ?? "-",
      DateOfBirth: student.dateOfBirth ?? "-",
      School: student.school?.name ?? student.schoolId,
      Parent: student.parent?.account?.name ?? student.parent?.name ?? student.parentId ?? "-",
      RegistrationStatus: student.registrationStatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, `student-registrations-${Date.now()}.xlsx`);
  };  

  const exportToPdf = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(14);
    pdf.text("Student Registrations", 14, 18);

    autoTable(pdf, {
      startY: 24,
      head: [["Name", "Code", "Gender", "DOB", "School", "Parent", "Status"]],
      body: students.map((student) => [
        `${student.firstName} ${student.lastName}`,
        student.studentCode,
        student.gender ?? "-",
        student.dateOfBirth ?? "-",
        student.school?.name ?? student.schoolId,
        student.parent?.account?.name ?? student.parent?.name ?? student.parentId ?? "-",
        student.registrationStatus,
      ]),
    });

    pdf.save(`student-registrations-${Date.now()}.pdf`);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full flex-col gap-3 md:flex-row">
        <div className="flex w-full items-center rounded-lg border border-gray-200 px-3">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search students"
            className="w-full px-2 py-2.5 text-sm outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value as "ALL" | RegistrationStatus)}
          className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          onClick={exportToExcel}
          type="button"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export Excel
        </button>

        <button
          onClick={exportToPdf}
          type="button"
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          <FileText className="h-4 w-4" />
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default RegistrationToolbar;