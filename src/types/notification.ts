
export type NotificationType = 'message' | 'payment' | 'service' | 'review' | 'system';

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  userId: string;
  linkTo?: string;
  metadata?: Record<string, any>;
}
