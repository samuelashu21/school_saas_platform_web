"use client";

const EnrollmentSuccess = () => {
    return (
        <div className="text-center py-10">
            <div
                className="
          w-16
          h-16
          rounded-full
          bg-green-100
          text-green-600
          flex
          items-center
          justify-center
          mx-auto
          text-3xl
        "
            >
                ✓
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
                Enrollment Created Successfully
            </h2>

            <p className="text-gray-500 mt-3">
                The student has been successfully enrolled into the selected
                class and academic period.
            </p>
        </div>
    );
};

export default EnrollmentSuccess;