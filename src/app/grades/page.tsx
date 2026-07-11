"use client";

import { useState } from "react";

import GradeTable from "./GradeTable";

import CreateGradeModal from "./CreateGradeModal";

import { Plus } from "lucide-react";

export default function GradesPage() {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div className="p-8">
      <div
        className="
flex
justify-between
items-center
mb-6
"
      >
        <h1
          className="
text-2xl
font-bold
text-gray-800
"
        >
          Grade Management
        </h1>

        <button
          onClick={() => setOpenCreate(true)}
          className="
flex
items-center
gap-2
bg-blue-600
text-white
px-5
py-3
rounded-lg
hover:bg-blue-700
"
        >
          <Plus size={18} />
          Create Grade
        </button>
      </div>

      <GradeTable />

      <CreateGradeModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </div> 
  );
}
