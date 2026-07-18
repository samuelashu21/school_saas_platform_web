"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  ChevronDown,
  ChevronRight,
} from "lucide-react";


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
    pathname === href ||
    (pathname === "/" && href === "/dashboard");


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

        ${isCollapsed 
          ? "justify-center p-3" 
          : "px-4 py-3"
        }

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

          ${
            isActive
              ? "text-white"
              : "text-gray-500 group-hover:text-blue-600"
          }
          `}
        />


        {!isCollapsed && (
          <span className="ml-3 font-medium text-sm">
            {label}
          </span>
        )}

      </div>

    </Link>
  );
};



interface SidebarSubMenuProps {
  title:string;
  icon:LucideIcon;
  open:boolean;
  onClick:()=>void;
  isCollapsed:boolean;
  children:React.ReactNode;
}



const SidebarSubMenu = ({
  title,
  icon:Icon,
  open,
  onClick,
  isCollapsed,
  children,
}:SidebarSubMenuProps)=>{


return (

<div>


<button
onClick={onClick}
className={`
mx-3
my-1
flex
w-[calc(100%-1.5rem)]
items-center
rounded-xl
transition
duration-200

${
isCollapsed
?"justify-center p-3"
:"px-4 py-3"
}

text-gray-700
hover:bg-blue-50
hover:text-blue-600

`}
>


<Icon className="w-5 h-5 text-gray-500"/>


{!isCollapsed && (

<>

<span className="
ml-3
font-medium
text-sm
flex-1
text-left
">

{title}

</span>


{open
?
<ChevronDown size={16}/>
:
<ChevronRight size={16}/>
}


</>

)}


</button>




{
open && !isCollapsed && (

<div
className="
ml-6
border-l
border-gray-200
pl-2
"
>

{children}

</div>

)

}


</div>

);


};




const Sidebar =()=>{


const dispatch = useAppDispatch();


const [
studentRegistrationOpen,
setStudentRegistrationOpen
]=useState(false);



const isSidebarCollapsed =
useAppSelector(
state=>state.global.isSidebarCollapsed
);



const currentUserRoles =
useAppSelector(
state=>state.global.currentUser?.roles ?? []
);



const normalizedRoles =
currentUserRoles.map(role =>
role.toUpperCase()
);



const isAdmin =
normalizedRoles.includes("SUPER_ADMIN") ||
normalizedRoles.includes("SCHOOL_ADMIN");



const isRegistrar =
normalizedRoles.includes("REGISTRAR");




const toggleSidebar=()=>{

dispatch(
setIsSidebarCollapsed(
!isSidebarCollapsed
)
);

};




return (

<div
className={`
fixed
top-0
left-0
flex
flex-col

${
isSidebarCollapsed
?"w-0 md:w-20"
:"w-72"
}

bg-white
border-r
border-gray-200
transition-all
duration-300
h-screen
shadow-xl
z-40

`}
>


{/* LOGO */}

<div
className="
flex
items-center
justify-between
border-b
border-gray-200
px-5
h-20
"
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

<h1 className="
font-bold
text-xl
text-gray-800
">
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
"
onClick={toggleSidebar}
>

<Menu className="w-4 h-4"/>

</button>


</div>





<div
className="
flex-1
mt-6
overflow-y-auto
pb-8
"
>



<SidebarLink
href="/dashboard"
icon={Layout}
label="Dashboard"
isCollapsed={isSidebarCollapsed}
testId="nav-dashboard"
/>





{isAdmin && (

<>

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


</>

)}






{/* STUDENT REGISTRATION */}

{(isRegistrar || isAdmin) && (

<SidebarSubMenu

title="Student Registration"

icon={UserPlus}

open={studentRegistrationOpen}

onClick={()=>
setStudentRegistrationOpen(
!studentRegistrationOpen
)
}

isCollapsed={isSidebarCollapsed}

>


{/* Registrar only */}

{isRegistrar && !isAdmin && (

<SidebarLink
href="/student-registration/register"
icon={UserPlus}
label="Register Student"
isCollapsed={false}
testId="nav-student-registration-register"
/>

)}




{/* Admin approval */}

{isAdmin && (

<SidebarLink
href="/student-registration/approvals"
icon={CheckCircle}
label="Student Approval"
isCollapsed={false}
testId="nav-student-registration-approvals"
/>

)}




{/* BOTH ADMIN AND REGISTRAR */}

<SidebarLink
href="/student-registration/students"
icon={Users}
label="Registered Students"
isCollapsed={false}
testId="nav-student-registration-students"
/>



</SidebarSubMenu>

)}







{isAdmin && (

<>

<SidebarLink
href="/users"
icon={UserCog}
label="User Management"
isCollapsed={isSidebarCollapsed}
testId="nav-user-management"
/>



<SidebarLink
href="/student-enrollment"
icon={Users}
label="Student Enrollment"
isCollapsed={isSidebarCollapsed}
testId="nav-student-enrollment"
/>


</>

)}





<SidebarLink
href="/settings"
icon={SlidersHorizontal}
label="Settings"
isCollapsed={isSidebarCollapsed}
testId="nav-settings"
/>



</div>





<div
className={`
border-t
border-gray-200
p-4

${
isSidebarCollapsed
?"hidden"
:"block"
}

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