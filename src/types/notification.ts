
export type NotificationPriority = 'high' | 'medium' | 'low';

export type NotificationType = 
  | 'message'
  | 'payment'
  | 'service_request'
  | 'service_update'
  | 'account'
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface NotificationPreferences {
  email: {
    messages: boolean;
    payments: boolean;
    serviceUpdates: boolean;
    marketing: boolean;
  };
  push: {
    messages: boolean;
    payments: boolean;
    serviceUpdates: boolean;
  };
  inApp: {
    messages: boolean;
    payments: boolean;
    serviceUpdates: boolean;
    marketing: boolean;
  };
}
