"use client";

import { useRouter } from "next/navigation";

import {
  useDeleteUserMutation,
} from "@/app/state/module/users/userApi";



interface Props {

  user:any;

}




export default function DeleteUserCard({

user

}:Props){



const router =
useRouter();



const [
deleteUser,
{
isLoading
}
]=useDeleteUserMutation();





const handleDelete = async()=>{


try{


await deleteUser({

id:user.id

}).unwrap();



router.push(
"/users/list"
);



}

catch(error){

console.error(
"Delete failed",
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
max-w-xl
"

>



<h2

className="
text-2xl
font-bold
text-gray-800
mb-5
"

>

Delete User

</h2>





<p

className="
text-gray-600
mb-4
"

>


Are you sure you want to delete


<span

className="
font-semibold
mx-1
"

>

{user.firstName} {user.lastName}

</span>


?


</p>






<p

className="
text-red-600
text-sm
mb-6
"

>

This action cannot be undone.

</p>







<div

className="
flex
gap-3
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


onClick={handleDelete}


className="
px-5
py-2
bg-red-600
text-white
rounded-lg
disabled:opacity-50
"

>

{
isLoading
?
"Deleting..."
:
"Delete User"
}


</button>



 
</div>





</div>


);


}