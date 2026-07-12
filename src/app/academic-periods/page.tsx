"use client";

import { useState } from "react";

import AcademicPeriodTable from "./AcademicPeriodTable";

import CreateAcademicPeriodModal from "./CreateAcademicPeriodModal";

import { Plus } from "lucide-react";

export default function AcademicPeriodsPage() {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div
      className="
p-6
space-y-6
"
    >
      {/* HEADER */}

      <div
        className="
flex
justify-between
items-center
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
            Academic Periods
          </h1>

          <p
            className="
text-gray-500
mt-1
"
          >
            Manage academic years and semesters
          </p>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="
flex
items-center
gap-2
bg-blue-600
text-white
px-4
py-2
rounded-lg
hover:bg-blue-700
"
        >
          <Plus className="w-5 h-5" />
          Create Period
        </button>
      </div>

      {/* TABLE */}

      <AcademicPeriodTable />

      {/* MODAL */}

      {openCreate && (
        <CreateAcademicPeriodModal onClose={() => setOpenCreate(false)} />
      )}
    </div>
  );
}
