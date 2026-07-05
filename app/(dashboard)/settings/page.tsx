"use client";

import { useState } from "react";
import { SystemConfiguration } from "@/types/settings";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ShieldCheck, Building2, Sliders } from "lucide-react";

export default function SettingsPage() {
  const [config, setConfig] = useState<SystemConfiguration>({
    institutionName: "EduManage Academic Institution",
    activeAcademicYearId: "ay-2025-2026",
    activeSemesterId: "sem-fall",
    enforceAttendanceThreshold: true,
    minimumAttendancePercentage: 80,
    gradingScaleType: "STANDARD_LETTER"
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = () => {
    setConfig(prev => ({ 
      ...prev, 
      enforceAttendanceThreshold: !prev.enforceAttendanceThreshold 
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      alert("Institutional parameters successfully synced to database.");
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Structural Headers */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Adjust system rules, grading schemas, and active academic parameters.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Building2 className="h-5 w-5" />
              <CardTitle className="text-lg font-bold">Institutional Profile</CardTitle>
            </div>
            <CardDescription className="text-xs">Configure identity markers used on official records and transcript prints.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Official Institution Name</label>
              <input 
                type="text" 
                value={config.institutionName}
                onChange={(e) => setConfig({ ...config, institutionName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Rules Configurations Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Sliders className="h-5 w-5" />
              <CardTitle className="text-lg font-bold">Academic Regulations & Grading</CardTitle>
            </div>
            <CardDescription className="text-xs">Adjust core enforcement limits for attendance tracking and grade evaluations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Active Academic Session</label>
                <select 
                  value={config.activeAcademicYearId}
                  onChange={(e) => setConfig({ ...config, activeAcademicYearId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-card text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="ay-2025-2026">2025 - 2026 Academic Year</option>
                  <option value="ay-2026-2027">2026 - 2027 Academic Year</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Active Term Segment</label>
                <select 
                  value={config.activeSemesterId}
                  onChange={(e) => setConfig({ ...config, activeSemesterId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-card text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="sem-fall">Semester 1 - Fall</option>
                  <option value="sem-spring">Semester 2 - Spring</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-zinc-50">Enforce Attendance Minimums</h4>
                  <p className="text-xs text-muted-foreground">Automatically trigger critical dashboard system warnings if a student slips below thresholds.</p>
                </div>
                <button
                  type="button"
                  onClick={handleToggle}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    config.enforceAttendanceThreshold ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-800"
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    config.enforceAttendanceThreshold ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </div>

              {config.enforceAttendanceThreshold && (
                <div className="space-y-2 max-w-xs pt-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Minimum Allowed Attendance (%)</label>
                  <input 
                    type="number" 
                    min="50" 
                    max="100"
                    value={config.minimumAttendancePercentage}
                    onChange={(e) => setConfig({ ...config, minimumAttendancePercentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </div>
          </CardContent>

          {/* Form Action Submissions footer */}
          <CardFooter className="border-t bg-muted/20 py-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> Administrative Role Privileges Active
            </div>
            <Button type="submit" size="sm" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" /> {isSaving ? "Syncing..." : "Commit Configuration Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}