
import { useState, useEffect } from 'react';
import { Notification, NotificationType, NotificationPriority } from '@/types/notification';

// Mock de notificações para testes
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Nova mensagem recebida',
    message: 'João Silva enviou uma mensagem sobre seu serviço de tradução.',
    type: 'message',
    priority: 'medium',
    read: false,
    actionUrl: '/dashboard/messages',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Pagamento recebido',
    message: 'Você recebeu um pagamento de R$ 150,00 do serviço de tradução.',
    type: 'payment',
    priority: 'high',
    read: false,
    actionUrl: '/dashboard/payments',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Nova solicitação de serviço',
    message: 'Maria Oliveira solicitou o serviço de auxílio com documentação.',
    type: 'service_request',
    priority: 'high',
    read: false,
    actionUrl: '/dashboard/services',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
  },
  {
    id: '4',
    userId: 'user1',
    title: 'Serviço concluído',
    message: 'O serviço de tradução para Pedro Santos foi marcado como concluído.',
    type: 'service_update',
    priority: 'medium',
    read: true,
    actionUrl: '/dashboard/services',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
  },
  {
    id: '5',
    userId: 'user1',
    title: 'Atualização do sistema',
    message: 'Nossa plataforma foi atualizada com novos recursos. Confira as novidades!',
    type: 'system',
    priority: 'low',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
  },
];

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Carregar notificações
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Em produção, isso seria uma chamada real à API
        // const response = await fetch(`/api/notifications?userId=${userId}`);
        // const data = await response.json();
        
        // Usando mock para demonstração
        const data = mockNotifications.filter(n => n.userId === userId);
        
        // Simular um pequeno delay para parecer uma chamada real
        setTimeout(() => {
          setNotifications(data);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Erro ao carregar notificações:', err);
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchNotifications();
    
    // Configurar polling para novas notificações a cada minuto
    const interval = setInterval(fetchNotifications, 60000);
    
    return () => clearInterval(interval);
  }, [userId]);

  // Marcar uma notificação como lida
  const markAsRead = async (id: string) => {
    try {
      // Em produção, seria uma chamada à API
      // await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
      
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
      
      return true;
    } catch (err) {
      console.error('Erro ao marcar notificação como lida:', err);
      return false;
    }
  };

  // Marcar todas as notificações como lidas
  const markAllAsRead = async () => {
    try {
      // Em produção, seria uma chamada à API
      // await fetch(`/api/notifications/read-all?userId=${userId}`, { method: 'PUT' });
      
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({ ...notification, read: true }))
      );
      
      return true;
    } catch (err) {
      console.error('Erro ao marcar todas as notificações como lidas:', err);
      return false;
    }
  };

  // Excluir uma notificação
  const deleteNotification = async (id: string) => {
    try {
      // Em produção, seria uma chamada à API
      // await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
      
      setNotifications(prevNotifications =>
        prevNotifications.filter(notification => notification.id !== id)
      );
      
      return true;
    } catch (err) {
      console.error('Erro ao excluir notificação:', err);
      return false;
    }
  };

  // Adicionar uma nova notificação
  const addNotification = async (
    title: string,
    message: string,
    type: NotificationType,
    priority: NotificationPriority = 'medium',
    actionUrl?: string
  ) => {
    try {
      // Em produção, seria uma chamada à API
      // const response = await fetch('/api/notifications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, title, message, type, priority, actionUrl })
      // });
      // const data = await response.json();
      
      // Criar uma nova notificação local para demonstração
      const newNotification: Notification = {
        id: `temp-${Date.now()}`,
        userId,
        title,
        message,
        type,
        priority,
        read: false,
        actionUrl,
        createdAt: new Date(),
      };
      
      setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
      
      return newNotification;
    } catch (err) {
      console.error('Erro ao adicionar notificação:', err);
      return null;
    }
  };

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    unreadCount: notifications.filter(n => !n.read).length,
  };
};
