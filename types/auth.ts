import { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;

  email: string;

  password: string;

  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthState {
  token: string | null;

  user: User | null;

  isAuthenticated: boolean;

  loading: boolean;
}

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",

  DEAN = "DEAN",

  TEACHER = "TEACHER",

  STUDENT = "STUDENT",

  PARENT = "PARENT",
} 