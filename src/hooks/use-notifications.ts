
import { useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types/notification';

// Mock de notificações até implementarmos completamente com Supabase
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nova mensagem',
    content: 'Você recebeu uma nova mensagem de João Silva',
    type: 'message',
    read: false,
    createdAt: new Date().toISOString(),
    userId: 'user1'
  },
  {
    id: '2',
    title: 'Pagamento recebido',
    content: 'Seu pagamento de R$ 150,00 foi confirmado',
    type: 'payment',
    read: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    userId: 'user1'
  },
  {
    id: '3',
    title: 'Novo serviço',
    content: 'Seu serviço "Aulas de inglês" foi aprovado',
    type: 'service',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    userId: 'user1'
  }
];

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calcular contagem de não lidas
  const unreadCount = useMemo(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  // Buscar notificações
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implementar integração real com Supabase
      // Por enquanto estamos usando dados mockados
      
      // Simulando um delay de rede
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // No futuro, seria algo assim:
      // const { data, error } = await supabase
      //   .from('notifications')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .order('created_at', { ascending: false });
      
      setNotifications(mockNotifications);
    } catch (err) {
      console.error('Erro ao buscar notificações:', err);
      setError('Não foi possível carregar as notificações');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Marcar uma notificação como lida
  const markAsRead = useCallback(async (id: string) => {
    if (!user) return;
    
    try {
      // TODO: Implementar integração real com Supabase
      // Por enquanto estamos atualizando apenas o estado local
      
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true } 
            : notification
        )
      );
      
      // No futuro, seria algo assim:
      // await supabase
      //   .from('notifications')
      //   .update({ read: true })
      //   .eq('id', id)
      //   .eq('user_id', user.id);
      
    } catch (err) {
      console.error('Erro ao marcar notificação como lida:', err);
    }
  }, [user]);

  // Marcar todas as notificações como lidas
  const markAllAsRead = useCallback(async () => {
    if (!user) return;
    
    try {
      // TODO: Implementar integração real com Supabase
      // Por enquanto estamos atualizando apenas o estado local
      
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      // No futuro, seria algo assim:
      // await supabase
      //   .from('notifications')
      //   .update({ read: true })
      //   .eq('user_id', user.id)
      //   .eq('read', false);
      
    } catch (err) {
      console.error('Erro ao marcar todas notificações como lidas:', err);
    }
  }, [user]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead
  };
};
