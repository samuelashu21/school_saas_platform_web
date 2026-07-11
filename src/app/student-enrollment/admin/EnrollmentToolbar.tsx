 "use client";


import {
 Search
} from "lucide-react";



interface Props {


 search:string;


 setSearch:(value:string)=>void;


}



const EnrollmentToolbar = ({
 search,
 setSearch

}:Props)=>{


return (

<div
className="
flex
items-center
bg-white
border
border-gray-200
rounded-xl
shadow-sm
w-full
md:w-96
mb-6
"
>


<Search
className="
w-5
h-5
text-gray-400
ml-4
"
/>



<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="
Search students...
"

className="
w-full
py-3
px-3
outline-none
text-sm
"

/>

 

</div>

);


};


export default EnrollmentToolbar;