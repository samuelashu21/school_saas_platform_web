"use client";

import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CreateStudentRequest,
  useRegisterStudentMutation,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

type RegistrationFormState = {
  studentCode: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  schoolId: string;
  parentId: string;
};

type FieldErrors = Partial<Record<keyof RegistrationFormState, string>>;

type ApiError = {
  data?: {
    message?: string;
  };
};

const initialFormState: RegistrationFormState = {
  studentCode: "",
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  schoolId: "",
  parentId: "",
};

const StudentRegistrationForm = () => {
  const [formState, setFormState] = useState<RegistrationFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [registerStudent, { isLoading }] = useRegisterStudentMutation();

  const isSubmitDisabled = useMemo(
    () =>
      isLoading ||
      !formState.studentCode ||
      !formState.firstName ||
      !formState.lastName ||
      !formState.gender ||
      !formState.dateOfBirth ||
      !formState.schoolId,
    [formState, isLoading],
  );

  const validate = () => {
    const nextErrors: FieldErrors = {};

    if (!formState.studentCode.trim()) {
      nextErrors.studentCode = "Student code is required.";
    }

    if (!formState.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!formState.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!formState.gender.trim()) {
      nextErrors.gender = "Gender is required.";
    }

    if (!formState.dateOfBirth) {
      nextErrors.dateOfBirth = "Date of birth is required.";
    }

    if (!formState.schoolId.trim()) {
      nextErrors.schoolId = "School ID is required.";
    }

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setApiError("");
    setSuccessMessage("");

    if (!validate()) {
      return;
    }

    const payload: CreateStudentRequest = {
      studentCode: formState.studentCode.trim(),
      firstName: formState.firstName.trim(),
      lastName: formState.lastName.trim(),
      gender: formState.gender,
      dateOfBirth: formState.dateOfBirth,
      schoolId: formState.schoolId.trim(),
      parentId: formState.parentId.trim() || undefined,
    };

    try {
      const createdStudent = await registerStudent(payload).unwrap();

      const message = `Student ${createdStudent.firstName} ${createdStudent.lastName} registered successfully with status PENDING.`;
      setSuccessMessage(message);
      toast.success("Student registration submitted for approval.");
      setFormState(initialFormState);
      setFieldErrors({});
    } catch (error) {
      const registrationError = error as ApiError;
      setApiError(registrationError.data?.message ?? "Failed to register student.");
    }
  };

  const inputClassName =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500";

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Student Code</label>
            <input
              className={inputClassName}
              value={formState.studentCode}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  studentCode: event.target.value,
                }))
              }
              placeholder="STD-2026-001"
            />
            {fieldErrors.studentCode && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.studentCode}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">School ID</label>
            <input
              className={inputClassName}
              value={formState.schoolId}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  schoolId: event.target.value,
                }))
              }
              placeholder="school-id"
            />
            {fieldErrors.schoolId && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.schoolId}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">First Name</label>
            <input
              className={inputClassName}
              value={formState.firstName}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  firstName: event.target.value,
                }))
              }
              placeholder="John"
            />
            {fieldErrors.firstName && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Last Name</label>
            <input
              className={inputClassName}
              value={formState.lastName}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  lastName: event.target.value,
                }))
              }
              placeholder="Doe"
            />
            {fieldErrors.lastName && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.lastName}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Gender</label>
            <select
              className={inputClassName}
              value={formState.gender}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  gender: event.target.value,
                }))
              }
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {fieldErrors.gender && <p className="mt-1 text-xs text-red-600">{fieldErrors.gender}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Date of Birth</label>
            <input
              type="date"
              className={inputClassName}
              value={formState.dateOfBirth}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  dateOfBirth: event.target.value,
                }))
              }
            />
            {fieldErrors.dateOfBirth && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.dateOfBirth}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Parent ID (optional)
            </label>
            <input
              className={inputClassName}
              value={formState.parentId}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  parentId: event.target.value,
                }))
              }
              placeholder="parent-id"
            />
          </div>
        </div>

        {successMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {apiError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Registering..." : "Register Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
