import { apiClient } from "@/lib/api-client";
import { Student } from "@/types/student";

export interface StudentFilters {
  search?: string;
  grade?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const StudentService = {
  /**
   * Retrieves a paginated list of student records matching specified filters.
   */
  getAll: async (filters: StudentFilters = {}) => {
    const stringParams = Object.entries(filters).reduce((acc, [key, val]) => {
      if (val !== undefined && val !== null) {
        acc[key] = String(val);
      }
      return acc;
    }, {} as Record<string, string>);

    return apiClient<{ data: Student[]; total: number }>("/students", {
      method: "GET",
      params: stringParams,
    });
  },

  /**
   * Retrieves a single full student file profile.
   */
  getById: async (id: string) => {
    return apiClient<Student>(`/students/${id}`, {
      method: "GET",
    });
  },

  /**
   * Creates a new structural student baseline tracking card.
   */
  create: async (studentData: Omit<Student, "id" | "studentId">) => {
    return apiClient<Student>("/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    });
  },

  /**
   * Updates partial metrics or tracking items on an existing student record.
   */
  update: async (id: string, updates: Partial<Student>) => {
    return apiClient<Student>(`/students/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  /**
   * Deactivates or drops a record from current term views safely.
   */
  delete: async (id: string) => {
    return apiClient<void>(`/students/${id}`, {
      method: "DELETE",
    });
  }
};