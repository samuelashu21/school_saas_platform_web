"use client";

import { useState } from "react";

import { Pencil, Trash2, CheckCircle } from "lucide-react";

import {
  AcademicPeriod,
  useSetCurrentAcademicPeriodMutation,
  useDeleteAcademicPeriodMutation,
} from "@/app/state/module/academicPeriods/academicPeriodApi";

import EditAcademicPeriodModal from "./EditAcademicPeriodModal";

interface Props {
  periods?: AcademicPeriod[];
}

export default function AcademicPeriodTable({ periods = [] }: Props) {
  const [editingPeriod, setEditingPeriod] = useState<AcademicPeriod | null>(
    null,
  );

  const [setCurrent, { isLoading: activating }] =
    useSetCurrentAcademicPeriodMutation();

  const [deletePeriod, { isLoading: deleting }] =
    useDeleteAcademicPeriodMutation();

  const handleActivate = async (id: string) => {
    try {
      await setCurrent(id).unwrap();
    } catch (error) {
      console.error("Activation error:", error);

      alert("Failed activating academic period");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this academic period?",
    );

    if (!confirmed) return;

    try {
      await deletePeriod(id).unwrap();
    } catch (error) {
      console.error("Delete error:", error);

      alert("Failed deleting academic period");
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "-";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "-";
    }

    return parsed.toLocaleDateString();
  };

  if (periods.length === 0) {
    return (
      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-6
        text-gray-500
        "
      >
        No academic periods found.
      </div>
    );
  }

  return (
    <>
      <div
        className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden
        "
      >
        <table
          className="
          w-full
          text-left
          "
        >
          <thead
            className="
            bg-gray-100
            "
          >
            <tr>
              <th className="p-4">Academic Year</th>

              <th className="p-4">Semester</th>

              <th className="p-4">Start Date</th>

              <th className="p-4">End Date</th>

              <th className="p-4">Status</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {periods.map((period) => (
              <tr
                key={period.id}
                className="
                border-b
                hover:bg-gray-50
                "
              >
                <td
                  className="
                  p-4
                  font-medium
                  "
                >
                  {period.academicYear}
                </td>

                <td
                  className="
                  p-4
                  "
                >
                  {period.semester === "SEMESTER_1"
                    ? "Semester 1"
                    : "Semester 2"}
                </td>

                <td className="p-4">{formatDate(period.startDate)}</td>

                <td className="p-4">{formatDate(period.endDate)}</td>

                <td className="p-4">
                  {period.isActive ? (
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-sm
                        "
                    >
                      Active
                    </span>
                  ) : (
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-gray-100
                        text-gray-600
                        text-sm
                        "
                    >
                      Closed
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div
                    className="
                    flex
                    gap-2
                    flex-wrap
                    "
                  >
                    {!period.isActive && (
                      <button
                        disabled={activating}
                        onClick={() => handleActivate(period.id)}
                        className="
                          flex
                          items-center
                          gap-1
                          bg-blue-600
                          text-white
                          px-3
                          py-1.5
                          rounded-lg
                          disabled:opacity-50
                          "
                      >
                        <CheckCircle
                          className="
                            w-4
                            h-4
                            "
                        />

                        {activating ? "Activating..." : "Set Active"}
                      </button>
                    )}

                    <button
                      onClick={() => setEditingPeriod(period)}
                      className="
                      flex
                      items-center
                      gap-1
                      bg-yellow-100
                      text-yellow-700
                      px-3
                      py-1.5
                      rounded-lg
                      "
                    >
                      <Pencil
                        className="
                        w-4
                        h-4
                        "
                      />
                      Edit
                    </button>

                    {!period.isActive && (
                      <button
                        disabled={deleting}
                        onClick={() => handleDelete(period.id)}
                        className="
                          flex
                          items-center
                          gap-1
                          bg-red-100
                          text-red-700
                          px-3
                          py-1.5
                          rounded-lg
                          disabled:opacity-50
                          "
                      >
                        <Trash2
                          className="
                            w-4
                            h-4
                            "
                        />

                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPeriod && (
        <EditAcademicPeriodModal
          period={editingPeriod}
          onClose={() => setEditingPeriod(null)}
        />
      )}
    </> 
  );
}
