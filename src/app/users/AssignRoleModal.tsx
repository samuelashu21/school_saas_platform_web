"use client";

import { useEffect, useState } from "react";

import {
  useUpdateUserMutation,
  useAssignRoleMutation,
  UserRole,
} from "@/app/state/module/users/userApi";

interface Props {
  open: boolean;

  user: any;

  onClose: () => void;
}

const availableRoles: UserRole[] = [
  "SCHOOL_ADMIN",
  "VICE_PRINCIPAL",
  "REGISTRAR",
  "ADMISSION_OFFICER",
  "EXAM_COORDINATOR",
  "TEACHER",
  "CLASS_TEACHER",
  "PARENT",
];

export default function AssignRoleModal({ open, user, onClose }: Props) {
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const [assignRole, { isLoading: assigning }] = useAssignRoleMutation();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [role, setRole] = useState<UserRole>("REGISTRAR");

  const [photo, setPhoto] = useState<File | null>(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (open && user) {
      setFirstName(user.firstName || "");

      setLastName(user.lastName || "");

      setEmail(user.email || "");

      setAddress(user.address || "");

      setRole(user.roles?.length ? user.roles[0].role.name : "REGISTRAR");

      setPhoto(null);

      setError("");
    }
  }, [open, user]);

  if (!open || !user) return null;

  const submit = async () => {
    try {
      setError("");

      const formData = new FormData();

      formData.append("firstName", firstName);

      formData.append("lastName", lastName);

      formData.append("email", email);

      formData.append("address", address);

      if (photo) {
        formData.append("photo", photo);
      }

      await updateUser({
        id: user.id,
        data: formData,
      }).unwrap();

      const currentRole =
        user.roles?.length > 0 ? user.roles[0].role.name : null;

      if (currentRole !== role) {
        await assignRole({
          id: user.id,
          role,
        }).unwrap();
      }

      onClose();
    } catch (err: any) {
      setError(err?.data?.message || "Failed updating user.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[520px] p-6">
        <h2 className="text-2xl font-bold mb-5">Update User</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">First Name</label>

            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Last Name</label>

            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm mb-1">Email</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm mb-1">Address</label>

            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm mb-1">Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full border rounded-lg px-3 py-2"
            >
              {availableRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm mb-1">Photo</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {error && <div className="text-red-600 text-sm mt-4">{error}</div>}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={updating || assigning}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {updating || assigning ? "Saving..." : "Update User"}
          </button>
        </div>
      </div> 
    </div>
  );
}
