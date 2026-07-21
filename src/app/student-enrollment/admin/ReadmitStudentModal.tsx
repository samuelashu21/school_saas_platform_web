"use client";

import {
    X,
    Loader2,
    UserCheck,
} from "lucide-react";


import {
    useReadmitStudentMutation,
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";


import {
    useState,
} from "react";







interface Props {

    enrollment: any;

    onClose: () => void;

}








const ReadmitStudentModal = ({

    enrollment,

    onClose,

}: Props) => {



    const [

        readmitStudent,

        {
            isLoading,
        }

    ] = useReadmitStudentMutation();









    const [form, setForm] = useState({

        academicPeriodId: "",

    });









    const updateField = (

        key: string,

        value: string

    ) => {


        setForm(prev => ({

            ...prev,

            [key]: value,

        }));


    };









    const submit = async () => {



        try {



            if (
                !form.academicPeriodId
            ) {


                alert(
                    "Academic period is required"
                );


                return;


            }







            await readmitStudent({

                id: enrollment.id,


                body: {

                    academicPeriodId:
                        form.academicPeriodId,

                },


            }).unwrap();








            alert(
                "Student readmitted successfully"
            );



            onClose();






        }

        catch (error: any) {



            console.error(error);



            alert(

                error?.data?.message ||

                "Readmission failed"

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
                shadow-xl
                w-full
                max-w-lg
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




                    <div className="
                    flex
                    items-center
                    gap-2
                    ">


                        <UserCheck

                            className="
                            text-green-600
                            "

                        />



                        <h2 className="
                        text-xl
                        font-semibold
                        ">


                            Readmit Student


                        </h2>


                    </div>







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













                <div className="
                space-y-4
                ">









                    {/* STUDENT */}



                    <div>


                        <label className="
                        text-sm
                        text-gray-600
                        ">


                            Student


                        </label>




                        <input


                            disabled


                            value={

                                `${enrollment.student
                                    ?.firstName
                                ||

                                ""

                                }

                                ${enrollment.student
                                    ?.lastName
                                ||

                                ""

                                }`

                            }



                            className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            bg-gray-100
                            "

                        />


                    </div>









                    {/* PREVIOUS CLASS */}



                    <div>


                        <label className="
                        text-sm
                        text-gray-600
                        ">


                            Previous Class


                        </label>




                        <input


                            disabled


                            value={

                                enrollment.class
                                    ?.name

                                ||

                                "-"

                            }



                            className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            bg-gray-100
                            "

                        />


                    </div>









                    {/* PREVIOUS PERIOD */}



                    <div>


                        <label className="
                        text-sm
                        text-gray-600
                        ">


                            Previous Academic Period


                        </label>




                        <input


                            disabled


                            value={

                                `${enrollment.academicPeriod
                                    ?.academicYear
                                ||

                                ""

                                }

                                -

                                ${enrollment.academicPeriod
                                    ?.semester
                                ||

                                ""

                                }`

                            }



                            className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            bg-gray-100
                            "

                        />


                    </div>









                    {/* NEW ACADEMIC PERIOD */}



                    <div>


                        <label className="
                        text-sm
                        text-gray-600
                        ">


                            New Academic Period ID


                        </label>




                        <input



                            value={
                                form.academicPeriodId
                            }



                            onChange={(e) =>

                                updateField(

                                    "academicPeriodId",

                                    e.target.value

                                )

                            }




                            placeholder="
                            Enter new academic period ID
                            "



                            className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            "

                        />


                    </div>









                    <button



                        disabled={isLoading}



                        onClick={submit}



                        className="
                        w-full
                        bg-green-600
                        text-white
                        rounded-xl
                        py-3
                        flex
                        items-center
                        justify-center
                        gap-2
                        disabled:opacity-50
                        "



                    >




                        {

                            isLoading &&


                            <Loader2

                                size={18}

                                className="
                                animate-spin
                                "

                            />

                        }



                        Readmit Student



                    </button>









                </div>









            </div>







        </div>


    );


};







export default ReadmitStudentModal;