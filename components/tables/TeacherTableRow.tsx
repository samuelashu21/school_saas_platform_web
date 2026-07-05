"use client";

import { Teacher } from "@/types/teacher";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Mail,
  GraduationCap,
  FileEdit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeacherTableRowProps {
  teacher: Teacher;
}

export function TeacherTableRow({ teacher }: TeacherTableRowProps) {
  const statusVariants: Record<
    Teacher["status"],
    "default" | "secondary" | "destructive" | "outline"
  > = {
    ACTIVE: "default",
    ON_LEAVE: "outline",
    RETIRED: "destructive",
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle font-mono text-xs font-medium text-slate-500">
        {teacher.teacherId}
      </td>

      <td className="p-4 align-middle font-medium">
        {teacher.lastName}, {teacher.firstName}
      </td>

      <td className="hidden p-4 align-middle text-muted-foreground md:table-cell">
        {teacher.email}
      </td>

      <td className="p-4 align-middle">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
          {teacher.department}
        </span>
      </td>

      <td className="p-4 align-middle text-center font-mono text-xs font-bold">
        {teacher.activeSectionsCount} classes
      </td>

      <td className="p-4 align-middle">
        <Badge variant={statusVariants[teacher.status]}>
          {teacher.status.replace("_", " ")}
        </Badge>
      </td>

      <td className="p-4 align-middle text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open menu"
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-medium">
              Faculty Actions
            </DropdownMenuLabel>

            <DropdownMenuItem className="cursor-pointer">
              <GraduationCap className="mr-2 h-4 w-4" />
              View Schedule
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <FileEdit className="mr-2 h-4 w-4" />
              Modify Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <Mail className="mr-2 h-4 w-4" />
              Contact Instructor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
} 