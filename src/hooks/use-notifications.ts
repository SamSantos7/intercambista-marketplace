
import { useState, useEffect } from "react";
import { Notification } from "@/types/notification";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();

  // Função para buscar notificações
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        setLoading(false);
        return;
      }
      
      const userId = session.session.user.id;
      
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("userId", userId)
        .order("createdAt", { ascending: false });
      
      if (error) {
        console.error("Erro ao buscar notificações:", error);
        setError("Não foi possível carregar as notificações");
      } else {
        // Converter strings de data para objetos Date
        const formattedNotifications = (data || []).map((notif) => ({
          ...notif,
          createdAt: new Date(notif.createdAt).toISOString()
        })) as Notification[];
        
        setNotifications(formattedNotifications);
        setUnreadCount(formattedNotifications.filter(n => !n.read).length);
      }
    } catch (err) {
      console.error("Erro ao processar notificações:", err);
      setError("Ocorreu um erro ao processar as notificações");
    } finally {
      setLoading(false);
    }
  };

  // Marcar notificação como lida
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", id);
      
      if (error) {
        console.error("Erro ao marcar notificação como lida:", error);
        toast({
          title: "Erro",
          description: "Não foi possível marcar a notificação como lida",
          variant: "destructive",
        });
      } else {
        // Atualizar estado local
        setNotifications(prev => prev.map(n => 
          n.id === id ? { ...n, read: true } : n
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error("Erro ao processar marcação:", err);
    }
  };

  // Marcar todas as notificações como lidas
  const markAllAsRead = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) return;
      
      const userId = session.session.user.id;
      
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("userId", userId)
        .eq("read", false);
      
      if (error) {
        console.error("Erro ao marcar todas notificações como lidas:", error);
        toast({
          title: "Erro",
          description: "Não foi possível marcar todas as notificações como lidas",
          variant: "destructive",
        });
      } else {
        // Atualizar estado local
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Erro ao processar marcação em massa:", err);
    }
  };

  // Excluir uma notificação
  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id);
      
      if (error) {
        console.error("Erro ao excluir notificação:", error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir a notificação",
          variant: "destructive",
        });
      } else {
        // Atualizar estado local
        const deletedNotification = notifications.find(n => n.id === id);
        setNotifications(prev => prev.filter(n => n.id !== id));
        
        // Atualizar contagem de não lidas se necessário
        if (deletedNotification && !deletedNotification.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
        
        toast({
          title: "Sucesso",
          description: "Notificação excluída com sucesso",
        });
      }
    } catch (err) {
      console.error("Erro ao excluir notificação:", err);
    }
  };

  // Buscar notificações ao montar o componente
  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };
};
