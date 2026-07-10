"use client";

interface Props {
  page: number;

  totalPages: number;

  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
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
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="
        px-4
        py-2
        rounded-lg
        bg-gray-100
        text-sm
        disabled:opacity-50
        "
      >
        Previous
      </button>

      <span
        className="
        text-sm
        font-medium
        text-gray-700
        "
      >
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="
        px-4
        py-2
        rounded-lg
        bg-gray-100
        text-sm
        disabled:opacity-50
        "
      >
        Next
      </button> 
    </div>
  );
};

export default Pagination;
