"use client";


import {
  useParams,
} from "next/navigation";


import Header from "@/app/(components)/Header";


import {
  useGetUserByIdQuery,
} from "@/app/state/module/users/userApi";


import AssignRoleForm from "../../components/AssignRoleForm";

import {
  ShieldCheck,
  Mail,
  UserRound,
} from "lucide-react";







export default function AssignRolePage(){


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

<div
className="
space-y-6
"
>


<Header
name="Assign User Role"
/>


<div
className="
bg-white
rounded-xl
shadow-sm
p-8
animate-pulse
"
>

<div
className="
h-6
bg-gray-200
rounded
w-1/3
mb-5
"
/>


<div
className="
h-40
bg-gray-100
rounded-xl
"
/>


</div>



</div>

);









if(!user)

return (

<div
className="
p-6
text-red-600
font-semibold
"
>

User not found

</div>

);









return (

<div
className="
space-y-6
"
>




{/* HEADER */}


<div>


<Header

name="Assign User Role"

/>


<p
className="
text-gray-500
mt-2
"
>

Manage permissions and access level for this account.

</p>


</div>









{/* USER SUMMARY */}


<div
className="
bg-gradient-to-r
from-blue-600
to-indigo-600
rounded-2xl
shadow
p-6
text-white
"
>


<div
className="
flex
items-center
gap-5
"
>


<img

src={
user.photo ||
"/avatar.png"
}

alt="profile"

className="
w-20
h-20
rounded-full
border-4
border-white
object-cover
"

/>





<div>


<h2
className="
text-2xl
font-bold
"
>

{user.firstName}
{" "}
{user.lastName}

</h2>



<div
className="
flex
items-center
gap-2
text-blue-100
mt-2
"
>

<Mail size={16}/>

{user.email}


</div>




<div
className="
flex
items-center
gap-2
mt-3
"
>


<UserRound size={16}/>


<span
className="
text-sm
"
>

Current Roles:

</span>


{

user.roles?.length

?

user.roles
.map(
(r:any)=>
r.role.name
)
.join(", ")


:

"NO ROLE"


}



</div>




</div>





</div>





</div>









{/* CONTENT */}



<div
className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
"
>







{/* INFO CARD */}


<div
className="
bg-white
rounded-xl
shadow-sm
border
p-6
h-fit
"
>


<div
className="
flex
items-center
gap-3
mb-5
"
>

<ShieldCheck
className="
text-blue-600
"
/>


<h3
className="
font-bold
text-lg
"
>

Account Access

</h3>


</div>





<div
className="
space-y-4
"
>


<div>

<p
className="
text-xs
text-gray-500
"
>

Account Status

</p>


<span

className={`

inline-block
mt-1
px-3
py-1
rounded-full
text-xs
font-semibold


${
user.isActive

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`}

>

{
user.isActive
?
"ACTIVE"
:
"DISABLED"
}


</span>


</div>






<div>

<p
className="
text-xs
text-gray-500
"
>

School

</p>


<p
className="
font-semibold
mt-1
"
>

{
user.school?.name ||
"N/A"
}

</p>


</div>







</div>



</div>









{/* ASSIGN FORM */}



<div
className="
lg:col-span-2
"
>


<AssignRoleForm

user={user}

/>


</div>






</div>






</div>

);


}