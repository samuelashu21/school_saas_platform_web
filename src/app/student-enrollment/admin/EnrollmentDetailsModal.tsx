"use client";

import {
    X,
    UserRound,
    School,
    CalendarDays,
    UserCheck,
    RotateCcw,
} from "lucide-react";


import EnrollmentStatusBadge from "../components/EnrollmentStatusBadge";


import type {
    Enrollment,
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";





interface Props {


    enrollment: Enrollment;


    onClose: () => void;



    onTransfer?: (
        enrollment: Enrollment
    ) => void;



    onPromote?: (
        enrollment: Enrollment
    ) => void;



    onWithdraw?: (
        enrollment: Enrollment
    ) => void;



    onReadmit?: (
        enrollment: Enrollment
    ) => void;


}








const EnrollmentDetailsModal = ({

    enrollment,

    onClose,

    onTransfer,

    onPromote,

    onWithdraw,

    onReadmit,

}: Props) => {



    const student =
        enrollment.student;



    const parent =
        student?.parent;





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
                shadow-xl
                w-full
                max-w-3xl
                max-h-[90vh]
                overflow-y-auto
                p-6
                "

            >





                {/* HEADER */}


                <div

                    className="
                    flex
                    justify-between
                    items-center
                    mb-6
                    "

                >



                    <h2 className="
                    text-xl
                    font-bold
                    text-gray-800
                    ">

                        Enrollment Details

                    </h2>




                    <button

                        onClick={onClose}

                        className="
                        p-2
                        rounded-lg
                        hover:bg-gray-100
                        "

                    >

                        <X size={20} />

                    </button>



                </div>









                {/* STUDENT INFORMATION */}


                <section

                    className="
                    border
                    rounded-xl
                    p-4
                    mb-4
                    "

                >



                    <h3 className="
                    font-semibold
                    flex
                    gap-2
                    items-center
                    mb-4
                    ">


                        <UserRound
                            className="text-blue-600"
                        />


                        Student Information


                    </h3>





                    <div className="
                    grid
                    md:grid-cols-2
                    gap-3
                    text-sm
                    ">


                        <p>

                            <strong>Name:</strong>{" "}

                            {student?.firstName || "-"}

                            {" "}

                            {student?.lastName || ""}

                        </p>



                        <p>

                            <strong>Student Code:</strong>{" "}

                            {student?.studentCode || "-"}

                        </p>




                        <p>

                            <strong>Gender:</strong>{" "}

                            {student?.gender || "-"}

                        </p>




                        <p>

                            <strong>Date Of Birth:</strong>{" "}

                            {

                                student?.dateOfBirth

                                    ?

                                    new Date(
                                        student.dateOfBirth
                                    )
                                        .toLocaleDateString()

                                    :

                                    "-"

                            }


                        </p>


                    </div>



                </section>









                {/* PARENT */}


                <section

                    className="
                    border
                    rounded-xl
                    p-4
                    mb-4
                    "

                >



                    <h3 className="
                    font-semibold
                    flex
                    gap-2
                    items-center
                    mb-3
                    ">


                        <UserCheck

                            className="text-green-600"

                        />


                        Parent Information


                    </h3>






                    {

                        parent

                            ?


                            <div className="
                        text-sm
                        space-y-2
                        ">



                                <p>

                                    <strong>Name:</strong>{" "}

                                    {parent.account?.firstName}

                                    {" "}

                                    {parent.account?.lastName}

                                </p>



                                <p>

                                    <strong>Email:</strong>{" "}

                                    {parent.account?.email || "-"}

                                </p>




                                <p>

                                    <strong>Phone:</strong>{" "}

                                    {parent.phone || "-"}

                                </p>



                            </div>


                            :


                            <p className="
                        text-gray-400
                        text-sm
                        ">

                                No parent assigned

                            </p>


                    }



                </section>









                {/* ACADEMIC PLACEMENT */}


                <section

                    className="
                    border
                    rounded-xl
                    p-4
                    mb-4
                    "

                >



                    <h3 className="
                    font-semibold
                    flex
                    gap-2
                    items-center
                    mb-3
                    ">



                        <School

                            className="text-purple-600"

                        />


                        Academic Placement


                    </h3>







                    <div className="
                    grid
                    md:grid-cols-2
                    gap-3
                    text-sm
                    ">



                        <p>

                            <strong>School:</strong>{" "}

                            {enrollment.school?.name || "-"}

                        </p>




                        <p>

                            <strong>Class:</strong>{" "}

                            {enrollment.class?.name || "-"}

                        </p>





                        <p>

                            <strong>Grade:</strong>{" "}

                            {enrollment.class?.gradeLevel?.name || "-"}

                        </p>





                        <p>

                            <strong>Academic Period:</strong>{" "}

                            {enrollment.academicPeriod?.academicYear}

                            {" - "}

                            {enrollment.academicPeriod?.semester}


                        </p>




                    </div>




                </section>









                {/* ENROLLMENT INFORMATION */}


                <section

                    className="
                    border
                    rounded-xl
                    p-4
                    "

                >


                    <h3 className="
                    font-semibold
                    flex
                    gap-2
                    items-center
                    mb-4
                    ">



                        <CalendarDays

                            className="text-orange-600"

                        />



                        Enrollment Information


                    </h3>







                    <div className="
                    grid
                    md:grid-cols-2
                    gap-4
                    text-sm
                    ">



                        <div>

                            <strong>Type</strong>

                            <p className="font-semibold">

                                {enrollment.enrollmentType}

                            </p>

                        </div>





                        <div>

                            <strong>Status</strong>


                            <div className="mt-1">

                                <EnrollmentStatusBadge

                                    status={
                                        enrollment.status
                                    }

                                />


                            </div>


                        </div>






                        <div>


                            <strong>Enrolled Date</strong>


                            <p>


                                {

                                    enrollment.enrolledAt

                                        ?

                                        new Date(
                                            enrollment.enrolledAt
                                        )
                                            .toLocaleDateString()

                                        :

                                        "-"

                                }


                            </p>


                        </div>







                        <div>


                            <strong>Created Date</strong>


                            <p>


                                {

                                    enrollment.createdAt

                                        ?

                                        new Date(
                                            enrollment.createdAt
                                        )
                                            .toLocaleDateString()

                                        :

                                        "-"

                                }


                            </p>


                        </div>





                    </div>



                </section>









                {/* ACTIONS */}


                <div

                    className="
                    flex
                    flex-wrap
                    gap-3
                    mt-6
                    "

                >




                    <button

                        onClick={() =>
                            onTransfer?.(enrollment)
                        }

                        className="
                        flex-1
                        border
                        rounded-xl
                        py-3
                        "

                    >

                        Transfer


                    </button>






                    <button

                        onClick={() =>
                            onPromote?.(enrollment)
                        }

                        className="
                        flex-1
                        bg-blue-600
                        text-white
                        rounded-xl
                        py-3
                        "

                    >

                        Promote


                    </button>







                    <button

                        onClick={() =>
                            onWithdraw?.(enrollment)
                        }

                        className="
                        flex-1
                        bg-red-600
                        text-white
                        rounded-xl
                        py-3
                        "

                    >

                        Withdraw


                    </button>







                    {

                        enrollment.status === "WITHDRAWN"

                        &&


                        <button

                            onClick={() =>
                                onReadmit?.(enrollment)
                            }

                            className="
                            flex-1
                            bg-green-600
                            text-white
                            rounded-xl
                            py-3
                            flex
                            justify-center
                            gap-2
                            "

                        >

                            <RotateCcw size={18} />

                            Readmit


                        </button>


                    }



                </div>






            </div>



        </div>


    );


};



export default EnrollmentDetailsModal;