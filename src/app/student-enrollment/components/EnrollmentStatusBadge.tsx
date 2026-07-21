"use client";


interface Props {

    status: string;

}



const EnrollmentStatusBadge = ({
    status

}: Props) => {


    const colors: Record<string, string> = {


        ACTIVE:
            "bg-green-100 text-green-700",


        COMPLETED:
            "bg-blue-100 text-blue-700",


        TRANSFERRED:
            "bg-yellow-100 text-yellow-700",


        WITHDRAWN:
            "bg-red-100 text-red-700",


        PROMOTED:
            "bg-purple-100 text-purple-700"


    };



    return (

        <span

            className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${colors[status]
                ??
                "bg-gray-100 text-gray-700"
                }
            `}

        >

            {status}

        </span>

    );

};


export default EnrollmentStatusBadge;