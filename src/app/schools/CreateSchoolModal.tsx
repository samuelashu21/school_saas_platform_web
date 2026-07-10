"use client";

import {
  FormEvent,
  useEffect, 
  useState,
} from "react";

import Header from "@/app/(components)/Header";

import type {
  School,
} from "@/app/state/module/schools/schoolApi";


interface Props {

  isOpen:boolean;

  onClose:()=>void;

  onCreate:(data:{
    name:string;
    address?:string;
    phone?:string;
  })=>void;


  onUpdate?:(
    id:string,
    data:{
      name:string;
      address?:string;
      phone?:string;
    }
  )=>void;


  school?:School | null;

}



const CreateSchoolModal = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  school,

}:Props)=>{


const initialState={

 name:"",
 address:"",
 phone:""

};



const [
 formData,
 setFormData
]=useState(initialState);



useEffect(()=>{

 if(school){

  setFormData({

   name:school.name,

   address:school.address || "",

   phone:school.phone || ""

  });

 }
 else{

  setFormData(initialState);

 }

},[school]);





const handleSubmit=(e:FormEvent)=>{

 e.preventDefault();


 if(school && onUpdate){

  onUpdate(
    school.id,
    formData
  );

 }

 else{

  onCreate(formData);

 }


 setFormData(initialState);

 onClose();

};




if(!isOpen)
return null;



const labelCss =
"block text-sm font-semibold text-gray-700 mb-1";


const inputCss=`

block
w-full
mb-4
p-2.5
border
border-gray-300
rounded-lg
focus:ring-2
focus:ring-blue-500
focus:outline-none
text-sm

`;




return (

<div

className="
fixed
inset-0
bg-slate-900/40
backdrop-blur-sm
z-50
flex
items-center
justify-center
"

>


<div

className="
w-full
max-w-md
bg-white
rounded-xl
shadow-xl
p-6
"

>


<Header

name={
 school
 ? "Update School"
 : "Create New School"
}

/>




<form

onSubmit={handleSubmit}

className="mt-5"

>



<label className={labelCss}>
School Name
</label>


<input

required

value={formData.name}

onChange={(e)=>

setFormData({

 ...formData,

 name:e.target.value

})

}

className={inputCss}

/>





<label className={labelCss}>
Address
</label>


<input

value={formData.address}

onChange={(e)=>

setFormData({

 ...formData,

 address:e.target.value

})

}

className={inputCss}

/>





<label className={labelCss}>
Phone
</label>


<input

value={formData.phone}

onChange={(e)=>

setFormData({

 ...formData,

 phone:e.target.value

})

}

className={inputCss}

/>





<div
className="
flex
justify-end
gap-2
mt-6
"
>


<button

type="button"

onClick={onClose}

className="
px-4
py-2
bg-gray-100
rounded-lg
text-sm
"

>

Cancel

</button>




<button

type="submit"

className="
px-4
py-2
bg-blue-600
text-white
rounded-lg
text-sm
"

>

{
 school
 ? "Update School"
 : "Create School"
}

</button>


</div>



</form>



</div>


</div>

);


};


export default CreateSchoolModal;