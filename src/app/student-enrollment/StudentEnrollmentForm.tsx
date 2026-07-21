"use client";

import { useState } from "react";

import AcademicSelectionFields from "./components/AcademicSelectionFields";

import {
  useCreateEnrollmentMutation,
  Student,
  EnrollmentClass,
  EnrollmentType,
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";

import {
  RegistrationAcademicPeriod,
} from "@/app/state/module/studentRegistration/studentRegistrationApi";

interface Props {
  onSuccess: () => void;

  students: Student[];

  academicPeriods: RegistrationAcademicPeriod[];

  classes: EnrollmentClass[];
}

const StudentEnrollmentForm = ({
  onSuccess,
  students,
  academicPeriods,
  classes,
}: Props) => {
  const [createEnrollment, { isLoading }] =
    useCreateEnrollmentMutation();

  const [form, setForm] = useState<{
    studentId: string;
    schoolId: string;
    academicPeriodId: string;
    classId: string;
    enrollmentType: EnrollmentType;
  }>({
    studentId: "",
    schoolId: "",
    academicPeriodId: "",
    classId: "",
    enrollmentType: "NEW_STUDENT",
  });

  const updateField = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };

      // Automatically fill schoolId from selected student
      if (key === "studentId") {
        const student = students.find((s) => s.id === value);

        updated.schoolId = student?.schoolId ?? "";
      }

      return updated;
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.studentId ||
      !form.schoolId ||
      !form.classId ||
      !form.academicPeriodId
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      await createEnrollment(form).unwrap();

      alert("Enrollment created successfully.");

      onSuccess();
    } catch (error: any) {
      console.error(error);

      alert(
        error?.data?.message ??
          "Failed to create enrollment."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Student */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Student
        </label>

        <select
          value={form.studentId}
          onChange={(e) =>
            updateField("studentId", e.target.value)
          }
          className="w-full border rounded-xl p-3"
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.studentCode} — {student.firstName}{" "}
              {student.lastName}
            </option>
          ))}
        </select>
      </div>

      <AcademicSelectionFields
        form={form}
        updateField={(key, value) =>
          updateField(key as keyof typeof form, value)
        }
        academicPeriods={academicPeriods}
        classes={classes}
      />

      {/* Enrollment Type */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Enrollment Type
        </label>

        <select
          value={form.enrollmentType}
          onChange={(e) =>
            updateField(
              "enrollmentType",
              e.target.value as EnrollmentType
            )
          }
          className="w-full border rounded-xl p-3"
        >
          <option value="NEW_STUDENT">
            New Student
          </option>

          <option value="TRANSFER">
            Transfer
          </option>

          <option value="PROMOTION">
            Promotion
          </option>

          <option value="REPEAT">
            Repeat
          </option>

          <option value="READMISSION">
            Readmission
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading
          ? "Creating Enrollment..."
          : "Create Enrollment"}
      </button>
    </form>
  );
};

export default StudentEnrollmentForm;