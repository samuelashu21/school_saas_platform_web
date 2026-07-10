"use client";

import { useMemo, useState } from "react";

import Header from "@/app/(components)/Header";

import { PlusCircleIcon, SearchIcon, ArrowUpDown } from "lucide-react";

import {
  useGetSchoolsQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
} from "@/app/state/module/schools/schoolApi";

import type { School } from "@/app/state/module/schools/schoolApi";

import SchoolTable from "./SchoolTable";

import CreateSchoolModal from "./CreateSchoolModal";

const SchoolsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<
    "name" | "students" | "teachers" | "newest"
  >("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const { data: schools = [], isLoading, isError } = useGetSchoolsQuery();

  const [createSchool, { isLoading: isCreating }] = useCreateSchoolMutation();

  const [updateSchool] = useUpdateSchoolMutation();

  const handleCreateSchool = async (data: {
    name: string;
    address?: string;
    phone?: string;
  }) => {
    try {
      await createSchool(data).unwrap();

      setError("");

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      setError("Unable to create school.");
    }
  };

  const handleUpdateSchool = async (
    id: string,
    data: {
      name: string;
      address?: string;
      phone?: string;
    },
  ) => {
    try {
      await updateSchool({
        id,

        ...data,
      }).unwrap();

      setSelectedSchool(null);

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      setError("Unable to update school.");
    }
  };

  const filteredSchools = useMemo(() => {
    let result = [...schools];

    if (search) {
      result = result.filter((school) =>
        school.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));

        break;

      case "students":
        result.sort(
          (a, b) => (b._count?.students ?? 0) - (a._count?.students ?? 0),
        );

        break;

      case "teachers":
        result.sort(
          (a, b) => (b._count?.teachers ?? 0) - (a._count?.teachers ?? 0),
        );

        break;

      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        break;
    }

    return result;
  }, [schools, search, sortBy]);

  const totalPages = Math.ceil(filteredSchools.length / pageSize);

  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * pageSize,

    currentPage * pageSize,
  );

  if (isLoading) {
    return (
      <div
        className="
py-5
text-gray-500
"
      >
        Loading schools...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
py-5
text-red-500
font-semibold
"
      >
        Failed loading schools.
      </div>
    );
  }

  return (
    <div
      className="
w-full
pb-5
"
    >
      {/* SEARCH */}

      <div
        className="
mb-6
flex
items-center
bg-white
border
rounded-xl
shadow-sm
overflow-hidden
"
      >
        <SearchIcon
          className="
w-5
h-5
ml-4
text-gray-400
"
        />

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            setCurrentPage(1);
          }}
          placeholder="
Search schools...
"
          className="
w-full
py-3
px-3
outline-none
text-sm
"
        />
      </div>

      <div
        className="
flex
justify-between
items-center
mb-6
"
      >
        <Header name="School Management" />

        <button
          onClick={() => {
            setSelectedSchool(null);

            setIsModalOpen(true);
          }}
          disabled={isCreating}
          className="
flex
items-center
gap-2
bg-blue-600
text-white
px-4
py-2.5
rounded-xl
text-sm
font-semibold
"
        >
          <PlusCircleIcon className="w-4 h-4" />
          Add School
        </button>
      </div>

      {/* SORT */}

      <div
        className="
flex
items-center
gap-3
mb-5
"
      >
        <ArrowUpDown
          className="
w-4
h-4
text-gray-500
"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="
border
rounded-lg
px-3
py-2
text-sm 
"
        >
          <option value="newest">Newest</option>

          <option value="name">Name</option>

          <option value="students">Most Students</option>

          <option value="teachers">Most Teachers</option>
        </select>
      </div>

      {error && (
        <div
          className="
mb-5
bg-red-50
border
border-red-200
text-red-600
rounded-xl
px-4
py-3
"
        >
          {error}
        </div>
      )}

      <SchoolTable
        schools={paginatedSchools}
        onEdit={(school) => {
          setSelectedSchool(school);

          setIsModalOpen(true);
        }}
      />

      {/* PAGINATION */}

      <div
        className="
flex
justify-center
items-center
gap-3
mt-6
"
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="
px-3
py-2
border
rounded-lg
disabled:opacity-40
"
        >
          Previous
        </button>

        <span
          className="
text-sm
font-medium
"
        >
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="
px-3
py-2
border
rounded-lg
disabled:opacity-40
"
        >
          Next
        </button>
      </div>

      <CreateSchoolModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          setSelectedSchool(null);
        }}
        school={selectedSchool}
        onCreate={handleCreateSchool}
        onUpdate={handleUpdateSchool}
      />
    </div>
  );
};

export default SchoolsPage;
 