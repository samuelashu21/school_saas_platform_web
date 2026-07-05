import { User } from "./user";

export interface Teacher {
  id: string;

  userId: string;

  schoolId: string;

  firstName: string;

  lastName: string; 

  user?: User;
}

export interface CreateTeacherDto {
  userId: string;

  schoolId: string;

  firstName: string;

  lastName: string;
}

export interface UpdateTeacherDto {
  firstName?: string;

  lastName?: string;
}