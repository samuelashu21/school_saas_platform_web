"use client";

import { useState } from "react";

import Header from "@/app/(components)/Header";

import { PlusCircleIcon, Download, FileText } from "lucide-react";

import {
  useGetRegistrationWindowsQuery,
  useCreateRegistrationWindowMutation,
  useUpdateRegistrationWindowMutation,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

import type { StudentRegistrationWindow } from "@/app/state/module/studentRegistration/studentRegistrationApi";

import CreateStudentRegistrationModal from "./CreateStudentRegistrationModal";

import StudentRegistrationTable from "./StudentRegistrationTable";

import RegistrationToolbar from "./RegistrationToolbar";

import Pagination from "./Pagination"; 

import { exportRegistrationExcel, exportRegistrationPDF } from "./exportUtils";

const StudentRegistrationDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingWindow, setEditingWindow] =
    useState<StudentRegistrationWindow | null>(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [sort, setSort] = useState<"name" | "startDate" | "endDate">(
    "startDate",
  );

  const pageSize = 10;

  const {
  data: registrationResponse,
  isLoading,
  isError,
} = useGetRegistrationWindowsQuery();


const windows = registrationResponse?.data ?? [];

  const [createWindow] = useCreateRegistrationWindowMutation();

  const [updateWindow] = useUpdateRegistrationWindowMutation();

  const filteredWindows = windows
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return new Date(a[sort]).getTime() - new Date(b[sort]).getTime();
    });

  const totalPages = Math.ceil(filteredWindows.length / pageSize);

  const paginatedWindows = filteredWindows.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleSubmit = async (data: any) => {
    try {
      if (editingWindow) {
        await updateWindow({
          id: editingWindow.id,

          ...data,
        }).unwrap();
      } else {
        await createWindow(data).unwrap();
      }

      setEditingWindow(null);

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      alert("Unable to save registration window");
    }
  };

  const openCreate = () => {
    setEditingWindow(null);

    setIsModalOpen(true);
  };

  const openEdit = (item: StudentRegistrationWindow) => {
    setEditingWindow(item);

    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="py-5 text-gray-500">Loading registration windows...</div>
    );
  }

  if (isError) {
    return (
      <div className="py-5 text-red-500">
        Failed loading registration windows.
      </div>
    );
  }

  return (
    <div className="w-full pb-5">
      <div
        className="
        flex
        justify-between
        items-center
        mb-6
        "
      >
        <Header
          name="
          Student Registration Management
          "
        />

        <button
          onClick={openCreate}
          className="
          flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2.5
          rounded-xl
          text-sm
          font-semibold
          "
        >
          <PlusCircleIcon className="w-4 h-4" />
          Create Window
        </button>
      </div>

      <RegistrationToolbar
        search={search}
        setSearch={(value) => {
          setSearch(value);

          setPage(1);
        }}
        onExcel={() => {
          exportRegistrationExcel(filteredWindows);
        }}
        onPDF={() => {
          exportRegistrationPDF(filteredWindows);
        }}
      />

      <StudentRegistrationTable
        windows={paginatedWindows}
        onEdit={openEdit}
        sort={sort}
        setSort={setSort}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <CreateStudentRegistrationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          setEditingWindow(null);
        }}
        onCreate={handleSubmit}
        editingWindow={editingWindow}
      /> 
    </div>
  );
};

export default StudentRegistrationDashboard;
