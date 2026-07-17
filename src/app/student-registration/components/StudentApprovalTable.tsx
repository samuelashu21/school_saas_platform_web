"use client";

import { useMemo, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Student,
  useApproveStudentMutation,
  useRejectStudentMutation,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

type RejectApiError = {
  data?: {
    message?: string;
  };
};

interface StudentApprovalTableProps {
  students: Student[];
  isLoading: boolean;
  isError: boolean;
}

const formatDate = (value?: string) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString();
};

const StudentApprovalTable = ({ students, isLoading, isError }: StudentApprovalTableProps) => {
  const [approveStudent, { isLoading: isApproving }] = useApproveStudentMutation();
  const [rejectStudent, { isLoading: isRejecting }] = useRejectStudentMutation();

  const [actionError, setActionError] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const isRejectModalOpen = selectedStudentId.length > 0;

  const submitting = useMemo(() => isApproving || isRejecting, [isApproving, isRejecting]);

  const handleApprove = async (id: string) => {
    setActionError("");

    try {
      await approveStudent({ id }).unwrap();
      toast.success("Student approved successfully.");
    } catch (error) {
      const apiError = error as RejectApiError;
      setActionError(apiError.data?.message ?? "Failed to approve student.");
    }
  };

  const openRejectModal = (id: string) => {
    setActionError("");
    setRejectReason("");
    setSelectedStudentId(id);
  };

  const closeRejectModal = () => {
    setSelectedStudentId("");
    setRejectReason("");
  };

  const handleReject = async () => {
    if (!selectedStudentId) {
      return;
    }

    setActionError("");

    try {
      await rejectStudent({
        id: selectedStudentId,
        reason: rejectReason.trim() || undefined,
      }).unwrap();
      toast.success("Student rejected successfully.");
      closeRejectModal();
    } catch (error) {
      const apiError = error as RejectApiError;
      setActionError(apiError.data?.message ?? "Failed to reject student.");
    }
  };

  if (isLoading) {
    return <div className="rounded-xl bg-white p-6 text-sm text-gray-500 shadow-md">Loading pending students...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-md">
        Failed to load pending students.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl bg-white shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="p-4">Student Name</th>
              <th className="p-4">Student Code</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Date of Birth</th>
              <th className="p-4">School</th>
              <th className="p-4">Parent</th>
              <th className="p-4">Registration Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={8}>
                  No pending students available.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="p-4">{student.studentCode}</td>
                  <td className="p-4">{student.gender ?? "-"}</td>
                  <td className="p-4">{formatDate(student.dateOfBirth)}</td>
                  <td className="p-4">{student.school?.name ?? student.schoolId}</td>
                  <td className="p-4">
                    {student.parent?.account?.name ?? student.parent?.name ?? student.parentId ?? "-"}
                  </td>
                  <td className="p-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      {student.registrationStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleApprove(student.id)}
                        disabled={submitting}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {isApproving ? "Approving..." : "Approve"}
                      </button>
                      <button
                        type="button"
                        onClick={() => openRejectModal(student.id)}
                        disabled={submitting}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {actionError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {actionError}
        </div>
      )}

      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Reject Student Registration</h2>
            <p className="mt-1 text-sm text-gray-500">Provide a reason for rejection (optional).</p>

            <textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              rows={4}
              className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Reason for rejection"
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeRejectModal}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={isRejecting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
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