"use client";

import { useEffect, useMemo, useState } from "react";

import {
  useCreateUserMutation,
  UserRole,
} from "@/app/state/module/users/userApi";

import {
  useAppSelector,
} from "@/app/redux";

import {
  useRouter,
} from "next/navigation";



const SUPER_ADMIN_ROLES: UserRole[] = [
  "SCHOOL_ADMIN",
  "VICE_PRINCIPAL",
  "REGISTRAR",
  "ADMISSION_OFFICER",
  "EXAM_COORDINATOR",
  "TEACHER",
  "CLASS_TEACHER",
];


const SCHOOL_ADMIN_ROLES: UserRole[] = [
  "VICE_PRINCIPAL",
  "REGISTRAR",
  "ADMISSION_OFFICER",
  "EXAM_COORDINATOR",
  "TEACHER",
  "CLASS_TEACHER",
];





export default function CreateUserForm(){



const router = useRouter();



const [
createUser,
{
isLoading
}
]=useCreateUserMutation();




const currentRoles =
useAppSelector(
state=>state.global.currentUser?.roles ?? []
);




const roles =
useMemo(()=>{


return currentRoles.map((role:any)=>{


if(typeof role==="string")

return role.toUpperCase();



return (
role?.role?.name ??
role?.name ??
""
).toUpperCase();


});


},[currentRoles]);






const allowedRoles =
useMemo(()=>{


if(
roles.includes("SUPER_ADMIN")
)

return SUPER_ADMIN_ROLES;



if(
roles.includes("SCHOOL_ADMIN")
)

return SCHOOL_ADMIN_ROLES;



return [];


},[roles]);







const [photo,setPhoto]=useState<File|null>(null);


const [error,setError]=useState("");





const [form,setForm]=useState({


firstName:"",

lastName:"",

email:"",

password:"",

address:"",

schoolId:"",

role:"REGISTRAR" as UserRole,

isActive:true,


});








useEffect(()=>{


if(allowedRoles.length)

{


setForm(prev=>({

...prev,

role:allowedRoles[0]

}));



}



},[allowedRoles]);









const updateField=(

field:keyof typeof form,

value:any

)=>{


setForm(prev=>({

...prev,

[field]:value


}));


};









const submit=async()=>{


if(
!form.firstName ||
!form.lastName ||
!form.email ||
!form.password
)

{


setError(
"First name, last name, email and password are required."
);


return;


}




try{


setError("");



const data =
new FormData();



Object.entries(form).forEach(([key,value])=>{


data.append(
key,
String(value)
);


});




if(photo)

data.append(
"photo",
photo
);




await createUser(data).unwrap();



router.push(
"/users/list"
);



}

catch(err:any){


setError(
err?.data?.message ??
"Failed creating user."
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
max-w-3xl
"

>



<h2

className="
text-2xl
font-bold
mb-6
"

>

Create User

</h2>







<div

className="
grid
grid-cols-2
gap-4
"

>



<input

placeholder="First Name"

value={form.firstName}

onChange={
e=>updateField(
"firstName",
e.target.value
)
}

className="
border
rounded-lg
px-3
py-2
"

/>




<input

placeholder="Last Name"

value={form.lastName}

onChange={
e=>updateField(
"lastName",
e.target.value
)
}

className="
border
rounded-lg
px-3
py-2
"

/>







<input

placeholder="Email"

type="email"

value={form.email}

onChange={
e=>updateField(
"email",
e.target.value
)
}

className="
col-span-2
border
rounded-lg
px-3
py-2
"

/>







<input

placeholder="Temporary Password"

type="password"

value={form.password}

onChange={
e=>updateField(
"password",
e.target.value
)
}

className="
col-span-2
border
rounded-lg
px-3
py-2
"

/>







<textarea

placeholder="Address"

value={form.address}

onChange={
e=>updateField(
"address",
e.target.value
)
}

className="
col-span-2
border
rounded-lg
px-3
py-2
"

/>







<input

placeholder="School ID"

value={form.schoolId}

onChange={
e=>updateField(
"schoolId",
e.target.value
)
}

className="
col-span-2
border
rounded-lg
px-3
py-2
"

/>









<select

value={form.role}

onChange={
e=>updateField(
"role",
e.target.value as UserRole
)
}

className="
col-span-2
border
rounded-lg
px-3
py-2
"

>


{
allowedRoles.map(role=>(

<option

key={role}

value={role}

>

{role.replaceAll("_"," ")}

</option>


))

}


</select>








<select

value={
form.isActive
?
"ACTIVE"
:
"DISABLED"
}

onChange={
e=>updateField(
"isActive",
e.target.value==="ACTIVE"
)
}

className="
col-span-2
border
rounded-lg
px-3
py-2
"

>


<option value="ACTIVE">

ACTIVE

</option>


<option value="DISABLED">

DISABLED

</option>



</select>







<input

type="file"

accept="image/*"

onChange={
e=>
setPhoto(
e.target.files?.[0] ?? null
)
}

className="
col-span-2
"

/>






</div>







{
error &&

<p className="
text-red-600
mt-4
">

{error}

</p>

}








<button


disabled={
isLoading ||
allowedRoles.length===0
}


onClick={submit}


className="
mt-6
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
"Creating..."
:
"Create User"
}


</button>






</div>


);


}