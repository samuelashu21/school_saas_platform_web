"use client";


import {

useParams,

useRouter,
 
} from "next/navigation";



import Header from "@/app/(components)/Header";


import {

useGetUserByIdQuery,

} from "@/app/state/module/users/userApi";





export default function UserDetailsPage(){



const params =
useParams();



const router =
useRouter();




const id =
params.id as string;





const {

data:user,

isLoading,

isError

}=useGetUserByIdQuery(id);







if(isLoading)

return (

<div className="p-6">

Loading user...

</div>

);






if(isError || !user)

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



<Header

name="User Details"

/>









<div

className="
bg-white
rounded-xl
shadow
overflow-hidden
"

>



{/* HEADER */}



<div

className="
bg-gradient-to-r
from-blue-600
to-indigo-600
p-8
text-white
"

>


<div

className="
flex
items-center
gap-6
"

>



<img


src={
user.photo ||
"/avatar.png"
}


className="
w-28
h-28
rounded-full
border-4
border-white
object-cover
"


alt="profile"

/>





<div>



<h1

className="
text-3xl
font-bold
"

>


{user.firstName}

{" "}

{user.lastName}



</h1>






<p

className="
text-blue-100
"

>

{user.email}

</p>








<span

className={`

inline-block

mt-3

px-4

py-1

rounded-full

text-sm

font-semibold


${

user.isActive

?

"bg-green-500"

:

"bg-red-500"

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



</div>



</div>









{/* INFORMATION */}



<div

className="
p-8
grid
md:grid-cols-2
gap-6
"

>



<Info

label="First Name"

value={user.firstName}

/>



<Info

label="Last Name"

value={user.lastName}

/>





<Info

label="Email"

value={user.email}

/>






<Info

label="Address"

value={
user.address || "N/A"
}

/>







<Info

label="Role"

value={

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


/>








<Info

label="School"

value={
user.school?.name || "N/A"
}

/>








<Info

label="Created"

value={

new Date(
user.createdAt
)
.toLocaleString()

}


/>






<Info

label="User ID"

value={user.id}

/>






</div>









<div

className="
border-t
p-5
flex
justify-end
gap-3
"

>




<button

onClick={()=>router.back()}

className="
px-5
py-2
border
rounded-lg
"

>

Back

</button>





<button

onClick={()=>router.push(
`/users/edit/${user.id}`
)}

className="
px-5
py-2
bg-blue-600
text-white
rounded-lg
"

>

Edit User

</button>





</div>








</div>






</div>


);


}







function Info({

label,

value,

}:{

label:string;

value:any;

}){


return (

<div>


<p

className="
text-sm
text-gray-500
"

>

{label}

</p>



<p

className="
font-semibold
break-all
"

>

{value}

</p>



</div>

);


}