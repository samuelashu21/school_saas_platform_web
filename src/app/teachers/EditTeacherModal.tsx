"use client";

import { useState } from "react";

import { useUpdateTeacherMutation } from "@/app/state/module/teachers/teacherApi";

interface Props {
  teacher: any;

  onClose: () => void;  
}

export default function EditTeacherModal({
  teacher,

  onClose,
}: Props) {
  const [updateTeacher] = useUpdateTeacherMutation();

  const [form, setForm] = useState({
    name: teacher.account.name,

    email: teacher.account.email,
  });

  const submit = async () => {
    await updateTeacher({
      id: teacher.id,

      ...form,
    }).unwrap();

    onClose();
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
p-6
rounded-xl
w-full
max-w-md
"
      >
        <h2
          className="
font-bold
text-xl
mb-5
"
        >
          Edit Teacher
        </h2>

        <input
          className="
border
p-3
w-full
mb-3
rounded
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
          className="
border
p-3
w-full
mb-5
rounded
"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,

              email: e.target.value,
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
            onClick={submit}
            className="
bg-blue-600
text-white
px-4
py-2
rounded
"
          >
            Save
          </button>
        </div> 
      </div>
    </div>
  );
}
