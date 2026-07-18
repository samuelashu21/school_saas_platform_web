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


  const [form, setForm] =
    useState<RegistrationFormState>(initialState);



  const [error, setError] =
    useState("");



  const [success, setSuccess] =
    useState("");



  const [
    registerStudent,
    { isLoading },
  ] =
    useRegisterStudentMutation();




  // =====================================================
  // DROPDOWN DATA
  // =====================================================


  const {
    data: schools = []
  } =
    useGetRegistrationSchoolsQuery();



  const {
    data: grades = []
  } =
    useGetSchoolGradesQuery(
      form.schoolId,
      {
        skip: !form.schoolId,
      }
    );
 


  const {
    data: classes = []
  } =
    useGetGradeClassesQuery(
      form.gradeId,
      {
        skip: !form.gradeId,
      }
    );



  const {
    data: academicPeriods = []
  } =
    useGetRegistrationAcademicPeriodsQuery();






  const update = (
    field: keyof RegistrationFormState,
    value: string
  ) => {


    setForm(previous => ({

      ...previous,

      [field]: value,

    }));

  };






  // =====================================================
  // SUBMIT
  // =====================================================


  const submit = async (
    e: FormEvent
  ) => {


    e.preventDefault();


    setError("");

    setSuccess("");



    const payload: CreateStudentRequest = {


      firstName: form.firstName,


      lastName: form.lastName,


      gender:
        form.gender || undefined,



      dateOfBirth:
        form.dateOfBirth || undefined,



      studentEmail:
        form.studentEmail || undefined,



      schoolId:
        form.schoolId,



      classId:
        form.classId,



      academicPeriodId:
        form.academicPeriodId,



      parentFirstName:
        form.parentFirstName || undefined,



      parentLastName:
        form.parentLastName || undefined,



      parentEmail:
        form.parentEmail || undefined,



      parentPhone:
        form.parentPhone || undefined,

    };



    try {


      const response =
        await registerStudent(payload).unwrap();



      setSuccess(
        `Student registered successfully. Student Code: ${response.data.student.studentCode}`
      );



      toast.success(
        "Student registered successfully"
      );



      setForm(initialState);



    } catch (err: any) {


      setError(
        err?.data?.message ??
        "Registration failed"
      );


    }


  };





  const inputClass =
    "w-full rounded-lg border px-3 py-2";






  return (

    <div className="bg-white rounded-xl shadow p-6">


      <form
        onSubmit={submit}
        className="space-y-5"
      >


        <div className="grid md:grid-cols-2 gap-4">



          {/* FIRST NAME */}

          <input

            className={inputClass}

            placeholder="First Name"

            value={form.firstName}

            onChange={
              e => update(
                "firstName",
                e.target.value
              )
            }

          />





          {/* LAST NAME */}


          <input

            className={inputClass}

            placeholder="Last Name"

            value={form.lastName}

            onChange={
              e => update(
                "lastName",
                e.target.value
              )
            }

          />





          {/* EMAIL */}


          <input

            className={inputClass}

            placeholder="Student Email"

            type="email"

            value={form.studentEmail}

            onChange={
              e => update(
                "studentEmail",
                e.target.value
              )
            }

          />






          {/* GENDER */}


          <select

            className={inputClass}

            value={form.gender}

            onChange={
              e => update(
                "gender",
                e.target.value
              )
            }

          >

            <option value="">
              Select Gender
            </option>


            <option value="MALE">
              Male
            </option>


            <option value="FEMALE">
              Female
            </option>


          </select>







          {/* DOB */}


          <input

            type="date"

            className={inputClass}

            value={form.dateOfBirth}

            onChange={
              e => update(
                "dateOfBirth",
                e.target.value
              )
            }

          />







          {/* SCHOOL */}


          <select

            className={inputClass}

            value={form.schoolId}

            onChange={e => {

              update(
                "schoolId",
                e.target.value
              );


              update(
                "gradeId",
                ""
              );


              update(
                "classId",
                ""
              );


            }}

          >


            <option value="">
              Select School
            </option>


            {schools.map(school => (

              <option
                key={school.id}
                value={school.id}
              >

                {school.name}

              </option>

            ))}


          </select>







          {/* GRADE */}


          <select

            className={inputClass}

            disabled={!form.schoolId}

            value={form.gradeId}

            onChange={e => {


              update(
                "gradeId",
                e.target.value
              );


              update(
                "classId",
                ""
              );


            }}

          >


            <option value="">
              Select Grade
            </option>


            {grades.map(grade => (

              <option
                key={grade.id}
                value={grade.id}
              >

                {grade.name}

              </option>

            ))}


          </select>







          {/* CLASS */}


          <select

            className={inputClass}

            disabled={!form.gradeId}

            value={form.classId}

            onChange={
              e => update(
                "classId",
                e.target.value
              )
            }

          >


            <option value="">
              Select Class
            </option>


            {classes.map(cls => (

              <option
                key={cls.id}
                value={cls.id}
              >

                {cls.name}

              </option>

            ))}


          </select>







          {/* ACADEMIC PERIOD */}


          <select

            className={inputClass}

            value={form.academicPeriodId}

            onChange={
              e => update(
                "academicPeriodId",
                e.target.value
              )
            }

          >


            <option value="">
              Select Academic Period
            </option>


            {academicPeriods.map(period => (

              <option
                key={period.id}
                value={period.id}
              >

                {period.academicYear} -
                {period.semester}

              </option>

            ))}


          </select>






          {/* PARENT */}


          <input
            className={inputClass}
            placeholder="Parent First Name"
            value={form.parentFirstName}
            onChange={
              e => update(
                "parentFirstName",
                e.target.value
              )
            }
          />



          <input
            className={inputClass}
            placeholder="Parent Last Name"
            value={form.parentLastName}
            onChange={
              e => update(
                "parentLastName",
                e.target.value
              )
            }
          />



          <input
            className={inputClass}
            placeholder="Parent Email"
            value={form.parentEmail}
            onChange={
              e => update(
                "parentEmail",
                e.target.value
              )
            }
          />



          <input
            className={inputClass}
            placeholder="Parent Phone"
            value={form.parentPhone}
            onChange={
              e => update(
                "parentPhone",
                e.target.value
              )
            }
          />


        </div>





        {success && (

          <div className="bg-green-100 text-green-700 p-3 rounded">

            {success}

          </div>

        )}






        {error && (

          <div className="bg-red-100 text-red-700 p-3 rounded">

            {error}

          </div>

        )}







        <button

          disabled={isLoading}

          className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          {
            isLoading
              ?
              "Registering..."
              :
              "Register Student"
          }


        </button>



      </form>


    </div>

  );

};


export default StudentRegistrationForm;