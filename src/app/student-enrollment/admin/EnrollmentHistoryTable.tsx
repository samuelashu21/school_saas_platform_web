"use client";

import {
    CalendarDays,
    History,
} from "lucide-react";


import EnrollmentStatusBadge from "../components/EnrollmentStatusBadge";





interface Props {

    enrollments: any[];

}







const EnrollmentHistoryTable = ({
    enrollments,

}: Props) => {



    return (

        <div

            className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-x-auto
            "

        >



            <table

                className="
                w-full
                text-sm
                "

            >




                <thead

                    className="
                    bg-gray-50
                    "

                >

                    <tr>


                        <th className="
                        p-4
                        text-left
                        "

                        >

                            <div className="
                            flex
                            items-center
                            gap-2
                            ">

                                <History size={16} />

                                Academic Period

                            </div>


                        </th>




                        <th className="
                        p-4
                        text-left
                        "

                        >

                            Class

                        </th>





                        <th className="
                        p-4
                        text-left
                        "

                        >

                            Type

                        </th>





                        <th className="
                        p-4
                        text-left
                        "

                        >

                            Status

                        </th>





                        <th className="
                        p-4
                        text-left
                        "

                        >

                            Enrolled Date

                        </th>





                        <th className="
                        p-4
                        text-left
                        "

                        >

                            Left Date

                        </th>





                        <th className="
                        p-4
                        text-left
                        "

                        >

                            Remarks

                        </th>



                    </tr>


                </thead>









                <tbody>



                    {

                        enrollments?.length === 0

                            ?


                            (

                                <tr>


                                    <td

                                        colSpan={7}

                                        className="
                                    text-center
                                    py-8
                                    text-gray-400
                                    "

                                    >


                                        No enrollment history found.


                                    </td>



                                </tr>


                            )



                            :





                            enrollments?.map((item) => (


                                <tr


                                    key={item.id}


                                    className="
                                border-t
                                hover:bg-gray-50
                                transition
                                "


                                >






                                    {/* Academic Period */}


                                    <td className="p-4">


                                        <div className="
                                    flex
                                    items-center
                                    gap-2
                                    ">


                                            <CalendarDays

                                                size={16}

                                                className="
                                            text-blue-600
                                            "

                                            />



                                            <div>


                                                <p className="
                                            font-medium
                                            "

                                                >

                                                    {
                                                        item.academicPeriod
                                                            ?.academicYear
                                                        ||
                                                        "-"
                                                    }


                                                </p>




                                                <p className="
                                            text-xs
                                            text-gray-500
                                            "

                                                >

                                                    {
                                                        item.academicPeriod
                                                            ?.semester
                                                        ||
                                                        "-"
                                                    }


                                                </p>



                                            </div>



                                        </div>



                                    </td>









                                    {/* Class */}


                                    <td className="p-4">


                                        <div>


                                            <p className="
                                        font-medium
                                        "

                                            >

                                                {
                                                    item.class?.name
                                                    ||
                                                    "-"
                                                }


                                            </p>




                                            <p className="
                                        text-xs
                                        text-gray-500
                                        "

                                            >

                                                {
                                                    item.class
                                                        ?.gradeLevel
                                                        ?.name
                                                    ||
                                                    "-"
                                                }


                                            </p>



                                        </div>


                                    </td>









                                    {/* Type */}


                                    <td className="p-4">


                                        <span

                                            className="
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-blue-50
                                        text-blue-600
                                        text-xs
                                        font-semibold
                                        "

                                        >


                                            {
                                                item.enrollmentType
                                                    ?.replace(
                                                        "_",
                                                        " "
                                                    )
                                            }


                                        </span>



                                    </td>









                                    {/* Status */}


                                    <td className="p-4">


                                        <EnrollmentStatusBadge

                                            status={
                                                item.status
                                            }

                                        />


                                    </td>









                                    {/* Enrolled Date */}


                                    <td className="p-4">


                                        {

                                            item.enrolledAt

                                                ?


                                                new Date(
                                                    item.enrolledAt
                                                )
                                                    .toLocaleDateString()


                                                :

                                                "-"


                                        }


                                    </td>









                                    {/* Left Date */}


                                    <td className="p-4">


                                        {

                                            item.leftAt

                                                ?


                                                new Date(
                                                    item.leftAt
                                                )
                                                    .toLocaleDateString()


                                                :

                                                "-"


                                        }


                                    </td>









                                    {/* Remarks */}


                                    <td className="p-4">


                                        {

                                            item.remarks

                                            ||

                                            "-"


                                        }


                                    </td>





                                </tr>



                            ))



                    }



                </tbody>





            </table>





        </div>


    );


};





export default EnrollmentHistoryTable;