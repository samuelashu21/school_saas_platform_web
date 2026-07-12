"use client";

import { useState } from "react";

import SubjectTable from "./SubjectTable";
import CreateSubjectModal from "./CreateSubjectModal";

export default function SubjectsPage() {
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
            Subject Management
          </h1>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Manage school subjects and academic curriculum.
          </p>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2
            rounded-lg
            transition
          "
        >
          + Add Subject
        </button>
      </div>

      {/* TABLE */}

      <SubjectTable />

      {/* CREATE MODAL */}

      {openCreate && (
        <CreateSubjectModal onClose={() => setOpenCreate(false)} />
      )}
    </div>
  ); 
}
