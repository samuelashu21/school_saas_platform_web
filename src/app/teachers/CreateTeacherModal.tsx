"use client";

import { useState } from "react";
import { useCreateTeacherMutation } from "@/app/state/module/teachers/teacherApi";
import { useGetSchoolsQuery } from "@/app/state/module/schools/schoolApi";
import { toast } from "sonner"; // 👈 Import sonner toast

interface Props {
  onClose: () => void;
}

export default function CreateTeacherModal({ onClose }: Props) {
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  const { data: schools = [] } = useGetSchoolsQuery();

  const [form, setForm] = useState({
    name: "",
    email: "",
    schoolId: "",
  });

  // 📝 Frontend Form Validation Logic
  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Teacher name is required");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Email address is required");
      return false;
    }
    // Simple regex pattern check for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!form.schoolId) {
      toast.error("Please select a school assignment");
      return false;
    }
    return true;
  };

  const submit = async () => {
    // 🛑 Run validation checks first
    if (!validateForm()) return;

    try {
      // Pass form data and unwrap the promise response
      const response = await createTeacher(form).unwrap();
      
      // 🎉 Success toast notification
      toast.success(response?.message || "Teacher account created successfully!");
      onClose();
    } catch (error: any) {
      console.error(error);
      // ❌ Server error toast notification
      const errorMessage = error?.data?.message || "Failed to create teacher account.";
      toast.error(errorMessage);
    } 
  };
 
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-5">Create Teacher Account</h2>

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Teacher Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Teacher Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          className="border p-3 w-full mb-5 rounded"
          value={form.schoolId}
          onChange={(e) => setForm({ ...form, schoolId: e.target.value })}
        >
          <option value="">Select School</option>
          {schools.map((school: any) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
            type="button"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={submit}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
            type="button"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}