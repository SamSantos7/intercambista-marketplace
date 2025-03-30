
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreHorizontal, 
  Image, 
  Paperclip, 
  Smile 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageDate: string;
  unread: number;
  online: boolean;
  isServiceProvider: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

const Messages = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'service' | 'client'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Mock data for contacts
  useEffect(() => {
    // Simulating API fetch for contacts
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'João Silva',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        lastMessage: 'Olá, tudo bem? Gostaria de saber mais sobre o serviço de tradução.',
        lastMessageDate: '09:45',
        unread: 2,
        online: true,
        isServiceProvider: false
      },
      {
        id: '2',
        name: 'Maria Oliveira',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        lastMessage: 'Posso te ajudar com isso sim! Quando você precisa?',
        lastMessageDate: 'Ontem',
        unread: 0,
        online: true,
        isServiceProvider: true
      },
      {
        id: '3',
        name: 'Pedro Santos',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        lastMessage: 'Ótimo trabalho! Vou te recomendar.',
        lastMessageDate: '12/05',
        unread: 0,
        online: false,
        isServiceProvider: false
      },
      {
        id: '4',
        name: 'Ana Costa',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        lastMessage: 'Podemos marcar para amanhã às 15h?',
        lastMessageDate: '10/05',
        unread: 0,
        online: false,
        isServiceProvider: true
      },
      {
        id: '5',
        name: 'Lucas Mendes',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        lastMessage: 'Preciso de ajuda com documentos para o visto canadense.',
        lastMessageDate: '09/05',
        unread: 0,
        online: false,
        isServiceProvider: false
      }
    ];
    
    setContacts(mockContacts);
  }, []);

  // Mock data for messages when a contact is selected
  useEffect(() => {
    if (activeContactId) {
      // Simulating API fetch for messages
      const mockMessages: Message[] = [
        {
          id: 'm1',
          senderId: activeContactId,
          text: 'Olá, tudo bem? Gostaria de saber mais sobre seu serviço.',
          timestamp: '09:30',
          read: true
        },
        {
          id: 'm2',
          senderId: 'currentUser',
          text: 'Olá! Claro, posso te ajudar. Que tipo de informação você precisa?',
          timestamp: '09:32',
          read: true
        },
        {
          id: 'm3',
          senderId: activeContactId,
          text: 'Queria saber quanto custa e quanto tempo demora.',
          timestamp: '09:35',
          read: true
        },
        {
          id: 'm4',
          senderId: 'currentUser',
          text: 'O custo é de R$ 150 por hora de trabalho e geralmente consigo finalizar em 2-3 dias úteis.',
          timestamp: '09:38',
          read: true
        },
        {
          id: 'm5',
          senderId: activeContactId,
          text: 'Perfeito! Vou precisar desse serviço para a próxima semana.',
          timestamp: '09:40',
          read: true
        },
        {
          id: 'm6',
          senderId: 'currentUser',
          text: 'Excelente! Posso reservar um horário para você. Tem preferência de dia?',
          timestamp: '09:42',
          read: true
        },
        {
          id: 'm7',
          senderId: activeContactId,
          text: 'Terça ou quarta-feira pela manhã seria ótimo.',
          timestamp: '09:45',
          read: false
        }
      ];
      
      setMessages(mockMessages);
      
      // Mark messages as read
      const updatedContacts = contacts.map(contact => {
        if (contact.id === activeContactId) {
          return { ...contact, unread: 0 };
        }
        return contact;
      });
      
      setContacts(updatedContacts);
    }
  }, [activeContactId]);

  // Filter contacts based on search query and tab
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'service') return matchesSearch && contact.isServiceProvider;
    if (activeTab === 'client') return matchesSearch && !contact.isServiceProvider;
    return false;
  });

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeContactId) return;
    
    const newMessage: Message = {
      id: `m${Math.random().toString(36).substr(2, 9)}`,
      senderId: 'currentUser',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    
    setMessages([...messages, newMessage]);
    
    // Update last message in contacts
    const updatedContacts = contacts.map(contact => {
      if (contact.id === activeContactId) {
        return {
          ...contact,
          lastMessage: messageText,
          lastMessageDate: 'Agora'
        };
      }
      return contact;
    });
    
    setContacts(updatedContacts);
    setMessageText('');

    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada com sucesso."
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const activeContact = contacts.find(contact => contact.id === activeContactId);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
          <p className="text-muted-foreground">
            Gerencie suas conversas com clientes e prestadores de serviço.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="flex h-[calc(100vh-220px)]">
            {/* Contact List */}
            <div className="w-1/3 border-r">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar contatos..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs 
                value={activeTab} 
                onValueChange={(v) => setActiveTab(v as 'all' | 'service' | 'client')}
                className="w-full"
              >
                <div className="px-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="service">Profissionais</TabsTrigger>
                    <TabsTrigger value="client">Clientes</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="m-0">
                  <ScrollArea className="h-[calc(100vh-290px)]">
                    <div className="divide-y">
                      {filteredContacts.map((contact) => (
                        <div 
                          key={contact.id}
                          className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-muted/50 ${activeContactId === contact.id ? 'bg-muted' : ''}`}
                          onClick={() => setActiveContactId(contact.id)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {contact.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium leading-none truncate">{contact.name}</h3>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.lastMessageDate}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{contact.lastMessage}</p>
                          </div>
                          {contact.unread > 0 && (
                            <Badge variant="default" className="rounded-full">
                              {contact.unread}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="service" className="m-0">
                  <ScrollArea className="h-[calc(100vh-290px)]">
                    <div className="divide-y">
                      {filteredContacts
                        .filter(contact => contact.isServiceProvider)
                        .map((contact) => (
                          <div 
                            key={contact.id}
                            className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-muted/50 ${activeContactId === contact.id ? 'bg-muted' : ''}`}
                            onClick={() => setActiveContactId(contact.id)}
                          >
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {contact.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium leading-none truncate">{contact.name}</h3>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.lastMessageDate}</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{contact.lastMessage}</p>
                            </div>
                            {contact.unread > 0 && (
                              <Badge variant="default" className="rounded-full">
                                {contact.unread}
                              </Badge>
                            )}
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="client" className="m-0">
                  <ScrollArea className="h-[calc(100vh-290px)]">
                    <div className="divide-y">
                      {filteredContacts
                        .filter(contact => !contact.isServiceProvider)
                        .map((contact) => (
                          <div 
                            key={contact.id}
                            className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-muted/50 ${activeContactId === contact.id ? 'bg-muted' : ''}`}
                            onClick={() => setActiveContactId(contact.id)}
                          >
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {contact.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium leading-none truncate">{contact.name}</h3>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.lastMessageDate}</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{contact.lastMessage}</p>
                            </div>
                            {contact.unread > 0 && (
                              <Badge variant="default" className="rounded-full">
                                {contact.unread}
                              </Badge>
                            )}
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {activeContactId ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={activeContact?.avatar} />
                        <AvatarFallback>{activeContact?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{activeContact?.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {activeContact?.online ? 'Online agora' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4 space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        {message.senderId !== 'currentUser' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src={activeContact?.avatar} />
                            <AvatarFallback>{activeContact?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div 
                            className={`rounded-lg px-4 py-2 max-w-sm ${
                              message.senderId === 'currentUser' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            {message.attachments && message.attachments.map((attachment, i) => (
                              <div key={i} className="mt-2">
                                {attachment.type === 'image' ? (
                                  <img 
                                    src={attachment.url} 
                                    alt="attachment" 
                                    className="rounded-md max-w-full h-auto max-h-60 object-cover" 
                                  />
                                ) : (
                                  <div className="flex items-center gap-2 bg-background p-2 rounded">
                                    <Paperclip className="h-4 w-4" />
                                    <span className="text-xs truncate">{attachment.name}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                            {message.senderId === 'currentUser' && (
                              <svg
                                className="h-4 w-4 text-primary ml-1"
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Textarea
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Digite sua mensagem..."
                          className="pr-10 min-h-[80px] resize-none"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-2 bottom-2"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">Nenhuma conversa selecionada</h3>
                    <p className="text-muted-foreground mb-4">
                      Selecione um contato para iniciar uma conversa ou enviar uma mensagem.
                    </p>
                    <Button onClick={() => navigate('/services')}>
                      Buscar Profissionais
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
