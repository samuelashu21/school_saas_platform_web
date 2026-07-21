"use client";


interface Props {

    value: string;

    onChange: (value: string) => void;

}



const EnrollmentTypeSelector = ({
    value,
    onChange

}: Props) => {


    const types = [

        "NEW_STUDENT",
        "TRANSFER",
        "PROMOTION",
        "REPEAT",
        "READMISSION"

    ];



    return (

        <div>


            <label className="
                text-sm
                text-gray-600
            ">

                Enrollment Type

            </label>



            <select

                value={value}

                onChange={(e) =>
                    onChange(e.target.value)
                }

                className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    mt-1
                "

            >


                <option value="">
                    Select Type
                </option>


                {
                    types.map(type => (

                        <option

                            key={type}

                            value={type}

                        >

                            {
                                type
                                    .replaceAll("_", " ")
                            }

                        </option>

                    ))
                }


            </select>


        </div>

    );

};


export default EnrollmentTypeSelector;