import { useMemo, useState } from 'react';
import { useGetDashboardMetricsQuery } from '@/app/state/api';
import { BookOpen } from 'lucide-react';
import { useAppSelector } from '../redux';

const CardPopularCourses = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const globalSearchTerm = useAppSelector((state) => state.global.globalSearchTerm ?? '');
  const [sortBy, setSortBy] = useState<'name' | 'credits'>('name');

  const courses = useMemo(() => {
    const source = dashboardMetrics?.popularCourses ?? [];
    const needle = globalSearchTerm.toLowerCase();
    
    const filtered = source.filter((course: any) =>
      !needle || course.name.toLowerCase().includes(needle) || course.code.toLowerCase().includes(needle)
    );

    return [...filtered].sort((a: any, b: any) => {
      if (sortBy === 'credits') return b.credits - a.credits;
      return a.name.localeCompare(b.name);
    });
  }, [dashboardMetrics?.popularCourses, globalSearchTerm, sortBy]);

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16" data-testid="popular-courses-card">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div className="px-7 pt-5 pb-2">
            <h3 className="text-lg font-semibold">Active Curriculum Courses</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <label className="text-xs text-gray-500">
                Sort by
                <select
                  className="ml-2 border border-gray-300 rounded px-2 py-1 text-xs"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'credits')}
                  data-testid="popular-courses-sort"
                >
                  <option value="name">Alphabetical</option>
                  <option value="credits">Credits</option>
                </select>
              </label>
            </div>
          </div>
          <hr />
          <div className="overflow-auto h-full">
            {courses.map((course: any) => (
              <div
                key={course.courseId}
                className="flex items-center justify-between gap-3 px-5 py-5 border-b"
                data-testid="popular-course-item"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 grid place-items-center text-xs font-bold">
                    {course.code.slice(0, 4).toUpperCase()}
                  </div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700 text-sm">
                      {course.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Code: {course.code}
                    </div>
                  </div>
                </div>
                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-gray-700">{course.credits} Credits</span>
                </div>
              </div>
            ))}
            {!courses.length && (
              <div className="px-5 py-10 text-sm text-gray-500" data-testid="popular-courses-empty">
                No active courses match the filter constraints.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularCourses;