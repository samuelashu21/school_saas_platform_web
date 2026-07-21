"use client";

import { useState } from "react";

import StudentEnrollmentForm from "./StudentEnrollmentForm";
import EnrollmentSuccess from "./EnrollmentSuccess";
import EnrollmentClosed from "./EnrollmentClosed";

import {
    useGetRegistrationAcademicPeriodsQuery,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

import {
    useGetEligibleStudentsQuery,
    useGetEnrollmentClassesQuery,
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";

const StudentEnrollmentPage = () => {
    const [submitted, setSubmitted] = useState(false);

    // Replace later with your registration window API
    const enrollmentOpen = true;

    // Academic Periods
    const {
        data: academicPeriods = [],
        isLoading: loadingPeriods,
    } = useGetRegistrationAcademicPeriodsQuery();

    // Eligible Students
    const {
        data: eligibleStudentsResponse,
        isLoading: loadingStudents,
    } = useGetEligibleStudentsQuery();

    // Classes
    const {
        data: classesResponse,
        isLoading: loadingClasses,
    } = useGetEnrollmentClassesQuery();

    const students = eligibleStudentsResponse?.data ?? [];
    const classes = classesResponse?.data ?? [];

    if (!enrollmentOpen) {
        return <EnrollmentClosed />;
    }

    if (submitted) {
        return <EnrollmentSuccess />;
    }

    if (loadingPeriods || loadingStudents || loadingClasses) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading enrollment information...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Student Enrollment
                </h1>

                <StudentEnrollmentForm
                    onSuccess={() => setSubmitted(true)}
                    students={students}
                    academicPeriods={academicPeriods}
                    classes={classes}
                />
            </div> 
        </div>
    );
};

export default StudentEnrollmentPage;