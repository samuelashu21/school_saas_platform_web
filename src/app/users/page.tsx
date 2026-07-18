"use client";

import { useState } from "react";

import { UserPlus } from "lucide-react";

import Header from "@/app/(components)/Header";

import { useAppSelector } from "@/app/redux";

import UserTable from "./UserTable";

import CreateUserModal from "./CreateUserModal";

const UsersPage = () => {
  const [createOpen, setCreateOpen] = useState(false);

  const currentUserRoles = useAppSelector(
    (state) => state.global.currentUser?.roles ?? [],
  );

  const roles = currentUserRoles.map((role: any) =>
    typeof role === "string"
      ? role.toUpperCase()
      : role.role?.name?.toUpperCase(),
  );

  const canManage =
    roles.includes("SUPER_ADMIN") || roles.includes("SCHOOL_ADMIN");

  if (!canManage) {
    return (
      <div
        className="
p-6
text-red-600
font-semibold
"
      >
        You are not allowed to access User Management.
      </div>
    );
  }

  return (
    <div
      className="
flex
flex-col
gap-5
"
    >
      <div
        className="
flex
justify-between
items-center
"
      >
        <Header name="User Management" />

        <button
          onClick={() => setCreateOpen(true)}
          className="
flex
items-center
gap-2
bg-blue-600
text-white
px-4
py-2
rounded-lg
hover:bg-blue-700
transition
"
        >
          <UserPlus size={18} />
          Create User
        </button>
      </div>

      <UserTable />

      <CreateUserModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
};

export default UsersPage;
