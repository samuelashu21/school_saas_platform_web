"use client";

import { useRef } from "react";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { setupListeners } from "@reduxjs/toolkit/query";

// reducers

import globalReducer from "@/app/state";

import authReducer from "@/app/state/module/auth";

import { api } from "@/app/state/api";

/* =====================================
   SERVER SAFE STORAGE
===================================== */

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },

  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },

  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

/* =====================================
   REDUX REDUCERS
===================================== */

const rootReducer = combineReducers({
  global: globalReducer,

  // Authentication state

  auth: authReducer,

  // RTK Query

  [api.reducerPath]: api.reducer,
});

/* =====================================
   PERSIST CONFIG
===================================== */

const persistedReducer = persistReducer(
  {
    key: "root",

    storage,

    whitelist: ["global", "auth"],
  },

  rootReducer,
);

/* =====================================
   STORE CREATOR
===================================== */

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

/* =====================================
   TYPES
===================================== */

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* =====================================
   PROVIDER
===================================== */

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  const persistorRef = useRef<ReturnType<typeof persistStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();

    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current!}>
        {children}
      </PersistGate>
    </Provider>
  );
}
