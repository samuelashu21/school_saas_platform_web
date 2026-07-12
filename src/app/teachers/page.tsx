"use client";

import { useState } from "react";

import TeacherTable from "./TeacherTable";

import CreateTeacherModal from "./CreateTeacherModal";

export default function TeachersPage() {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div className="p-6">
      {/* HEADER */}

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
            Teacher Management
          </h1>

          <p
            className="
            text-gray-500
            mt-1
          "
          >
            Manage teacher accounts, employee IDs and school assignments
          </p>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-blue-700
          "
        >
          + Add Teacher
        </button>
      </div>

      {/* TABLE */}

      <TeacherTable />

      {/* CREATE MODAL */}
 
      {openCreate && (
        <CreateTeacherModal onClose={() => setOpenCreate(false)} />
      )}
    </div>
  );
}
