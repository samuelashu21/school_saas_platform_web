"use client";

import {
  X,
  User,
  GraduationCap,
  Users,
  Mail,
  CheckCircle,
  Clock,
} from "lucide-react";
import type { Student } from "@/app/state/module/studentRegistration/studentRegistrationApi";

interface StudentDetailsModalProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
}

const StudentDetailsModal = ({ student, open, onClose }: StudentDetailsModalProps) => {
  if (!open || !student) {
    return null;
  }

  const registration = student.registrations?.[0];
  const parent = student.parent?.account;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">Student Details</h2>
            <p className="text-sm text-gray-500">{student.studentCode}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* STUDENT INFORMATION */}
          <Section icon={<User size={18} />} title="Student Information">
            <Info label="Name" value={`${student.firstName} ${student.lastName}`} />
            <Info label="Gender" value={student.gender ?? "-"} />
            <Info
              label="Date of Birth"
              value={
                student.dateOfBirth
                  ? new Date(student.dateOfBirth).toLocaleDateString()
                  : "-"
              }
            />
            <Info label="Student Code" value={student.studentCode} />
          </Section>

          {/* ACCOUNT */}
          <Section icon={<Mail size={18} />} title="Account">
            <Info label="Email" value={student.account?.email ?? "-"} />
            <Info label="Account Status" value={student.registrationStatus} />
          </Section>

          {/* ACADEMIC INFORMATION */}
          <Section icon={<GraduationCap size={18} />} title="Academic Information">
            <Info label="School" value={student.school?.name ?? "-"} />
            <Info label="Grade" value={registration?.class?.gradeLevel?.name ?? "-"} />
            <Info label="Class" value={registration?.class?.name ?? "-"} />
            <Info
              label="Academic Period"
              value={
                registration?.academicPeriod
                  ? `${registration.academicPeriod.academicYear} ${registration.academicPeriod.semester}`
                  : "-"
              }
            />
          </Section>

          {/* PARENT */}
          <Section icon={<Users size={18} />} title="Parent Information">
            <Info
              label="Name"
              value={parent ? `${parent.firstName} ${parent.lastName}` : "-"}
            />
            <Info label="Email" value={parent?.email ?? "-"} />
            <Info label="Phone" value={student.parent?.phone ?? "-"} />
          </Section>

          {/* STATUS */}
          <Section icon={<Clock size={18} />} title="Registration Status">
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm">
              <CheckCircle size={15} />
              {student.registrationStatus}
            </div>

            {student.approvedAt && (
              <Info
                label="Approved At"
                value={new Date(student.approvedAt).toLocaleString()}
              />
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// REUSABLE COMPONENTS
// =====================================================

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const Section = ({ icon, title, children }: SectionProps) => {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
        {icon}
        {title}
      </div>
      <div className="grid gap-3 rounded-xl border p-4 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
};

interface InfoProps {
  label: string;
  value: string;
}

const Info = ({ label, value }: InfoProps) => {
  return (
    <div>
      <p className="text-xs uppercase text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
};

export default StudentDetailsModal;