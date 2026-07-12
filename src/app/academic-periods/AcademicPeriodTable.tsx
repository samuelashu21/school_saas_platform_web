"use client";

import {
  useGetAcademicPeriodsQuery,
  useSetCurrentAcademicPeriodMutation,
  useDeleteAcademicPeriodMutation,
} from "@/app/state/module/academicPeriods/academicPeriodApi";

export default function AcademicPeriodTable() {
  const { data: periods = [], isLoading } = useGetAcademicPeriodsQuery();

  const [setCurrent, { isLoading: activating }] =
    useSetCurrentAcademicPeriodMutation();

  const [deletePeriod, { isLoading: deleting }] =
    useDeleteAcademicPeriodMutation();

  if (isLoading) {
    return <div className="p-6">Loading academic periods...</div>;
  }

  if (periods.length === 0) {
    return (
      <div
        className="
bg-white
rounded-xl
shadow
p-6
text-gray-500
"
      >
        No academic periods created yet.
      </div>
    );
  }

  return (
    <div
      className="
bg-white
rounded-xl
shadow
overflow-hidden
"
    >
      <table
        className="
w-full
text-left
"
      >
        <thead
          className="
bg-gray-100
"
        >
          <tr>
            <th className="p-4">Academic Year</th>

            <th className="p-4">Semester</th>

            <th className="p-4">Start Date</th>

            <th className="p-4">End Date</th>

            <th className="p-4">Status</th>

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {periods.map((period) => (
            <tr
              key={period.id}
              className="
border-b
hover:bg-gray-50
"
            >
              <td
                className="
p-4
font-medium
"
              >
                {period.academicYear}
              </td>

              <td
                className="
p-4
"
              >
                {period.semester === "SEMESTER_1" ? "Semester 1" : "Semester 2"}
              </td>

              <td className="p-4">
                {new Date(period.startDate).toLocaleDateString()}
              </td>

              <td className="p-4">
                {new Date(period.endDate).toLocaleDateString()}
              </td>

              <td className="p-4">
                {period.isActive ? (
                  <span
                    className="
px-3
py-1
rounded-full
bg-green-100
text-green-700
text-sm
"
                  >
                    Active
                  </span>
                ) : (
                  <span
                    className="
px-3
py-1
rounded-full
bg-gray-100
text-gray-600
text-sm
"
                  >
                    Closed
                  </span>
                )}
              </td>

              <td
                className="
p-4
flex
gap-2
"
              >
                {!period.isActive && (
                  <button
                    disabled={activating}
                    onClick={() => setCurrent(period.id)}
                    className="
bg-blue-600
text-white
px-3
py-1
rounded
disabled:opacity-50
"
                  >
                    {activating ? "Activating..." : "Set Active"}
                  </button>
                )}

                {!period.isActive && (
                  <button
                    disabled={deleting}
                    onClick={() => {
                      const confirmed = confirm("Delete this academic period?");

                      if (confirmed) {
                        deletePeriod(period.id);
                      }
                    }}
                    className="
bg-red-100
text-red-700
px-3
py-1
rounded
disabled:opacity-50
"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
