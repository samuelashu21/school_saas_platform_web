"use client";

import Link from "next/link";

import {
  UserPlus,
  Users,
  ShieldCheck,
} from "lucide-react";

import Header from "@/app/(components)/Header";

import UserTable from "../components/UserTable";


export default function UsersListPage() {


  return (

    <div
      className="
      space-y-6
      "
    >


      {/* Page Header */}

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
            name="Users"
          />


          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Manage accounts, roles, permissions and user access.
          </p>


        </div>



        <Link
          href="/users/create"
          className="
          inline-flex
          items-center
          justify-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-3
          rounded-xl
          shadow-sm
          transition
          "
        >

          <UserPlus
            size={20}
          />

          Create User

        </Link>


      </div>





      {/* Quick Info Cards */}

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
          rounded-xl
          shadow-sm
          border
          p-5
          flex
          items-center
          gap-4
          "
        >

          <div
            className="
            p-3
            rounded-lg
            bg-blue-100
            text-blue-600
            "
          >

            <Users
              size={24}
            />

          </div>


          <div>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              User Directory
            </p>


            <h3
              className="
              font-semibold
              text-lg
              "
            >
              All Accounts
            </h3>

          </div>


        </div>





        <div
          className="
          bg-white
          rounded-xl
          shadow-sm
          border
          p-5
          flex
          items-center
          gap-4
          "
        >

          <div
            className="
            p-3
            rounded-lg
            bg-purple-100
            text-purple-600
            "
          >

            <ShieldCheck
              size={24}
            />

          </div>


          <div>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              Security
            </p>


            <h3
              className="
              font-semibold
              text-lg
              "
            >
              Roles & Access
            </h3>

          </div>


        </div>





        <div
          className="
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          rounded-xl
          shadow-sm
          p-5
          text-white
          "
        >

          <p
            className="
            text-sm
            opacity-90
            "
          >
            Administration
          </p>


          <h3
            className="
            font-bold
            text-lg
            mt-1
            "
          >
            Manage School Users
          </h3>


        </div>



      </div>





      {/* Users Table */}

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
          py-4
          border-b
          "
        >

          <h2
            className="
            font-semibold
            text-lg
            "
          >
            User List
          </h2>


          <p
            className="
            text-sm
            text-gray-500
            mt-1
            "
          >
            View, update, activate, deactivate and manage users.
          </p>


        </div>



        <div
          className="
          p-5
          "
        >

          <UserTable />

        </div>


      </div>



    </div>

  );

}