"use client";

import { useEffect, useState } from "react";

import {
  useAssignRoleMutation,
} from "@/app/state/module/users/userApi";

import {
  UserRole,
} from "@/app/state/module/users/userApi";

import {
  useRouter,
} from "next/navigation";



interface Props {

  user:any;

}



const availableRoles:UserRole[]=[

"SCHOOL_ADMIN",
"VICE_PRINCIPAL",
"REGISTRAR",
"ADMISSION_OFFICER",
"EXAM_COORDINATOR",
"TEACHER",
"CLASS_TEACHER",
"PARENT",

];





export default function AssignRoleForm({

user

}:Props){



const router =
useRouter();





const [

assignRole,

{

isLoading

}

]=useAssignRoleMutation();







const [

role,

setRole

]=useState<UserRole>("REGISTRAR");





const [

error,

setError

]=useState("");








useEffect(()=>{


if(user?.roles?.length)

{


setRole(

user.roles[0].role.name

);


}



},[user]);









const submit=async()=>{


try{


setError("");



await assignRole({

id:user.id,

role

}).unwrap();





router.push(
"/users/list"
);



}

catch(err:any){


setError(

err?.data?.message ??

"Failed assigning role"

);


}


};









return (

<div

className="
bg-white
rounded-xl
shadow
p-8
max-w-xl
"

>



<h2

className="
text-2xl
font-bold
mb-6
"

>

Assign User Role

</h2>







<div

className="
space-y-5
"

>



<div>

<label

className="
text-sm
font-medium
"

>

User

</label>


<div

className="
mt-2
border
rounded-lg
px-3
py-2
bg-gray-50
"

>

{user.firstName} {user.lastName}

</div>


</div>









<div>


<label

className="
text-sm
font-medium
"

>

Role

</label>




<select


value={role}


onChange={e=>

setRole(

e.target.value as UserRole

)

}


className="
w-full
mt-2
border
rounded-lg
px-3
py-2
"

>


{

availableRoles.map(role=>(


<option

key={role}

value={role}

>

{role.replaceAll("_"," ")}

</option>


))

}



</select>



</div>







{
error &&


<p

className="
text-red-600
text-sm
"

>

{error}

</p>

}








<button


disabled={isLoading}


onClick={submit}


className="
bg-blue-600
text-white
px-6
py-3
rounded-lg
disabled:opacity-50
"

>


{

isLoading

?

"Saving..."

:

"Assign Role"

}



</button>





</div>





</div>


);


}