"use client";

import { useEffect, useState } from "react";

import {
  useUpdateUserMutation,
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





export default function UpdateUserForm({
user
}:Props){


const router =
useRouter();



const [
updateUser,
{
isLoading,
isError
}
]=useUpdateUserMutation();






const [photo,setPhoto]=useState<File|null>(null);






const [form,setForm]=useState({

firstName:"",

lastName:"",

email:"",

address:"",

role:"REGISTRAR" as UserRole,

isActive:true,

});







useEffect(()=>{


if(user){


setForm({

firstName:user.firstName ?? "",

lastName:user.lastName ?? "",

email:user.email ?? "",

address:user.address ?? "",


role:user.roles?.length
?
user.roles[0].role.name
:
"REGISTRAR",


isActive:user.isActive ?? true,


});


}



},[user]);








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


try{


const data =
new FormData();



Object.entries(form)
.forEach(([key,value])=>{


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





await updateUser({

id:user.id,

data

}).unwrap();






router.push(
"/users/list"
);



}

catch(error){

console.error(
"Update failed",
error
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

Update User

</h2>







<div

className="
grid
grid-cols-2
gap-4
"

>



<div>

<label className="text-sm">

First Name

</label>


<input

value={form.firstName}

onChange={
e=>updateField(
"firstName",
e.target.value
)
}

className="
w-full
border
rounded-lg
px-3
py-2
"

/>


</div>







<div>

<label className="text-sm">

Last Name

</label>


<input

value={form.lastName}

onChange={
e=>updateField(
"lastName",
e.target.value
)
}

className="
w-full
border
rounded-lg
px-3
py-2
"

/>


</div>









<div className="col-span-2">

<label className="text-sm">

Email

</label>


<input

type="email"

value={form.email}

onChange={
e=>updateField(
"email",
e.target.value
)
}

className="
w-full
border
rounded-lg
px-3
py-2
"

/>


</div>









<div className="col-span-2">

<label className="text-sm">

Address

</label>


<textarea

value={form.address}

onChange={
e=>updateField(
"address",
e.target.value
)
}

className="
w-full
border
rounded-lg
px-3
py-2
"

/>


</div>









<div className="col-span-2">

<label className="text-sm">

Role

</label>


<select

value={form.role}

onChange={
e=>updateField(
"role",
e.target.value as UserRole
)
}

className="
w-full
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









<div className="col-span-2">

<label className="text-sm">

Status

</label>


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
w-full
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


</div>









<div className="col-span-2">

<label className="text-sm">

Profile Photo

</label>


<input

type="file"

accept="image/*"

onChange={
e=>
setPhoto(
e.target.files?.[0] ?? null
)
}

/>


</div>








</div>









{
isError &&

<p className="
text-red-600
mt-4
">

Failed updating user

</p>

}









<div

className="
flex
gap-3
mt-6
"

>


<button

onClick={()=>
router.back()
}

className="
px-5
py-2
border
rounded-lg
"

>

Cancel

</button>






<button

disabled={isLoading}

onClick={submit}

className="
px-5
py-2
bg-blue-600
text-white
rounded-lg
disabled:opacity-50
"

>


{
isLoading
?
"Updating..."
:
"Update User"
}


</button>





</div>








</div>


);


}