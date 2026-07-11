"use client";

import { useState } from "react";

import { useGetGradesQuery } from "@/app/state/module/grades/gradeApi";

import EditGradeModal from "./EditGradeModal";
 
import DeleteGradeDialog from "./DeleteGradeDialog";

import { Pencil, Trash2 } from "lucide-react";

export default function GradeTable() {
  const { data: grades = [], isLoading } = useGetGradesQuery();

  const [selectedGrade, setSelectedGrade] = useState<any>(null);

  const [deleteGrade, setDeleteGrade] = useState<any>(null);

  if (isLoading) {
    return <p className="p-6">Loading grades...</p>;
  }

  return (
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
"
      >
        <thead
          className="
bg-gray-100
"
        >
          <tr>
            <th className="p-4 text-left">Grade</th>

            <th className="p-4 text-left">Level</th>

            <th className="p-4 text-left">School</th>

            <th className="p-4 text-left">Classes</th>

            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {grades.map((grade) => (
            <tr
              key={grade.id}
              className="
border-b
hover:bg-gray-50
"
            >
              <td className="p-4">{grade.name}</td>

              <td className="p-4">{grade.level}</td>

              <td className="p-4">{grade.school?.name}</td>

              <td className="p-4">{grade._count?.classes ?? 0}</td>

              <td className="p-4 flex gap-3">
                <button
                  onClick={() => setSelectedGrade(grade)}
                  className="
text-blue-600
"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => setDeleteGrade(grade)}
                  className="
text-red-600
"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedGrade && (
        <EditGradeModal
          grade={selectedGrade}
          open={true}
          onClose={() => setSelectedGrade(null)}
        />
      )}

      {deleteGrade && (
        <DeleteGradeDialog
          grade={deleteGrade}
          open={true}
          onClose={() => setDeleteGrade(null)}
        />
      )} 
    </div>
  );
}
