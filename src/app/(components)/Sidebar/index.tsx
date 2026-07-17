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
cursor-pointer
flex
items-center
${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
hover:text-blue-500
hover:bg-blue-100
gap-3
transition-colors
${isActive ? "bg-blue-100 text-blue-700" : ""}
`}
      >
        <Icon
          className={`
w-6
h-6
${isActive ? "text-blue-700" : "!text-gray-700"}
`}
        />

        <span
          className={`
${isCollapsed ? "hidden" : "block"}
font-medium
${isActive ? "text-blue-700" : "text-gray-700"}
`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const currentUserRoles = useAppSelector(
    (state) => state.global.currentUser?.roles ?? [],
  );

  const normalizedRoles = currentUserRoles.map((role) => role.toUpperCase());
  const isAdmin = normalizedRoles.includes("SCHOOL_ADMIN") || normalizedRoles.includes("SUPER_ADMIN");
  const isRegistrar = normalizedRoles.includes("REGISTRAR");

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `

fixed

flex

flex-col

${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"}

bg-white

transition-all

duration-300

overflow-hidden

h-full

shadow-md

z-40

`;

  return (
    <div className={sidebarClassNames} data-testid="sidebar">
      {/* LOGO */}

      <div
        className={`
flex
gap-3
justify-between
md:justify-normal
items-center
pt-8
${isSidebarCollapsed ? "px-5" : "px-8"}
`}
      >
        <div
          className="
w-8
h-8
rounded-lg
bg-blue-600
text-white
grid
place-items-center
text-sm
font-bold
"
        >
          SM
        </div>

        <h1
          className={`
${isSidebarCollapsed ? "hidden" : "block"}
font-extrabold
text-2xl
text-gray-800
`}
        >
          SIMS EDU
        </h1>

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

      <div className="flex-grow mt-8">
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

        {isRegistrar && !isAdmin && (
          <SidebarLink
            href="/student-registration/register"
            icon={UserPlus}
            label="Register Student"
            isCollapsed={isSidebarCollapsed}
            testId="nav-student-registration-register"
          />
        )}

        {isAdmin && (
          <SidebarLink
            href="/student-registration/approvals"
            icon={CheckCircle}
            label="Student Approval"
            isCollapsed={isSidebarCollapsed}
            testId="nav-student-registration-approvals"
          />
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
${isSidebarCollapsed ? "hidden" : "block"}
mb-10
`}
      >
        <p
          className="
text-center
text-xs
text-gray-500
"
        >
          © 2026 SIMS Management
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
