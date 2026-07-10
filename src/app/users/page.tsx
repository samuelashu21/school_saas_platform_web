"use client";

import { useGetUsersQuery } from "@/app/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useAppSelector } from "@/app/redux";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Staff ID",
    width: 220,
  },
  {
    field: "name",
    headerName: "Full Name",
    width: 220,
  },
  {
    field: "email",
    headerName: "Institutional Email",
    width: 260,
  },
  {
    field: "role",
    headerName: "Administrative Role",
    width: 180,
    renderCell: (params) => {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 mt-2">
          {params.value || "UNASSIGNED"}
        </span>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Created Date",
    width: 160,
    valueGetter: (value) =>
      value ? new Date(value).toLocaleDateString() : "N/A",
  },
];

const FacultyRegistry = () => {
  const globalSearchTerm = useAppSelector(
    (state) => state.global.globalSearchTerm ?? "",
  );

  const { data: users, isLoading, isError } = useGetUsersQuery();

  const formattedUsers = useMemo(() => {
    if (!users) return [];

    return users.map((user: any) => ({
      id: user.id,

      name: user.name,

      email: user.email,

      role: user.roles?.length
        ? user.roles.map((r: any) => r.role.name).join(", ")
        : "NO ROLE",

      createdAt: user.createdAt,
    }));
  }, [users]);

  const filteredUsers = useMemo(() => {
    if (!globalSearchTerm) return formattedUsers;

    const search = globalSearchTerm.toLowerCase();

    return formattedUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search),
    );
  }, [formattedUsers, globalSearchTerm]);

  if (isLoading) {
    return <div className="py-4 text-gray-500">Loading directory...</div>;
  }

  if (isError) {
    return (
      <div className="py-4 text-red-500 font-semibold">
        Failed loading staff directory.
      </div>
    );
  }

  return (
    <div className="flex flex-col" data-testid="users-page">
      <Header name="Faculty & Staff Directory" />

      <DataGrid
        rows={filteredUsers}
        columns={columns}
        getRowId={(row) => row.id}
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
        className="
          bg-white 
          shadow-md 
          rounded-xl 
          border 
          border-gray-100 
          mt-5 
          !text-gray-700
        "
        data-testid="users-grid"
      />
    </div>
  );
};

export default FacultyRegistry;
