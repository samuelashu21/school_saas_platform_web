"use client";

import { useState } from "react";

import { useCreateEnrollmentMutation } from "@/app/state/module/studentEnrollment/studentEnrollmentApi";

import EnrollmentTypeSelector from "./components/EnrollmentTypeSelector";
import StudentInformationFields from "./components/StudentInformationFields";
import ParentInformationFields from "./components/ParentInformationFields";
import AcademicSelectionFields from "./components/AcademicSelectionFields";

interface Props {
  onSuccess: () => void;
}

const StudentEnrollmentForm = ({ onSuccess }: Props) => {
  const [createEnrollment] = useCreateEnrollmentMutation();

  const [form, setForm] = useState<any>({
    enrollmentType: "NEW_STUDENT",

    studentId: "",

    firstName: "",

    lastName: "",

    gender: "",

    dateOfBirth: "",

    parentName: "",

    parentPhone: "",

    schoolId: "",

    classId: "",

    academicYear: "2026",

    semester: "SEMESTER_1",
  });


  const update = (data:any)=>{
    setForm((prev:any)=>({
      ...prev,
      ...data
    }));
  };


  const submit = async(e:any)=>{
    e.preventDefault();

    try{

      await createEnrollment(form).unwrap();

      onSuccess();

    }catch(error:any){

      console.error(
        "Enrollment Error:",
        error
      );

      alert(
        error?.data?.message ||
        "Enrollment failed"
      );

    }
  };


  return (

    <form
      onSubmit={submit}
      className="
      max-w-3xl
      mx-auto
      bg-white
      p-6
      rounded-xl
      shadow
      space-y-6
      "
    >

      <h1
      className="
      text-xl
      font-bold
      "
      >
        Student Enrollment
      </h1>


      <EnrollmentTypeSelector
        value={form.enrollmentType}
        onChange={(value)=>{

          update({
            enrollmentType:value
          });

        }}
      />


      {
        form.enrollmentType !== "NEW_STUDENT" && (

          <input
          className="input"
          placeholder="Existing Student ID"
          value={form.studentId}
          onChange={(e)=>
            update({
              studentId:e.target.value
            })
          }
          />

        )
      }


      {
        form.enrollmentType === "NEW_STUDENT" && (

          <StudentInformationFields
            form={form}
            update={update}
          />

        )
      }



      <ParentInformationFields
        form={form}
        update={update}
      />



      <AcademicSelectionFields
        form={form}
        update={update}
      />



      <button
      type="submit"
      className="
      bg-blue-600
      text-white
      px-5
      py-3
      rounded-lg
      "
      >
        Submit Enrollment
      </button>


    </form>

  );
};


export default StudentEnrollmentForm;