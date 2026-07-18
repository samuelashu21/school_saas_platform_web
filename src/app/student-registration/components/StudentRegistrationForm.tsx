"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

import {
  CreateStudentRequest,
  useRegisterStudentMutation,
  useGetRegistrationSchoolsQuery,
  useGetSchoolGradesQuery,
  useGetGradeClassesQuery,
  useGetRegistrationAcademicPeriodsQuery,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

// =====================================================
// FORM TYPE
// =====================================================
type RegistrationFormState = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  studentEmail: string;

  schoolId: string;
  gradeId: string;
  classId: string;
  academicPeriodId: string;

  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
};

// =====================================================
// INITIAL STATE
// =====================================================
const initialState: RegistrationFormState = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  studentEmail: "",

  schoolId: "",
  gradeId: "",
  classId: "",
  academicPeriodId: "",

  parentFirstName: "",
  parentLastName: "",
  parentEmail: "",
  parentPhone: "",
};

// =====================================================
// COMPONENT
// =====================================================
const StudentRegistrationForm = () => {
  const [form, setForm] = useState<RegistrationFormState>(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [registerStudent, { isLoading }] = useRegisterStudentMutation();

  // =====================================================
  // DROPDOWN DATA (RTK QUERY)
  // =====================================================
  const { data: schools = [] } = useGetRegistrationSchoolsQuery();

  const { data: grades = [] } = useGetSchoolGradesQuery(form.schoolId, {
    skip: !form.schoolId,
  });

  const { data: classes = [] } = useGetGradeClassesQuery(form.gradeId, {
    skip: !form.gradeId,
  });

  const { data: academicPeriods = [] } = useGetRegistrationAcademicPeriodsQuery();

  const update = (field: keyof RegistrationFormState, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =====================================================
  // SUBMIT HANDLER
  // =====================================================
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload: CreateStudentRequest = {
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender || undefined,
      dateOfBirth: form.dateOfBirth || undefined,
      studentEmail: form.studentEmail || undefined,
      schoolId: form.schoolId,
      classId: form.classId,
      academicPeriodId: form.academicPeriodId,
      parentFirstName: form.parentFirstName || undefined,
      parentLastName: form.parentLastName || undefined,
      parentEmail: form.parentEmail || undefined,
      parentPhone: form.parentPhone || undefined,
    };

    try {
      const response = await registerStudent(payload).unwrap();

      setSuccess(
        `Student registered successfully. Student Code: ${response.data.student.studentCode}`
      );
      toast.success("Student registered successfully");
      setForm(initialState);
    } catch (err: any) {
      setError(err?.data?.message ?? "Registration failed");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400 transition";

  const labelClass = "block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1";

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-md border border-gray-100">
      <form onSubmit={submit} className="space-y-6">

        {/* SECTION 1: STUDENT PRIMARY PERSONAL INFO */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Student Personal Details
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>First Name *</label>
              <input
                required
                className={inputClass}
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Last Name *</label>
              <input
                required
                className={inputClass}
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Student Email</label>
              <input
                className={inputClass}
                placeholder="student@school.com"
                type="email"
                value={form.studentEmail}
                onChange={(e) => update("studentEmail", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Gender</label>
              <select
                className={inputClass}
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Date of Birth</label>
              <input
                type="date"
                className={inputClass}
                value={form.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: INSTITUTIONAL ENROLLMENT ASSIGNMENT */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Academic Enrollment Info
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>School *</label>
              <select
                required
                className={inputClass}
                value={form.schoolId}
                onChange={(e) => {
                  update("schoolId", e.target.value);
                  update("gradeId", "");
                  update("classId", "");
                }}
              >
                <option value="">Select School</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Grade Target *</label>
              <select
                required
                className={inputClass}
                disabled={!form.schoolId}
                value={form.gradeId}
                onChange={(e) => {
                  update("gradeId", e.target.value);
                  update("classId", "");
                }}
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Class Cohort *</label>
              <select
                required
                className={inputClass}
                disabled={!form.gradeId}
                value={form.classId}
                onChange={(e) => update("classId", e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Academic Period *</label>
              <select
                required
                className={inputClass}
                value={form.academicPeriodId}
                onChange={(e) => update("academicPeriodId", e.target.value)}
              >
                <option value="">Select Academic Period</option>
                {academicPeriods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.academicYear} - {period.semester}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: GUARDIAN CONTACT DETAILS */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Primary Parent / Guardian Contact
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Parent First Name</label>
              <input
                className={inputClass}
                placeholder="Parent First Name"
                value={form.parentFirstName}
                onChange={(e) => update("parentFirstName", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Parent Last Name</label>
              <input
                className={inputClass}
                placeholder="Parent Last Name"
                value={form.parentLastName}
                onChange={(e) => update("parentLastName", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Parent Email</label>
              <input
                type="email"
                className={inputClass}
                placeholder="parent@example.com"
                value={form.parentEmail}
                onChange={(e) => update("parentEmail", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Parent Phone</label>
              <input
                type="tel"
                className={inputClass}
                placeholder="+1 (555) 000-0000"
                value={form.parentPhone}
                onChange={(e) => update("parentPhone", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* MESSAGES CONTEXT ALERTS */}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800">
            {success}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
            {error}
          </div>
        )}

        {/* SUBMIT EXECUTION TRIGGER */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}  
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition"
          >
            {isLoading ? "Registering..." : "Register Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;