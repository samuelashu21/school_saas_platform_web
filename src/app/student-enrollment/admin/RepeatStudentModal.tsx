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

    enrollment: any;

    onClose: () => void;

}




interface RepeatForm {

    studentId: string;

    schoolId: string;

    classId: string;

    academicPeriodId: string;

    enrollmentType: EnrollmentType;

}






const RepeatStudentModal = ({

    enrollment,

    onClose

}: Props) => {



    const [

        createEnrollment,

        {
            isLoading
        }

    ] = useCreateEnrollmentMutation();







    const [

        form,

        setForm

    ] = useState<RepeatForm>({


        studentId:

            enrollment.studentId,



        schoolId:

            enrollment.schoolId,



        classId:

            enrollment.classId,



        academicPeriodId:

            "",



        enrollmentType:

            "REPEAT"


    });








    const updateField = (

        key: keyof RepeatForm,

        value: string

    ) => {


        setForm((prev) => ({


            ...prev,


            [key]: value


        }));


    };









    const submit = async () => {



        if (

            !form.academicPeriodId

        ) {


            alert(
                "Academic period is required"
            );


            return;

        }







        try {



            await createEnrollment(

                form

            ).unwrap();





            alert(

                "Student repeat enrollment created successfully"

            );



            onClose();





        } catch (error: any) {



            console.error(error);



            alert(

                error?.data?.message ||

                "Repeat enrollment failed"

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




                <div

                    className="
                        flex
                        justify-between
                        items-center
                        mb-6
                    "

                >



                    <h2 className="text-xl font-semibold">

                        Repeat Student

                    </h2>




                    <button

                        onClick={onClose}

                    >

                        <X />

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

                            Current Class

                        </label>



                        <input


                            disabled


                            value={

                                enrollment.class?.name || "-"

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


                            placeholder="Enter new academic period"


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

                            Class ID

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









                    <button


                        disabled={isLoading}


                        onClick={submit}


                        className="
                            w-full
                            bg-orange-500
                            hover:bg-orange-600
                            disabled:opacity-50
                            text-white
                            rounded-xl
                            py-3
                            flex
                            justify-center
                            items-center
                            gap-2
                        "


                    >



                        {

                            isLoading &&

                            <Loader2

                                size={18}

                                className="animate-spin"

                            />

                        }





                        {

                            isLoading

                                ?

                                "Repeating..."

                                :

                                "Repeat Student"

                        }



                    </button>





                </div>


            </div>


        </div>


    );


};



export default RepeatStudentModal;