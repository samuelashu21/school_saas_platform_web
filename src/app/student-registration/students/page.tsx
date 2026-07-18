"use client";

import Header from "@/app/(components)/Header";

import RegisteredStudentsTable 
from "@/app/student-registration/components/RegisteredStudentsTable";


import {
  useGetAllRegisteredStudentsQuery,
} 
from "@/app/state/module/studentRegistration/studentRegistrationApi";



const RegisteredStudentsPage = () => {


const {
 data,
 isLoading,
 isError,

} = useGetAllRegisteredStudentsQuery();



const students =
 data?.data ?? [];



return (

<main
className="
mx-auto
w-full
max-w-[1600px]
px-4
py-8
sm:px-6
lg:px-8
"
>


<div className="mb-8">


<Header
name="Registered Students"
/>


<p
className="
mt-2
text-sm
text-gray-500
"
>
View all registered students in the school system.
</p>


</div>




<section
className="
rounded-xl
border
bg-white
p-4
shadow-sm
"
>


<RegisteredStudentsTable

students={students}

isLoading={isLoading}

isError={isError}

/>


</section>



</main>

);


};


export default RegisteredStudentsPage;