"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Bell,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  X,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import {
  logout,
  setGlobalSearchTerm,
  setIsDarkMode,
  setIsSidebarCollapsed,
} from "@/app/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const search = useAppSelector((state) => state.global.globalSearchTerm ?? "");

  const currentUser = useAppSelector((state) => state.global.currentUser);

  const [notificationCount, setNotificationCount] = useState(3);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    currentUser?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <header
      className="flex items-center justify-between gap-6 mb-7"
      data-testid="top-navbar"
    >
      {/* LEFT */}

      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700"
          data-testid="toggle-sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="search"
            value={search}
            placeholder="Search..."
            onChange={(e) => dispatch(setGlobalSearchTerm(e.target.value))}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {search && (
            <button
              onClick={() => dispatch(setGlobalSearchTerm(""))}
              className="absolute right-3 top-3"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          data-testid="toggle-dark-mode"
        >
          {isDarkMode ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-gray-500" />
          )}
        </button>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            data-testid="notifications-toggle"
          >
            <Bell className="text-gray-500" />

            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-72 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg z-50 p-4">
              <h3 className="font-semibold mb-3">Notifications</h3>

              <ul className="space-y-2 text-sm">
                <li>Attendance summary processed.</li>
                <li>Three students flagged.</li>
                <li>New course created.</li>
              </ul>

              <button
                onClick={() => {
                  setNotificationCount(0);
                  setIsNotificationsOpen(false);
                }}
                className="mt-4 w-full rounded bg-blue-600 text-white py-2 text-sm hover:bg-blue-700"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        <Link href="/settings">
          <Settings className="text-gray-500 hover:text-blue-600" />
        </Link>

        <div
          className="hidden md:flex items-center gap-3"
          data-testid="profile-chip"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {initials}
          </div>

          <div>
            <p className="font-semibold">{currentUser?.name || "Guest"}</p>

            <p className="text-xs text-gray-500">{currentUser?.email || ""}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 hover:bg-red-100 hover:text-red-600"
        >
          <LogOut size={16} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
