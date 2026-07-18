"use client";

import { useMemo, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Pencil, Trash2 } from "lucide-react";

import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/app/state/module/users/userApi";

import DeleteUserDialog from "./DeleteUserDialog";
import UpdateUserModal from "./UpdateUserModal";
 
const UserTable = () => {
  const [updateOpen, setUpdateOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: users, isLoading, isError } = useGetUsersQuery();

  const [updateUser, { isLoading: updatingStatus }] = useUpdateUserMutation();

  const rows = useMemo(() => {
    if (!users) return [];

    return users.map((user) => ({
      id: user.id,

      user,

      photo: user.photo,

      name: `${user.firstName} ${user.lastName}`,

      email: user.email,

      role: user.roles?.length
        ? user.roles.map((r) => r.role.name).join(", ")
        : "NO ROLE",

      isActive: user.isActive,

      address: user.address || "N/A",

      createdAt: user.createdAt,
    }));
  }, [users]);

  // Toggle account status using the SAME update API
  const toggleStatus = async (user: any) => {
    try {
      const formData = new FormData();

      formData.append("isActive", String(!user.isActive));

      await updateUser({
        id: user.id,

        data: formData,
      }).unwrap();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "photo",

      headerName: "Photo",

      width: 90,

      sortable: false,

      renderCell: (params) => (
        <img
          src={params.value || "/avatar.png"}
          alt="avatar"
          className="
          w-10
          h-10
          rounded-full
          object-cover
          border
          "
        />
      ),
    },

    {
      field: "name",

      headerName: "Name",

      flex: 1,

      minWidth: 180,
    },

    {
      field: "email",

      headerName: "Email",

      flex: 1,

      minWidth: 220,
    },

    {
      field: "role",

      headerName: "Role",

      flex: 1,

      minWidth: 180,
    },

    {
      field: "isActive",

      headerName: "Status",

      width: 150,

      renderCell: (params) => (
        <button
          disabled={updatingStatus}
          onClick={() => toggleStatus(params.row.user)}
          className={`
          px-3
          py-1
          rounded-lg
          text-xs
          font-semibold

          ${
            params.value
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }

          `}
        >
          {params.value ? "ACTIVE" : "DISABLED"}
        </button>
      ),
    },

    {
      field: "createdAt",

      headerName: "Created",

      width: 150,

      valueGetter: (_, row) => new Date(row.createdAt).toLocaleDateString(),
    },

    {
      field: "actions",

      headerName: "Actions",

      width: 140,

      sortable: false,

      renderCell: (params) => (
        <div
          className="
          flex
          gap-3
          "
        >
          <button
            title="Update user"
            onClick={() => {
              setSelectedUser(params.row.user);

              setUpdateOpen(true);
            }}
            className="
            text-blue-600
            hover:text-blue-900
            "
          >
            <Pencil size={18} />
          </button>

          <button
            title="Delete user"
            onClick={() => {
              setSelectedUser(params.row.user);

              setDeleteOpen(true);
            }}
            className="
            text-red-600
            hover:text-red-900
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="p-5">Loading users...</div>;

  if (isError)
    return <div className="p-5 text-red-600">Failed loading users</div>;

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
        className="
        bg-white
        rounded-xl
        shadow
        mt-5
        "
      />

      <UpdateUserModal
        open={updateOpen}
        user={selectedUser}
        onClose={() => {
          setUpdateOpen(false);

          setSelectedUser(null);
        }}
      />

      <DeleteUserDialog
        open={deleteOpen}
        user={selectedUser}
        onClose={() => {
          setDeleteOpen(false);

          setSelectedUser(null);
        }}
      />
    </>
  );
};

export default UserTable;
