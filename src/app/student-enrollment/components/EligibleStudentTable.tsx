"use client";


interface Props {

    students?: any[];

    onSelect: (
        student: any
    ) => void;

}



const EligibleStudentTable = ({
    students = [],
    onSelect

}: Props) => {


    return (

        <div className="
            bg-white
            rounded-xl
            border
            overflow-hidden
        ">


            <table className="
                w-full
                text-sm
            ">


                <thead className="
                    bg-gray-50
                ">


                    <tr>


                        <th className="p-3 text-left">
                            Student
                        </th>


                        <th className="p-3">
                            Code
                        </th>


                        <th className="p-3">
                            Status
                        </th>


                        <th></th>


                    </tr>


                </thead>



                <tbody>


                    {
                        students.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan={4}
                                        className="
                                        text-center
                                        py-6
                                        text-gray-400
                                    "
                                    >

                                        No eligible students found

                                    </td>


                                </tr>

                            )

                            :

                            students.map(student => (


                                <tr

                                    key={student.id}

                                    className="
                                    border-t
                                    hover:bg-gray-50
                                "

                                >


                                    <td className="p-3">


                                        <div className="
                                        font-semibold
                                    ">


                                            {
                                                student.account?.firstName
                                                ??
                                                student.firstName
                                            }


                                            {" "}


                                            {
                                                student.account?.lastName
                                                ??
                                                student.lastName
                                            }


                                        </div>


                                    </td>



                                    <td className="p-3">

                                        {student.studentCode}

                                    </td>



                                    <td className="p-3">


                                        <span className="
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-green-100
                                        text-green-700
                                        text-xs
                                    ">

                                            {
                                                student.registrationStatus
                                            }

                                        </span>


                                    </td>




                                    <td className="p-3">


                                        <button

                                            type="button"

                                            onClick={() =>
                                                onSelect(student)
                                            }

                                            className="
                                            text-blue-600
                                            font-medium
                                        "

                                        >

                                            Select

                                        </button>


                                    </td>


                                </tr>


                            ))
                    }



                </tbody>


            </table>


        </div>


    );

};


export default EligibleStudentTable;