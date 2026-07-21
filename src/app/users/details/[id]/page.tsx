"use client";

import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  ArrowLeft,
  Pencil,
  Mail,
  ShieldCheck,
  Calendar,
  MapPin,
  Building2,
  User,
} from "lucide-react";


import Header from "@/app/(components)/Header";


import {
  useGetUserByIdQuery,
} from "@/app/state/module/users/userApi";




export default function UserDetailsPage(){


  const params = useParams();

  const router = useRouter();


  const id = params.id as string;



  const {
    data:user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id);





  if(isLoading)

    return (

      <div className="p-6">

        <div
          className="
          bg-white
          rounded-xl
          shadow-sm
          p-8
          animate-pulse
          "
        >
          Loading user profile...

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
            name="User Details"
          />


          <p
            className="
            text-gray-500
            mt-2
            "
          >

            View account information and permissions.

          </p>


        </div>





        <button

          onClick={()=>router.back()}

          className="
          flex
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

          Back

        </button>



      </div>








      {/* PROFILE CARD */}


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
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          p-8
          text-white
          "
        >


          <div
            className="
            flex
            flex-col
            md:flex-row
            md:items-center
            gap-6
            "
          >



            <img

              src={
                user.photo || "/avatar.png"
              }

              alt="profile"

              className="
              w-32
              h-32
              rounded-full
              object-cover
              border-4
              border-white
              shadow
              "

            />





            <div>


              <h1
                className="
                text-3xl
                font-bold
                "
              >

                {user.firstName} {user.lastName}

              </h1>




              <div
                className="
                flex
                items-center
                gap-2
                mt-2
                text-blue-100
                "
              >

                <Mail size={16}/>

                {user.email}

              </div>





              <span
                className={`
                inline-flex
                mt-4
                px-4
                py-1
                rounded-full
                text-sm
                font-semibold

                ${
                  user.isActive
                  ?
                  "bg-green-500"
                  :
                  "bg-red-500"
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


        </div>









        {/* DETAILS */}


        <div
          className="
          p-8
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >



          <Info
            icon={<User size={18}/>}
            label="First Name"
            value={user.firstName}
          />



          <Info
            icon={<User size={18}/>}
            label="Last Name"
            value={user.lastName}
          />




          <Info
            icon={<Mail size={18}/>}
            label="Email"
            value={user.email}
          />




          <Info
            icon={<MapPin size={18}/>}
            label="Address"
            value={user.address || "N/A"}
          />





          <Info
            icon={<Building2 size={18}/>}
            label="School"
            value={user.school?.name || "N/A"}
          />





          <Info
            icon={<Calendar size={18}/>}
            label="Created"
            value={
              new Date(
                user.createdAt
              ).toLocaleString()
            }
          />





          <div>

            <p
              className="
              text-sm
              text-gray-500
              flex
              items-center
              gap-2
              "
            >

              <ShieldCheck size={18}/>

              Roles

            </p>



            <div
              className="
              flex
              flex-wrap
              gap-2
              mt-2
              "
            >

              {
                user.roles?.length

                ?

                user.roles.map(
                  (r:any)=>(
                    <span
                      key={r.role.name}
                      className="
                      px-3
                      py-1
                      rounded-full
                      bg-purple-100
                      text-purple-700
                      text-sm
                      font-medium
                      "
                    >

                      {r.role.name}

                    </span>
                  )
                )

                :

                <span>
                  No Role
                </span>

              }


            </div>


          </div>






        </div>









        {/* ACTIONS */}


        <div
          className="
          border-t
          p-6
          flex
          justify-end
          gap-3
          "
        >


          <button

            onClick={()=>router.push(
              `/users/edit/${user.id}`
            )}

            className="
            inline-flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2.5
            rounded-xl
            "

          >

            <Pencil size={18}/>

            Edit User

          </button>


        </div>



      </div>




    </div>

  );

}








function Info({

  icon,

  label,

  value,

}:{

  icon:React.ReactNode;

  label:string;

  value:any;

}){


return (

<div>

<p
className="
text-sm
text-gray-500
flex
items-center
gap-2
"
>

{icon}

{label}

</p>


<p
className="
mt-1
font-semibold
break-all
"
>

{value}

</p>


</div>

);


}