'use client';

import {
  Users,
  Award,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import CardPopularCourses from './CardPopularCourses';
import CardAttendanceSummary from './CardAttendanceSummary';
import CardEnrollmentSummary from './CardEnrollmentSummary';
import StatCard from './StatCard';

const Dashboard = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows"
      data-testid="dashboard-page"
    >
      {/* Primary Analytical Widgets */}
      <CardPopularCourses />
      <CardEnrollmentSummary />
      <CardAttendanceSummary />

      {/* Metric Breakdown Cards */}
      <StatCard
        title="Faculty & Capacity"
        primaryIcon={<Users className="text-blue-600 w-6 h-6" />}
        dateRange="Current Academic Term"
        details={[
          {
            title: 'Teacher Onboarding',
            amount: '14',
            changePercentage: 12,
            IconComponent: TrendingUp,
          },
          {
            title: 'Unallocated Classes',
            amount: '2',
            changePercentage: -40,
            IconComponent: TrendingDown,
          },
        ]}
      />

      <StatCard
        title="Academic Standings"
        primaryIcon={<Award className="text-blue-600 w-6 h-6" />}
        dateRange="Term Performance Evaluation"
        details={[
          {
            title: 'Honor Roll Students',
            amount: '342',
            changePercentage: 18,
            IconComponent: TrendingUp,
          },
          {
            title: 'Academic Probationary',
            amount: '19',
            changePercentage: -8,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;