"use client";

import {
  CalendarDays,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ArrowUpDown,
} from "lucide-react";

import { useDeleteRegistrationWindowMutation } from "@/app/state/module/studentRegistration/studentRegistrationApi";

import type { StudentRegistrationWindow } from "@/app/state/module/studentRegistration/studentRegistrationApi";

interface Props {
  windows: StudentRegistrationWindow[];

  onEdit: (window: StudentRegistrationWindow) => void;

  sort?: "name" | "startDate" | "endDate";

  setSort?: (value: "name" | "startDate" | "endDate") => void;
}

const StudentRegistrationTable = ({
  windows,
  onEdit,
  sort,
  setSort,
}: Props) => {
  const [deleteWindow] = useDeleteRegistrationWindowMutation();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete registration window?");

    if (!confirmDelete) return;

    try {
      await deleteWindow(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const sortHeader = (
    label: string,
    value: "name" | "startDate" | "endDate",
  ) => (
    <button
      onClick={() => setSort && setSort(value)}
      className="
      flex
      items-center
      gap-1
      font-semibold
      "
    >
      {label}

      <ArrowUpDown
        className="
        w-3
        h-3
        "
      />
    </button>
  );

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-100
      shadow-sm
      overflow-x-auto
      "
    >
      <table
        className="
        w-full
        text-sm
        "
      >
        <thead
          className="
          bg-gray-50
          "
        >
          <tr>
            <th
              className="
              p-4
              text-left
              "
            >
              {sortHeader("Name", "name")}
            </th>

            <th
              className="
              p-4
              text-left
              "
            >
              {sortHeader("Start Date", "startDate")}
            </th>

            <th
              className="
              p-4
              text-left
              "
            >
              {sortHeader("End Date", "endDate")}
            </th>

            <th
              className="
              p-4
              text-left
              "
            >
              Status
            </th>

            <th
              className="
              p-4
              text-center
              "
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {windows.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="
                  text-center
                  py-8
                  text-gray-400
                  "
              >
                No registration windows found.
              </td>
            </tr>
          ) : (
            windows.map((window) => (
              <tr
                key={window.id}
                className="
                border-t
                hover:bg-gray-50
                "
              >
                <td
                  className="
                  p-4
                  "
                >
                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >
                    <div
                      className="
                      w-10
                      h-10
                      rounded-xl
                      bg-blue-50
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <CalendarDays
                        className="
                        w-5
                        h-5
                        text-blue-600
                        "
                      />
                    </div>

                    <div>
                      <p
                        className="
                        font-semibold
                        text-gray-800
                        "
                      >
                        {window.name}
                      </p>

                      <p
                        className="
                        text-xs
                        text-gray-400
                        "
                      >
                        ID: {window.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td
                  className="
                  p-4
                  text-gray-600
                  "
                >
                  {new Date(window.startDate).toLocaleDateString()}
                </td>

                <td
                  className="
                  p-4
                  text-gray-600
                  "
                >
                  {new Date(window.endDate).toLocaleDateString()}
                </td>

                <td
                  className="
                  p-4
                  "
                >
                  {window.isActive ? (
                    <span
                      className="
                        flex
                        items-center
                        gap-2
                        text-green-600
                        font-medium
                        "
                    >
                      <CheckCircle
                        className="
                          w-4
                          h-4
                          "
                      />
                      Active
                    </span>
                  ) : (
                    <span
                      className="
                        flex
                        items-center
                        gap-2
                        text-red-500
                        font-medium
                        "
                    >
                      <XCircle
                        className="
                          w-4
                          h-4
                          "
                      />
                      Closed
                    </span>
                  )}
                </td>

                <td
                  className="
                  p-4
                  "
                >
                  <div
                    className="
                    flex
                    justify-center
                    gap-2
                    "
                  >
                    <button
                      onClick={() => onEdit(window)}
                      className="
                      p-2
                      rounded-lg
                      text-blue-600
                      hover:bg-blue-50
                      "
                    >
                      <Edit
                        className="
                        w-4
                        h-4
                        "
                      />
                    </button>

                    <button
                      onClick={() => handleDelete(window.id)}
                      className="
                      p-2
                      rounded-lg
                      text-red-500
                      hover:bg-red-50
                      "
                    >
                      <Trash2
                        className="
                        w-4
                        h-4
                        "
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div> 
  );
};

export default StudentRegistrationTable;
