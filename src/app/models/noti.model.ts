
export interface NotificationUser {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  url: string;
  createAt: string;
  isRead:boolean;
}

export enum NotificationType {
  Booking,
  Payment,
}
