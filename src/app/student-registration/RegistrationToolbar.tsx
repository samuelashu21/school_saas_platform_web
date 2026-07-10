"use client";

import { Search, FileSpreadsheet, FileText } from "lucide-react";

interface Props {
  search: string;

  setSearch: (value: string) => void;

  onExcel: () => void;

  onPDF: () => void;
}

const RegistrationToolbar = ({ search, setSearch, onExcel, onPDF }: Props) => {
  return (
    <div
      className="
      flex
      flex-col
      md:flex-row
      gap-4
      justify-between
      items-center
      mb-6
      "
    >
      {/* SEARCH */}

      <div
        className="
        flex
        items-center
        bg-white
        border
        border-gray-200
        rounded-xl
        shadow-sm
        w-full
        md:w-96
        "
      >
        <Search
          className="
          w-5
          h-5
          text-gray-400
          ml-4
          "
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="
          Search registration windows...
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

      {/* EXPORT BUTTONS */}

      <div
        className="
        flex
        gap-3
        "
      >
        <button
          onClick={onExcel}
          className="
          flex
          items-center
          gap-2
          bg-green-600
          hover:bg-green-700
          text-white
          px-4
          py-2.5
          rounded-xl
          text-sm
          font-semibold
          "
        >
          <FileSpreadsheet className="w-4 h-4" />
          Excel
        </button>

        <button
          onClick={onPDF}
          className="
          flex
          items-center
          gap-2
          bg-red-600
          hover:bg-red-700
          text-white
          px-4 
          py-2.5
          rounded-xl
          text-sm
          font-semibold
          "
        >
          <FileText className="w-4 h-4" />
          PDF
        </button>
      </div>
    </div>
  );
};

export default RegistrationToolbar;
