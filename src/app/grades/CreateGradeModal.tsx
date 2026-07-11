"use client";

import { useState } from "react";

import { useCreateGradeMutation } from "@/app/state/module/grades/gradeApi";

import { useGetSchoolsQuery } from "@/app/state/module/schools/schoolApi";
 
interface Props {
  open: boolean;

  onClose: () => void;
}

export default function CreateGradeModal({
  open,

  onClose,
}: Props) {
  const [createGrade, { isLoading }] = useCreateGradeMutation();

  const { data: schools = [] } = useGetSchoolsQuery();

  const [form, setForm] = useState({
    name: "",

    level: "",

    schoolId: "",
  });

  if (!open) return null;

  const submit = async () => {
    try {
      await createGrade({
        name: form.name,

        level: Number(form.level),

        schoolId: form.schoolId,
      }).unwrap();

      onClose();

      setForm({
        name: "",

        level: "",

        schoolId: "",
      });
    } catch (error) {
      console.error(error);
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
          Create Grade
        </h2>

        <select
          className="
border
w-full
p-3
rounded
mb-3
"
          value={form.schoolId}
          onChange={(e) =>
            setForm({
              ...form,
              schoolId: e.target.value,
            })
          }
        >
          <option value="">Select School</option>

          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>

        <input
          className="
border
w-full
p-3
rounded
mb-3
"
          placeholder="Grade Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="
border
w-full
p-3
rounded
mb-5
"
          placeholder="Level"
          type="number"
          value={form.level}
          onChange={(e) =>
            setForm({
              ...form,
              level: e.target.value,
            })
          }
        />

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
rounded
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
rounded
bg-blue-600
text-white
"
          >
            {isLoading ? "Saving..." : "Create"}
          </button>
        </div>
      </div> 
    </div>
  );
}
