"use client";


import {
    Search
} from "lucide-react";



interface Props {

    value: string;

    setValue: (value: string) => void;

}



const StudentSearch = ({
    value,
    setValue

}: Props) => {


    return (

        <div className="
            flex
            items-center
            border
            rounded-xl
            bg-white
            px-3
        ">


            <Search

                className="
                    w-5
                    text-gray-400
                "

            />



            <input

                value={value}

                onChange={(e) =>
                    setValue(
                        e.target.value
                    )
                }


                placeholder="
                    Search students...
                "


                className="
                    p-3
                    outline-none
                    w-full
                "

            />


        </div>


    );

};


export default StudentSearch;