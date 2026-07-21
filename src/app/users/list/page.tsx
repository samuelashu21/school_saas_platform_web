"use client";

import Header from "@/app/(components)/Header";

import UserTable from "../components/UserTable";



export default function UsersListPage(){


return (

<div

className="
space-y-6
"

>


<Header

name="Users"

/>



<UserTable />



</div>


);


} 