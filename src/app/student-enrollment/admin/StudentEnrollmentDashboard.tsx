"use client";

import {
    useState
} from "react";


import {

    Enrollment,

    EnrollmentStatus,

    useGetEnrollmentsQuery,

    useDeleteEnrollmentMutation,

    useWithdrawStudentMutation,

    useTransferStudentMutation,

} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";



import EnrollmentToolbar from "./EnrollmentToolbar";

import StudentEnrollmentTable from "./StudentEnrollmentTable";

import EnrollmentDetailsModal from "./EnrollmentDetailsModal";








export default function StudentEnrollmentDashboard() {



    const [page,setPage] = useState(1);


    const pageSize = 20;



    const [search,setSearch] = useState("");



    const [status,setStatus] = useState<
        EnrollmentStatus | ""
    >("");



    const [sortBy,setSortBy] = useState(
        "createdAt"
    );



    const [sortOrder,setSortOrder] =
    useState<
        "asc" | "desc"
    >(
        "desc"
    );





    const [
        selectedEnrollment,
        setSelectedEnrollment
    ] =
    useState<Enrollment | null>(null);









    const {

        data,

        isLoading,

        isError

    } = useGetEnrollmentsQuery({

        page,

        pageSize,

        search,

        status,

        sortBy,

        sortOrder,

    });










    const [
        deleteEnrollment
    ] =
    useDeleteEnrollmentMutation();





    const [
        withdrawStudent
    ] =
    useWithdrawStudentMutation();





    const [
        transferStudent
    ] =
    useTransferStudentMutation();








    const enrollments =
        data?.data ?? [];



    const pagination =
        data?.pagination;









    const handleSearch = (

        value:string

    )=>{


        setPage(1);

        setSearch(value);


    };











    const handleStatus = (

        value:EnrollmentStatus | ""

    )=>{


        setPage(1);

        setStatus(value);


    };









    const handleSort = (

        column:string

    )=>{


        if(sortBy === column){


            setSortOrder(

                previous =>

                previous === "asc"

                ? "desc"

                : "asc"

            );


        }

        else{


            setSortBy(column);

            setSortOrder("asc");


        }


    };









    const handlePromote = (

        enrollment:Enrollment

    )=>{


        console.log(

            "Promote",

            enrollment.id

        );


    };











    const handleTransfer = async (

        enrollment:Enrollment

    )=>{


        try{


            await transferStudent({

                id:enrollment.id,


                body:{


                    schoolId:
                    enrollment.schoolId,


                    classId:
                    enrollment.classId,


                    academicPeriodId:
                    enrollment.academicPeriodId,


                },


            }).unwrap();



        }

        catch(error){


            console.error(error);


        }


    };









    const handleWithdraw = async (

        enrollment:Enrollment

    )=>{


        try{


            await withdrawStudent(

                enrollment.id

            ).unwrap();



        }

        catch(error){


            console.error(error);


        }


    };











    const handleDelete = async (

        enrollment:Enrollment

    )=>{


        try{


            await deleteEnrollment(

                enrollment.id

            ).unwrap();



        }

        catch(error){


            console.error(error);


        }


    };












    if(isLoading){


        return (

            <div className="p-6">

                Loading enrollments...

            </div>

        );


    }









    if(isError){


        return (

            <div className="
                p-6
                text-red-600
            ">

                Failed loading enrollments.

            </div>

        );


    }









    return (


        <div className="
            space-y-5
        ">








            <EnrollmentToolbar


                search={search}


                setSearch={handleSearch}


                status={status}


                setStatus={handleStatus}


                selectedCount={0}


            />









            <StudentEnrollmentTable


                enrollments={enrollments}


                onView={setSelectedEnrollment}


                onPromote={handlePromote}


                onTransfer={handleTransfer}


                onWithdraw={handleWithdraw}


                onReadmit={(item)=>{


                    console.log(

                        "Readmit",

                        item.id

                    );


                }}



                onDelete={handleDelete}



                onSort={handleSort}



                sortBy={sortBy}



                sortOrder={sortOrder}



            />









            <div className="
                flex
                items-center
                justify-between
                px-2
            ">





                <p className="
                    text-sm
                    text-gray-500
                ">


                    Page {pagination?.page ?? 1}

                    {" "}of{" "}

                    {pagination?.totalPages ?? 1}


                </p>








                <div className="
                    flex
                    gap-2
                ">





                    <button


                        disabled={
                            page === 1
                        }


                        onClick={()=>
                            setPage(
                                previous =>
                                previous - 1
                            )
                        }


                        className="
                            px-3
                            py-2
                            rounded-lg
                            border
                            disabled:opacity-40
                        "

                    >

                        Previous


                    </button>









                    <button


                        disabled={

                            page === pagination?.totalPages

                            ||

                            !pagination?.totalPages

                        }


                        onClick={()=>


                            setPage(

                                previous =>

                                previous + 1

                            )


                        }


                        className="
                            px-3
                            py-2
                            rounded-lg
                            border
                            disabled:opacity-40
                        "


                    >

                        Next


                    </button>





                </div>



            </div>









            {

                selectedEnrollment && (


                    <EnrollmentDetailsModal


                        enrollment={selectedEnrollment}


                        onClose={()=>


                            setSelectedEnrollment(null)


                        }


                    />


                )

            }






        </div>


    );


}