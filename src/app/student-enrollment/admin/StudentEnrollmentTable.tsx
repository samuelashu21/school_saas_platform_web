"use client";

import { Trash2, UserRound } from "lucide-react";

import { useDeleteEnrollmentMutation } from "@/app/state/module/studentEnrollment/studentEnrollmentApi";

interface Props {
  enrollments: any[];
} 

const StudentEnrollmentTable = ({ enrollments }: Props) => {
  const [deleteEnrollment] = useDeleteEnrollmentMutation();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this enrollment?");

    if (!confirmDelete) return;

    try {
      await deleteEnrollment(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

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
            <th className="p-4 text-left">Student</th>

            <th className="p-4 text-left">Code</th>

            <th className="p-4 text-left">Parent</th>

            <th className="p-4 text-left">Class</th>

            <th className="p-4 text-left">Enrollment Type</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="
text-center
py-8
text-gray-400
"
              >
                No enrolled students found.
              </td>
            </tr>
          ) : (
            enrollments.map((item) => {
              const student = item.student;

              return (
                <tr
                  key={student.id}
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
                        <UserRound
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
                          {student.firstName} {student.lastName}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">{student.studentCode}</td>

                  <td className="p-4">
                    {item.parent?.account?.name ?? "Not assigned"}
                  </td>

                  <td className="p-4">{student.class?.name ?? "-"}</td>

                  <td className="p-4">
                    <span
                      className="
px-3
py-1
rounded-full
bg-blue-50
text-blue-600
text-xs
font-semibold
"
                    >
                      {item.enrollmentType}
                    </span>
                  </td>

                  <td
                    className="
p-4
text-center
"
                  >
                    <button
                      onClick={() => handleDelete(student.id)}
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
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentEnrollmentTable;
