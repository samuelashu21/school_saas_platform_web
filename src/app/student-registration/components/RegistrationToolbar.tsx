"use client";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileSpreadsheet, FileText, Search } from "lucide-react";
import type { RegistrationStatus, Student } from "@/app/state/module/studentRegistration/studentRegistrationApi";

const registrationStatuses: RegistrationStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "ACTIVE",
  "INACTIVE",
];

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
  const getRegistration = (student: Student) => {
    const registration = student.registrations?.[0];
    return {
      grade: registration?.class?.gradeLevel?.name ?? "-",
      className: registration?.class?.name ?? "-",
      period: registration?.academicPeriod
        ? `${registration.academicPeriod.academicYear} ${registration.academicPeriod.semester}`
        : "-",
      status: registration?.status ?? student.registrationStatus,
      reason: registration?.rejectionReason ?? "-",
    };
  };

  const getParentName = (student: Student) => {
    const parent = student.parent?.account;
    if (!parent) return "-";
    return `${parent.firstName} ${parent.lastName}`;
  };

  const exportExcel = () => {
    const rows = students.map((student) => {
      const registration = getRegistration(student);
      return {
        Student: `${student.firstName} ${student.lastName}`,
        Code: student.studentCode,
        School: student.school?.name ?? "-",
        Grade: registration.grade,
        Class: registration.className,
        Period: registration.period,
        Parent: getParentName(student),
        Status: registration.status,
        Reason: registration.reason,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "student-registration.xlsx");
  };

  const exportPDF = () => {
    const pdf = new jsPDF("landscape");
    pdf.text("Student Registration Report", 14, 15);

    autoTable(pdf, {
      startY: 22,
      head: [["Student", "Code", "School", "Grade", "Class", "Period", "Status", "Reason"]],
      body: students.map((student) => {
        const registration = getRegistration(student);
        return [
          `${student.firstName} ${student.lastName}`,
          student.studentCode,
          student.school?.name ?? "-",
          registration.grade,
          registration.className,
          registration.period,
          registration.status,
          registration.reason,
        ];
      }),
      styles: { fontSize: 8 },
    });

    pdf.save("student-registration.pdf");
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* SEARCH */}
        <div className="flex items-center w-full sm:w-96 rounded-lg border bg-white px-3">
          <Search size={17} className="text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students..."
            className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
          />
        </div>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(
              e.target.value === "ALL" ? "ALL" : (e.target.value as RegistrationStatus)
            )
          }
          className="rounded-lg border bg-white px-3 py-2.5 text-sm"
        >
          <option value="ALL">All Status</option>
          {registrationStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <span className="text-sm text-gray-500">{students.length} records</span>
      </div>

      {/* EXPORT */}
      <div className="flex gap-2">
        <button
          onClick={exportExcel}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
        >
          <FileSpreadsheet size={16} />
          Excel
        </button>

        <button
          onClick={exportPDF}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
        >
          <FileText size={16} />
          PDF
        </button>
      </div>
    </div>
  );
};

export default RegistrationToolbar; 