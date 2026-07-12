 "use client";

import { useState } from "react";

import {
  useGetTeacherSubjectAssignmentsQuery,
} from "@/app/state/module/teacherSubjects/teacherSubjectApi";

import RemoveAssignmentDialog from "./RemoveAssignmentDialog";

export default function AssignmentTable() {
  const {
    data: assignments = [],
    isLoading,
    isError,
  } = useGetTeacherSubjectAssignmentsQuery();

  const [selectedAssignment, setSelectedAssignment] =
    useState<any>(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading assignments...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed loading assignments.
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
              <th className="p-4">
                Teacher
              </th>

              <th className="p-4">
                Employee ID
              </th>

              <th className="p-4">
                School
              </th>

              <th className="p-4">
                Subject
              </th>

              <th className="p-4">
                Code
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="
border-b
hover:bg-gray-50
"
              >
                <td className="p-4">
                  {assignment.teacher.account.name}
                </td>

                <td className="p-4 font-semibold">
                  {assignment.teacher.employeeId}
                </td>

                <td className="p-4">
                  {assignment.teacher.school.name}
                </td>

                <td className="p-4">
                  {assignment.subject.name}
                </td>

                <td className="p-4">
                  {assignment.subject.code}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedAssignment(
                        assignment,
                      );

                      setDeleteOpen(true);
                    }}
                    className="
px-3
py-1
rounded
bg-red-100
text-red-700
hover:bg-red-200
"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteOpen && (
        <RemoveAssignmentDialog
          assignment={selectedAssignment}
          onClose={() => {
            setDeleteOpen(false);

            setSelectedAssignment(null);
          }}
        />
      )}
    </>
  );
} 