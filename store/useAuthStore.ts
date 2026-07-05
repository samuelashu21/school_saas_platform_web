import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, AuthState } from "@/types/auth";

interface AuthActions {
  setCredentials: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setCredentials: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "sims-auth-storage",
    }
  )
);