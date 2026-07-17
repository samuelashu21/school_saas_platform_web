"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/redux";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const router = useRouter();

  const globalRoles = useAppSelector((state) => state.global.currentUser?.roles ?? []);
  const authRoles = useAppSelector((state) => state.auth.user?.roles ?? []);

  const normalizedAllowedRoles = useMemo(
    () => allowedRoles.map((role) => role.toUpperCase()),
    [allowedRoles],
  );

  const normalizedUserRoles = useMemo(
    () => (globalRoles.length > 0 ? globalRoles : authRoles).map((role) => role.toUpperCase()),
    [authRoles, globalRoles],
  );

  const isAuthorized = normalizedUserRoles.some((role) =>
    normalizedAllowedRoles.includes(role),
  );

  useEffect(() => {
    if (!isAuthorized) {
      router.replace("/dashboard");
    }
  }, [isAuthorized, router]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
