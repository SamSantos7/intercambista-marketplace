
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Notification, NotificationDB, dbToNotification } from '@/types/notification';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch notifications for the current user
  const fetchNotifications = useCallback(async () => {
    if (!user?.id) {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // Get notifications from the database
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }

      if (data) {
        // Convert DB format to app format
        const formattedNotifications: Notification[] = data.map((item: NotificationDB) => 
          dbToNotification(item)
        );
        
        setNotifications(formattedNotifications);
        setUnreadCount(formattedNotifications.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error('Error in fetchNotifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Mark a notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      // Update in database
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
        return;
      }

      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );

      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error in markAsRead:', error);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      // Update in database
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) {
        console.error('Error marking all notifications as read:', error);
        return;
      }

      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      // Update unread count
      setUnreadCount(0);
    } catch (error) {
      console.error('Error in markAllAsRead:', error);
    }
  }, [user?.id]);

  // Delete a notification
  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      // Delete from database
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) {
        console.error('Error deleting notification:', error);
        return;
      }

      // Update local state
      const notificationToDelete = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      
      // Update unread count if the deleted notification was unread
      if (notificationToDelete && !notificationToDelete.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }

      // Show toast
      toast({
        title: "Notificação excluída",
        description: "A notificação foi removida com sucesso.",
      });
    } catch (error) {
      console.error('Error in deleteNotification:', error);
    }
  }, [notifications, toast]);

  // Create a new notification (for development/testing)
  const createNotification = useCallback(async (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    if (!user?.id) return;
    
    try {
      const newNotification = {
        user_id: user.id,
        title: notification.title,
        content: notification.content,
        type: notification.type,
        is_read: notification.read,
        created_at: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('notifications')
        .insert(newNotification)
        .select();

      if (error) {
        console.error('Error creating notification:', error);
        return;
      }
      
      if (data && data[0]) {
        const createdNotification = dbToNotification(data[0] as NotificationDB);
        setNotifications(prev => [createdNotification, ...prev]);
        
        if (!createdNotification.read) {
          setUnreadCount(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error in createNotification:', error);
    }
  }, [user?.id]);

  // Initial fetch
  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
    }
  }, [user?.id, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
    refresh: fetchNotifications,
  };
};
