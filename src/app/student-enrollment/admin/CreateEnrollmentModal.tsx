"use client";

import { useState } from "react";

import {
    X,
    Loader2,
    Search
} from "lucide-react";


import {
    useCreateEnrollmentMutation,
    useGetEligibleStudentsQuery
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



// =================================
// TYPES
// =================================

type EnrollmentType =
    | "NEW_STUDENT"
    | "TRANSFER"
    | "PROMOTION"
    | "REPEAT"
    | "READMISSION";



interface CreateEnrollmentForm {

    studentId: string;

    schoolId: string;

    classId: string;

    academicPeriodId: string;

    enrollmentType: EnrollmentType;

}




interface Props {

    onClose: () => void;

}







const CreateEnrollmentModal = ({
    onClose

}: Props) => {



    const {
        data: eligibleStudents,
        isLoading: loadingStudents

    } = useGetEligibleStudentsQuery();




    const [
        createEnrollment,
        {
            isLoading
        }

    ] = useCreateEnrollmentMutation();




    const [
        search,
        setSearch

    ] = useState("");





    const [
        form,
        setForm

    ] = useState<CreateEnrollmentForm>({

        studentId: "",

        schoolId: "",

        classId: "",

        academicPeriodId: "",

        enrollmentType: "NEW_STUDENT"

    });






    const updateField = (

        key: keyof CreateEnrollmentForm,

        value: string

    ) => {


        setForm(prev => ({

            ...prev,

            [key]: value

        }));

    };








    const students =
        eligibleStudents?.data?.filter(student =>

            `${student.firstName} ${student.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase())

        ) || [];









    const submit = async () => {


        try {


            if (!form.studentId) {

                alert(
                    "Please select student"
                );

                return;

            }



            await createEnrollment(
                form
            ).unwrap();




            alert(
                "Enrollment created successfully"
            );



            onClose();



        }

        catch (error: any) {


            alert(

                error?.data?.message ||

                "Failed creating enrollment"

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
            p-4
            "

        >


            <div

                className="
                bg-white
                rounded-2xl
                w-full
                max-w-2xl
                p-6
                shadow-xl
                "

            >




                <div

                    className="
                    flex
                    justify-between
                    items-center
                    mb-6
                    "

                >


                    <h2 className="text-xl font-bold">

                        Create Student Enrollment

                    </h2>



                    <button onClick={onClose}>

                        <X />

                    </button>


                </div>









                {/* STUDENT SELECTION */}

                <div className="mb-5">


                    <label className="text-sm font-medium">

                        Select Registered Student

                    </label>



                    <div

                        className="
                        flex
                        items-center
                        border
                        rounded-xl
                        mt-2
                        px-3
                        "

                    >


                        <Search
                            size={18}
                            className="text-gray-400"
                        />



                        <input

                            value={search}

                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }

                            placeholder="Search student..."

                            className="
                            p-3
                            outline-none
                            w-full
                            "

                        />


                    </div>







                    <div

                        className="
                        mt-3
                        border
                        rounded-xl
                        max-h-48
                        overflow-y-auto
                        "

                    >


                        {

                            loadingStudents ?


                                <p className="p-4">

                                    Loading students...

                                </p>



                                :


                                students.length === 0 ?


                                    <p className="p-4 text-gray-400">

                                        No eligible students

                                    </p>



                                    :


                                    students.map(student => (


                                        <button

                                            key={student.id}


                                            onClick={() =>

                                                updateField(
                                                    "studentId",
                                                    student.id
                                                )

                                            }


                                            className={`

                                w-full
                                text-left
                                p-3
                                border-b
                                hover:bg-gray-50

                                ${form.studentId === student.id
                                                    ?
                                                    "bg-blue-50"
                                                    :
                                                    ""
                                                }

                                `}


                                        >


                                            <p className="font-semibold">

                                                {student.firstName}

                                                {" "}

                                                {student.lastName}

                                            </p>



                                            <p className="text-xs text-gray-500">

                                                {student.studentCode}

                                            </p>



                                        </button>


                                    ))


                        }


                    </div>


                </div>









                {/* SCHOOL */}

                <input

                    value={form.schoolId}

                    onChange={(e) =>

                        updateField(
                            "schoolId",
                            e.target.value
                        )

                    }

                    placeholder="School ID"

                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    mb-3
                    "

                />









                {/* CLASS */}

                <input

                    value={form.classId}

                    onChange={(e) =>

                        updateField(
                            "classId",
                            e.target.value
                        )

                    }

                    placeholder="Class ID"

                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    mb-3
                    "

                />









                {/* ACADEMIC PERIOD */}

                <input

                    value={form.academicPeriodId}

                    onChange={(e) =>

                        updateField(
                            "academicPeriodId",
                            e.target.value
                        )

                    }

                    placeholder="Academic Period ID"

                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    mb-3
                    "

                />









                {/* TYPE */}

                <select

                    value={
                        form.enrollmentType
                    }

                    onChange={(e) =>

                        updateField(
                            "enrollmentType",
                            e.target.value
                        )

                    }


                    className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    mb-5
                    "

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









                <button


                    disabled={isLoading}


                    onClick={submit}


                    className="
                    w-full
                    bg-blue-600
                    text-white
                    rounded-xl
                    py-3
                    flex
                    justify-center
                    gap-2
                    font-semibold
                    "

                >



                    {

                        isLoading &&

                        <Loader2
                            className="animate-spin"
                        />

                    }



                    Create Enrollment



                </button>






            </div>


        </div>


    );


};



export default CreateEnrollmentModal;