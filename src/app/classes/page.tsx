"use client";

import { useState } from "react";

import {
  useGetClassesQuery,
} from "@/app/state/module/classes/classApi";

import ClassTable from "./ClassTable";

import CreateClassModal from "./CreateClassModal";
 
import EditClassModal from "./EditClassModal";

import DeleteClassDialog from "./DeleteClassDialog";


export interface ClassItem {
  id: string;

  name: string;

  gradeLevelId: string;

  gradeLevel?: {
    id: string;
    name: string;
    level: number;
  };

  gradeLevelName?: string;

  createdAt: string;

  school?: {
    id:string;
    name:string;
  };
}


const ClassesPage = () => {

  const {
    data: classes = [],
    isLoading,
    isError,
  } = useGetClassesQuery();


  const [openCreate,setOpenCreate] = useState(false);


  const [selectedClass,setSelectedClass] =
    useState<ClassItem | null>(null);


  const [deleteClass,setDeleteClass] =
    useState<ClassItem | null>(null);



  if(isLoading){

    return (
      <div className="p-6">
        Loading classes...
      </div>
    );

  }



  if(isError){

    return (
      <div className="p-6 text-red-600">
        Failed loading classes
      </div>
    );

  }



  return (

    <div className="p-6 space-y-6">


      {/* HEADER */}

      <div
        className="
        flex
        justify-between
        items-center
        "
      >

        <div>

          <h1
            className="
            text-2xl
            font-bold
            text-gray-800
            "
          >
            Class Management
          </h1>


          <p
            className="
            text-gray-500
            "
          >
            Manage school classes and grade assignments
          </p>

        </div>



        <button

          onClick={()=>setOpenCreate(true)}

          className="
          bg-blue-600
          text-white
          px-5
          py-3
          rounded-lg
          hover:bg-blue-700
          "

        >

          Create Class

        </button>


      </div>



      {/* TABLE */}

      <ClassTable

        classes={classes}

        onEdit={(item)=>
          setSelectedClass(item)
        }


        onDelete={(item)=>
          setDeleteClass(item)
        }

      />




      {/* CREATE */}

      {
        openCreate &&
        (

          <CreateClassModal

            onClose={()=>
              setOpenCreate(false)
            }

          />

        )
      }




      {/* EDIT */}

      {
        selectedClass &&
        (

          <EditClassModal

            classData={selectedClass}

            onClose={()=>
              setSelectedClass(null)
            }

          />

        )
      }





      {/* DELETE */}

      {
        deleteClass &&
        (

          <DeleteClassDialog

            classData={deleteClass}

            onClose={()=>
              setDeleteClass(null)
            }

          />

        )
      }


    </div>

  );

};


export default ClassesPage; 