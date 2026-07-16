"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import AcademicPeriodTable from "./AcademicPeriodTable";

import CreateAcademicPeriodModal from "./CreateAcademicPeriodModal";

import { useGetAcademicPeriodsQuery } from "@/app/state/module/academicPeriods/academicPeriodApi";

export default function AcademicPeriodsPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const { data, isLoading, isError, error } = useGetAcademicPeriodsQuery({
    page: 1,

    limit: 10,
  });

  // IMPORTANT
  // API returns:
  // {
  //   data: [],
  //   pagination:{}
  // }

  const periods = data?.data ?? [];

  const pagination = data?.pagination;

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
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
          flex
          items-center
          gap-2
          "
        >
          <Plus className="w-5 h-5" />
          Create Period
        </button>
      </div>

      {/* ERROR */}

      {isError && (
        <div
          className="
            bg-red-100
            text-red-700
            p-4
            rounded-lg
            "
        >
          Failed loading academic periods.
          <pre className="text-xs mt-2">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      {/* TABLE */}

      {isLoading ? (
        <div
          className="
            bg-white
            rounded-xl
            shadow
            p-6
            "
        >
          Loading academic periods...
        </div>
      ) : (
        <AcademicPeriodTable periods={periods} />
      )}

      {/* PAGINATION INFO */}

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-4
        text-gray-600
        "
      >
        Page {pagination?.page ?? 1} of {pagination?.totalPages ?? 1}
        <span className="ml-4">Total: {pagination?.total ?? 0} periods</span>
      </div>

      {/* CREATE MODAL */}

      {openCreate && (
        <CreateAcademicPeriodModal onClose={() => setOpenCreate(false)} />
      )}
    </div>
  );
}
