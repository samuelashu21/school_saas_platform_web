"use client";

import { useState } from "react";
import { StudentService } from "@/services/student.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

interface AddStudentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddStudentForm({ onSuccess, onCancel }: AddStudentFormProps) {
  // Local standard controlled form state tracking fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    grade: "Grade 9",
    status: "ENROLLED" as const,
    attendanceRate: 100,
    gpa: 4.0
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    // Simple structural baseline validation blocks
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setFormError("Student names must contain valid textual identifiers.");
      return;
    }
    if (!formData.email.includes("@")) {
      setFormError("Please enter a structurally valid email routing location.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Execute pipeline stream to backend data layer
      await StudentService.create(formData);
      setFormSuccess(true);
      
      // Reset form variables upon successful confirmation receipt
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        grade: "Grade 9",
        status: "ENROLLED",
        attendanceRate: 100,
        gpa: 4.0
      });
      
      if (onSuccess) setTimeout(() => onSuccess(), 1000);
    } catch (err: any) {
      setFormError(err.message || "An unhandled transport error occurred dropping payload to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <UserPlus className="h-5 w-5" />
          <CardTitle className="text-lg font-bold">Onboard New Student Profile</CardTitle>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Global Alert Notification Hooks */}
          {formError && (
            <div className="p-3 text-xs bg-rose-50 border border-rose-200 rounded-md dark:bg-rose-950/20 dark:border-rose-900 text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" /> {formError}
            </div>
          )}
          {formSuccess && (
            <div className="p-3 text-xs bg-emerald-50 border border-emerald-200 rounded-md dark:bg-emerald-950/20 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> Student record written to registrar system successfully.
            </div>
          )}

          {/* Core Text Input Fields Stack */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">First Name</label>
              <input 
                type="text" 
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g., Jane"
                className="w-full px-3 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Last Name</label>
              <input 
                type="text" 
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g., Doe"
                className="w-full px-3 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="jane.doe@school.edu"
              className="w-full px-3 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Academic Selectors Stack */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Academic Standing Level</label>
              <select 
                value={formData.grade}
                onChange={e => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Grade 9">Grade 9 (Freshman)</option>
                <option value="Grade 10">Grade 10 (Sophomore)</option>
                <option value="Grade 11">Grade 11 (Junior)</option>
                <option value="Grade 12">Grade 12 (Senior)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Active Roster Status</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ENROLLED">Active Enrollment</option>
                <option value="PROBATION">Academic Probation</option>
                <option value="SUSPENDED">Suspended Operational File</option>
              </select>
            </div>
          </div>
        </CardContent>
        
        {/* Actions Controls Block */}
        <CardFooter className="border-t bg-muted/20 py-3 flex items-center justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isSubmitting}>
              Discard Changes
            </Button>
          )}
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Syncing Record..." : "Confirm Onboarding"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}