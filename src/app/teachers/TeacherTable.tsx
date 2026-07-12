"use client";

import {
  useGetTeachersQuery,
  useDeleteTeacherMutation,
} from "@/app/state/module/teachers/teacherApi";

import { useState } from "react";
 
import EditTeacherModal from "./EditTeacherModal";

import DeleteTeacherDialog from "./DeleteTeacherDialog";

export default function TeacherTable() {
  const { data: teachers = [], isLoading, isError } = useGetTeachersQuery();

  const [deleteTeacher] = useDeleteTeacherMutation();

  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) {
    return <div className="p-6">Loading teachers...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed loading teachers</div>;
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
              <th className="p-4">Employee ID</th>

              <th className="p-4">Teacher</th>

              <th className="p-4">Email</th>

              <th className="p-4">School</th>

              <th className="p-4">Status</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => {
              return (
                <tr
                  key={teacher.id}
                  className="
border-b
hover:bg-gray-50
"
                >
                  <td className="p-4 font-semibold">{teacher.employeeId}</td>

                  <td className="p-4">{teacher.account.name}</td>

                  <td className="p-4">{teacher.account.email}</td>

                  <td className="p-4">{teacher.school.name}</td>

                  <td className="p-4">
                    {teacher.account.mustChangePassword ? (
                      <span
                        className="
px-3
py-1
rounded-full
text-xs
bg-yellow-100
text-yellow-700
"
                      >
                        First Login Pending
                      </span>
                    ) : (
                      <span
                        className="
px-3
py-1
rounded-full
text-xs
bg-green-100
text-green-700
"
                      >
                        Active
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div
                      className="
flex
gap-2
"
                    >
                      <button
                        onClick={() => {
                          setSelectedTeacher(teacher);

                          setEditOpen(true);
                        }}
                        className="
px-3
py-1
rounded
bg-blue-100
text-blue-700
"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setSelectedTeacher(teacher);

                          setDeleteOpen(true);
                        }}
                        className="
px-3
py-1
rounded
bg-red-100
text-red-700
"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editOpen && (
        <EditTeacherModal
          teacher={selectedTeacher}
          onClose={() => {
            setEditOpen(false);

            setSelectedTeacher(null);
          }}
        />
      )}

      {deleteOpen && (
        <DeleteTeacherDialog
          teacher={selectedTeacher}
          onClose={() => {
            setDeleteOpen(false);

            setSelectedTeacher(null);
          }}
        />
      )} 
    </>
  );
}
