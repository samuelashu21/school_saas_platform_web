"use client";

interface Props {
  form: any;

  updateField: (
    key: string,
    value: string
  ) => void;

  academicPeriods?: any[];

  classes?: any[];
}


const AcademicSelectionFields = ({
  form,
  updateField,
  academicPeriods = [],
  classes = [],

}: Props) => {


  return (

    <div className="mt-6">


      <h3 className="
                font-semibold
                text-gray-700
                mb-3
            ">
        Academic Information
      </h3>



      <div className="
                grid
                md:grid-cols-2
                gap-4
            ">


        {/* Academic Period */}

        <div>

          <label className="
                        text-sm
                        text-gray-600
                    ">
            Academic Period
          </label>


          <select

            value={form.academicPeriodId}

            onChange={(e) =>
              updateField(
                "academicPeriodId",
                e.target.value
              )
            }

            className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            mt-1
                        "

          >

            <option value="">
              Select Academic Period
            </option>


            {
              academicPeriods.map(
                (period) => (

                  <option
                    key={period.id}
                    value={period.id}
                  >

                    {period.academicYear}
                    {" - "}
                    {period.semester}

                  </option>

                )
              )
            }


          </select>


        </div>





        {/* Class */}

        <div>


          <label className="
                        text-sm
                        text-gray-600
                    ">
            Class
          </label>


          <select

            value={form.classId}

            onChange={(e) =>
              updateField(
                "classId",
                e.target.value
              )
            }

            className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            mt-1
                        "

          >

            <option value="">
              Select Class
            </option>


            {
              classes.map(
                (item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >

                    {
                      item.gradeLevel?.name
                      ??
                      ""
                    }

                    {" - "}

                    {item.name}

                  </option>

                )
              )
            }


          </select>


        </div>


      </div>


    </div>

  );

};


export default AcademicSelectionFields;