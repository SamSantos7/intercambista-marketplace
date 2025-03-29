
import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Phone, 
  Video,
  Image,
  File,
  Smile 
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Array<{
    type: 'image' | 'document';
    url: string;
    name?: string;
  }>;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'João Silva',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    lastMessage: 'Olá, gostaria de marcar uma aula para semana que vem',
    lastMessageTime: '10:45',
    unreadCount: 1,
    online: true,
  },
  {
    id: '2',
    name: 'Maria Souza',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    lastMessage: 'Obrigada pela ajuda com a tradução!',
    lastMessageTime: '09:30',
    unreadCount: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Carlos Eduardo',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Quando você terá disponibilidade para mais uma sessão?',
    lastMessageTime: 'Ontem',
    unreadCount: 2,
    online: true,
  },
  {
    id: '4',
    name: 'Ana Carolina',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    lastMessage: 'Enviei os documentos que você pediu',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    online: false,
  },
  {
    id: '5',
    name: 'Pedro Henrique',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    lastMessage: 'Já revisei o projeto, ficou ótimo!',
    lastMessageTime: 'Seg',
    unreadCount: 0,
    online: false,
  },
  {
    id: '6',
    name: 'Luísa Mendes',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    lastMessage: 'Podemos marcar uma chamada amanhã?',
    lastMessageTime: 'Dom',
    unreadCount: 0,
    online: true,
  },
];

const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      senderId: '1',
      content: 'Olá! Estou interessado em agendar algumas aulas de português para melhorar meu vocabulário profissional.',
      timestamp: '10:30',
      read: true
    },
    {
      id: '2',
      senderId: 'me',
      content: 'Olá João! Será um prazer te ajudar com isso. Tenho horários disponíveis nas segundas e quartas à tarde. Qual seria o melhor para você?',
      timestamp: '10:35',
      read: true
    },
    {
      id: '3',
      senderId: '1',
      content: 'Quarta-feira às 15h seria perfeito para mim. Você pode me confirmar o preço por aula?',
      timestamp: '10:40',
      read: true
    },
    {
      id: '4',
      senderId: 'me',
      content: 'Claro! O valor por aula individual é R$70,00 com duração de 1 hora. Também ofereço pacotes com desconto para múltiplas aulas.',
      timestamp: '10:42',
      read: true
    },
    {
      id: '5',
      senderId: '1',
      content: 'Ótimo, vou querer agendar inicialmente 4 aulas para ver como funciona. Olá, gostaria de marcar uma aula para semana que vem',
      timestamp: '10:45',
      read: false
    }
  ],
  '3': [
    {
      id: '1',
      senderId: '3',
      content: 'Oi, adorei nossa última sessão de design. Você realmente me ajudou a entender melhor as ferramentas.',
      timestamp: 'Ontem 18:24',
      read: true
    },
    {
      id: '2',
      senderId: 'me',
      content: 'Fico feliz que tenha gostado, Carlos! Estou à disposição para mais sessões quando precisar.',
      timestamp: 'Ontem 18:30',
      read: true
    },
    {
      id: '3',
      senderId: '3',
      content: 'Já consegui aplicar algumas das técnicas que você me ensinou no meu projeto atual.',
      timestamp: 'Ontem 18:45',
      read: true,
      attachments: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1618788372246-79faff717dac?auto=format&fit=crop&q=80&w=400&h=300',
          name: 'projeto_screenshot.png'
        }
      ]
    },
    {
      id: '4',
      senderId: '3',
      content: 'O que você acha do resultado?',
      timestamp: 'Ontem 18:46',
      read: true
    },
    {
      id: '5',
      senderId: 'me',
      content: 'Ficou muito bom! Gostei principalmente do uso das cores e da hierarquia visual que você implementou.',
      timestamp: 'Ontem 19:00',
      read: true
    },
    {
      id: '6',
      senderId: '3',
      content: 'Quando você terá disponibilidade para mais uma sessão? Quero aprender mais sobre animações.',
      timestamp: 'Hoje 09:15',
      read: false
    },
    {
      id: '7',
      senderId: '3',
      content: 'Tenho alguns exemplos específicos que gostaria de discutir.',
      timestamp: 'Hoje 09:16',
      read: false,
      attachments: [
        {
          type: 'document',
          url: '#',
          name: 'exemplos_animacoes.pdf'
        }
      ]
    }
  ]
};

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [messageText, setMessageText] = useState('');

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!messageText.trim() || !selectedContact) return;
    
    // Would typically send to backend here
    console.log(`Sending message to ${selectedContact.name}: ${messageText}`);
    
    // For demo, add message to mock data
    const newMessage: ChatMessage = {
      id: `new-${Date.now()}`,
      senderId: 'me',
      content: messageText,
      timestamp: 'Agora',
      read: true
    };
    
    mockMessages[selectedContact.id] = [
      ...(mockMessages[selectedContact.id] || []),
      newMessage
    ];
    
    // Clear input
    setMessageText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <DashboardLayout>
      <Card className="h-[calc(100vh-140px)]">
        <div className="flex h-full">
          {/* Contacts Sidebar */}
          <div className="w-full max-w-xs border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contatos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="p-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="unread">Não lidos</TabsTrigger>
                <TabsTrigger value="archived">Arquivados</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <ScrollArea className="h-[calc(100%-130px)]">
              <div className="p-2 space-y-1">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id
                        ? 'bg-primary/10'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unreadCount > 0 && (
                      <Badge variant="default" className="rounded-full px-2 min-w-[24px] flex items-center justify-center">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback>{selectedContact.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedContact.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedContact.online ? 'Online agora' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                        <DropdownMenuItem>Bloquear contato</DropdownMenuItem>
                        <DropdownMenuItem>Arquivar conversa</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Excluir conversa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {(mockMessages[selectedContact.id] || []).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === 'me' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.senderId === 'me'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className="rounded-md overflow-hidden">
                                  {attachment.type === 'image' ? (
                                    <img
                                      src={attachment.url}
                                      alt={attachment.name || 'attachment'}
                                      className="max-w-full h-auto max-h-64 rounded-md"
                                    />
                                  ) : (
                                    <div className="flex items-center gap-2 bg-background/50 p-2 rounded-md">
                                      <File className="h-5 w-5 text-muted-foreground" />
                                      <span className="text-sm">{attachment.name}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div
                            className={`text-xs mt-1 ${
                              message.senderId === 'me'
                                ? 'text-primary-foreground/70'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {message.timestamp}
                            {message.senderId === 'me' && (
                              <span className="ml-1">✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-end gap-2">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Digite sua mensagem..."
                      className="flex-1"
                      multiline="true"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      onClick={sendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-lg font-medium">Selecione um contato</h3>
                  <p className="text-muted-foreground">
                    Escolha um contato para iniciar uma conversa
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Messages;
