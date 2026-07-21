"use client";

import {
    Search,
    X,
} from "lucide-react";



interface Props {

    search: string;

    setSearch: (
        value: string
    ) => void;

}







const EnrollmentToolbar = ({

    search,

    setSearch,

}: Props) => {



    const clearSearch = () => {

        setSearch("");

    };





    return (


        <div

            className="
            flex
            items-center
            gap-2
            bg-white
            border
            border-gray-200
            rounded-xl
            shadow-sm
            w-full
            md:w-[420px]
            mb-6
            px-4
            "

        >



            <Search

                className="
                w-5
                h-5
                text-gray-400
                "

            />





            <input


                value={search}


                onChange={(e) =>

                    setSearch(
                        e.target.value
                    )

                }


                placeholder="
                Search by student name,
                code, class...
                "


                className="
                flex-1
                py-3
                outline-none
                text-sm
                text-gray-700
                "

            />








            {


                search &&


                <button

                    type="button"

                    onClick={clearSearch}

                    className="
                    text-gray-400
                    hover:text-gray-700
                    "

                >

                    <X

                        size={18}

                    />


                </button>



            }





        </div>


    );


};



export default EnrollmentToolbar;