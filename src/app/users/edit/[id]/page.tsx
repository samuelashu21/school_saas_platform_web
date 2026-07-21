"use client";


import {
useParams,
} from "next/navigation";


import Header from "@/app/(components)/Header";


import {
useGetUserByIdQuery,
} from "@/app/state/module/users/userApi";


import UpdateUserForm from "../../components/UpdateUserForm";






export default function EditUserPage(){



const params =
useParams();



const id =
params.id as string;





const {

data:user,

isLoading

}=useGetUserByIdQuery(id);







if(isLoading)

return (

<div className="p-6">

Loading...

</div>

);







if(!user)

return (

<div className="p-6 text-red-600">

User not found

</div>

);







return (

<div className="space-y-6">


<Header

name="Edit User"

/>



<UpdateUserForm

user={user}

/>



</div>

);


}