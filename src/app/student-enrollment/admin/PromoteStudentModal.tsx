"use client";

import {
    X,
    Loader2,
    GraduationCap,
} from "lucide-react";


import {
    usePromoteStudentMutation,
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";


import {
    useState,
} from "react";





interface Props {


    enrollment: any;


    onClose: () => void;


}









const PromoteStudentModal = ({

    enrollment,

    onClose,

}: Props) => {



    const [

        promoteStudent,

        {
            isLoading,
        }

    ] = usePromoteStudentMutation();







    const [form, setForm] = useState({

        classId: "",

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
                !form.classId ||
                !form.academicPeriodId
            ) {

                alert(
                    "New class and academic period are required"
                );

                return;

            }






            await promoteStudent({

                id: enrollment.id,

                body: {

                    classId:
                        form.classId,


                    academicPeriodId:
                        form.academicPeriodId,

                },

            }).unwrap();






            alert(
                "Student promoted successfully"
            );



            onClose();




        }

        catch (error: any) {


            console.error(error);



            alert(

                error?.data?.message ||

                "Promotion failed"

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


                        <GraduationCap

                            className="text-blue-600"

                        />


                        <h2 className="
                        text-xl
                        font-semibold
                        ">

                            Promote Student

                        </h2>


                    </div>





                    <button

                        onClick={onClose}

                        className="
                        p-2
                        hover:bg-gray-100
                        rounded-lg
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

                                `${enrollment.student?.firstName

                                ||

                                ""

                                }

                                ${enrollment.student?.lastName

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









                    {/* CURRENT CLASS */}



                    <div>


                        <label className="
                        text-sm
                        text-gray-600
                        ">

                            Current Class

                        </label>




                        <input


                            disabled


                            value={

                                enrollment.class?.name

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









                    {/* CURRENT GRADE */}



                    <div>


                        <label className="
                        text-sm
                        text-gray-600
                        ">

                            Current Grade

                        </label>




                        <input


                            disabled


                            value={

                                enrollment.class
                                    ?.gradeLevel
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









                    {/* NEW CLASS */}



                    <div>


                        <label className="
                        text-sm
                        text-gray-600
                        ">

                            New Class ID

                        </label>




                        <input



                            value={
                                form.classId
                            }



                            onChange={(e) =>

                                updateField(

                                    "classId",

                                    e.target.value

                                )

                            }



                            placeholder="
                            Enter promoted class ID
                            "



                            className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            "

                        />



                    </div>









                    {/* NEW PERIOD */}



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
                        bg-blue-600
                        text-white
                        rounded-xl
                        py-3
                        flex
                        justify-center
                        items-center
                        gap-2
                        disabled:opacity-50
                        "


                    >




                        {

                            isLoading &&

                            <Loader2

                                size={18}

                                className="animate-spin"

                            />

                        }



                        Promote Student



                    </button>







                </div>







            </div>







        </div>



    );


};





export default PromoteStudentModal;