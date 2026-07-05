export enum NotificationType {
  EMAIL = "EMAIL",

  IN_APP = "IN_APP",

  PUSH = "PUSH",
}
 
export enum NotificationStatus {
  PENDING = "PENDING",

  SENT = "SENT",

  READ = "READ",

  FAILED = "FAILED",
}

export interface Notification {
  id: string;

  userId: string;

  schoolId: string;

  title: string;

  message: string;

  type: NotificationType;

  status: NotificationStatus;

  createdAt: string;

  readAt?: string | null;
}

export interface CreateNotificationDto {
  userId: string;

  schoolId: string;

  title: string;

  message: string;

  type?: NotificationType;
}