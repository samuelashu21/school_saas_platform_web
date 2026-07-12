"use client";

import { useState } from "react";

import AssignmentTable from "./AssignmentTable";
import AssignSubjectModal from "./AssignSubjectModal";

export default function TeacherSubjectsPage() {
  const [openAssign, setOpenAssign] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}

      <div
        className="
flex
justify-between
items-center
mb-6
"
      >
        <div>
          <h1
            className="
text-2xl
font-bold
text-gray-800 
"
          >
            Teacher Subject Assignment
          </h1>

          <p
            className="
text-gray-500
mt-1
"
          >
            Assign school subjects to teachers.
          </p>
        </div>

        <button
          onClick={() => setOpenAssign(true)}
          className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
hover:bg-blue-700
"
        >
          + Assign Subject
        </button>
      </div>

      <AssignmentTable />

      {openAssign && (
        <AssignSubjectModal onClose={() => setOpenAssign(false)} />
      )}
    </div>
  );
}
