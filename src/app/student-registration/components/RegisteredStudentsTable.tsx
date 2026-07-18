"use client";

import { useMemo, useState } from "react";
import {
    FileSpreadsheet,
    FileText,
    Search,
    ArrowUpDown,
    Eye,
} from "lucide-react";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { Student } from "@/app/state/module/studentRegistration/studentRegistrationApi";

import StudentDetailsModal from "./StudentDetailsModal";


interface Props {
    students: Student[];
    isLoading: boolean;
    isError: boolean;
}


type SortKey =
    | "name"
    | "code"
    | "school"
    | "grade"
    | "class"
    | "period"
    | "status";


const RegisteredStudentsTable = ({
    students,
    isLoading,
    isError,
}: Props) => {

    const [search, setSearch] = useState("");

    const [sortKey, setSortKey] =
        useState<SortKey>("name");

    const [ascending, setAscending] =
        useState(true);

    const [page, setPage] =
        useState(1);

    const [selectedStudent, setSelectedStudent] =
        useState<Student | null>(null);


    const pageSize = 10;


    const getRegistration = (student: Student) => {

        const registration =
            student.registrations?.[0];

        return {
            grade:
                registration?.class?.gradeLevel?.name ?? "-",

            className:
                registration?.class?.name ?? "-",

            period:
                registration?.academicPeriod
                    ? `${registration.academicPeriod.academicYear} ${registration.academicPeriod.semester}`
                    : "-",
        };
    };



    const filteredStudents = useMemo(() => {

        const query =
            search.toLowerCase().trim();


        return students
            .filter((student) => {

                const registration =
                    getRegistration(student);


                const text = [
                    student.firstName,
                    student.lastName,
                    student.studentCode,
                    student.school?.name,
                    registration.grade,
                    registration.className,
                    student.registrationStatus,
                ]
                    .join(" ")
                    .toLowerCase();


                return text.includes(query);

            })
            .sort((a, b) => {

                let first = "";
                let second = "";

                const ra = getRegistration(a);
                const rb = getRegistration(b);


                switch (sortKey) {

                    case "code":
                        first = a.studentCode;
                        second = b.studentCode;
                        break;


                    case "school":
                        first = a.school?.name ?? "";
                        second = b.school?.name ?? "";
                        break;


                    case "grade":
                        first = ra.grade;
                        second = rb.grade;
                        break;


                    case "class":
                        first = ra.className;
                        second = rb.className;
                        break;


                    case "period":
                        first = ra.period;
                        second = rb.period;
                        break;


                    case "status":
                        first = a.registrationStatus;
                        second = b.registrationStatus;
                        break;


                    default:
                        first = `${a.firstName} ${a.lastName}`;
                        second = `${b.firstName} ${b.lastName}`;
                }


                return ascending
                    ? first.localeCompare(second)
                    : second.localeCompare(first);

            });


    }, [
        students,
        search,
        sortKey,
        ascending
    ]);



    const totalPages =
        Math.ceil(filteredStudents.length / pageSize);



    const paginatedStudents =
        filteredStudents.slice(
            (page - 1) * pageSize,
            page * pageSize
        );



    const changeSort = (key: SortKey) => {

        setPage(1);

        if (sortKey === key) {
            setAscending(!ascending);
        }
        else {
            setSortKey(key);
            setAscending(true);
        }

    };



    const exportExcel = () => {

        const rows =
            filteredStudents.map(student => {

                const reg = getRegistration(student);

                return {
                    Student:
                        `${student.firstName} ${student.lastName}`,

                    Code:
                        student.studentCode,

                    School:
                        student.school?.name ?? "-",

                    Grade:
                        reg.grade,

                    Class:
                        reg.className,

                    Period:
                        reg.period,

                    Status:
                        student.registrationStatus,
                };

            });



        const sheet =
            XLSX.utils.json_to_sheet(rows);


        const book =
            XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(
            book,
            sheet,
            "Students"
        );


        XLSX.writeFile(
            book,
            "registered-students.xlsx"
        );

    };



    const exportPDF = () => {

        const pdf =
            new jsPDF();


        autoTable(pdf, {
            head: [
                [
                    "Student",
                    "Code",
                    "School",
                    "Grade",
                    "Class",
                    "Period",
                    "Status"
                ]
            ],


            body:
                filteredStudents.map(student => {

                    const reg = getRegistration(student);


                    return [
                        `${student.firstName} ${student.lastName}`,
                        student.studentCode,
                        student.school?.name ?? "-",
                        reg.grade,
                        reg.className,
                        reg.period,
                        student.registrationStatus
                    ];

                })

        });


        pdf.save(
            "registered-students.pdf"
        );

    };



    if (isLoading)
        return (
            <div className="p-6 text-gray-500">
                Loading students...
            </div>
        );


    if (isError)
        return (
            <div className="p-6 text-red-600">
                Failed loading students
            </div>
        );



    return (

        <div className="space-y-5">


            {/* TOOLBAR */}

            <div className="flex flex-col gap-3 md:flex-row md:justify-between">

                <div className="flex items-center border rounded-lg px-3 w-full md:w-96">

                    <Search
                        size={18}
                        className="text-gray-400"
                    />

                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search students..."
                        className="w-full px-2 py-2 outline-none"
                    />

                </div>


                <div className="flex gap-2">

                    <button
                        onClick={exportExcel}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white"
                    >
                        <FileSpreadsheet size={16} />
                        Excel
                    </button>


                    <button
                        onClick={exportPDF}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                    >
                        <FileText size={16} />
                        PDF
                    </button>

                </div>

            </div>



            {/* TABLE */}

            <div className="overflow-x-auto rounded-xl border">

                <table className="min-w-full text-sm">


                    <thead className="bg-gray-100">

                        <tr>

                            {[
                                ["name", "Student"],
                                ["code", "Code"],
                                ["school", "School"],
                                ["grade", "Grade"],
                                ["class", "Class"],
                                ["period", "Academic Period"],
                                ["status", "Status"],
                            ].map(([key, label]) => (

                                <th
                                    key={key}
                                    onClick={() => changeSort(key as SortKey)}
                                    className="cursor-pointer p-4 text-left"
                                >

                                    <div className="flex gap-2 items-center">

                                        {label}

                                        <ArrowUpDown size={14} />

                                    </div>

                                </th>

                            ))}


                            <th className="p-4 text-left">
                                Actions
                            </th>


                        </tr>

                    </thead>



                    <tbody>


                        {paginatedStudents.map(student => {

                            const reg = getRegistration(student);


                            return (

                                <tr
                                    key={student.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {student.firstName} {student.lastName}
                                    </td>


                                    <td className="p-4">
                                        {student.studentCode}
                                    </td>


                                    <td className="p-4">
                                        {student.school?.name ?? "-"}
                                    </td>


                                    <td className="p-4">
                                        {reg.grade}
                                    </td>


                                    <td className="p-4">
                                        {reg.className}
                                    </td>


                                    <td className="p-4">
                                        {reg.period}
                                    </td>


                                    <td className="p-4">

                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs">

                                            {student.registrationStatus}

                                        </span>

                                    </td>



                                    <td className="p-4">

                                        <button
                                            onClick={() => setSelectedStudent(student)}
                                            className="
                    flex
                    items-center
                    gap-1
                    rounded-lg
                    bg-blue-600
                    px-3
                    py-1.5
                    text-xs
                    text-white
                    hover:bg-blue-700
                    "
                                        >

                                            <Eye size={14} />

                                            View

                                        </button>


                                    </td>


                                </tr>

                            );

                        })}


                    </tbody>


                </table>

            </div>



            {/* PAGINATION */}

            <div className="flex justify-between items-center">

                <p className="text-sm text-gray-500">
                    Page {page} of {totalPages || 1}
                </p>


                <div className="flex gap-2">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="rounded border px-3 py-1 disabled:opacity-50"
                    >
                        Previous
                    </button>


                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="rounded border px-3 py-1 disabled:opacity-50"
                    >
                        Next
                    </button>


                </div>


            </div>



            {/* DETAILS MODAL */}

            <StudentDetailsModal
                student={selectedStudent}
                open={!!selectedStudent}
                onClose={() => setSelectedStudent(null)}
            />


        </div>

    );

};


export default RegisteredStudentsTable;