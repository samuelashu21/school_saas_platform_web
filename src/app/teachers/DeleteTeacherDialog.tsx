"use client";

import { useDeleteTeacherMutation } from "@/app/state/module/teachers/teacherApi";

interface Props {
  teacher: any;

  onClose: () => void;
}

export default function DeleteTeacherDialog({
  teacher,

  onClose,
}: Props) {
  const [deleteTeacher, { isLoading }] = useDeleteTeacherMutation();

  const remove = async () => {
    await deleteTeacher(teacher.id).unwrap();

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
rounded-xl
p-6
w-full
max-w-sm
"
      >
        <h2
          className="
text-lg
font-bold
mb-3
"
        >
          Delete Teacher
        </h2>

        <p
          className="
text-gray-600
mb-5
"
        >
          Are you sure you want to delete
          <b> {teacher.account.name}</b>?
        </p>

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
            onClick={remove}
            className="
bg-red-600
text-white
px-4
py-2
rounded
"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button> 
        </div>
      </div>
    </div>
  );
}
