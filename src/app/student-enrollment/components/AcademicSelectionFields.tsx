"use client";

import { useGetSchoolsQuery } from "@/app/state/module/schools/schoolApi";

interface Props {
  form: any; 
  update: (data: any) => void;
}

export default function AcademicSelectionFields({
  form,
  update,
}: Props) {

  const {
    data: schools = [],
    isLoading,
  } = useGetSchoolsQuery();


  return (
    <div className="space-y-4">

      <h2 className="font-semibold">
        Academic Information
      </h2>


      {/* SCHOOL SELECT */}

      <select
        className="input"
        value={form.schoolId}
        onChange={(e) =>
          update({
            schoolId: e.target.value,
          })
        }
      >

        <option value="">
          Select School
        </option>


        {isLoading && (
          <option>
            Loading schools...
          </option>
        )}


        {schools.map((school) => (
          <option
            key={school.id}
            value={school.id}
          >
            {school.name}
          </option>
        ))}


      </select>



      {/* CLASS ID */}

      <input
        className="input"
        placeholder="Class ID"
        value={form.classId}
        onChange={(e) =>
          update({
            classId: e.target.value,
          })
        }
      />



      {/* YEAR */}

      <input
        className="input"
        placeholder="Academic Year"
        value={form.academicYear}
        onChange={(e) =>
          update({
            academicYear: e.target.value,
          })
        }
      />



      {/* SEMESTER */}

      <select
        className="input"
        value={form.semester}
        onChange={(e) =>
          update({
            semester: e.target.value,
          })
        }
      >

        <option value="SEMESTER_1">
          Semester 1
        </option>


        <option value="SEMESTER_2">
          Semester 2
        </option>


      </select>


    </div>
  );
}