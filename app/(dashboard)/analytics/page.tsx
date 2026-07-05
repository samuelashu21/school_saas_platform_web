"use client";

import { AnalyticsSummary } from "@/types/analytics";
import { AnalyticsDistributionChart } from "@/components/analytics/AnalyticsDistributionChart";
import { PerformanceMetricRow } from "@/components/analytics/PerformanceMetricRow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, RefreshCw, Layers } from "lucide-react";

const mockSummary: AnalyticsSummary = {
  termName: "2025-2026 Academic Year",
  retentionRate: 98.4,
  enrollmentByDepartment: [
    { department: "STEM (Sciences & Mathematics)", count: 420 },
    { department: "Languages & Literature", count: 310 },
    { department: "Social Sciences & History", count: 280 },
    { department: "Fine Arts & Performance", count: 145 },
    { department: "Physical Education & Health", count: 93 },
  ],
  gpaDistribution: [
    { cohortName: "Grade 9 Cohort", averageScore: 84.2, passingRate: 94.1, totalStudents: 320 },
    { cohortName: "Grade 10 Cohort", averageScore: 81.6, passingRate: 89.8, totalStudents: 315 },
    { cohortName: "Grade 11 Cohort", averageScore: 86.9, passingRate: 96.2, totalStudents: 308 },
    { cohortName: "Grade 12 Cohort", averageScore: 88.1, passingRate: 97.5, totalStudents: 305 },
  ]
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Structural Headers */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Institutional Analytics</h2>
          <p className="text-muted-foreground">Monitor performance distribution indexes and enrollment metrics across cohorts.</p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          <RefreshCw className="mr-2 h-4 w-4" /> Recalculate System Metrics
        </Button>
      </div>

      {/* Aggregate Score Strips */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100 font-medium text-xs uppercase">Overall Student Retention</CardDescription>
            <CardTitle className="text-3xl font-black">{mockSummary.retentionRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-blue-200">Institutional target baseline standard: 95.0%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Total Enrolled Footprint</CardDescription>
            <CardTitle className="text-3xl font-black">1,273</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-emerald-600 font-semibold gap-1">
              <TrendingUp className="h-3 w-3" /> +3.2% growth over historical baseline
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider text-muted-foreground">System Term Track</CardDescription>
            <CardTitle className="text-xl font-bold truncate">{mockSummary.termName}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
              <Layers className="mr-1 h-3 w-3" /> Live Production Segment
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Double Column Display Panels */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Enrollment Density by Discipline</CardTitle>
            <CardDescription className="text-xs">Active headcounts matching primary course selections.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsDistributionChart data={mockSummary.enrollmentByDepartment} />
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Academic Performance Roster</CardTitle>
            <CardDescription className="text-xs">Average scores and passing distributions mapped across cohorts.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            {mockSummary.gpaDistribution.map((demographic, idx) => (
              <PerformanceMetricRow key={idx} demographic={demographic} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}