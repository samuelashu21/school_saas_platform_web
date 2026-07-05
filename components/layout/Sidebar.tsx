"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";
import { 
  LayoutDashboard, Users, UserSquare2, School, BookOpen, 
  CalendarDays, Calendar, CheckSquare, FileText, BarChart3, 
  Bell, Settings, GraduationCap, ChevronLeft, ChevronRight
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/students", icon: Users },
  { name: "Teachers", href: "/teachers", icon: UserSquare2 },
  { name: "Classes", href: "/classes", icon: School },
  { name: "Subjects", href: "/subjects", icon: BookOpen },
  { name: "Attendance", href: "/attendance", icon: CheckSquare },
  { name: "Grades", href: "/grades", icon: GraduationCap },
  { name: "Transcripts", href: "/transcripts", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();

  return (
    <aside className={cn(
      "relative h-screen border-r bg-card text-card-foreground transition-all duration-300 flex flex-col",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {isOpen && (
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            EduManage SIMS
          </span>
        )}
        <button 
          onClick={toggle}
          className="p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground ml-auto"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0")} />
              {isOpen && <span>{item.name}</span>}
              {!isOpen && (
                <span className="absolute left-14 bg-popover text-popover-foreground text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none whitespace-nowrap shadow-md">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}