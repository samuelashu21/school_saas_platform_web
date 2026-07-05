"use client";

import { DailyAttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface AttendanceRowProps {
  record: DailyAttendanceRecord;
  onStatusChange: (id: string, newStatus: AttendanceStatus) => void;
}

export function AttendanceRow({ record, onStatusChange }: AttendanceRowProps) {
  const statusOptions: { label: string; value: AttendanceStatus; style: string }[] = [
    { label: "Present", value: "PRESENT", style: "bg-emerald-50 text-emerald-700 border-emerald-200 checked:bg-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" },
    { label: "Absent", value: "ABSENT", style: "bg-destructive/10 text-destructive border-destructive/20 checked:bg-destructive dark:bg-rose-950/30 dark:text-rose-400" },
    { label: "Tardy", value: "TARDY", style: "bg-amber-50 text-amber-700 border-amber-200 checked:bg-amber-500 dark:bg-amber-950/30 dark:text-amber-400" },
    { label: "Excused", value: "EXCUSED", style: "bg-blue-50 text-blue-700 border-blue-200 checked:bg-blue-600 dark:bg-blue-950/30 dark:text-blue-400" },
  ];

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle font-mono text-xs font-medium text-slate-500 w-32">
        {record.studentId}
      </td>
      <td className="p-4 align-middle font-medium">
        {record.studentName}
      </td>
      <td className="p-4 align-middle">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => {
            const isSelected = record.status === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onStatusChange(record.id, option.value)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold border transition-all select-none",
                  isSelected 
                    ? option.style + " ring-2 ring-offset-1 ring-primary/30 font-bold shadow-sm border-transparent" 
                    : "bg-card hover:bg-muted text-muted-foreground border-input"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </td>
      <td className="p-4 align-middle hidden sm:table-cell">
        <input 
          type="text" 
          placeholder="Add absence details..." 
          defaultValue={record.notes}
          className="w-full bg-transparent border-b border-transparent hover:border-input focus:border-primary px-1 py-0.5 text-xs outline-none transition-colors"
        />
      </td>
    </tr>
  );
}