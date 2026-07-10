"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginMutation } from "@/app/state/api";
import { useAppDispatch } from "@/app/redux";
import { setCredentials } from "@/app/state";

type LoginResponseError = {
  data?: {
    message?: string;
  };
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({
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
      const result = await login(form).unwrap();

      dispatch(
        setCredentials({
          token: result.token,
          user: result.user,
        }),
      );

      router.replace("/dashboard");
    } catch (err) {
      const error = err as LoginResponseError;

      setError(error?.data?.message ?? "Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section
        className="
        w-full max-w-md 
        bg-white 
        rounded-2xl 
        shadow-lg 
        border border-gray-100
        p-8
      "
      >
        <h1
          className="
          text-2xl 
          font-bold 
          text-gray-900
        "
        >
          Welcome Back
        </h1>

        <p
          className="
          text-sm 
          text-gray-500 
          mt-1 
          mb-6
        "
        >
          Sign in to access the Student Information Management System
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                px-3
                py-2.5
                rounded-lg
                border
                border-gray-300
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
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="
                w-full
                px-3
                py-2.5
                rounded-lg
                border
                border-gray-300
                text-sm
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {error && (
            <div
              className="
                rounded-lg
                bg-red-50
                border
                border-red-200
                px-3
                py-2
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full
              bg-blue-600
              text-white
              py-2.5
              rounded-lg
              text-sm
              font-semibold
              hover:bg-blue-700
              disabled:opacity-50
              transition
            "
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p
          className="
          text-center
          text-sm
          text-gray-500
          mt-6
        "
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            Create Account
          </Link>
        </p>
      </section>
    </main>
  );
}
