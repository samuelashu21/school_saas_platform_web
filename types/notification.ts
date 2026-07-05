export type NotificationPriority = "CRITICAL" | "HIGH" | "INFO";
export type NotificationCategory = "ATTENDANCE" | "ACADEMIC" | "SYSTEM" | "REGISTRATION";

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  timestamp: string;
  isRead: boolean;
}