"use client";


import { Pencil, Trash2 } from "lucide-react";


interface ClassItem {


  id:string;

  name:string;


  gradeLevel?:{

    id:string;

    name:string;

    level:number;

  };


  school?:{

    id:string;

    name:string;

  };


  createdAt:string;


}



interface Props {


  classes:ClassItem[];


  onEdit:(item:ClassItem)=>void;


  onDelete:(item:ClassItem)=>void;


}



const ClassTable = ({
  classes,
  onEdit,
  onDelete

}:Props)=>{


return (

<div
className="
bg-white
rounded-xl
shadow
overflow-hidden
"
>


<table
className="
w-full
"
>


<thead
className="
bg-gray-100
"
>

<tr>


<th className="p-4 text-left">
Class Name
</th>


<th className="p-4 text-left">
Grade Level
</th>


<th className="p-4 text-left">
School
</th>


<th className="p-4 text-left">
Created
</th>


<th className="p-4 text-center">
Actions
</th>


</tr>


</thead>



<tbody>


{
classes.length === 0 ?

(
<tr>

<td
colSpan={5}
className="
text-center
p-6
text-gray-500
"
>

No classes found

</td>

</tr>

)

:

classes.map((item)=>(


<tr
key={item.id}
className="
border-b
hover:bg-gray-50
"
>


<td
className="
p-4
font-medium
"
>

{item.name}

</td>



<td className="p-4">


{
item.gradeLevel ?

`${item.gradeLevel.name} (${item.gradeLevel.level})`

:

"N/A"

}


</td>




<td className="p-4">


{
item.school?.name ?? "N/A"

}


</td>




<td className="p-4">


{
new Date(item.createdAt)
.toLocaleDateString()

}


</td>




<td
className="
p-4
flex
justify-center
gap-3
"
>


<button

onClick={()=>
onEdit(item)
}

className="
p-2
rounded-lg
bg-blue-100
text-blue-700
hover:bg-blue-200
"

>


<Pencil
size={18}
/>


</button>




<button

onClick={()=>
onDelete(item)
}

className="
p-2
rounded-lg
bg-red-100
text-red-700
hover:bg-red-200
"

>


<Trash2
size={18}
/>
 

</button>


</td>


</tr>


))


}



</tbody>


</table>


</div>

);


};


export default ClassTable;