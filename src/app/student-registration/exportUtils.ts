import * as XLSX from "xlsx";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import type { StudentRegistrationWindow } from "@/app/state/module/studentRegistration/studentRegistrationApi";

// =====================================
// EXCEL EXPORT
// =====================================

export const exportRegistrationExcel = (
  windows: StudentRegistrationWindow[],
) => {
  const data = windows.map((item) => ({
    Name: item.name,

    Start_Date: new Date(item.startDate).toLocaleDateString(),

    End_Date: new Date(item.endDate).toLocaleDateString(),

    Status: item.isActive ? "Active" : "Closed",

    Created: new Date(item.createdAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,

    worksheet,

    "Registration Windows",
  );

  XLSX.writeFile(
    workbook,

    `student-registration-windows-${Date.now()}.xlsx`,
  );
};

// =====================================
// PDF EXPORT
// =====================================

export const exportRegistrationPDF = (windows: StudentRegistrationWindow[]) => {
  const doc = new jsPDF();

  doc.setFontSize(16);

  doc.text(
    "Student Registration Windows",

    14,

    20,
  );

  autoTable(
    doc,

    {
      startY: 30,

      head: [["Name", "Start Date", "End Date", "Status"]],

      body: windows.map((item) => [
        item.name,

        new Date(item.startDate).toLocaleDateString(),

        new Date(item.endDate).toLocaleDateString(),

        item.isActive ? "Active" : "Closed",
      ]),
    },
  );

  doc.save(`student-registration-windows-${Date.now()}.pdf`);
};
 