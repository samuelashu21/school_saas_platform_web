"use client";

import { useState } from "react";

import { useUpdateClassMutation } from "@/app/state/module/classes/classApi";

import { useGetSchoolsQuery } from "@/app/state/module/schools/schoolApi";

interface ClassData {
  id: string;

  name: string;

  gradeLevelId: string;

  gradeLevel?: {
    id: string;

    name: string;

    level: number;
  };
}

interface Props {
  classData: ClassData;

  onClose: () => void;
}

const EditClassModal = ({ classData, onClose }: Props) => {
  const { data: schools = [] } = useGetSchoolsQuery();

  const [updateClass, { isLoading }] = useUpdateClassMutation();

  const [form, setForm] = useState({
    name: classData.name,

    schoolId: "",

    gradeLevelId: classData.gradeLevelId,
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
      await updateClass({
        id: classData.id,

        name: form.name,

        gradeLevelId: form.gradeLevelId,
      }).unwrap();

      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed updating class");
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
"
      >
        <div
          className="
flex
justify-between
items-center
mb-5
"
        >
          <h2
            className="
text-xl
font-bold
"
          >
            Edit Class
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
p-3
w-full
"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />

          <select
            className="
border
rounded-lg
p-3
w-full
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
            <option value="">Change School (optional)</option>

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
p-3
w-full
"
            value={form.gradeLevelId}
            onChange={(e) => update("gradeLevelId", e.target.value)}
          >
            <option value="">Select Grade Level</option>

            {(form.schoolId
              ? selectedSchool?.grades
              : schools.flatMap((s) => s.grades ?? [])
            )?.map((grade) => (
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
pt-5
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
              disabled={isLoading}
              className="
px-5
py-2
rounded-lg
bg-blue-600
text-white
"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div> 
    </div>
  );
};

export default EditClassModal;
