"use client";

import { useState } from "react";

import {
  AcademicPeriod,
  useUpdateAcademicPeriodMutation,
} from "@/app/state/module/academicPeriods/academicPeriodApi";

interface Props {
  period: AcademicPeriod;
  onClose: () => void;
}

export default function EditAcademicPeriodModal({
  period,
  onClose,
}: Props) {
  const [updatePeriod, { isLoading }] =
    useUpdateAcademicPeriodMutation();

  const [form, setForm] = useState({
    academicYear: period.academicYear,

    semester: period.semester,

    startDate: period.startDate.slice(0, 10),

    endDate: period.endDate.slice(0, 10),
  });

  const submit = async () => {
    if (
      !form.academicYear ||
      !form.semester ||
      !form.startDate ||
      !form.endDate
    ) {
      alert("Please complete all fields.");

      return;
    }

    try {
      await updatePeriod({
        id: period.id,

        academicYear: form.academicYear,

        semester: form.semester,

        startDate: form.startDate,

        endDate: form.endDate,
      }).unwrap();

      onClose();
    } catch (error) {
      console.error("Failed updating academic period", error);

      alert("Failed updating academic period.");
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
mb-6
"
        >
          Edit Academic Period
        </h2>

        {/* Academic Year */}

        <label
          className="
block
mb-2
font-medium
"
        >
          Academic Year
        </label>

        <input
          value={form.academicYear}
          onChange={(e) =>
            setForm({
              ...form,
              academicYear: e.target.value,
            })
          }
          className="
border
rounded-lg
p-3
w-full
mb-4
"
        />

        {/* Semester */}

        <label
          className="
block
mb-2
font-medium
"
        >
          Semester
        </label>

        <select
          value={form.semester}
          onChange={(e) =>
            setForm({
              ...form,
              semester: e.target.value,
            })
          }
          className="
border
rounded-lg
p-3
w-full
mb-4
"
        >
          <option value="SEMESTER_1">
            Semester 1
          </option>

          <option value="SEMESTER_2">
            Semester 2
          </option>
        </select>

        {/* Start Date */}

        <label
          className="
block
mb-2
font-medium
"
        >
          Start Date
        </label>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({
              ...form,
              startDate: e.target.value,
            })
          }
          className="
border
rounded-lg
p-3
w-full
mb-4
"
        />

        {/* End Date */}

        <label
          className="
block
mb-2
font-medium
"
        >
          End Date
        </label>

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({
              ...form,
              endDate: e.target.value,
            })
          }
          className="
border
rounded-lg
p-3
w-full
mb-6
"
        />

        {/* Buttons */}

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
hover:bg-gray-300
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
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}