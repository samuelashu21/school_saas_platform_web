"use client";

import { useGetStudentsQuery } from "@/app/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useAppSelector } from "@/app/redux";

type Student = {
  studentId: string;
  name: string;
  email?: string;
  enrollmentStatus?: string;
  gpa?: number;
};

const columns: GridColDef<Student>[] = [
  {
    field: "studentId",
    headerName: "Student ID",
    width: 130,
  },

  {
    field: "name",
    headerName: "Full Name",
    width: 220,
  },

  {
    field: "email",
    headerName: "Email Address",
    width: 250,
  },

  {
    field: "enrollmentStatus",
    headerName: "Status",
    width: 150,

    renderCell: (params) => {
      const status = params.value ?? "ACTIVE";

      const danger =
        status.toLowerCase() === "probation" ||
        status.toLowerCase() === "suspended";

      return (
        <span
          className={`
            inline-flex
            items-center
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${
              danger ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }
          `}
        >
          {status}
        </span>
      );
    },
  },

  {
    field: "gpa",
    headerName: "Cumulative GPA",
    width: 160,

    valueGetter: (_, row) => {
      return row.gpa !== undefined ? row.gpa.toFixed(2) : "N/A";
    },
  },
];

const StudentsRegistry = () => {
  const globalSearchTerm = useAppSelector(
    (state) => state.global.globalSearchTerm ?? "",
  );

  const { data: students = [], isLoading, isError } = useGetStudentsQuery();

  const filteredStudents = useMemo(() => {
    if (!globalSearchTerm.trim()) {
      return students;
    }

    const search = globalSearchTerm.toLowerCase();

    return students.filter(
      (student: Student) =>
        student.name?.toLowerCase().includes(search) ||
        student.studentId?.toLowerCase().includes(search) ||
        student.email?.toLowerCase().includes(search),
    );
  }, [students, globalSearchTerm]);

  if (isLoading) {
    return (
      <div
        className="
        py-5
        text-gray-500
        font-medium
      "
      >
        Loading student records...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
        py-5
        text-red-500
        font-semibold
        text-center
      "
      >
        Failed loading student registry.
      </div>
    );
  }

  return (
    <div className="flex flex-col" data-testid="students-page">
      <Header name="Student Registry" />

      <div
        className="
          mt-5
          bg-white
          rounded-xl
          shadow-md
          border
          border-gray-100
          overflow-hidden
        "
      >
        <DataGrid
          rows={filteredStudents}
          columns={columns}
          getRowId={(row) => row.studentId}
          checkboxSelection
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,

                page: 0,
              },
            },
          }}
          sx={{
            border: 0,
          }}
          data-testid="students-grid"
        />
      </div>
    </div>
  );
};

export default StudentsRegistry;
