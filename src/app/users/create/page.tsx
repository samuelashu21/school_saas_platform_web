"use client";

import Link from "next/link";

import {
  ArrowLeft,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

import Header from "@/app/(components)/Header";

import CreateUserForm from "../components/CreateUserForm";


export default function CreateUserPage() {


  return (

    <div
      className="
      space-y-6
      "
    >


      {/* Header Section */}

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
            name="Create User"
          />


          <p
            className="
            mt-2
            text-gray-500
            "
          >
            Create a new account and assign the required role.
          </p>


        </div>



        <Link
          href="/users/list"
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
          text-gray-700
          "
        >

          <ArrowLeft
            size={18}
          />

          Back to Users

        </Link>


      </div>





      {/* Information Cards */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
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
          gap-4
          items-start
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

            <UserPlus
              size={24}
            />

          </div>



          <div>

            <h3
              className="
              font-semibold
              "
            >
              New Account
            </h3>


            <p
              className="
              text-sm
              text-gray-500
              mt-1
              "
            >
              Add user information, upload photo and select access role.
            </p>


          </div>


        </div>





        <div
          className="
          bg-white
          border
          rounded-xl
          shadow-sm
          p-5
          flex
          gap-4
          items-start
          "
        >

          <div
            className="
            bg-purple-100
            text-purple-600
            p-3
            rounded-lg
            "
          >

            <ShieldCheck
              size={24}
            />

          </div>



          <div>

            <h3
              className="
              font-semibold
              "
            >
              Role Management
            </h3>


            <p
              className="
              text-sm
              text-gray-500
              mt-1
              "
            >
              Assign permissions according to the user's responsibility.
            </p>


          </div>


        </div>


      </div>





      {/* Create Form */}

      <div
        className="
        bg-white
        border
        rounded-2xl
        shadow-sm
        "
      >


        <div
          className="
          px-6
          py-5
          border-b
          "
        >

          <h2
            className="
            text-lg
            font-semibold
            "
          >
            User Information
          </h2>


          <p
            className="
            text-sm
            text-gray-500
            mt-1
            "
          >
            Fill in the details below to create the account.
          </p>


        </div>




        <div
          className="
          p-6
          "
        >

          <CreateUserForm />

        </div>


      </div>



    </div>

  );

}