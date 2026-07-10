"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegisterMutation } from "@/app/state/api";
import { useAppDispatch } from "@/app/redux";
import { setCredentials } from "@/app/state";

type RegisterError = {
  data?: {
    message?: string;
  };
};

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      const result = await register(form).unwrap();

      dispatch(
        setCredentials({
          token: result.token,
          user: result.user,
        }),
      );

      router.replace("/dashboard");
    } catch (err) {
      const error = err as RegisterError;

      setError(
        error?.data?.message ??
          "Registration failed. Please verify your account information.",
      );
    }
  };

  return (
    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
    "
    >
      <section
        className="
        w-full
        max-w-md
        bg-white
        rounded-2xl
        shadow-xl
        border
        border-gray-100
        p-8
        m-4
      "
      >
        <h1
          className="
          text-2xl
          font-bold
          text-gray-900
        "
        >
          Create Account
        </h1>

        <p
          className="
          text-sm
          text-gray-500
          mt-1
          mb-6
        "
        >
          Register a new institutional system user
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-1
            "
            >
              Full Name
            </label>

            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Administrator"
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-3
                py-2.5
                text-sm
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-1
            "
            >
              Email Address
            </label>

            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="admin@academy.edu"
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-3
                py-2.5
                text-sm
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-1
            "
            >
              Password
            </label>

            <input
              name="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-3
                py-2.5
                text-sm
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {error && (
            <p
              className="
                text-sm
                font-medium
                text-red-500
              "
            >
              {error}
            </p>
          )}

          <button
            disabled={isLoading}
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              rounded-xl
              py-2.5
              text-sm
              font-bold
              hover:bg-blue-700
              disabled:opacity-50
              transition
            "
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div
          className="
          relative
          my-6
        "
        >
          <div
            className="
            absolute
            inset-0
            flex
            items-center
          "
          >
            <span
              className="
              w-full
              border-t
              border-gray-200
            "
            />
          </div>

          <div
            className="
            relative
            flex
            justify-center
          "
          >
            <span
              className="
              bg-white
              px-3
              text-xs
              uppercase
              text-gray-400
            "
            >
              Account Verification
            </span>
          </div>
        </div>

        <p
          className="
          text-sm
          text-center
          text-gray-500
        "
        >
          Already registered?{" "}
          <Link
            href="/login"
            className="
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}
