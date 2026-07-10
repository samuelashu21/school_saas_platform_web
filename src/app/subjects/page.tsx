"use client";

import { useCreateCourseMutation, useGetCoursesQuery } from "@/app/state/api";

import { PlusCircleIcon, SearchIcon, GraduationCap } from "lucide-react";

import { useEffect, useState } from "react";

import Header from "@/app/(components)/Header";
import CreateCourseModal from "./CreateSubjectModal";

import { useAppDispatch, useAppSelector } from "@/app/redux";

import { setGlobalSearchTerm } from "@/app/state";

type Subject = {
  subjectId: string;

  name: string;

  code: string;

  credits: number;
};

type CourseFormData = {
  courseId: string;

  name: string;

  code: string;

  credits: number;
};

const CoursesPage = () => {
  const dispatch = useAppDispatch();

  const globalSearchTerm = useAppSelector(
    (state) => state.global.globalSearchTerm ?? "",
  );

  const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createError, setCreateError] = useState("");

  useEffect(() => {
    setSearchTerm(globalSearchTerm);
  }, [globalSearchTerm]);

  const {
    data: courses = [],

    isLoading,

    isError,
  } = useGetCoursesQuery(searchTerm || undefined);

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();

  const handleCreateCourse = async (courseData: CourseFormData) => {
    try {
      await createCourse(courseData).unwrap();

      setCreateError("");

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      setCreateError("Unable to create course. Course code may already exist.");
    }
  };

  if (isLoading) {
    return (
      <div
        className="
        py-5
        text-gray-500
        font-medium
      "
      >
        Loading academic catalog...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
        py-5
        text-center
        text-red-500
        font-semibold
      "
      >
        Failed loading course catalog.
      </div>
    );
  }

  return (
    <div className="w-full pb-5" data-testid="courses-page">
      <div className="mb-6">
        <div
          className="
          flex
          items-center
          bg-white
          border
          border-gray-200
          rounded-xl
          shadow-sm
          overflow-hidden
          "
        >
          <SearchIcon
            className="
            w-5
            h-5
            text-gray-400
            ml-4
            "
          />

          <input
            className="
            w-full
            py-3
            px-3
            outline-none
            text-sm
            text-gray-800
            "
            placeholder="
            Search courses or course codes...
            "
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;

              setSearchTerm(value);

              dispatch(setGlobalSearchTerm(value));
            }}
            data-testid="
              courses-search-input
            "
          />
        </div>
      </div>

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
        "
      >
        <Header
          name="
          Academic Course Catalog
          "
        />

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isCreating}
          className="
          flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2.5
          rounded-xl
          text-sm
          font-semibold
          "
          data-testid="
          open-create-course-modal
          "
        >
          <PlusCircleIcon className="w-4 h-4" />
          Add Course
        </button>
      </div>

      {createError && (
        <div
          className="
            mb-5
            bg-red-50
            border
            border-red-200
            text-red-600
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            "
        >
          {createError}
        </div>
      )}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
      >
        {courses.map((course: Course) => (
          <div
            key={course.courseId}
            className="
              bg-white
              border
              border-gray-100
              rounded-2xl
              shadow-sm
              p-5
              hover:shadow-md
              transition
              "
            data-testid="
              course-card
              "
          >
            <div
              className="
                flex
                justify-between
                items-center
                mb-4
                "
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                  "
              >
                <GraduationCap
                  className="
                    w-5
                    h-5
                    text-blue-600
                    "
                />
              </div>

              <span
                className="
                  text-xs
                  font-semibold
                  bg-slate-50
                  px-3
                  py-1
                  rounded-full
                  "
              >
                {course.credits} Credits
              </span>
            </div>

            <h3
              className="
                font-bold
                text-gray-800
                "
            >
              {course.name}
            </h3>

            <p
              className="
                text-sm
                text-blue-600
                mt-1
                "
            >
              {course.code}
            </p>

            <p
              className="
                text-xs
                text-gray-400
                mt-2
                "
            >
              ID: {course.courseId}
            </p>
          </div>
        ))}
      </div>

      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCourse}
      />
    </div>
  );
};

export default CoursesPage;
