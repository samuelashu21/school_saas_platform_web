"use client";

import { useState } from "react";

import { useCreateAcademicPeriodMutation } from "@/app/state/module/academicPeriods/academicPeriodApi";

interface Props {
  onClose: () => void;
}

export default function CreateAcademicPeriodModal({ onClose }: Props) {
  const [createPeriod, { isLoading }] = useCreateAcademicPeriodMutation();

  const currentYear = new Date().getFullYear();

  const academicYears = [
    `${currentYear}/${currentYear + 1}`,
    `${currentYear + 1}/${currentYear + 2}`,
  ];

  const initialForm = {
    academicYear: `${currentYear}/${currentYear + 1}`,

    semester: "SEMESTER_1",

    startDate: "",

    endDate: "",

    isActive: true,
  };

  const [form, setForm] = useState(initialForm);

  const [error, setError] = useState("");

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,

      [field]: value,
    }));
  };

  const submit = async () => {
    setError("");

    if (
      !form.academicYear ||
      !form.semester ||
      !form.startDate ||
      !form.endDate
    ) {
      setError("All fields are required.");

      return;
    }

    const start = new Date(form.startDate);

    const end = new Date(form.endDate);

    if (end <= start) {
      setError("End date must be after start date.");

      return;
    }

    if (end < new Date()) {
      setError("Cannot create expired academic period.");

      return;
    }

    try {
      await createPeriod(form).unwrap();

      setForm(initialForm);

      onClose();
    } catch (error: any) {
      console.error(error);

      setError(error?.data?.message ?? "Failed creating academic period.");
    }
  };

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
        shadow-lg
        p-6
        w-full
        max-w-md
        "
      >
        <h2
          className="
          text-xl
          font-bold
          mb-5
          "
        >
          Create Global Academic Period
        </h2>

        {error && (
          <div
            className="
              bg-red-100
              text-red-700
              p-3
              rounded-lg
              mb-4
              "
          >
            {error}
          </div>
        )}

        <label className="block mb-2 font-medium">Academic Year</label>

        <select
          value={form.academicYear}
          onChange={(e) => updateField("academicYear", e.target.value)}
          className="
          border
          rounded-lg
          p-3
          w-full
          mb-4
          "
        >
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Semester</label>

        <select
          value={form.semester}
          onChange={(e) => updateField("semester", e.target.value)}
          className="
          border
          rounded-lg
          p-3
          w-full
          mb-4
          "
        >
          <option value="SEMESTER_1">Semester 1</option>

          <option value="SEMESTER_2">Semester 2</option>
        </select>

        <label className="block mb-2 font-medium">Start Date</label>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) => updateField("startDate", e.target.value)}
          className="
          border
          rounded-lg
          p-3
          w-full
          mb-4
          "
        />

        <label className="block mb-2 font-medium">End Date</label>

        <input
          type="date"
          value={form.endDate}
          onChange={(e) => updateField("endDate", e.target.value)}
          className="
          border
          rounded-lg
          p-3
          w-full
          mb-4
          "
        />

        <label
          className="
          flex
          items-center
          gap-2
          mb-5
          "
        >
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => updateField("isActive", e.target.checked)}
          />
          Set as current active period
        </label>

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
            rounded-lg
            bg-gray-200
            "
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={submit}
            className="
            px-4
            py-2
            rounded-lg
            bg-blue-600
            text-white
            hover:bg-blue-700
            disabled:opacity-50
            "
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div> 
  );
}
