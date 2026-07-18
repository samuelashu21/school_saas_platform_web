"use client";

import { useEffect, useMemo, useState } from "react";

import {
  useCreateUserMutation,
  UserRole,
} from "@/app/state/module/users/userApi";

import { useAppSelector } from "@/app/redux";

interface Props {
  open: boolean;

  onClose: () => void;
}

// ======================================================
// ROLE PERMISSIONS
// ======================================================

const SUPER_ADMIN_ROLES: UserRole[] = [
  "SCHOOL_ADMIN",
  "VICE_PRINCIPAL",
  "REGISTRAR",
  "ADMISSION_OFFICER",
  "EXAM_COORDINATOR",
  "TEACHER",
  "CLASS_TEACHER",
];

const SCHOOL_ADMIN_ROLES: UserRole[] = [
  "VICE_PRINCIPAL",
  "REGISTRAR",
  "ADMISSION_OFFICER",
  "EXAM_COORDINATOR",
  "TEACHER",
  "CLASS_TEACHER",
];

export default function CreateUserModal({ open, onClose }: Props) {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const currentRoles = useAppSelector(
    (state) => state.global.currentUser?.roles ?? [],
  );

  const normalizedRoles = useMemo(() => {
    return currentRoles.map((role: any) => {
      if (typeof role === "string") {
        return role.toUpperCase();
      }

      return (role?.role?.name ?? role?.name ?? "").toUpperCase();
    });
  }, [currentRoles]);

  const allowedRoles = useMemo(() => {
    if (normalizedRoles.includes("SUPER_ADMIN")) {
      return SUPER_ADMIN_ROLES;
    }

    if (normalizedRoles.includes("SCHOOL_ADMIN")) {
      return SCHOOL_ADMIN_ROLES;
    }

    return [];
  }, [normalizedRoles]);

  const [photo, setPhoto] = useState<File | null>(null);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",

    lastName: "",

    email: "",

    password: "",

    address: "",

    schoolId: "",

    role: "REGISTRAR" as UserRole,

    isActive: true,
  });

  useEffect(() => {
    if (open) {
      setForm({
        firstName: "",

        lastName: "",

        email: "",

        password: "",

        address: "",

        schoolId: "",

        role: allowedRoles[0] ?? "REGISTRAR",

        isActive: true,
      });

      setPhoto(null);

      setError("");
    }
  }, [open, allowedRoles]);

  if (!open) return null;

  const updateField = (
    field:
      | "firstName"
      | "lastName"
      | "email"
      | "password"
      | "address"
      | "schoolId"
      | "role"
      | "isActive",

    value: any,
  ) => {
    setForm((prev) => ({
      ...prev,

      [field]: value,
    }));
  };

  const submit = async () => {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      setError("First name, last name, email and password are required.");

      return;
    }

    if (allowedRoles.length === 0) {
      setError("You are not allowed to create users.");

      return;
    }

    try {
      setError("");

      const data = new FormData();

      data.append("firstName", form.firstName);

      data.append("lastName", form.lastName);

      data.append("email", form.email);

      data.append("password", form.password);

      data.append("address", form.address);

      data.append("role", form.role);

      data.append("isActive", String(form.isActive));

      if (form.schoolId) {
        data.append("schoolId", form.schoolId);
      }

      if (photo) {
        data.append("photo", photo);
      }

      await createUser(data).unwrap();

      onClose();
    } catch (err: any) {
      setError(err?.data?.message ?? "Failed creating account.");
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      "
    >
      <div
        className="
        bg-white
        rounded-xl
        shadow-xl
        w-full
        max-w-xl
        max-h-[90vh]
        overflow-y-auto
        p-6
        "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-6
          "
        >
          Create User
        </h2>

        <div
          className="
          grid
          grid-cols-2
          gap-4
          "
        >
          <input
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="
            border
            rounded-lg
            px-3
            py-2
            "
          />

          <input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="
            border
            rounded-lg
            px-3
            py-2
            "
          />

          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="
            col-span-2
            border
            rounded-lg
            px-3
            py-2
            "
          />

          <input
            placeholder="Temporary Password"
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="
            col-span-2
            border
            rounded-lg
            px-3
            py-2
            "
          />

          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="
            col-span-2
            border
            rounded-lg
            px-3
            py-2
            "
          />

          <input
            placeholder="School ID (optional)"
            value={form.schoolId}
            onChange={(e) => updateField("schoolId", e.target.value)}
            className="
            col-span-2
            border
            rounded-lg
            px-3
            py-2
            "
          />

          <select
            value={form.role}
            onChange={(e) => updateField("role", e.target.value as UserRole)}
            className="
            col-span-2
            border
            rounded-lg
            px-3
            py-2
            "
          >
            {allowedRoles.map((role) => (
              <option key={role} value={role}>
                {role.replaceAll("_", " ")}
              </option>
            ))}
          </select>

          <select
            value={form.isActive ? "ACTIVE" : "DISABLED"}
            onChange={(e) =>
              updateField("isActive", e.target.value === "ACTIVE")
            }
            className="
            col-span-2
            border
            rounded-lg
            px-3
            py-2
            "
          >
            <option value="ACTIVE">ACTIVE</option>

            <option value="DISABLED">DISABLED</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            className="
            col-span-2
            "
          />
        </div>

        {error && (
          <div
            className="
            mt-4
            bg-red-50
            text-red-600
            p-3
            rounded-lg
            "
          >
            {error}
          </div>
        )}

        <div
          className="
          flex
          justify-end
          gap-3
          mt-6
          "
        >
          <button
            onClick={onClose}
            className="
            px-5
            py-2
            border
            rounded-lg
            "
          >
            Cancel
          </button>

          <button
            disabled={isLoading || allowedRoles.length === 0}
            onClick={submit}
            className="
            px-5
            py-2
            bg-blue-600
            text-white
            rounded-lg
            disabled:opacity-50
            "
          >
            {isLoading ? "Creating..." : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
}
