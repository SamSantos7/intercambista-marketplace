
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { NegotiationMessage } from '@/types/negotiation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Send, RefreshCcw } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface NegotiationChatProps {
  negotiationId: string;
  recipientId: string;
  recipientName?: string;
}

const NegotiationChat: React.FC<NegotiationChatProps> = ({ 
  negotiationId,
  recipientId,
  recipientName = 'Destinatário'
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<NegotiationMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Fetch messages
  const fetchMessages = async () => {
    if (!user || !negotiationId) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          recipient_id,
          is_read,
          sender:sender_id(id, full_name, profile_image),
          recipient:recipient_id(id, full_name, profile_image)
        `)
        .eq('negotiation_id', negotiationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          negotiationId,
          senderId: msg.sender_id,
          senderName: msg.sender?.full_name || 'Usuário',
          senderImage: msg.sender?.profile_image || undefined,
          content: msg.content,
          createdAt: new Date(msg.created_at),
          isRead: msg.is_read
        }));
        
        setMessages(formattedMessages);
        
        // Mark unread messages as read
        const unreadMessages = data
          .filter(msg => msg.recipient_id === user.id && !msg.is_read)
          .map(msg => msg.id);
        
        if (unreadMessages.length > 0) {
          await supabase
            .from('messages')
            .update({ is_read: true })
            .in('id', unreadMessages);
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Erro ao carregar mensagens',
        description: 'Não foi possível carregar o histórico de mensagens.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial load and refresh every 10 seconds
  useEffect(() => {
    fetchMessages();
    
    // Setup real-time updates
    const channel = supabase
      .channel('negotiation-messages')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `negotiation_id=eq.${negotiationId}`
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();
      
    // Refresh every 30 seconds
    const intervalId = setInterval(fetchMessages, 30000);
    
    return () => {
      clearInterval(intervalId);
      supabase.removeChannel(channel);
    };
  }, [negotiationId, user?.id]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || isSending) return;
    
    try {
      setIsSending(true);
      
      const messageData = {
        negotiation_id: negotiationId,
        sender_id: user.id,
        recipient_id: recipientId,
        content: newMessage.trim(),
        is_read: false
      };
      
      const { error } = await supabase.from('messages').insert(messageData);
      
      if (error) throw error;
      
      setNewMessage('');
      // Fetch messages again to get the new one with all the info
      fetchMessages();
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Erro ao enviar mensagem',
        description: 'Não foi possível enviar sua mensagem. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsSending(false);
    }
  };
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted/30 rounded-md">
        <p className="text-muted-foreground">Você precisa estar logado para enviar mensagens.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-[400px] rounded-md border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-muted/30 border-b">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Conversa com {recipientName}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={fetchMessages}
          disabled={isLoading}
        >
          <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
        </Button>
      </div>
      
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <MessageSkeleton />
            <MessageSkeleton align="right" />
            <MessageSkeleton />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Nenhuma mensagem. Inicie a conversa!</p>
          </div>
        ) : (
          messages.map(message => (
            <MessageBubble 
              key={message.id}
              message={message}
              isOwnMessage={message.senderId === user.id}
            />
          ))
        )}
        <div ref={endOfMessagesRef} />
      </div>
      
      {/* Message input */}
      <div className="p-3 bg-card border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="min-h-[40px] resize-none"
            maxLength={1000}
            disabled={isSending}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim() || isSending}>
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: NegotiationMessage;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[80%]`}>
        <Avatar className="h-8 w-8">
          {message.senderImage ? (
            <AvatarImage src={message.senderImage} alt={message.senderName} />
          ) : (
            <AvatarFallback>{message.senderName?.substring(0, 2) || 'UN'}</AvatarFallback>
          )}
        </Avatar>
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          <div
            className={`rounded-lg p-3 ${
              isOwnMessage
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}
          >
            <p className="text-sm break-words">{message.content}</p>
          </div>
          <span className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(message.createdAt, { addSuffix: true, locale: ptBR })}
          </span>
        </div>
      </div>
    </div>
  );
};

const MessageSkeleton = ({ align = "left" }: { align?: "left" | "right" }) => {
  return (
    <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>
      <div className={`flex ${align === "right" ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}>
        <Skeleton className="h-8 w-8 rounded-full" />
        <div>
          <Skeleton className={`h-12 w-40 rounded-lg`} />
          <Skeleton className="h-3 w-20 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default NegotiationChat;
