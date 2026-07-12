"use client";

import {
  useRemoveAssignmentMutation,
} from "@/app/state/module/teacherSubjects/teacherSubjectApi";


interface Props {
  assignment: any;
  onClose: () => void;
}


export default function RemoveAssignmentDialog({
  assignment,
  onClose,
}: Props) {


  const [
    removeAssignment,
    { isLoading },
  ] = useRemoveAssignmentMutation();



  const submit = async () => {

    try {

      await removeAssignment(
        assignment.id
      ).unwrap();


      onClose();


    } catch (error) {

      console.error(
        "Failed removing assignment:",
        error
      );

    }

  };



  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >

      <div
        className="
        bg-white
        rounded-xl
        w-full
        max-w-md
        p-6
        "
      >


        <h2
          className="
          text-xl
          font-bold
          mb-3
          text-red-600
          "
        >
          Remove Assignment
        </h2>



        <p
          className="
          text-gray-600
          mb-6
          "
        >

          Are you sure you want to remove

          <strong>
            {" "}
            {assignment.teacher.account.name}
          </strong>

          's assignment to

          <strong>
            {" "}
            {assignment.subject.name}
          </strong>

          ?

        </p>




        <div
          className="
          flex
          justify-end
          gap-3
          "
        >



          <button

            onClick={onClose}

            className="
            px-4
            py-2
            rounded
            bg-gray-200
            "

          >

            Cancel

          </button>





          <button

            disabled={isLoading}

            onClick={submit}

            className="
            px-4
            py-2
            rounded
            bg-red-600
            text-white
            hover:bg-red-700
            disabled:opacity-50
            "

          >

            {isLoading
              ? "Removing..."
              : "Remove"}

          </button>



        </div>


      </div>


    </div>

  );

}  