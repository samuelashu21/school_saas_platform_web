"use client";

import { FormEvent, useEffect, useState } from "react";

import Header from "@/app/(components)/Header";

import type { StudentRegistrationWindow } from "@/app/state/module/studentRegistration/studentRegistrationApi";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  onCreate: (data: {
    name: string;
    startDate: string;
    endDate: string;
    isActive?: boolean;
  }) => void;

  editingWindow?: StudentRegistrationWindow | null;
}

const CreateStudentRegistrationModal = ({
  isOpen,
  onClose,
  onCreate,
  editingWindow,
}: Props) => {
  const initialState = {
    name: "",

    startDate: "",

    endDate: "",

    isActive: true,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingWindow) {
      setFormData({
        name: editingWindow.name,

        startDate: editingWindow.startDate.slice(0, 10),

        endDate: editingWindow.endDate.slice(0, 10),

        isActive: editingWindow.isActive,
      });
    } else {
      setFormData(initialState);
    }
  }, [editingWindow]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert("End date must be after start date");

      return;
    }

    onCreate({
      name: formData.name,

      startDate: formData.startDate,

      endDate: formData.endDate,

      isActive: formData.isActive,
    });

    setFormData(initialState);
  };

  if (!isOpen) return null;

  const labelCss = `
  block
  text-sm
  font-semibold
  text-gray-700
  mb-1
  `;

  const inputCss = `
  block
  w-full
  mb-4
  p-2.5
  border
  border-gray-300
  rounded-lg
  focus:ring-2
  focus:ring-blue-500
  focus:outline-none
  text-sm
  bg-white
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
        bg-white
        rounded-xl
        shadow-xl
        p-6
        "
      >
        <Header
          name={
            editingWindow
              ? "Update Student Registration Window"
              : "Create Student Registration Window"
          }
        />

        <form onSubmit={handleSubmit} className="mt-5">
          <label className={labelCss}>Registration Name</label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,

                name: e.target.value,
              })
            }
            placeholder="
            Example: Grade 1 Admission 2026
            "
            required
            className={inputCss}
          />

          <label className={labelCss}>Opening Date</label>

          <input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({
                ...formData,

                startDate: e.target.value,
              })
            }
            required
            className={inputCss}
          />

          <label className={labelCss}>Closing Date</label>

          <input
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({
                ...formData,

                endDate: e.target.value,
              })
            }
            required
            className={inputCss}
          />

          {editingWindow && (
            <label
              className="
              flex
              items-center
              gap-2
              mb-5
              text-sm
              font-medium
              "
            >
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    isActive: e.target.checked,
                  })
                }
              />
              Registration Active
            </label>
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
              type="button"
              onClick={onClose}
              className="
              px-4
              py-2
              bg-gray-100
              rounded-lg
              text-sm
              hover:bg-gray-200
              "
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
              hover:bg-blue-700
              "
            >
              {editingWindow ? "Update Window" : "Create Window"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ); 
};

export default CreateStudentRegistrationModal;
