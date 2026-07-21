"use client";

import Link from "next/link";

import {
  Users,
  UserPlus,
  ShieldCheck,
  UserCog,
  ArrowRight,
} from "lucide-react";

import Header from "@/app/(components)/Header";

import { useGetUsersQuery } from "@/app/state/module/users/userApi";

export default function UsersDashboardPage() {
  const { data: users, isLoading } = useGetUsersQuery();

  const totalUsers = users?.length ?? 0;

  const activeUsers =
    users?.filter((u) => u.isActive).length ?? 0;

  const disabledUsers =
    users?.filter((u) => !u.isActive).length ?? 0;

  return (
    <div className="space-y-6">

      <Header name="User Management Dashboard" />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center">
            <Users className="text-blue-600" size={30} />
            <span className="text-3xl font-bold">
              {isLoading ? "--" : totalUsers}
            </span>
          </div>

          <p className="mt-3 text-gray-500">
            Total Users
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center">
            <UserCog className="text-green-600" size={30} />
            <span className="text-3xl font-bold">
              {isLoading ? "--" : activeUsers}
            </span>
          </div>

          <p className="mt-3 text-gray-500">
            Active Users
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center">
            <ShieldCheck className="text-red-600" size={30} />
            <span className="text-3xl font-bold">
              {isLoading ? "--" : disabledUsers}
            </span>
          </div>

          <p className="mt-3 text-gray-500">
            Disabled Users
          </p>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <Link
            href="/users/list"
            className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            p-5
            hover:bg-blue-50
            transition
            "
          >
            <div>

              <Users className="text-blue-600 mb-2" />

              <h3 className="font-semibold">
                View Users
              </h3>

              <p className="text-sm text-gray-500">
                Browse all users
              </p>

            </div>

            <ArrowRight />
          </Link>

          <Link
            href="/users/create"
            className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            p-5
            hover:bg-blue-50
            transition
            "
          >
            <div>

              <UserPlus className="text-green-600 mb-2" />

              <h3 className="font-semibold">
                Create User
              </h3>

              <p className="text-sm text-gray-500">
                Register a new account
              </p>

            </div>

            <ArrowRight />
          </Link>

          <Link
            href="/users/roles"
            className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            p-5
            hover:bg-blue-50
            transition
            "
          >
            <div>

              <ShieldCheck className="text-purple-600 mb-2" />

              <h3 className="font-semibold">
                Assign Roles
              </h3>

              <p className="text-sm text-gray-500">
                Manage permissions
              </p>

            </div>

            <ArrowRight />
          </Link>

        </div>

      </div>

    </div>
  );
}