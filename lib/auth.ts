import { api } from "./api-client";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  register: (data: { email: string; password: string; name: string }) =>
    api.post("/auth/register", data),

  me: () => api.get("/auth/me"),
};  