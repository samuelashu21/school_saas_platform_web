"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import Header from "@/app/(components)/Header";

import {
  Search,
  UserCog,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


import {
  useGetUsersQuery,
} from "@/app/state/module/users/userApi";



type SortField =
  | "name"
  | "email"
  | "role"
  | "status";



export default function RolesPage(){


  const {
    data:users,
    isLoading,
    isError,

  } = useGetUsersQuery();





  const [
    search,
    setSearch
  ] = useState("");




  const [
    page,
    setPage
  ] = useState(1);



  const pageSize = 10;




  const [
    sortField,
    setSortField
  ] = useState<SortField>("name");



  const [
    sortAsc,
    setSortAsc
  ] = useState(true);









  const changeSort = (
    field:SortField
  )=>{


    if(sortField === field){

      setSortAsc(!sortAsc);

    }

    else{

      setSortField(field);

      setSortAsc(true);

    }

    setPage(1);

  };









  const processedUsers = useMemo(()=>{


    if(!users)
      return [];



    const keyword =
      search.toLowerCase();




    let result =
      users.filter(
        (user:any)=>{


          const name =
          `${user.firstName} ${user.lastName}`
          .toLowerCase();


          const email =
          user.email.toLowerCase();



          return (

            name.includes(keyword)

            ||

            email.includes(keyword)

          );


        }
      );







    result.sort(
      (a:any,b:any)=>{


        let first:any;

        let second:any;



        switch(sortField){


          case "name":

            first =
            `${a.firstName} ${a.lastName}`;

            second =
            `${b.firstName} ${b.lastName}`;

            break;



          case "email":

            first=a.email;

            second=b.email;

            break;



          case "role":

            first =
            a.roles?.[0]?.role.name || "";

            second =
            b.roles?.[0]?.role.name || "";

            break;



          case "status":

            first =
            a.isActive ? 1 : 0;

            second =
            b.isActive ? 1 : 0;

            break;


        }




        if(first < second)
          return sortAsc ? -1 : 1;


        if(first > second)
          return sortAsc ? 1 : -1;



        return 0;


      }
    );



    return result;


  },[
    users,
    search,
    sortField,
    sortAsc
  ]);








  const totalPages =
  Math.ceil(
    processedUsers.length / pageSize
  );





  const paginatedUsers =
  processedUsers.slice(
    (page-1)*pageSize,
    page*pageSize
  );









  if(isLoading)

  return (

    <div className="p-6">

      Loading users...

    </div>

  );







  if(isError)

  return (

    <div className="p-6 text-red-600">

      Failed loading users.

    </div>

  );










return (

<div
className="
space-y-6
"
>


<Header
name="Role Management"
/>







<div
className="
bg-white
rounded-xl
shadow
overflow-hidden
"
>





{/* SEARCH */}


<div
className="
p-5
border-b
"
>


<div
className="
relative
max-w-md
"
>


<Search

size={18}

className="
absolute
left-3
top-1/2
-transform-y-1/2
text-gray-400
"

/>


<input

placeholder="Search users..."

value={search}

onChange={
e=>{

setSearch(e.target.value);

setPage(1);

}
}


className="
w-full
border
rounded-lg
py-2
pl-10
pr-3
focus:ring-2
focus:ring-blue-500
outline-none
"

/>



</div>


</div>









{/* TABLE */}


<div
className="
overflow-x-auto
"
>


<table
className="
w-full
"
>


<thead
className="
bg-gray-50
border-b
"
>


<tr>


{
[
["name","User"],
["email","Email"],
["role","Role"],
["status","Status"]

].map(
(col:any)=>(


<th

key={col[0]}

onClick={()=>changeSort(col[0])}

className="
px-6
py-4
text-left
cursor-pointer
select-none
"

>


<div
className="
flex
items-center
gap-2
"
>


{col[1]}

<ArrowUpDown size={15}/>


</div>


</th>


)
)

}



<th
className="
px-6
py-4
text-right
"
>

Action

</th>


</tr>


</thead>







<tbody>


{

paginatedUsers.map(

(user:any)=>(


<tr

key={user.id}

className="
border-b
hover:bg-gray-50
"

>


<td
className="
px-6
py-4
font-semibold
"
>


{user.firstName}
{" "}
{user.lastName}


</td>





<td
className="
px-6
py-4
text-gray-600
"
>

{user.email}

</td>







<td
className="
px-6
py-4
"
>


{

user.roles?.length

?

<span
className="
px-3
py-1
rounded-full
bg-purple-100
text-purple-700
text-xs
font-semibold
"
>

{user.roles[0].role.name}

</span>


:

<span
className="
text-gray-400
text-xs
"
>

NO ROLE

</span>


}


</td>







<td
className="
px-6
py-4
"
>


<span

className={`

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


</td>








<td

className="
px-6
py-4
text-right
"

>


<Link

href={
`/users/roles/${user.id}`
}


className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
inline-flex
items-center
gap-2
hover:bg-blue-700
"


>

<UserCog size={16}/>

Assign


</Link>


</td>





</tr>


)


)


}



</tbody>


</table>


</div>









{/* PAGINATION */}


<div
className="
flex
items-center
justify-between
p-5
border-t
"
>


<p
className="
text-sm
text-gray-500
"
>

Page {page} of {totalPages || 1}

</p>





<div
className="
flex
gap-3
"
>


<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="
p-2
border
rounded-lg
disabled:opacity-40
"

>

<ChevronLeft size={18}/>

</button>






<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="
p-2
border
rounded-lg
disabled:opacity-40
"

>

<ChevronRight size={18}/>

</button>



</div>


</div>





</div>



</div>


);


}