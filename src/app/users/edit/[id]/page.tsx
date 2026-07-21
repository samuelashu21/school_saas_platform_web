"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Pencil,
  ShieldCheck,
  UserCog,
} from "lucide-react";


import {
  useParams,
} from "next/navigation";


import Header from "@/app/(components)/Header";


import {
  useGetUserByIdQuery,
} from "@/app/state/module/users/userApi";


import UpdateUserForm from "../../components/UpdateUserForm";





export default function EditUserPage(){


  const params = useParams();


  const id = params.id as string;




  const {
    data:user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id);








  if(isLoading)

    return (

      <div
        className="
        p-6
        "
      >

        <div
          className="
          bg-white
          rounded-xl
          shadow-sm
          p-8
          animate-pulse
          "
        >

          Loading user information...

        </div>

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





      {/* HEADER */}

      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        "
      >



        <div>

          <Header
            name="Edit User"
          />



          <p
            className="
            text-gray-500
            mt-2
            "
          >

            Update profile information, account status and permissions.

          </p>


        </div>






        <Link

          href={`/users/details/${user.id}`}

          className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2.5
          rounded-xl
          border
          bg-white
          hover:bg-gray-50
          transition
          "

        >

          <ArrowLeft size={18}/>

          Back to Profile

        </Link>




      </div>









      {/* USER SUMMARY */}


      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        "
      >



        <div
          className="
          bg-white
          border
          rounded-xl
          shadow-sm
          p-5
          flex
          items-center
          gap-4
          "
        >


          <div
            className="
            bg-blue-100
            text-blue-600
            p-3
            rounded-lg
            "
          >

            <UserCog size={24}/>

          </div>



          <div>

            <p
              className="
              text-sm
              text-gray-500
              "
            >

              Editing

            </p>


            <h3
              className="
              font-semibold
              "
            >

              {user.firstName} {user.lastName}

            </h3>


          </div>


        </div>






        <div
          className="
          bg-white
          border
          rounded-xl
          shadow-sm
          p-5
          "
        >


          <p
            className="
            text-sm
            text-gray-500
            "
          >

            Email

          </p>


          <p
            className="
            font-semibold
            mt-1
            break-all
            "
          >

            {user.email}

          </p>


        </div>







        <div
          className="
          bg-white
          border
          rounded-xl
          shadow-sm
          p-5
          "
        >


          <p
            className="
            text-sm
            text-gray-500
            "
          >

            Current Status

          </p>



          <span
            className={`

            inline-block

            mt-2

            px-3

            py-1

            rounded-full

            text-sm

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

            {user.isActive
            ?
            "ACTIVE"
            :
            "DISABLED"
            }

          </span>


        </div>




      </div>









      {/* FORM */}



      <div
        className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        overflow-hidden
        "
      >



        <div
          className="
          px-6
          py-5
          border-b
          "
        >


          <div
            className="
            flex
            items-center
            gap-3
            "
          >

            <div
              className="
              p-2
              rounded-lg
              bg-blue-100
              text-blue-600
              "
            >

              <Pencil size={20}/>

            </div>



            <div>

              <h2
                className="
                font-semibold
                text-lg
                "
              >

                Update Information

              </h2>


              <p
                className="
                text-sm
                text-gray-500
                "
              >

                Modify user details and save changes.

              </p>


            </div>


          </div>



        </div>







        <div
          className="
          p-6
          "
        >

          <UpdateUserForm
            user={user}
          />


        </div>




      </div>








      {/* ROLE NOTICE */}


      <div
        className="
        bg-purple-50
        border
        border-purple-100
        rounded-xl
        p-5
        flex
        gap-4
        "
      >

        <ShieldCheck
          className="text-purple-600"
          size={24}
        />


        <div>

          <h3
            className="
            font-semibold
            text-purple-900
            "
          >

            Role Management

          </h3>


          <p
            className="
            text-sm
            text-purple-700
            mt-1
            "
          >

            Role changes affect user permissions across the system.

          </p>


        </div>


      </div>




    </div>

  );

}