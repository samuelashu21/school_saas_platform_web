"use client";

import { useState } from "react";

import { useGetTeachersQuery } from "@/app/state/module/teachers/teacherApi";
import { useGetSubjectsQuery } from "@/app/state/module/subjects/subjectApi";

import {
  useAssignSubjectMutation,
} from "@/app/state/module/teacherSubjects/teacherSubjectApi";


interface Props {
  onClose: () => void;
}


export default function AssignSubjectModal({ 
  onClose,
}: Props) {

  const [
    assignSubject,
    { isLoading },
  ] = useAssignSubjectMutation();


  const {
    data: teachers = [],
  } = useGetTeachersQuery();


  const {
    data: subjects = [],
  } = useGetSubjectsQuery();



  const [form, setForm] = useState({
    teacherId: "",
    subjectId: "",
  });



  const submit = async () => {

    if (!form.teacherId || !form.subjectId) {
      return;
    }


    try {

      await assignSubject({
        teacherId: form.teacherId,
        subjectId: form.subjectId,
      }).unwrap();


      onClose();


    } catch (error) {

      console.error(
        "Failed assigning subject:",
        error
      );

    }

  };



  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >

      <div
        className="
        bg-white
        rounded-xl
        p-6
        w-full
        max-w-md
        "
      >

        <h2
          className="
          text-xl
          font-bold
          mb-5
          "
        >
          Assign Subject
        </h2>



        {/* TEACHER SELECT */}

        <select

          className="
          border
          rounded
          p-3
          w-full
          mb-4
          "

          value={form.teacherId}

          onChange={(e) =>
            setForm({
              ...form,
              teacherId: e.target.value,
            })
          }

        >

          <option value="">
            Select Teacher
          </option>


          {teachers.map((teacher) => (

            <option
              key={teacher.id}
              value={teacher.id}
            >

              {teacher.account.name}
              {" "}
              ({teacher.employeeId})

            </option>

          ))}


        </select>




        {/* SUBJECT SELECT */}


        <select

          className="
          border
          rounded
          p-3
          w-full
          mb-5
          "

          value={form.subjectId}

          onChange={(e) =>
            setForm({
              ...form,
              subjectId: e.target.value,
            })
          }

        >

          <option value="">
            Select Subject
          </option>



          {subjects.map((subject) => (

            <option

              key={subject.id}

              value={subject.id}

            >

              {subject.name}
              {" "}
              ({subject.code})

            </option>

          ))}


        </select>




        <div
          className="
          flex
          justify-end
          gap-3
          "
        >


          <button

            onClick={onClose}

            className="
            px-4
            py-2
            rounded
            bg-gray-200
            "

          >

            Cancel

          </button>



          <button

            disabled={isLoading}

            onClick={submit}

            className="
            px-4
            py-2
            rounded
            bg-blue-600
            text-white
            hover:bg-blue-700
            disabled:opacity-50
            "

          >

            {isLoading
              ? "Assigning..."
              : "Assign"}

          </button>


        </div>


      </div>


    </div>

  );

}