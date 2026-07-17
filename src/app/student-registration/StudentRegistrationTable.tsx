"use client";

import { CheckCircle, XCircle } from "lucide-react";

import {
  useApproveStudentMutation,
  useRejectStudentMutation,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

import type { Student } from "@/app/state/module/studentRegistration/studentRegistrationApi";

interface Props {
  students: Student[];
} 

export default function StudentRegistrationTable({ students }: Props) {
  const [approveStudent, { isLoading: approving }] =
    useApproveStudentMutation();

  const [rejectStudent] = useRejectStudentMutation();

  const approve = async (id: string) => {
    try {
      await approveStudent({ id }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const reject = async (id: string) => {
    try {
      await rejectStudent({
        id,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="
bg-white
rounded-xl
shadow
overflow-hidden
"
    >
      <table className="w-full">
        <thead
          className="
bg-gray-100
"
        >
          <tr>
            <th className="p-4">Student</th>

            <th className="p-4">Code</th>

            <th className="p-4">Status</th>

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="
border-b
"
            >
              <td className="p-4">
                {student.firstName} {student.lastName}
              </td>

              <td className="p-4">{student.studentCode}</td>

              <td className="p-4">
                <span
                  className="
px-3
py-1
rounded-full
bg-yellow-100
text-yellow-700
"
                >
                  {student.registrationStatus}
                </span>
              </td>

              <td className="p-4">
                <div
                  className="
flex
gap-2
"
                >
                  <button
                    disabled={approving}
                    onClick={() => approve(student.id)}
                    className="
bg-green-600
text-white
px-3
py-2
rounded-lg
flex
gap-2
items-center
"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => reject(student.id)}
                    className="
bg-red-600
text-white
px-3
py-2
rounded-lg
flex
gap-2
items-center
"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
    </div>
  );
}
