"use client";
 
import { useState } from "react";

import { useUpdateGradeMutation } from "@/app/state/module/grades/gradeApi";

interface Props {
  grade: any;

  open: boolean;
 
  onClose: () => void;
}

export default function EditGradeModal({
  grade,

  open,

  onClose,
}: Props) {
  const [updateGrade, { isLoading }] = useUpdateGradeMutation();

  const [form, setForm] = useState({
    name: grade.name,

    level: grade.level,
  });

  if (!open) return null;

  const submit = async () => {
    try {
      await updateGrade({
        id: grade.id,

        name: form.name,

        level: Number(form.level),
      }).unwrap();

      onClose();
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
          Edit Grade
        </h2>

        <input
          className="
border
w-full
p-3
rounded
mb-3
"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,

              name: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="
border
w-full
p-3
rounded
mb-5
"
          value={form.level}
          onChange={(e) =>
            setForm({
              ...form,

              level: Number(e.target.value),
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
bg-gray-200
px-4
py-2
rounded
"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={submit}
            className="
bg-blue-600
text-white
px-4
py-2
rounded
"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
