"use client";

import {
  Enrollment
} from "@/app/state/module/studentEnrollment/studentEnrollmentApi";


interface Props {


  enrollment: Enrollment;


  onView:(
    enrollment:Enrollment
  )=>void;



  onPromote:(
    enrollment:Enrollment
  )=>void;



  onTransfer:(
    enrollment:Enrollment
  )=>void;



  onReadmit:(
    enrollment:Enrollment
  )=>void;



  onWithdraw:(
    enrollment:Enrollment
  )=>void;



  onDelete:(
    enrollment:Enrollment
  )=>void;


}




export default function EnrollmentActions({

  enrollment,

  onView,

  onPromote,

  onTransfer,

  onReadmit,

  onWithdraw,

  onDelete,

}:Props){



  return (

    <div className="
      flex
      gap-2
      flex-wrap
    ">


      <button

        onClick={()=>
          onView(enrollment)
        }

        className="
          px-3
          py-1
          rounded
          border
          text-sm
        "

      >

        View

      </button>





      <button

        onClick={()=>
          onPromote(enrollment)
        }

        className="
          px-3
          py-1
          rounded
          border
          text-sm
        "

      >

        Promote

      </button>






      <button

        onClick={()=>
          onTransfer(enrollment)
        }

        className="
          px-3
          py-1
          rounded
          border
          text-sm
        "

      >

        Transfer

      </button>







      <button

        onClick={()=>
          onReadmit(enrollment)
        }

        className="
          px-3
          py-1
          rounded
          border
          text-sm
        "

      >

        Readmit

      </button>







      <button

        onClick={()=>
          onWithdraw(enrollment)
        }

        className="
          px-3
          py-1
          rounded
          border
          text-sm
          text-orange-600
        "

      >

        Withdraw

      </button>








      <button

        onClick={()=>
          onDelete(enrollment)
        }

        className="
          px-3
          py-1
          rounded
          border
          text-sm
          text-red-600
        "

      >

        Delete

      </button>





    </div>

  );

}