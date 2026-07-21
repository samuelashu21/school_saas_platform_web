"use client";


import Header from "@/app/(components)/Header";

import CreateUserForm from "../components/CreateUserForm";



export default function CreateUserPage(){



return (

<div

className="
space-y-6
"

>


<Header

name="Create User"

/>



<CreateUserForm />



</div>


);


}