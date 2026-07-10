import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  roles?: string[];
}

interface GlobalState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  globalSearchTerm: string;

  token: string | null;
  currentUser: User | null;
}

const initialState: GlobalState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  globalSearchTerm: "",

  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  currentUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },

    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(action.payload));
      }
    },

    setGlobalSearchTerm: (state, action: PayloadAction<string>) => {
      state.globalSearchTerm = action.payload;
    },

    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user: User;
      }>,
    ) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },

    logout: (state) => {
      state.token = null;
      state.currentUser = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },

    hydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        state.token = localStorage.getItem("token");

        state.currentUser = JSON.parse(localStorage.getItem("user") || "null");
      }
    },
  },
});

export const {
  setIsSidebarCollapsed,
  setIsDarkMode,
  setGlobalSearchTerm,
  setCredentials,
  logout,
  hydrateAuth,
} = globalSlice.actions;

export default globalSlice.reducer;
