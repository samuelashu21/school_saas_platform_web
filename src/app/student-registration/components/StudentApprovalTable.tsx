"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

import {
  Student,
  useApproveStudentMutation,
  useRejectStudentMutation,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

interface StudentApprovalTableProps {
  students: Student[];
  isLoading: boolean;
  isError: boolean;
}

type ApiError = {
  data?: {
    message?: string;
  };
};

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleDateString();
};

const StudentApprovalTable = ({
  students = [], // Added default array protection parameter 
  isLoading,
  isError,
}: StudentApprovalTableProps) => {
  const [approveStudent, { isLoading: isApproving }] =
    useApproveStudentMutation();

  const [rejectStudent, { isLoading: isRejecting }] =
    useRejectStudentMutation();

  const [selectedStudentId, setSelectedStudentId] =
    useState("");

  const [rejectReason, setRejectReason] =
    useState("");

  const [error, setError] =
    useState("");

  const loading = isApproving || isRejecting;

  // =====================================================
  // APPROVE ACTION
  // =====================================================
  const approve = async (id: string) => {
    setError("");

    try {
      await approveStudent({ id }).unwrap();
      toast.success("Student approved successfully.");
    } catch (err) {
      const e = err as ApiError;
      const message = e.data?.message ?? "Approval failed.";
      setError(message);
      toast.error(message);
    }
  };

  // =====================================================
  // REJECT ACTION
  // =====================================================
  const reject = async () => {
    if (!selectedStudentId) return;

    setError("");

    try {
      await rejectStudent({
        id: selectedStudentId,
        reason: rejectReason.trim() || undefined,
      }).unwrap();

      toast.success("Student rejected successfully.");
      setSelectedStudentId("");
      setRejectReason("");
    } catch (err) {
      const e = err as ApiError;
      const message = e.data?.message ?? "Reject failed.";
      setError(message);
      toast.error(message);
    }
  };

  // =====================================================
  // LOADING RENDER STATE
  // =====================================================
  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow text-gray-600">
        Loading pending students...
      </div>
    );
  }

  // =====================================================
  // ERROR RENDER STATE
  // =====================================================
  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-700 font-medium shadow-sm">
        Failed loading students.
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-700">Student</th>
              <th className="p-4 text-left font-semibold text-gray-700">Code</th>
              <th className="p-4 text-left font-semibold text-gray-700">Gender</th>
              <th className="p-4 text-left font-semibold text-gray-700">DOB</th>
              <th className="p-4 text-left font-semibold text-gray-700">School</th>
              <th className="p-4 text-left font-semibold text-gray-700">Grade</th>
              <th className="p-4 text-left font-semibold text-gray-700">Class</th>
              <th className="p-4 text-left font-semibold text-gray-700">Academic Period</th>
              <th className="p-4 text-left font-semibold text-gray-700">Parent</th>
              <th className="p-4 text-left font-semibold text-gray-700">Status</th>
              <th className="p-4 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="p-8 text-center text-gray-500"
                >
                  No pending students.
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const registration = student.registrations?.[0];
                const displayStatus = registration?.status ?? student.registrationStatus;

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Student Name */}
                    <td className="p-4 font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </td>

                    {/* Student Identity Code */}
                    <td className="p-4 text-gray-600">
                      {student.studentCode}
                    </td>

                    {/* Gender info */}
                    <td className="p-4 text-gray-600">
                      {student.gender ?? "-"}
                    </td>

                    {/* Formatted Date of Birth */}
                    <td className="p-4 text-gray-600">
                      {formatDate(student.dateOfBirth)}
                    </td>

                    {/* School Identity */}
                    <td className="p-4 text-gray-600">
                      {student.school?.name ?? "-"}
                    </td>

                    {/* Academic Grade Target */}
                    <td className="p-4 text-gray-600">
                      {registration?.class?.gradeLevel?.name ?? "-"}
                    </td>

                    {/* Class Cohort Assignment */}
                    <td className="p-4 text-gray-600">
                      {registration?.class?.name ?? "-"}
                    </td>

                    {/* Active Calendar System Period */}
                    <td className="p-4 text-gray-600">
                      {registration?.academicPeriod
                        ? `${registration.academicPeriod.academicYear} (${registration.academicPeriod.semester})`
                        : "-"}
                    </td>

                    {/* Parent Primary Guardian Name Account Info */}
                    <td className="p-4 text-gray-600">
                      {student.parent?.account
                        ? `${student.parent.account.firstName} ${student.parent.account.lastName}`
                        : "-"}
                    </td>

                    {/* Formatted Pill Status Badge Indicator */}
                    <td className="p-4">
                      <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-yellow-800">
                        {displayStatus}
                      </span>
                    </td>

                    {/* Functional Execution Row Controls */}
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => approve(student.id)}
                          disabled={loading}
                          className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 whitespace-nowrap"
                        >
                          <CheckCircle size={14} />
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedStudentId(student.id)}
                          disabled={loading}
                          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 whitespace-nowrap"
                        >
                          <XCircle size={14} />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Rejection Log Reason Modal Overlay window container */}
      {selectedStudentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Reject Student Registration
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Provide an optional context reason window breakdown logging why this registration is being rejected.
            </p>

            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Type rejection reason here..."
              className="mt-4 w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-900 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-gray-400"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedStudentId("");
                  setRejectReason("");
                }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={reject}
                disabled={isRejecting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isRejecting ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentApprovalTable;