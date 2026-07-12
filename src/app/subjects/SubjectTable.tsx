  "use client";

import { useState } from "react";

import {  
  useGetSubjectsQuery,
} from "@/app/state/module/subjects/subjectApi";

import EditSubjectModal from "./EditSubjectModal";
import DeleteSubjectDialog from "./DeleteSubjectDialog";

export default function SubjectTable() {
  const {
    data: subjects = [],
    isLoading,
    isError,
  } = useGetSubjectsQuery();

  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading subjects...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed loading subjects.
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
              <th className="p-4">Code</th>

              <th className="p-4">Subject</th>

              <th className="p-4">Teachers</th>

              <th className="p-4">Classes</th>

              <th className="p-4">Created</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subjects.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                    p-6
                    text-center
                    text-gray-500
                  "
                >
                  No subjects found.
                </td>
              </tr>
            ) : (
              subjects.map((subject: any) => (
                <tr
                  key={subject.id}
                  className="
                    border-b
                    hover:bg-gray-50
                  "
                >
                  <td
                    className="
                      p-4
                      font-semibold
                    "
                  >
                    {subject.code}
                  </td>

                  <td className="p-4">
                    {subject.name}
                  </td>

                  <td className="p-4">
                    {subject.teachers?.length ?? 0}
                  </td>

                  <td className="p-4">
                    {subject.classes?.length ?? 0}
                  </td>

                  <td className="p-4">
                    {new Date(
                      subject.createdAt,
                    ).toLocaleDateString()}
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
                          setSelectedSubject(subject);

                          setEditOpen(true);
                        }}
                        className="
                          px-3
                          py-1
                          rounded
                          bg-blue-100
                          text-blue-700
                          hover:bg-blue-200
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setSelectedSubject(subject);

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
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT */}

      {editOpen && selectedSubject && (
        <EditSubjectModal
          subject={selectedSubject}
          onClose={() => {
            setEditOpen(false);
            setSelectedSubject(null);
          }}
        />
      )}

      {/* DELETE */}

      {deleteOpen && selectedSubject && (
        <DeleteSubjectDialog
          subject={selectedSubject}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedSubject(null);
          }}
        />
      )}
    </>
  );
}