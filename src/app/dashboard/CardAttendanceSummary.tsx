import { useGetDashboardMetricsQuery } from '@/app/state/api';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CardAttendanceSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const attendanceData = useMemo(() => data?.attendanceSummary || [], [data]);
  const [timeframe, setTimeframe] = useState<'5' | '10' | '15'>('5');

  const filteredData = useMemo(() => {
    const limits = Number(timeframe);
    return attendanceData.slice(-limits);
  }, [attendanceData, timeframe]);

  const lastDataPoint = filteredData[filteredData.length - 1] || null;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl" data-testid="attendance-summary-card">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between px-7 pt-5 mb-2">
            <h2 className="text-lg font-semibold">Attendance Performance</h2>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as '5' | '10' | '15')}
              className="text-xs border border-gray-300 rounded px-2 py-1"
              data-testid="attendance-timeframe-select"
            >
              <option value="5">Last 5 Logs</option>
              <option value="10">Last 10 Logs</option>
              <option value="15">Last 15 Logs</option>
            </select>
          </div>
          <hr />

          {/* BODY */}
          <div>
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Current Average</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint ? `${lastDataPoint.averageAttendance}%` : '0%'}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      lastDataPoint.changePercentage >= 0 ? 'text-green-500' : 'text-red-500'
                    } flex ml-3`}
                  >
                    {lastDataPoint.changePercentage >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage)}%
                  </p>
                )}
              </div>
            </div>
            
            {/* CHART */}
            <ResponsiveContainer width="100%" height={200} className="p-2">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: -40, bottom: 45 }}
              >
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis domain={[50, 100]} tickLine={false} tick={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [`${value}% Attendance`]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="averageAttendance"
                  stroke="#3b82f6"
                  fill="#dbeafe"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardAttendanceSummary;