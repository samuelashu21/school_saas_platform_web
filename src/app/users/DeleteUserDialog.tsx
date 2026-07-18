"use client";

import { useDeleteUserMutation } from "@/app/state/module/users/userApi";

interface Props {
  open: boolean;

  user: any;

  onClose: () => void;
}

export default function DeleteUserDialog({ open, user, onClose }: Props) {
  const [deleteUser, { isLoading, isError }] = useDeleteUserMutation();

  if (!open || !user) return null;

  const handleDelete = async () => {
    try {
      await deleteUser({
        id: user.id,
      }).unwrap();

      onClose();
    } catch (error) {
      console.error("Delete user failed:", error);
    }
  };

  const fullName =
    user.name || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        bg-white
        rounded-xl
        shadow-xl
        p-6
        w-[420px]
        "
      >
        <h2
          className="
          text-xl
          font-bold
          text-gray-800
          mb-4
          "
        >
          Delete User
        </h2>

        <p
          className="
          text-gray-600
          mb-3
          "
        >
          Are you sure you want to delete
          <span
            className="
            font-semibold
            ml-1
            "
          >
            {fullName}
          </span>
          ?
        </p>

        <p
          className="
          text-sm
          text-red-600
          mb-5
          "
        >
          This action cannot be undone.
        </p>

        {isError && (
          <p
            className="
            text-red-600
            text-sm
            mb-3
            "
          >
            Failed deleting user.
          </p>
        )}

        <div
          className="
          flex
          justify-end
          gap-3
          "
        >
          <button
            onClick={onClose}
            className="
            px-4
            py-2
            border
            rounded-lg
            hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={handleDelete}
            className="
            px-4
            py-2
            rounded-lg
            bg-red-600
            text-white
            hover:bg-red-700
            disabled:opacity-50
            "
          >
            {isLoading ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
}
