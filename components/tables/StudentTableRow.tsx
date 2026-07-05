"use client";

import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit2, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentTableRowProps {
  student: Student;
}

export function StudentTableRow({ student }: StudentTableRowProps) {
  const statusVariants: Record<
    Student["status"],
    "default" | "secondary" | "destructive" | "outline"
  > = {
    ACTIVE: "default",
    GRADUATED: "secondary",
    SUSPENDED: "destructive",
    DROPPED: "outline",
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle font-mono text-xs font-medium text-slate-500">
        {student.studentId}
      </td>

      <td className="p-4 align-middle font-medium">
        {student.lastName}, {student.firstName}
      </td>

      <td className="hidden p-4 align-middle text-muted-foreground md:table-cell">
        {student.email}
      </td>

      <td className="p-4 align-middle">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
          {student.gradeLevel}
        </span>
      </td>

      <td className="p-4 align-middle">
        <Badge variant={statusVariants[student.status]}>
          {student.status}
        </Badge>
      </td>

      <td className="p-4 align-middle text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open actions menu"
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-medium">
              Actions
            </DropdownMenuLabel>

            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Record
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Terminate Enrollment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}