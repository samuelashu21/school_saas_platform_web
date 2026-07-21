"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Layout,
  LucideIcon,
  Menu,

  Building2,
  ClipboardList,
  School,
  BookOpen,
  UsersRound,
  CalendarDays,

  Users,
  UserPlus,
  CheckCircle,

  GraduationCap,
  UserCog,
  SlidersHorizontal,

  ChevronDown,
  ChevronRight,

  UserCheck,
  ArrowRightLeft,
  FilePlus,

} from "lucide-react";


import {
  useAppDispatch,
  useAppSelector,
} from "@/app/redux";


import {
  setIsSidebarCollapsed,
} from "@/app/state";




// ======================================
// Sidebar Link
// ======================================


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


  const active =
    pathname === href;



  return (

    <Link

      href={href}

      data-testid={testId}

    >


      <div

        className={`

mx-3
my-1
flex
items-center
rounded-xl
cursor-pointer
transition
duration-200
group


${isCollapsed

            ?

            "justify-center p-3"

            :

            "px-4 py-3"

          }


${active

            ?

            "bg-blue-600 text-white shadow-md"

            :

            "text-gray-700 hover:bg-blue-50 hover:text-blue-600"

          }


`}

      >


        <Icon

          className={`

w-5
h-5


${active

              ?

              "text-white"

              :

              "text-gray-500 group-hover:text-blue-600"

            }

`}

        />



        {

          !isCollapsed && (

            <span

              className="
ml-3
text-sm
font-medium
"

            >

              {label}

            </span>

          )

        }



      </div>


    </Link>


  );


};






// ======================================
// Sidebar Sub Menu
// ======================================


interface SidebarSubMenuProps {

  title: string;

  icon: LucideIcon;

  open: boolean;

  onClick: () => void;

  isCollapsed: boolean;

  children: React.ReactNode;

}




const SidebarSubMenu = ({

  title,

  icon: Icon,

  open,

  onClick,

  isCollapsed,

  children,

}: SidebarSubMenuProps) => {


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


${isCollapsed

            ?

            "justify-center p-3"

            :

            "px-4 py-3"

          }


text-gray-700
hover:bg-blue-50
hover:text-blue-600


`}

      >


        <Icon

          className="
w-5
h-5
text-gray-500
"

        />



        {

          !isCollapsed && (

            <>


              <span

                className="
ml-3
flex-1
text-left
text-sm
font-medium
"

              >

                {title}

              </span>



              {

                open

                  ?

                  <ChevronDown size={16} />

                  :

                  <ChevronRight size={16} />

              }


            </>

          )

        }



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








// ======================================
// Sidebar Component
// ======================================


const Sidebar = () => {


  const dispatch =
    useAppDispatch();



  const collapsed =

    useAppSelector(

      state =>
        state.global.isSidebarCollapsed

    );



  const roles =

    useAppSelector(

      state =>
        state.global.currentUser?.roles ?? []

    )

      .map(

        role =>
          role.toUpperCase()

      );




  const isAdmin =

    roles.includes("SUPER_ADMIN")

    ||

    roles.includes("SCHOOL_ADMIN");




  const isRegistrar =

    roles.includes("REGISTRAR");





  const [

    registrationOpen,

    setRegistrationOpen

  ] = useState(false);




  const [

    enrollmentOpen,

    setEnrollmentOpen

  ] = useState(false);





  const [

    teacherSubjectOpen,

    setTeacherSubjectOpen

  ] = useState(false);


  const [
  userManagementOpen,
  setUserManagementOpen
] = useState(false);


  const toggleSidebar = () => {


    dispatch(

      setIsSidebarCollapsed(

        !collapsed

      )

    );


  };





  return (


    <div


      className={`

fixed

top-0

left-0

z-40

flex

flex-col

h-screen

bg-white

border-r

shadow-xl


transition-all

duration-300



${collapsed

          ?

          "w-0 md:w-20"

          :

          "w-72"

        }

`}


    >





      {/* HEADER */}


      <div

        className="
h-20
flex
items-center
justify-between
px-5
border-b
"

      >


        <div

          className="
w-11
h-11
rounded-xl
bg-blue-600
text-white
font-bold
flex
items-center
justify-center
"

        >

          SM

        </div>




        {

          !collapsed && (

            <div>

              <h1

                className="
font-bold
text-xl
"

              >

                SIMS EDU

              </h1>


              <p

                className="
text-xs
text-gray-500
"

              >

                School Management

              </p>


            </div>

          )

        }




        <button

          onClick={toggleSidebar}

          className="
md:hidden
p-3
rounded-full
bg-gray-100
"

        >

          <Menu size={18} />

        </button>


      </div>





      {/* MENU */}


      <div

        className="
flex-1
overflow-y-auto
mt-6
pb-10
"

      >




        <SidebarLink

          href="/dashboard"

          icon={Layout}

          label="Dashboard"

          isCollapsed={collapsed}

          testId="dashboard"

        />






        {/* ADMIN MODULES */}

        {
          isAdmin && (

            <>


              <SidebarLink

                href="/schools"

                icon={Building2}

                label="Schools"

                isCollapsed={collapsed}

                testId="schools"

              />



              <SidebarLink

                href="/grades"

                icon={ClipboardList}

                label="Grades"

                isCollapsed={collapsed}

                testId="grades"

              />



              <SidebarLink

                href="/classes"

                icon={School}

                label="Classes"

                isCollapsed={collapsed}

                testId="classes"

              />



              <SidebarLink

                href="/subjects"

                icon={BookOpen}

                label="Subjects"

                isCollapsed={collapsed}

                testId="subjects"

              />



              <SidebarLink

                href="/teachers"

                icon={UsersRound}

                label="Teachers"

                isCollapsed={collapsed}

                testId="teachers"

              />



              <SidebarLink

                href="/academic-periods"

                icon={CalendarDays}

                label="Academic Periods"

                isCollapsed={collapsed}

                testId="academic-periods"

              />



            </>

          )

        }




        {
          (isAdmin || isRegistrar) && (


            <SidebarSubMenu

              title="Student Registration"

              icon={UserPlus}

              open={registrationOpen}

              onClick={() => setRegistrationOpen(!registrationOpen)}

              isCollapsed={collapsed}

            >


              {
                isRegistrar && (

                  <SidebarLink

                    href="/student-registration/register"

                    icon={UserPlus}

                    label="Register Student"

                    isCollapsed={false}

                    testId="register-student"

                  />

                )

              }



              {
                isAdmin && (

                  <SidebarLink

                    href="/student-registration/approvals"

                    icon={CheckCircle}

                    label="Student Approval"

                    isCollapsed={false}

                    testId="student-approval"

                  />

                )

              }




              <SidebarLink

                href="/student-registration/students"

                icon={Users}

                label="Registered Students"

                isCollapsed={false}

                testId="registered-students"

              />



            </SidebarSubMenu>


          )

        }







 
        {
          (isAdmin || isRegistrar) && (


            <SidebarSubMenu

              title="Student Enrollment"

              icon={Users}

              open={enrollmentOpen}

              onClick={() => setEnrollmentOpen(!enrollmentOpen)}

              isCollapsed={collapsed}

            >


              {/* DASHBOARD */}

              <SidebarLink

                href="/student-enrollment/admin"

                icon={Users}

                label="Enrollment Dashboard"

                isCollapsed={false}

                testId="enrollment-dashboard"

              />





              {/* CREATE ENROLLMENT */}


              <SidebarLink

                href="/student-enrollment"

                icon={FilePlus}

                label="Create Enrollment"

                isCollapsed={false}

                testId="create-enrollment"

              />





            </SidebarSubMenu>


          )

        }






 

        {
          isAdmin && (


            <SidebarSubMenu

              title="Teacher Subjects"

              icon={GraduationCap}

              open={teacherSubjectOpen}

              onClick={() => setTeacherSubjectOpen(!teacherSubjectOpen)}

              isCollapsed={collapsed}

            >


              <SidebarLink

                href="/teacher-subjects"

                icon={UserCheck}

                label="Assign Subject"

                isCollapsed={false}

                testId="assign-subject"

              />



              <SidebarLink

                href="/teacher-subjects"

                icon={UsersRound}

                label="Assignment Table"

                isCollapsed={false}

                testId="assignment-table"

              />



              <SidebarLink

                href="/teacher-subjects"

                icon={ArrowRightLeft}

                label="Remove Assignment"

                isCollapsed={false}

                testId="remove-assignment"

              />



            </SidebarSubMenu>


          )

        }






 
 {
  isAdmin && (

    <SidebarSubMenu

      title="User Management"

      icon={UserCog}

      open={userManagementOpen}

      onClick={() =>
        setUserManagementOpen(
          !userManagementOpen
        )
      }

      isCollapsed={collapsed}

    >


      <SidebarLink

        href="/users/list"

        icon={Users}

        label="All Users"

        isCollapsed={false}

        testId="users-list"

      />



      <SidebarLink

        href="/users/create"

        icon={UserPlus}

        label="Create User"

        isCollapsed={false}

        testId="create-user"

      />



      <SidebarLink

        href="/users/roles"

        icon={UserCog}

        label="Manage Roles"

        isCollapsed={false}

        testId="user-roles"

      />


    </SidebarSubMenu>

  )
}







 

        <SidebarLink

          href="/settings"

          icon={SlidersHorizontal}

          label="Settings"

          isCollapsed={collapsed}

          testId="settings"

        />





      </div>







 
      <div

        className="
border-t
p-4
text-center
text-xs
text-gray-400
"

      >

        © 2026 SIMS EDU

      </div>





    </div>


  );


};



export default Sidebar;