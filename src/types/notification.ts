
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'payment' | 'message' | 'system';

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  userId: string;
  linkTo?: string; // Optional URL to navigate to when clicking the notification
}

// Database schema for notifications table
export interface NotificationDB {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
  link_to?: string; // Optional URL field in the database
}

// Helper functions for conversion between API and UI formats
export const dbToNotification = (dbNotification: NotificationDB): Notification => {
  return {
    id: dbNotification.id,
    title: dbNotification.title,
    content: dbNotification.content,
    type: dbNotification.type,
    read: dbNotification.is_read,
    createdAt: dbNotification.created_at,
    userId: dbNotification.user_id,
    linkTo: dbNotification.link_to
  };
};

export const notificationToDb = (notification: Notification): NotificationDB => {
  return {
    id: notification.id,
    user_id: notification.userId,
    title: notification.title,
    content: notification.content,
    type: notification.type,
    is_read: notification.read,
    created_at: notification.createdAt,
    link_to: notification.linkTo
  };
};
