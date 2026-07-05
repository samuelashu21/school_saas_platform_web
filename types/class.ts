export interface ClassSection {
  id: string;
  classCode: string; // e.g., "BIO-101-A"
  className: string; // e.g., "Introductory Biology"
  teacherName: string;
  roomNumber: string;
  scheduleDays: ("MON" | "TUE" | "WED" | "THU" | "FRI")[];
  timeSlot: string; // e.g., "09:00 AM - 10:30 AM"
  enrolledCount: number;
  maxCapacity: number;
  status: "OPEN" | "FULL" | "ARCHIVED";
}