
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import { ServiceStatus } from '@/types/service';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for client services
const mockClientServices = [
  {
    id: 'srv-001',
    title: 'Aulas de Português',
    provider: {
      id: 'prov-001',
      name: 'João Silva',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4.8
    },
    status: 'active' as ServiceStatus,
    scheduledDate: '2023-07-15',
    price: 150.00,
    paymentId: 'pay-001',
    notes: 'Aulas agendadas para terças e quintas, 19h'
  },
  {
    id: 'srv-002',
    title: 'Desenvolvimento de Logo',
    provider: {
      id: 'prov-002',
      name: 'Ana Souza',
      avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      rating: 4.5
    },
    status: 'in_progress' as ServiceStatus,
    scheduledDate: '2023-07-10',
    price: 350.00,
    paymentId: 'pay-002',
    notes: 'Segunda versão sendo desenvolvida'
  },
  {
    id: 'srv-003',
    title: 'Limpeza Residencial',
    provider: {
      id: 'prov-003',
      name: 'Carlos Mendes',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4.2
    },
    status: 'completed' as ServiceStatus,
    scheduledDate: '2023-07-05',
    completedDate: '2023-07-05',
    price: 120.00,
    paymentId: 'pay-003',
    notes: 'Serviço concluído com sucesso'
  },
  {
    id: 'srv-004',
    title: 'Consultoria de Marketing',
    provider: {
      id: 'prov-004',
      name: 'Luísa Ferreira',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 4.9
    },
    status: 'pending' as ServiceStatus,
    scheduledDate: '2023-07-20',
    price: 450.00,
    paymentId: 'pay-004',
    notes: 'Aguardando confirmação do prestador'
  },
  {
    id: 'srv-005',
    title: 'Assistência Técnica',
    provider: {
      id: 'prov-005',
      name: 'Roberto Alves',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      rating: 4.7
    },
    status: 'cancelled' as ServiceStatus,
    scheduledDate: '2023-07-12',
    price: 180.00,
    paymentId: 'pay-005',
    notes: 'Cancelado pelo cliente'
  }
];

const StatusBadge = ({ status }: { status: ServiceStatus }) => {
  const statusConfig = {
    pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
    active: { label: 'Ativo', className: 'bg-blue-100 text-blue-800' },
    in_progress: { label: 'Em Andamento', className: 'bg-purple-100 text-purple-800' },
    completed: { label: 'Concluído', className: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800' }
  };

  const { label, className } = statusConfig[status] || 
    { label: 'Status Desconhecido', className: 'bg-gray-100 text-gray-800' };

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const ReviewDialog = ({ serviceId, providerName }: { serviceId: string, providerName: string }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmitReview = () => {
    // Here you would submit the review to the backend
    console.log('Submitting review:', { serviceId, rating, comment });
    
    toast({
      title: "Avaliação enviada",
      description: "Obrigado pelo seu feedback! Sua avaliação foi registrada.",
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Star className="mr-2 h-4 w-4" />
          Avaliar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Avaliar serviço</DialogTitle>
          <DialogDescription>
            Compartilhe sua experiência com o serviço de {providerName}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Avaliação</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  className={`p-0 h-8 w-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                >
                  <Star className="h-6 w-6 fill-current" />
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comentário</Label>
            <Textarea
              id="comment"
              placeholder="Descreva sua experiência..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmitReview}>Enviar avaliação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ClientServices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const filteredServices = activeTab === 'all' 
    ? mockClientServices 
    : mockClientServices.filter(service => service.status === activeTab);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Meus Serviços</h2>
          <p className="text-muted-foreground">
            Acompanhe os serviços que você contratou
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 md:w-auto w-full">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="in_progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{activeTab === 'all' ? 'Todos os Serviços' : 
                  activeTab === 'pending' ? 'Serviços Pendentes' :
                  activeTab === 'in_progress' ? 'Serviços Em Andamento' :
                  activeTab === 'completed' ? 'Serviços Concluídos' : 'Serviços Cancelados'}</CardTitle>
                <CardDescription>
                  {filteredServices.length} serviço(s) encontrado(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Prestador</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.length > 0 ? (
                      filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={service.provider.avatar} alt={service.provider.name} />
                                <AvatarFallback>{service.provider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{service.provider.name}</div>
                                <div className="text-xs flex items-center text-yellow-500">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-3 w-3 ${i < Math.floor(service.provider.rating) ? 'fill-current' : ''}`} 
                                    />
                                  ))}
                                  <span className="text-xs text-muted-foreground ml-1">
                                    ({service.provider.rating})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {service.scheduledDate}
                              {service.completedDate && service.status === 'completed' && (
                                <span className="text-xs text-muted-foreground ml-1">
                                  (Concluído em {service.completedDate})
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <StatusBadge status={service.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => navigate(`/services/${service.id}`)}
                            >
                              Detalhes
                            </Button>
                            {service.status === 'completed' && (
                              <ReviewDialog serviceId={service.id} providerName={service.provider.name} />
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Nenhum serviço encontrado com os filtros atuais.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientServices;
