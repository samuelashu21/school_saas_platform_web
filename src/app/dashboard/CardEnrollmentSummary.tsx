import { useGetDashboardMetricsQuery } from '@/app/state/api';
import { TrendingUp } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CardEnrollmentSummary = () => {
  const { data, isLoading, isError, refetch } = useGetDashboardMetricsQuery();
  const enrollmentData = useMemo(() => data?.enrollmentSummary || [], [data]);
  const [limit, setLimit] = useState(7);

  const filteredData = useMemo(() => {
    return enrollmentData.slice(-limit);
  }, [enrollmentData, limit]);

  const totalCurrentStudents = useMemo(() => {
    return filteredData[filteredData.length - 1]?.totalStudents || 0;
  }, [filteredData]);

  const averageGrowth = useMemo(() => {
    if (!filteredData.length) return 0;
    const sum = filteredData.reduce((acc, curr) => acc + (curr.changePercentage || 0), 0);
    return sum / filteredData.length;
  }, [filteredData]);

  if (isError) {
    return (
      <div className="m-5" data-testid="enrollment-fetch-error">
        <p>Failed to load student enrollment matrix data.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between" data-testid="enrollment-summary-card">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Enrollment Tracking</h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div>
                <p className="text-xs text-gray-400">Total Active Registrations</p>
                <span className="text-2xl font-extrabold text-gray-800">
                  {totalCurrentStudents.toLocaleString('en-US')} Students
                </span>
                <span className="text-green-500 text-sm ml-2 font-medium">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  +{averageGrowth.toFixed(2)}% Avg Growth
                </span>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded text-xs"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                data-testid="enrollment-limit-select"
              >
                <option value={5}>Last 5 Entries</option>
                <option value={7}>Last 7 Entries</option>
                <option value={10}>Last 10 Entries</option>
              </select>
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart data={filteredData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => `${value}`}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [`${value} Enrolled`]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                  }}
                />
                <Bar
                  dataKey="totalStudents"
                  fill="#4f46e5"
                  barSize={12}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-xs px-7 mb-4 text-gray-500">
              <p>{filteredData.length} data points logged</p>
              <p>System Operating Normal</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardEnrollmentSummary;