"use client";

const EnrollmentClosed = () => {
    return (
        <div className="text-center py-10">
            <div className="text-5xl mb-4">
                🔒
            </div>

            <h2 className="text-xl font-bold text-gray-800">
                Enrollment Closed
            </h2>

            <p className="text-gray-500 mt-3">
                Student enrollment is currently unavailable.
                Please contact the school administration.
            </p>
        </div>
    );
};

export default EnrollmentClosed;