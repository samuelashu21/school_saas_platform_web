import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// =============================
// USER TYPE
// =============================

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt?: string;
}


// =============================
// GLOBAL STATE
// =============================

interface GlobalState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  globalSearchTerm: string;

  token: string | null;
  currentUser: User | null;
}


// =============================
// SAFE STORAGE HELPERS
// =============================

const getStoredUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(
      localStorage.getItem("user") || "null",
    );
  } catch {
    return null;
  }
};


// =============================
// INITIAL STATE
// =============================

const initialState: GlobalState = {
  isSidebarCollapsed: false,

  isDarkMode:
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("darkMode") || "false",
        )
      : false,

  globalSearchTerm: "",


  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,


  currentUser: getStoredUser(),
};


// =============================
// SLICE
// =============================

const globalSlice = createSlice({
  name: "global",

  initialState,

  reducers: {


    // =====================
    // SIDEBAR
    // =====================

    setIsSidebarCollapsed: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isSidebarCollapsed = action.payload;
    },


    // =====================
    // DARK MODE
    // =====================

    setIsDarkMode: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isDarkMode = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "darkMode",
          JSON.stringify(action.payload),
        );
      }
    },


    // =====================
    // SEARCH
    // =====================

    setGlobalSearchTerm: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.globalSearchTerm = action.payload;
    },


    // =====================
    // AUTH
    // =====================

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

        localStorage.setItem(
          "token",
          action.payload.token,
        );


        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user),
        );
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

        state.token =
          localStorage.getItem("token");


        state.currentUser =
          getStoredUser();
      }
    },

  },
});


// =============================
// EXPORTS
// =============================

export const {
  setIsSidebarCollapsed,
  setIsDarkMode,
  setGlobalSearchTerm,
  setCredentials,
  logout,
  hydrateAuth,
} = globalSlice.actions;


export default globalSlice.reducer;