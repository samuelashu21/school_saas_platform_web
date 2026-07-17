"use client";
 
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux";

export default function Page() {
  const router = useRouter();

  const roles = useAppSelector((state) => state.global.currentUser?.roles ?? []);

  useEffect(() => {
    const normalizedRoles = roles.map((role) => role.toUpperCase());
    const isAdmin =
      normalizedRoles.includes("SCHOOL_ADMIN") || normalizedRoles.includes("SUPER_ADMIN");

    if (normalizedRoles.includes("REGISTRAR") && !isAdmin) {
      router.replace("/student-registration/register");
      return;
    }

    if (isAdmin) {
      router.replace("/student-registration/approvals");
      return;
    }

    router.replace("/dashboard");
  }, [roles, router]);

  return null;
}