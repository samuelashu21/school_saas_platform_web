"use client";

interface Props {
  open: boolean;
  user: any;
  onClose: () => void;
}

export default function UserDetailsModal({
  open,
  user,
  onClose,
}: Props) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex items-center gap-6">
            <img
              src={user.photo || "/avatar.png"}
              alt={user.firstName}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />

            <div>
              <h2 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-blue-100">{user.email}</p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
                  user.isActive
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {user.isActive ? "ACTIVE" : "DISABLED"}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 grid grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 text-sm">First Name</p>
            <p className="font-semibold">{user.firstName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Last Name</p>
            <p className="font-semibold">{user.lastName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p>{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Address</p>
            <p>{user.address || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p>
              {user.roles?.length
                ? user.roles.map((r: any) => r.role.name).join(", ")
                : "NO ROLE"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">School</p>
            <p>{user.school?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Account Created</p>
            <p>{new Date(user.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">User ID</p>
            <p className="break-all text-sm">{user.id}</p>
          </div>
        </div>

        <div className="border-t p-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 