"use client";

import {
    useState
} from "react";


import {
    X,
    Loader2
} from "lucide-react";


import {
    useCreateEnrollmentMutation
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";


import type {
    EnrollmentType
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



interface Props {

    enrollment: {

        id: string;

        schoolId: string;

        studentId: string;

        classId: string;

        academicPeriodId: string;

        student: {

            firstName: string;

            lastName: string;

        };

    };


    onClose: () => void;

}






interface TransferForm {

    schoolId: string;

    studentId: string;

    classId: string;

    academicPeriodId: string;

    enrollmentType: EnrollmentType;

}







const TransferStudentModal = ({

    enrollment,

    onClose

}: Props) => {



    const [

        createEnrollment,

        {
            isLoading
        }

    ] = useCreateEnrollmentMutation();







    const [form, setForm] = useState<TransferForm>({

        schoolId:
            enrollment.schoolId,


        studentId:
            enrollment.studentId,


        classId:
            enrollment.classId,


        academicPeriodId:
            enrollment.academicPeriodId,


        enrollmentType:
            "TRANSFER"


    });









    const updateField = (

        key: keyof TransferForm,

        value: string

    ) => {


        setForm((prev) => ({

            ...prev,

            [key]: value

        }));


    };











    const submit = async () => {



        if (

            !form.schoolId ||

            !form.studentId ||

            !form.classId ||

            !form.academicPeriodId

        ) {


            alert(
                "Please fill all required fields"
            );


            return;

        }






        try {



            await createEnrollment(

                form

            ).unwrap();





            alert(

                "Student transferred successfully"

            );



            onClose();





        }

        catch (error: any) {



            console.error(error);



            alert(

                error?.data?.message ||

                "Transfer failed"

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
                    max-w-lg
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



                    <h2

                        className="
                            text-xl
                            font-semibold
                        "

                    >

                        Transfer Student

                    </h2>





                    <button

                        onClick={onClose}

                        className="
                            text-gray-500
                            hover:text-gray-800
                        "

                    >

                        <X size={22} />

                    </button>



                </div>









                <div className="space-y-4">







                    <div>


                        <label className="text-sm">

                            Student

                        </label>



                        <input


                            disabled


                            value={

                                `${enrollment.student.firstName} ${enrollment.student.lastName}`

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









                    <div>


                        <label className="text-sm">

                            New School ID

                        </label>



                        <input


                            value={
                                form.schoolId
                            }


                            onChange={(e) =>

                                updateField(

                                    "schoolId",

                                    e.target.value

                                )

                            }


                            className="
                                w-full
                                border
                                rounded-xl
                                p-3
                            "

                        />


                    </div>









                    <div>


                        <label className="text-sm">

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


                            className="
                                w-full
                                border
                                rounded-xl
                                p-3
                            "

                        />


                    </div>









                    <div>


                        <label className="text-sm">

                            Academic Period ID

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
                            hover:bg-blue-700
                            disabled:opacity-50
                            text-white
                            rounded-xl
                            py-3
                            flex
                            justify-center
                            gap-2
                            items-center
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





                        {

                            isLoading

                                ?

                                "Transferring..."

                                :

                                "Transfer Student"

                        }




                    </button>





                </div>





            </div>




        </div>


    );



};



export default TransferStudentModal;