"use client";

import { useState } from "react";

import {
    X,
    Loader2
} from "lucide-react";

import {
    useUpdateEnrollmentStatusMutation
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";


import type {
    Enrollment
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



interface Props {

    enrollment: Enrollment;

    onClose: () => void;

}



const WithdrawStudentDialog = ({
    enrollment,
    onClose

}: Props) => {



    const [
        updateStatus,
        {
            isLoading
        }

    ] = useUpdateEnrollmentStatusMutation();




    const [
        reason,
        setReason

    ] = useState("");





    const handleWithdraw = async () => {


        if (!reason.trim()) {

            alert(
                "Please provide withdrawal reason"
            );

            return;

        }




        try {


            await updateStatus({

                id: enrollment.id,

                status: "WITHDRAWN",

                remarks: reason

            }).unwrap();




            alert(
                "Student withdrawn successfully"
            );


            onClose();



        } catch (error: any) {


            console.error(error);


            alert(

                error?.data?.message ||

                "Failed withdrawing student"

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
                    max-w-md
                    p-6
                "

            >



                <div

                    className="
                        flex
                        justify-between
                        items-center
                        mb-5
                    "

                >


                    <h2

                        className="
                            text-xl
                            font-semibold
                            text-red-600
                        "

                    >

                        Withdraw Student

                    </h2>



                    <button

                        onClick={onClose}

                        className="
                            text-gray-500
                            hover:text-gray-800
                        "

                    >

                        <X size={20} />

                    </button>


                </div>






                <div

                    className="
                        space-y-4
                    "

                >



                    <div>


                        <label

                            className="
                                text-sm
                                font-medium
                            "

                        >

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


                        <label

                            className="
                                text-sm
                                font-medium
                            "

                        >

                            Withdrawal Reason

                        </label>



                        <textarea


                            value={reason}


                            onChange={(e) =>
                                setReason(e.target.value)
                            }


                            placeholder="
                                Example: Family relocation, transfer request...
                            "


                            rows={4}


                            className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                outline-none
                            "


                        />


                    </div>








                    <button


                        disabled={isLoading}


                        onClick={handleWithdraw}


                        className="
                            w-full
                            bg-red-600
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


                        Withdraw Student


                    </button>





                </div>






            </div>


        </div>


    );

};


export default WithdrawStudentDialog;