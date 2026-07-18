"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import { usePathname } from "next/navigation";

import {
  Layout,
  LucideIcon,
  Menu,
  GraduationCap,
  Building2,
  Users,
  SlidersHorizontal,
  ClipboardList,
  School,
  UsersRound,
  BookOpen,
  CalendarDays,
  UserPlus,
  CheckCircle,
  UserCog,
} from "lucide-react";

import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  testId: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  testId,
}: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} data-testid={testId}>
      <div
        className={`
mx-3
my-1
flex
items-center
rounded-xl
transition-all
duration-200
cursor-pointer
group

${isCollapsed ? "justify-center p-3" : "px-4 py-3"}

${
  isActive
    ? "bg-blue-600 text-white shadow-md"
    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
}
`}
      >
        <Icon
          className={`
      w-5
      h-5
      shrink-0
      ${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"}
    `}
        />

        {!isCollapsed && (
          <span className="ml-3 font-medium text-sm">{label}</span>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  // ================================
  // USER ROLES
  // ================================

  const currentUserRoles = useAppSelector(
    (state) => state.global.currentUser?.roles ?? [],
  );

  const normalizedRoles = currentUserRoles.map((role) => role.toUpperCase());

  const isAdmin =
    normalizedRoles.includes("SUPER_ADMIN") ||
    normalizedRoles.includes("SCHOOL_ADMIN");

  const isRegistrar = normalizedRoles.includes("REGISTRAR");

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `
fixed
top-0
left-0 
flex
flex-col
${isSidebarCollapsed ? "w-0 md:w-20" : "w-72 md:w-72"}
bg-white
border-r
border-gray-200
transition-all
duration-300
h-screen
shadow-xl
z-40
`;

  return (
    <div className={sidebarClassNames} data-testid="sidebar">
      {/* LOGO */}

      <div
  className={`
flex
items-center
justify-between
border-b
border-gray-200
px-5
h-20
`}
>
        <div
  className="
w-11
h-11
rounded-xl
bg-gradient-to-br
from-blue-600
to-indigo-600
text-white
font-bold
flex
items-center
justify-center
shadow-lg
"
>
  SM
</div> 

        {!isSidebarCollapsed && (
  <div>
    <h1 className="font-bold text-xl text-gray-800">
      SIMS EDU
    </h1>

    <p className="text-xs text-gray-500">
      School Management
    </p>
  </div>
)}

        <button
          className="
md:hidden
px-3
py-3
bg-gray-100
rounded-full
hover:bg-blue-100
"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}

      <div
        className="
flex-1
mt-6
overflow-y-auto
overflow-x-hidden
pb-8 

scrollbar-thin
scrollbar-thumb-gray-300
scrollbar-track-transparent
"
      >
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
          testId="nav-dashboard"
        />

        <SidebarLink
          href="/schools"
          icon={Building2}
          label="Schools"
          isCollapsed={isSidebarCollapsed}
          testId="nav-schools"
        />

        <SidebarLink
          href="/grades"
          icon={ClipboardList}
          label="Grades"
          isCollapsed={isSidebarCollapsed}
          testId="nav-grades"
        />

        <SidebarLink
          href="/classes"
          icon={School}
          label="Classes"
          isCollapsed={isSidebarCollapsed}
          testId="nav-classes"
        />

        <SidebarLink
          href="/subjects"
          icon={BookOpen}
          label="Subjects"
          isCollapsed={isSidebarCollapsed}
          testId="nav-subjects"
        />

        <SidebarLink
          href="/teachers"
          icon={UsersRound}
          label="Teachers"
          isCollapsed={isSidebarCollapsed}
          testId="nav-teachers"
        />

        <SidebarLink
          href="/academic-periods"
          icon={CalendarDays}
          label="Academic Year / Semester"
          isCollapsed={isSidebarCollapsed}
          testId="nav-academic-periods"
        />

        <SidebarLink
          href="/teacher-subjects"
          icon={GraduationCap}
          label="Teacher Subject Assignment"
          isCollapsed={isSidebarCollapsed}
          testId="nav-teacher-subjects"
        />

        {/* ============================
            REGISTRAR ONLY
        ============================ */}

        {isRegistrar && !isAdmin && (
          <SidebarLink
            href="/student-registration/register"
            icon={UserPlus}
            label="Register Student"
            isCollapsed={isSidebarCollapsed}
            testId="nav-student-registration-register"
          />
        )}

        {/* ============================
            ADMIN ONLY
        ============================ */}

        {isAdmin && (
          <>
            <SidebarLink
              href="/student-registration/approvals"
              icon={CheckCircle}
              label="Student Approval"
              isCollapsed={isSidebarCollapsed}
              testId="nav-student-registration-approvals"
            />

            <SidebarLink
              href="/users"
              icon={UserCog}
              label="User Management"
              isCollapsed={isSidebarCollapsed}
              testId="nav-user-management"
            />
          </>
        )}

        <SidebarLink
          href="/student-enrollment"
          icon={Users}
          label="Student Enrollment"
          isCollapsed={isSidebarCollapsed}
          testId="nav-student-enrollment"
        />

        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
          testId="nav-settings"
        />
      </div>

      {/* FOOTER */}

      <div
  className={`
border-t
border-gray-200
p-4
${isSidebarCollapsed ? "hidden" : "block"}
`}
>
       <p className="text-center text-xs text-gray-400">
  © 2026 SIMS EDU
</p>

<p className="text-center text-[11px] text-gray-400 mt-1">
  Version 1.0.0
</p>
      </div>
    </div>
  );
};

export default Sidebar;
