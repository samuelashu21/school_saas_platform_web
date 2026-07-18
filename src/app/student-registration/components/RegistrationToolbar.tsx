"use client";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FileSpreadsheet,
  FileText,
  Search,
} from "lucide-react";

import type {
  RegistrationStatus,
  Student,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";



// =====================================================
// STATUS OPTIONS
// =====================================================


const registrationStatuses: RegistrationStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "ACTIVE",
  "INACTIVE",
];



// =====================================================
// PROPS
// =====================================================


interface RegistrationToolbarProps {


  searchTerm: string;


  onSearchChange: (value: string) => void;



  statusFilter:
  | "ALL"
  | RegistrationStatus;



  onStatusFilterChange:
  (
    value:
      | "ALL"
      | RegistrationStatus
  ) => void;



  students: Student[];


}





const RegistrationToolbar = ({

  searchTerm,

  onSearchChange,

  statusFilter,

  onStatusFilterChange,

  students,

}: RegistrationToolbarProps) => {





  // =====================================================
  // PARENT NAME
  // =====================================================


  const getParentName = (
    student: Student
  ) => {


    const account =
      student.parent?.account;



    if (account) {

      return `${account.firstName} ${account.lastName}`;

    }


    return "-";

  };







  // =====================================================
  // REGISTRATION INFO
  // =====================================================


  const getRegistration = (
    student: Student
  ) => {


    const registration =
      student.registrations?.[0];



    if (!registration) {

      return {

        grade: "-",

        className: "-",

        period: "-",

      };

    }



    return {


      grade:
        registration.class
          ?.gradeLevel
          ?.name ?? "-",



      className:
        registration.class
          ?.name ?? "-",



      period:

        registration.academicPeriod

          ?

          `${registration.academicPeriod.academicYear}
${registration.academicPeriod.semester}`

          :

          "-",


    };


  };







  // =====================================================
  // EXCEL EXPORT
  // =====================================================


  const exportToExcel = () => {


    const rows =
      students.map(student => {


        const registration =
          getRegistration(student);



        return {


          StudentName:
            `${student.firstName} ${student.lastName}`,



          StudentCode:
            student.studentCode,



          Gender:
            student.gender ?? "-",



          DateOfBirth:

            student.dateOfBirth

              ?

              new Date(
                student.dateOfBirth
              )
                .toLocaleDateString()

              :

              "-",



          School:
            student.school?.name ?? "-",



          Grade:
            registration.grade,



          Section:
            registration.className,



          AcademicPeriod:
            registration.period,



          Parent:
            getParentName(student),



          Status:
            student.registrationStatus,


        };


      });




    const worksheet =
      XLSX.utils.json_to_sheet(rows);



    const workbook =
      XLSX.utils.book_new();



    XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      "Student Registrations"

    );




    XLSX.writeFile(

      workbook,

      `student-registrations-${Date.now()}.xlsx`

    );



  };








  // =====================================================
  // PDF EXPORT
  // =====================================================


  const exportToPdf = () => {


    const pdf =
      new jsPDF();



    pdf.setFontSize(14);



    pdf.text(

      "Student Registrations",

      14,

      18

    );




    autoTable(pdf, {


      startY: 24,



      head: [

        [

          "Name",

          "Code",

          "Gender",

          "DOB",

          "School",

          "Grade",

          "Section",

          "Academic Period",

          "Parent",

          "Status",

        ]

      ],





      body:

        students.map(student => {


          const registration =
            getRegistration(student);



          return [

            `${student.firstName} ${student.lastName}`,

            student.studentCode,

            student.gender ?? "-",

            student.dateOfBirth

              ?

              new Date(
                student.dateOfBirth
              )
                .toLocaleDateString()

              :

              "-",


            student.school?.name ?? "-",


            registration.grade,


            registration.className,


            registration.period,


            getParentName(student),


            student.registrationStatus,


          ];


        }),



      styles: {

        fontSize: 8,

      },


    });



    pdf.save(

      `student-registrations-${Date.now()}.pdf`

    );



  };







  return (

    <div

      className="
mb-6
flex
flex-col
gap-4
rounded-xl
bg-white
p-4
shadow-md
lg:flex-row
lg:items-center
lg:justify-between
"

    >



      {/* SEARCH + FILTER */}


      <div

        className="
flex
w-full
flex-col
gap-3
md:flex-row
"

      >



        <div

          className="
flex
w-full
items-center
rounded-lg
border
border-gray-200
px-3
"

        >


          <Search
            className="h-4 w-4 text-gray-400"
          />



          <input


            value={searchTerm}


            onChange={
              e => onSearchChange(
                e.target.value
              )
            }



            placeholder="Search students"



            className="
w-full
px-2
py-2.5
text-sm
outline-none
"

          />



        </div>








        <select


          value={statusFilter}


          onChange={e => {


            const value =
              e.target.value;



            onStatusFilterChange(

              value === "ALL"

                ?

                "ALL"

                :

                value as RegistrationStatus

            );



          }}



          className="
rounded-lg
border
border-gray-200
px-3
py-2.5
text-sm
"

        >



          <option value="ALL">

            All Statuses

          </option>




          {
            registrationStatuses.map(status => (


              <option

                key={status}

                value={status}

              >

                {status}

              </option>


            ))

          }



        </select>





      </div>









      {/* EXPORT BUTTONS */}



      <div className="flex gap-3">



        <button

          type="button"

          onClick={exportToExcel}


          className="
flex
items-center
gap-2
rounded-lg
bg-blue-600
px-4
py-2
text-sm
font-semibold
text-white
hover:bg-blue-700
"

        >


          <FileSpreadsheet className="h-4 w-4" />


          Export Excel


        </button>







        <button

          type="button"

          onClick={exportToPdf}


          className="
flex
items-center
gap-2
rounded-lg
bg-red-600
px-4
py-2
text-sm
font-semibold
text-white
hover:bg-red-700
"

        >


          <FileText className="h-4 w-4" />


          Export PDF


        </button>





      </div>





    </div>
 
  );


};



export default RegistrationToolbar;