
import React, { useState } from 'react';
import { 
  Search, 
  Edit, 
  MoreHorizontal, 
  Paperclip, 
  Send,
  Phone,
  Video,
  Info,
  Trash,
  Archive,
  Pin,
  User,
  ChevronDown,
  Image,
  Smile,
  Mic
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Message {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away';
    lastSeen?: string;
  };
  messages: Message[];
  unreadCount: number;
  lastMessage: {
    text: string;
    time: string;
  };
  pinned: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    user: {
      id: 'user1',
      name: 'João Silva',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'online',
    },
    messages: [
      { id: 'msg1', text: 'Olá! Gostaria de saber mais sobre seus serviços de tradução.', time: '2023-06-20T09:30:00', isMe: false },
      { id: 'msg2', text: 'Olá João! Claro, eu ofereço serviços de tradução em inglês, espanhol e francês.', time: '2023-06-20T09:32:00', isMe: true, status: 'read' },
      { id: 'msg3', text: 'Qual idioma você precisa traduzir?', time: '2023-06-20T09:32:30', isMe: true, status: 'read' },
      { id: 'msg4', text: 'Preciso traduzir alguns documentos do português para o inglês. São documentos acadêmicos.', time: '2023-06-20T09:35:00', isMe: false },
    ],
    unreadCount: 0,
    lastMessage: {
      text: 'Preciso traduzir alguns documentos do português para o inglês.',
      time: '2023-06-20T09:35:00'
    },
    pinned: true
  },
  {
    id: 'conv2',
    user: {
      id: 'user2',
      name: 'Maria Santos',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'online',
    },
    messages: [
      { id: 'msg1', text: 'Bom dia! Você tem disponibilidade para dar aulas na próxima semana?', time: '2023-06-19T10:15:00', isMe: false },
      { id: 'msg2', text: 'Bom dia Maria! Sim, tenho disponibilidade nas segundas, quartas e sextas pela manhã.', time: '2023-06-19T10:20:00', isMe: true, status: 'read' },
    ],
    unreadCount: 2,
    lastMessage: {
      text: 'Que ótimo! Vou verificar minha agenda e te confirmo o dia.',
      time: '2023-06-19T10:25:00'
    },
    pinned: false
  },
  {
    id: 'conv3',
    user: {
      id: 'user3',
      name: 'Carlos Oliveira',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      status: 'offline',
      lastSeen: '2023-06-19T20:30:00'
    },
    messages: [
      { id: 'msg1', text: 'Oi, tudo bem? Gostaria de ter mais informações sobre o serviço de consultoria.', time: '2023-06-18T14:00:00', isMe: false },
    ],
    unreadCount: 0,
    lastMessage: {
      text: 'Vou te enviar uma proposta por email ainda hoje.',
      time: '2023-06-18T14:30:00'
    },
    pinned: false
  },
  {
    id: 'conv4',
    user: {
      id: 'user4',
      name: 'Ana Pereira',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      status: 'away',
    },
    messages: [],
    unreadCount: 1,
    lastMessage: {
      text: 'Obrigada pela ajuda!',
      time: '2023-06-17T17:45:00'
    },
    pinned: false
  }
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<string>('conv1');
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState(mockConversations);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conversation => 
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the current active conversation
  const currentConversation = conversations.find(conv => conv.id === activeConversation);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      text: messageText,
      time: new Date().toISOString(),
      isMe: true,
      status: 'sent'
    };
    
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversation 
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: {
                text: messageText,
                time: new Date().toISOString()
              }
            }
          : conv
      )
    );
    
    setMessageText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timeString: string) => {
    const date = new Date(timeString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-6rem)] flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Mensagens</h1>
        
        <div className="flex flex-1 overflow-hidden rounded-lg border bg-background">
          {/* Sidebar - Conversation List */}
          <div className="w-full md:w-80 border-r flex flex-col">
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <div className="py-2">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  FIXADAS
                </div>
                {filteredConversations
                  .filter(conv => conv.pinned)
                  .map((conversation) => (
                    <div
                      key={conversation.id}
                      className={cn(
                        "flex gap-3 p-2 cursor-pointer hover:bg-muted/50 rounded-md mx-2",
                        activeConversation === conversation.id && "bg-muted"
                      )}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar>
                          <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                          <AvatarFallback>{conversation.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                          conversation.user.status === 'online' && "bg-green-500",
                          conversation.user.status === 'offline' && "bg-gray-400",
                          conversation.user.status === 'away' && "bg-amber-500"
                        )}></div>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between">
                          <h3 className="font-medium truncate">{conversation.user.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(conversation.lastMessage.time) === 'Hoje' ? 
                              formatTime(conversation.lastMessage.time) : 
                              formatDate(conversation.lastMessage.time)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage.text}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="ml-2">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
                  TODAS AS MENSAGENS
                </div>
                {filteredConversations
                  .filter(conv => !conv.pinned)
                  .map((conversation) => (
                    <div
                      key={conversation.id}
                      className={cn(
                        "flex gap-3 p-2 cursor-pointer hover:bg-muted/50 rounded-md mx-2",
                        activeConversation === conversation.id && "bg-muted"
                      )}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="relative flex-shrink-0">
                        <Avatar>
                          <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                          <AvatarFallback>{conversation.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                          conversation.user.status === 'online' && "bg-green-500",
                          conversation.user.status === 'offline' && "bg-gray-400",
                          conversation.user.status === 'away' && "bg-amber-500"
                        )}></div>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between">
                          <h3 className="font-medium truncate">{conversation.user.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(conversation.lastMessage.time) === 'Hoje' ? 
                              formatTime(conversation.lastMessage.time) : 
                              formatDate(conversation.lastMessage.time)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage.text}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="ml-2">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="hidden md:flex flex-col flex-1">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={currentConversation.user.avatar} alt={currentConversation.user.name} />
                      <AvatarFallback>{currentConversation.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{currentConversation.user.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {currentConversation.user.status === 'online' ? 'Online' : 
                         currentConversation.user.status === 'away' ? 'Ausente' :
                         currentConversation.user.lastSeen ? `Visto por último em ${formatDate(currentConversation.user.lastSeen)}` : 
                         'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ligar</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Video className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Videochamada</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Informações</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pin className="h-4 w-4 mr-2" />
                          {currentConversation.pinned ? 'Desafixar conversa' : 'Fixar conversa'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Arquivar conversa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="h-4 w-4 mr-2" />
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="h-4 w-4 mr-2" />
                          Excluir conversa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentConversation.messages.length > 0 ? (
                    currentConversation.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={cn(
                          "flex",
                          message.isMe ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className="flex flex-col max-w-[75%] space-y-1">
                          <div 
                            className={cn(
                              "rounded-lg px-4 py-2",
                              message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <div 
                            className={cn(
                              "flex items-center gap-2 text-xs text-muted-foreground",
                              message.isMe ? "justify-end" : "justify-start"
                            )}
                          >
                            <span>{formatTime(message.time)}</span>
                            {message.isMe && message.status && (
                              <span>
                                {message.status === 'sent' && 'Enviado'}
                                {message.status === 'delivered' && 'Entregue'}
                                {message.status === 'read' && 'Lido'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-full text-muted-foreground">
                      <p>Inicie uma conversa com {currentConversation.user.name}</p>
                    </div>
                  )}
                </div>
                
                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="default" 
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
                  <p className="text-muted-foreground">
                    Escolha um contato para iniciar ou continuar uma conversa
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Message Selection Prompt */}
          <div className="flex md:hidden flex-1 items-center justify-center">
            <div className="p-4 text-center">
              <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
              <p className="text-muted-foreground">
                Suas mensagens aparecerão aqui
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
