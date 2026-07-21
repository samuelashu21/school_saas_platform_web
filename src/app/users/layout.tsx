"use client";

import { ReactNode } from "react";

export default function UsersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
      flex
      flex-col
      gap-6
      w-full
      "
    >
      {/* Page Container */}
      <div
        className="
        bg-gray-50
        min-h-screen
        p-6
        "
      >
        {children}
      </div>
    </div>
  );
}