import { apiClient } from "@/lib/api-client";
import { SubjectGrade } from "@/types/grade";

export const GradeService = {
  /**
   * Fetches the official gradebook roster logs for an entire class section tier.
   */
  getBySection: async (sectionId: string) => {
    return apiClient<SubjectGrade[]>(`/grades/sections/${sectionId}`, {
      method: "GET",
    });
  },

  /**
   * Updates individual test weights or final assessment outcomes for a specific student assignment.
   */
  updateScore: async (gradeId: string, payload: { numericScore: number; feedback?: string }) => {
    return apiClient<SubjectGrade>(`/grades/${gradeId}/score`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }
};