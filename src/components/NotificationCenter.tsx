
import React from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Notification } from '@/types/notification';

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => Promise<void>;
  onMarkAllAsRead: () => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Função para formatar a data relativa em português
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );
    
    if (diffInMinutes < 1) {
      return 'Agora mesmo';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min atrás`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
    } else if (diffInMinutes < 48 * 60) {
      return 'Ontem';
    } else {
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    }
  };

  // Função para determinar o ícone da notificação
  const getNotificationIcon = (type: string) => {
    // Implementar ícones por tipo de notificação
    return <div className="w-2 h-2 bg-primary rounded-full" />;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="Notificações"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 max-h-[70vh] flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h3 className="font-semibold">Notificações</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={onMarkAllAsRead}
            >
              <CheckCheck className="mr-1 h-4 w-4" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <Separator />
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma notificação
            </div>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 border-b border-muted hover:bg-muted/50 relative ${
                    !notification.read ? 'bg-muted/30' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatRelativeDate(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {!notification.read && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => onMarkAsRead(notification.id)}
                          title="Marcar como lida"
                        >
                          <CheckCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-destructive hover:text-destructive/90"
                        onClick={() => onDelete(notification.id)}
                        title="Excluir notificação"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {notification.linkTo && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-xs mt-2"
                      asChild
                    >
                      <a href={notification.linkTo}>Ver detalhes</a>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
