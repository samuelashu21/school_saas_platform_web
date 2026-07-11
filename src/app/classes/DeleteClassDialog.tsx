"use client";

import { useDeleteClassMutation } from "@/app/state/module/classes/classApi";

interface ClassData {
  id: string;

  name: string;
}

interface Props {
  classData: ClassData;

  onClose: () => void;
}

const DeleteClassDialog = ({ classData, onClose }: Props) => {
  const [deleteClass, { isLoading }] = useDeleteClassMutation();

  const remove = async () => {
    try {
      await deleteClass(classData.id).unwrap();

      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed deleting class");
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
p-6
w-full
max-w-md
space-y-5
"
      >
        <h2
          className="
text-xl
font-bold
"
        >
          Delete Class
        </h2>

        <p
          className="
text-gray-600
"
        >
          Are you sure you want to delete:
          <span
            className="
font-semibold
"
          >
            {classData.name}
          </span>
          ?
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
px-5
py-2
rounded-lg
bg-gray-200
"
          >
            Cancel
          </button>

          <button
            onClick={remove}
            disabled={isLoading}
            className="
px-5
py-2
rounded-lg
bg-red-600
text-white
disabled:opacity-50
"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div> 
    </div>
  );
};

export default DeleteClassDialog;
