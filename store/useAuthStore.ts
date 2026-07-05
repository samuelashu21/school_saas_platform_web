import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tokenStorage } from "@/lib/token";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        tokenStorage.set(token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        tokenStorage.remove();
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
); 