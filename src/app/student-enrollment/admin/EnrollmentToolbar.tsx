"use client";

import {
    EnrollmentStatus
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



interface EnrollmentToolbarProps {


    search:string;


    setSearch:(

        value:string

    )=>void;



    status:EnrollmentStatus | "";



    setStatus:(

        value:EnrollmentStatus | ""

    )=>void;



    selectedCount:number;


}






export default function EnrollmentToolbar({

    search,

    setSearch,

    status,

    setStatus,

    selectedCount,

}:EnrollmentToolbarProps){



    return (

        <div className="
            bg-white
            rounded-xl
            border
            p-4
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
        ">





            <div className="
                flex
                gap-3
                flex-1
            ">





                <input


                    value={search}


                    onChange={(e)=>

                        setSearch(
                            e.target.value
                        )

                    }


                    placeholder="
                        Search student code or name...
                    "


                    className="
                        w-full
                        max-w-md
                        px-4
                        py-2
                        border
                        rounded-lg
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "


                />








                <select


                    value={status}


                    onChange={(e)=>

                        setStatus(

                            e.target.value as EnrollmentStatus | ""

                        )

                    }


                    className="
                        px-4
                        py-2
                        border
                        rounded-lg
                        bg-white
                    "


                >



                    <option value="">

                        All Status

                    </option>





                    <option value="ACTIVE">

                        Active

                    </option>





                    <option value="COMPLETED">

                        Completed

                    </option>





                    <option value="TRANSFERRED">

                        Transferred

                    </option>





                    <option value="WITHDRAWN">

                        Withdrawn

                    </option>





                    <option value="PROMOTED">

                        Promoted

                    </option>





                </select>






            </div>









            {

                selectedCount > 0 && (


                    <div className="
                        flex
                        items-center
                        text-sm
                        font-medium
                        text-gray-700
                    ">


                        {selectedCount}

                        {" "}

                        selected


                    </div>


                )


            }








        </div>


    );


}