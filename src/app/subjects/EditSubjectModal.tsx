"use client";

import { useEffect, useState } from "react";

import { useUpdateSubjectMutation } from "@/app/state/module/subjects/subjectApi";

interface Subject {
  id: string;
  name: string;
  code: string;
}  

interface Props {
  subject: Subject;
  onClose: () => void;
}

export default function EditSubjectModal({ subject, onClose }: Props) {
  const [updateSubject, { isLoading }] = useUpdateSubjectMutation();

  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (subject) {
      setForm({
        name: subject.name,
        code: subject.code,
      });
    }
  }, [subject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.name.trim()) {
      setError("Subject name is required");
      return;
    }

    if (!form.code.trim()) {
      setError("Subject code is required");
      return;
    }

    try {
      await updateSubject({
        id: subject.id,
        ...form,
      }).unwrap();

      onClose();
    } catch (err: any) {
      setError(err?.data?.message ?? "Failed updating subject");
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
          w-full
          max-w-md
          p-6
        "
      >
        <h2
          className="
            text-xl
            font-bold
            mb-5
          "
        >
          Edit Subject
        </h2>

        {/* Subject Name */}

        <div className="mb-4">
          <label
            className="
              block
              text-sm
              font-medium
              mb-2
            "
          >
            Subject Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Mathematics"
            className="
              border
              rounded-lg
              w-full
              p-3
            "
          />
        </div>

        {/* Subject Code */}

        <div className="mb-4">
          <label
            className="
              block
              text-sm
              font-medium
              mb-2
            "
          >
            Subject Code
          </label>

          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="MATH101"
            className="
              border
              rounded-lg
              w-full
              p-3
              uppercase
            "
          />
        </div>

        {error && (
          <div
            className="
              mb-4
              rounded-lg
              bg-red-50
              border
              border-red-200
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
            onClick={handleSubmit}
            disabled={isLoading}
            className="
              px-5
              py-2
              rounded-lg
              bg-blue-600
              text-white
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {isLoading ? "Updating..." : "Update Subject"}
          </button>
        </div>
      </div>
    </div>
  );
}
