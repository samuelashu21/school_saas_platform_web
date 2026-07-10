"use client";

import React, { FormEvent, useState, ChangeEvent } from "react";

import Header from "@/app/(components)/Header";

type CourseFormData = {
  courseId: string;

  name: string;

  code: string;

  credits: number;
};

type CreateCourseModalProps = {
  isOpen: boolean;

  onClose: () => void;

  onCreate: (formData: CourseFormData) => void;
};

const CreateCourseModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateCourseModalProps) => {
  const initialFormState: CourseFormData = {
    courseId: "",

    name: "",

    code: "",

    credits: 3,
  };

  const [formData, setFormData] = useState<CourseFormData>(initialFormState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,

      [name]: name === "credits" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,

      courseId: `CRS-${Date.now()}`,
    };

    onCreate(payload);

    setFormData(initialFormState);

    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-semibold text-gray-700 mb-1";

  const inputCssStyle = `
    block
    w-full
    mb-4
    p-2.5
    border-gray-300
    border
    rounded-lg
    focus:ring-2
    focus:ring-blue-500
    focus:outline-none
    bg-white
    text-gray-900
    text-sm
    `;

  return (
    <div
      className="
      fixed
      inset-0
      bg-slate-900/40
      backdrop-blur-sm
      z-50
      flex
      items-center
      justify-center
      "
    >
      <div
        className="
        w-full
        max-w-md
        p-6
        bg-white
        rounded-xl
        shadow-xl
        border
        border-gray-100
        "
      >
        <Header name="Provision New Course" />

        <form onSubmit={handleSubmit} className="mt-5">
          <label className={labelCssStyles}>Course Catalog Title</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Advanced Calculus II"
            required
            className={inputCssStyle}
            data-testid="create-course-name"
          />

          <label className={labelCssStyles}>Course Alpha Code</label>

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g., MATH-202"
            required
            className={inputCssStyle}
            data-testid="create-course-code"
          />

          <label className={labelCssStyles}>Academic Credits Units (CU)</label>

          <input
            type="number"
            name="credits"
            min={1}
            max={6}
            value={formData.credits}
            onChange={handleChange}
            required
            className={inputCssStyle}
            data-testid="create-course-credits"
          />

          <div
            className="
            flex
            justify-end
            gap-2
            mt-6
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
              px-4
              py-2
              bg-gray-100
              rounded-lg
              text-sm
              font-medium
              hover:bg-gray-200
              "
              data-testid="cancel-create-course"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
              px-4
              py-2
              bg-blue-600
              text-white
              rounded-lg
              text-sm
              font-medium
              hover:bg-blue-700
              "
              data-testid="submit-create-course"
            >
              Confirm Catalog Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
