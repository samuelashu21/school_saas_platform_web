"use client";

import { useMemo, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Pencil, Trash2, Search } from "lucide-react";

import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/app/state/module/users/userApi";

import DeleteUserDialog from "./DeleteUserDialog";
import UpdateUserModal from "./UpdateUserModal";
import UserDetailsModal from "./UserDetailsModal";

const UserTable = () => {
  const [updateOpen, setUpdateOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: users, isLoading, isError } = useGetUsersQuery();

  const [updateUser, { isLoading: updatingStatus }] = useUpdateUserMutation();

  const rows = useMemo(() => {
    if (!users) return [];

    const mapped = users.map((user) => ({
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

    if (!search.trim()) return mapped;

    const keyword = search.toLowerCase();

    return mapped.filter(
      (row) =>
        row.name.toLowerCase().includes(keyword) ||
        row.email.toLowerCase().includes(keyword) ||
        row.role.toLowerCase().includes(keyword) ||
        row.address.toLowerCase().includes(keyword),
    );
  }, [users, search]);

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
          onClick={(e) => {
            e.stopPropagation();
            toggleStatus(params.row.user);
          }}
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
            onClick={(e) => {
              e.stopPropagation();

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
            onClick={(e) => {
              e.stopPropagation();

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
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
        w-full
        rounded-lg
        border
        border-gray-300
        bg-white
        pl-10
        pr-4
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500 
      "
          />
        </div>

        <div className="ml-4 text-sm text-gray-500 whitespace-nowrap">
          {rows.length} user{rows.length !== 1 ? "s" : ""}
        </div>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[10, 20, 50]}
        onRowClick={(params) => {
          setSelectedUser(params.row.user);
          setDetailsOpen(true);
        }}
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

      <UserDetailsModal
        open={detailsOpen}
        user={selectedUser} 
        onClose={() => {
          setDetailsOpen(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
};

export default UserTable;
