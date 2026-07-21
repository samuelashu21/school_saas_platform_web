"use client";

import { useMemo, useState } from "react";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";


import {
  Pencil,
  Trash2,
  Search,
  ShieldCheck,
  Eye,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/app/state/module/users/userApi";




const UserTable = () => {


  const router = useRouter();



  const [search, setSearch] = useState("");



  const {
    data: users,
    isLoading,
    isError

  } = useGetUsersQuery();





  const [
    updateUser,
    {
      isLoading: updatingStatus
    }

  ] = useUpdateUserMutation();








  const rows = useMemo(() => {


    if (!users)

      return [];




    const mapped =
      users.map(user => (


        {

          id: user.id,

          user,

          photo: user.photo,

          name:
            `${user.firstName} ${user.lastName}`,

          email: user.email,


          role: user.roles?.length

            ?

            user.roles
              .map(
                (r: any) => r.role.name
              )
              .join(",")

            :

            "NO ROLE",



          isActive: user.isActive,


          createdAt: user.createdAt


        }


      ));






    if (!search.trim())

      return mapped;





    const key =
      search.toLowerCase();




    return mapped.filter(row =>

      row.name
        .toLowerCase()
        .includes(key)

      ||

      row.email
        .toLowerCase()
        .includes(key)

      ||

      row.role
        .toLowerCase()
        .includes(key)


    );



  }, [users, search]);









  const toggleStatus =
    async (user: any) => {


      try {


        const data =
          new FormData();



        data.append(
          "isActive",
          String(!user.isActive)
        );




        await updateUser({

          id: user.id,

          data

        }).unwrap();



      }

      catch (err) {

        console.log(err);

      }


    };










  const columns: GridColDef[] = [


    {

      field: "photo",

      headerName: "Photo",

      width: 90,

      renderCell: (params) => (


        <img

          src={
            params.value ||
            "/avatar.png"
          }

          className="
w-10
h-10
rounded-full
object-cover
"

        />


      )


    },




    {


      field: "name",

      headerName: "Name",

      flex: 1,

      minWidth: 180


    },




    {


      field: "email",

      headerName: "Email",

      flex: 1,

      minWidth: 220


    },




    {


      field: "role",

      headerName: "Role",

      flex: 1,

      minWidth: 180


    },




    {


      field: "isActive",

      headerName: "Status",

      width: 140,


      renderCell: (params) => (


        <button

          disabled={updatingStatus}

          onClick={(e) => {


            e.stopPropagation();

            toggleStatus(
              params.row.user
            );


          }}

          className={`
px-3
py-1
rounded-lg
text-xs
font-semibold

${params.value
              ?
              "bg-green-100 text-green-700"
              :
              "bg-red-100 text-red-700"
            }

`}

        >


          {
            params.value
              ?
              "ACTIVE"
              :
              "DISABLED"
          }



        </button>


      )


    },




    {


      field: "createdAt",

      headerName: "Created",

      width: 140,


      valueGetter: (_, row) =>

        new Date(
          row.createdAt
        )
          .toLocaleDateString()


    },




    {


      field: "actions",

      headerName: "Actions",

      width: 200,


      renderCell: (params) => (


        <div className="
flex
gap-3
">


          <button

            title="View"

            onClick={(e) => {


              e.stopPropagation();


              router.push(
                `/users/details/${params.row.id}`
              );


            }}

            className="
text-green-600
"

          >

            <Eye size={18} />

          </button>







          <button

            title="Edit"

            onClick={(e) => {


              e.stopPropagation();


              router.push(
                `/users/edit/${params.row.id}`
              );


            }}

            className="
text-blue-600
"

          >

            <Pencil size={18} />

          </button>









          <button

            title="Delete"

            onClick={(e) => {


              e.stopPropagation();


              router.push(
                `/users/delete/${params.row.id}`
              );


            }}

            className="
text-red-600
"

          >

            <Trash2 size={18} />

          </button>







          <button

            title="Role"

            onClick={(e) => {


              e.stopPropagation();


              router.push(
                `/users/roles/${params.row.id}`
              );


            }}

            className="
text-purple-600
"

          >

            <ShieldCheck size={18} />

          </button>




        </div>


      )


    }





  ];









  if (isLoading)

    return (

      <div className="p-5">

        Loading users...

      </div>

    );







  if (isError)

    return (

      <div className="p-5 text-red-600">

        Failed loading users

      </div>

    );








  return (

    <div>


      <div className="
mb-5
flex
justify-between
">


        <div className="
relative
max-w-md
w-full
">


          <Search

            size={18}

            className="
absolute
left-3
top-3
text-gray-400
"

          />


          <input


            placeholder="Search users..."

            value={search}

            onChange={
              e => setSearch(
                e.target.value
              )
            }


            className="
w-full
border
rounded-lg
pl-10
py-2
"


          />


        </div>



        <div className="
text-gray-500
">

          {rows.length} users

        </div>


      </div>








      <DataGrid

        rows={rows}

        columns={columns}

        getRowId={
          row => row.id
        }


        disableRowSelectionOnClick


        pageSizeOptions={
          [10, 20, 50]
        }


        onRowClick={
          (params) =>

            router.push(
              `/users/details/${params.row.id}`
            )

        }



        className="
bg-white
rounded-xl
shadow
"

      />

 

    </div>


  );



};



export default UserTable;