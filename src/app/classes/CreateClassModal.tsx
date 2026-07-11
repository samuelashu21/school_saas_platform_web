"use client";

import { useState } from "react";

import { useCreateClassMutation } from "@/app/state/module/classes/classApi";

import { useGetSchoolsQuery } from "@/app/state/module/schools/schoolApi";

interface Props {
  onClose: () => void;
} 

const CreateClassModal = ({ onClose }: Props) => {
  const { data: schools = [], isLoading: schoolsLoading } =
    useGetSchoolsQuery();

  const [createClass, { isLoading: createLoading }] = useCreateClassMutation();

  const [form, setForm] = useState({
    name: "",

    gradeLevelId: "",

    schoolId: "",
  });

  const selectedSchool = schools.find((school) => school.id === form.schoolId);

  const update = (key: string, value: string) => {
    setForm({
      ...form,

      [key]: value,
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createClass({
        name: form.name,

        gradeLevelId: form.gradeLevelId,
      }).unwrap();

      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed creating class");
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
shadow-xl
w-full
max-w-lg
p-6
space-y-5
"
      >
        <div
          className="
flex
justify-between
items-center
"
        >
          <h2
            className="
text-xl
font-bold
"
          >
            Create Class
          </h2>

          <button
            onClick={onClose}
            className="
text-gray-500
hover:text-red-500
"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={submit}
          className="
space-y-4
"
        >
          <input
            className="
border
rounded-lg
w-full
p-3
"
            placeholder="Class Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <select
            className="
border
rounded-lg
w-full
p-3
"
            value={form.schoolId}
            onChange={(e) =>
              setForm({
                ...form,

                schoolId: e.target.value,

                gradeLevelId: "",
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

          <select
            className="
border
rounded-lg
w-full
p-3
"
            value={form.gradeLevelId}
            disabled={!form.schoolId}
            onChange={(e) => update("gradeLevelId", e.target.value)}
          >
            <option value="">Select Grade Level</option>

            {selectedSchool?.grades?.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
                (Level {grade.level})
              </option>
            ))}
          </select>

          <div
            className="
flex
justify-end
gap-3
pt-4
"
          >
            <button
              type="button"
              onClick={onClose}
              className="
px-5
py-2
rounded-lg
bg-gray-200
"
            >
              Cancel
            </button>

            <button
              disabled={createLoading}
              className="
px-5
py-2
rounded-lg
bg-blue-600
text-white
disabled:opacity-50
"
            >
              {createLoading ? "Creating..." : "Create Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassModal;
