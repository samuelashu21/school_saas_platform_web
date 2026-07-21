"use client";

import { useState } from "react";

import Link from "next/link";

import Header from "@/app/(components)/Header";

import {
  Search,
  UserCog,
} from "lucide-react"; 


import {
  useGetUsersQuery,
} from "@/app/state/module/users/userApi";




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







  if(isLoading){


    return (

      <div className="p-6">

        Loading users...

      </div>

    );


  }





  if(isError){


    return (

      <div
        className="
        p-6
        text-red-600
        "
      >

        Failed loading users.

      </div>

    );


  }








  const filteredUsers =

    users?.filter(

      (user:any)=>{


        const keyword =
          search.toLowerCase();



        return (

          `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(keyword)


          ||

          user.email
          .toLowerCase()
          .includes(keyword)

        );


      }

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
        p-5
        "
      >




        <div
          className="
          relative
          max-w-md
          mb-5
          "
        >


          <Search

            size={18}

            className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            "

          />



          <input

            placeholder="Search users..."

            value={search}

            onChange={
              e =>
              setSearch(
                e.target.value
              )
            }


            className="
            w-full
            border
            rounded-lg
            py-2
            pl-10
            pr-3
            "

          />


        </div>









        <div
          className="
          divide-y
          "
        >



          {
            filteredUsers?.map(

              (user:any)=>(



                <div

                  key={user.id}

                  className="
                  flex
                  items-center
                  justify-between
                  py-4
                  "

                >



                  <div>


                    <h3
                      className="
                      font-semibold
                      "
                    >

                      {user.firstName}
                      {" "}
                      {user.lastName}


                    </h3>



                    <p
                      className="
                      text-sm
                      text-gray-500
                      "
                    >

                      {user.email}

                    </p>





                    <p
                      className="
                      text-xs
                      text-blue-600
                      mt-1
                      "
                    >


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


                    </p>


                  </div>







                  <Link

                    href={
                      `/users/roles/${user.id}`
                    }


                    className="
                    flex
                    items-center
                    gap-2
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-blue-700
                    "

                  >

                    <UserCog size={18}/>


                    Assign Role


                  </Link>





                </div>


              )

            )

          }




        </div>




      </div>






    </div>

  );


}