"use client";

import { useDeleteGradeMutation } from "@/app/state/module/grades/gradeApi";
 

interface Props {
  grade: any;
 
  open: boolean;

  onClose: () => void;
}

export default function DeleteGradeDialog({
  grade,

  open,

  onClose,
}: Props) {
  const [deleteGrade, { isLoading }] = useDeleteGradeMutation();

  if (!open) return null;

  const remove = async () => {
    try {
      await deleteGrade(grade.id).unwrap();

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
max-w-sm
"
      >
        <h2
          className="
text-xl
font-bold
mb-3
"
        >
          Delete Grade
        </h2>

        <p
          className="
text-gray-600
mb-6
"
        >
          Are you sure you want to delete
          <strong> {grade.name}</strong>?
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
px-4
py-2
bg-gray-200
rounded
"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={remove}
            className="
px-4
py-2
bg-red-600
text-white
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
