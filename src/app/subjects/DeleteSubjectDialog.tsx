"use client";

import { useState } from "react";
import { useDeleteSubjectMutation } from "@/app/state/module/subjects/subjectApi";

interface Subject {
  id: string;
  name: string;
  code: string;
} 

interface Props {
  subject: Subject;
  onClose: () => void;
}

export default function DeleteSubjectDialog({ subject, onClose }: Props) {
  const [deleteSubject, { isLoading }] = useDeleteSubjectMutation();

  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");

    try {
      await deleteSubject(subject.id).unwrap();

      onClose();
    } catch (err: any) {
      setError(err?.data?.message ?? "Failed to delete subject.");
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
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
          max-w-md
          p-6
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-red-600
            mb-4
          "
        >
          Delete Subject
        </h2>

        <p className="text-gray-700 leading-6">
          Are you sure you want to permanently delete this subject?
        </p>

        <div
          className="
            mt-4
            rounded-lg
            border
            bg-gray-50
            p-4
          "
        >
          <p>
            <span className="font-semibold">Name:</span> {subject.name}
          </p>

          <p className="mt-1">
            <span className="font-semibold">Code:</span> {subject.code}
          </p>
        </div>

        <p
          className="
            mt-4
            text-sm
            text-red-500
          "
        >
          This action cannot be undone.
        </p>

        {error && (
          <div
            className="
              mt-4
              rounded-lg
              border
              border-red-200
              bg-red-50
              p-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )} 

        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
          "
        >
          <button
            onClick={onClose}
            disabled={isLoading}
            className="
              px-4
              py-2
              rounded-lg
              bg-gray-200
              hover:bg-gray-300
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="
              px-5
              py-2
              rounded-lg
              bg-red-600
              text-white
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {isLoading ? "Deleting..." : "Delete Subject"}
          </button>
        </div>
      </div>
    </div>
  );
}
