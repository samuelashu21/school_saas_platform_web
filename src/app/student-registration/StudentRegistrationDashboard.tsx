"use client";

import Header from "@/app/(components)/Header";

import { CheckCircle, XCircle, Search } from "lucide-react";

import {
  useGetPendingStudentsQuery,
  useApproveStudentMutation, 
  useRejectStudentMutation,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

export default function StudentRegistrationDashboard() {
  const { data, isLoading, isError } = useGetPendingStudentsQuery();

  const [approveStudent, { isLoading: approving }] =
    useApproveStudentMutation();

  const [rejectStudent, { isLoading: rejecting }] = useRejectStudentMutation();

  const students = data?.data ?? [];

  const handleApprove = async (id: string) => {
    const confirm = window.confirm("Approve this student registration?");

    if (!confirm) return;

    try {
      await approveStudent({
        id,
      }).unwrap();
    } catch (error) {
      console.error(error);

      alert("Failed approving student");
    }
  };

  const handleReject = async (id: string) => {
    const confirm = window.confirm("Reject this student registration?");

    if (!confirm) return;

    try {
      await rejectStudent({
        id,
      }).unwrap();
    } catch (error) {
      console.error(error);

      alert("Failed rejecting student");
    }
  };

  if (isLoading) {
    return (
      <div
        className="
      p-6
      text-gray-500
      "
      >
        Loading student registrations...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
      p-6
      text-red-500
      "
      >
        Failed loading registrations.
      </div>
    );
  }

  return (
    <div
      className="
      w-full
      space-y-6
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        "
      >
        <Header
          name="
          Student Registration Approval
          "
        />
      </div>

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
          text-sm
          "
        >
          <thead
            className="
            bg-gray-100
            "
          >
            <tr>
              <th className="p-4 text-left">Student Name</th>

              <th className="p-4 text-left">Student Code</th>

              <th className="p-4 text-left">Gender</th>

              <th className="p-4 text-left">Registration Status</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="
                  p-8
                  text-center
                  text-gray-400
                  "
                >
                  No pending registrations found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
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
                    {student.firstName} {student.lastName}
                  </td>

                  <td className="p-4">{student.studentCode}</td>

                  <td className="p-4">{student.gender ?? "-"}</td>

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

                  <td
                    className="
                  p-4
                  "
                  >
                    <div
                      className="
                    flex
                    justify-center
                    gap-3
                    "
                    >
                      <button
                        disabled={approving}
                        onClick={() => handleApprove(student.id)}
                        className="
                      flex
                      items-center
                      gap-2
                      bg-green-600
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      disabled:opacity-50
                      "
                      >
                        <CheckCircle size={16} />

                        {approving ? "Approving..." : "Approve"}
                      </button>

                      <button
                        disabled={rejecting}
                        onClick={() => handleReject(student.id)}
                        className="
                      flex
                      items-center
                      gap-2
                      bg-red-600
                      text-white
                      px-3
                      py-2
                      rounded-lg
                      disabled:opacity-50
                      "
                      >
                        <XCircle size={16} />

                        {rejecting ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div> 
    </div>
  );
}
