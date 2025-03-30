
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Search, MoreHorizontal, Trash2, Edit, Check, X, DollarSign,
  Shield, AlertTriangle, ArrowUpDown, Eye, User, UserPlus, Briefcase,
  CreditCard, Settings, ShieldAlert
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for users
const mockUsers = [
  {
    id: 'usr-001',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    role: 'client',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    createdAt: '2023-01-15',
    status: 'active'
  },
  {
    id: 'usr-002',
    name: 'Ana Souza',
    email: 'ana.souza@example.com',
    role: 'advertiser',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    createdAt: '2023-02-10',
    status: 'active'
  },
  {
    id: 'usr-003',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@example.com',
    role: 'advertiser',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    createdAt: '2023-03-05',
    status: 'inactive'
  },
  {
    id: 'usr-004',
    name: 'Luísa Ferreira',
    email: 'luisa.ferreira@example.com',
    role: 'client',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    createdAt: '2023-04-20',
    status: 'active'
  },
  {
    id: 'usr-005',
    name: 'Roberto Alves',
    email: 'roberto.alves@example.com',
    role: 'moderator',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    createdAt: '2023-05-12',
    status: 'active'
  }
];

// Mock data for services
const mockServices = [
  {
    id: 'srv-001',
    title: 'Aulas de Português',
    providerId: 'usr-002',
    providerName: 'Ana Souza',
    category: 'Educação',
    price: 150.00,
    featured: true,
    status: 'active',
    createdAt: '2023-06-15'
  },
  {
    id: 'srv-002',
    title: 'Design de Logo',
    providerId: 'usr-002',
    providerName: 'Ana Souza',
    category: 'Design',
    price: 350.00,
    featured: false,
    status: 'pending_review',
    createdAt: '2023-07-10'
  },
  {
    id: 'srv-003',
    title: 'Limpeza Residencial',
    providerId: 'usr-003',
    providerName: 'Carlos Mendes',
    category: 'Serviços Domésticos',
    price: 120.00,
    featured: false,
    status: 'active',
    createdAt: '2023-06-28'
  },
  {
    id: 'srv-004',
    title: 'Consultoria de Marketing',
    providerId: 'usr-003',
    providerName: 'Carlos Mendes',
    category: 'Consultoria',
    price: 450.00,
    featured: true,
    status: 'active',
    createdAt: '2023-07-05'
  }
];

// Mock data for payments
const mockPayments = [
  {
    id: 'pay-001',
    userId: 'usr-001',
    userName: 'João Silva',
    serviceId: 'srv-001',
    serviceName: 'Aulas de Português',
    amount: 150.00,
    status: 'completed',
    paymentMethod: 'credit_card',
    date: '2023-06-18',
    platformFee: 15.00
  },
  {
    id: 'pay-002',
    userId: 'usr-004',
    userName: 'Luísa Ferreira',
    serviceId: 'srv-004',
    serviceName: 'Consultoria de Marketing',
    amount: 450.00,
    status: 'pending',
    paymentMethod: 'pix',
    date: '2023-07-07',
    platformFee: 45.00
  },
  {
    id: 'pay-003',
    userId: 'usr-001',
    userName: 'João Silva',
    serviceId: 'srv-003',
    serviceName: 'Limpeza Residencial',
    amount: 120.00,
    status: 'completed',
    paymentMethod: 'credit_card',
    date: '2023-06-30',
    platformFee: 12.00
  },
  {
    id: 'pay-004',
    userId: 'usr-004',
    userName: 'Luísa Ferreira',
    serviceId: 'srv-002',
    serviceName: 'Design de Logo',
    amount: 350.00,
    status: 'refunded',
    paymentMethod: 'credit_card',
    date: '2023-07-12',
    platformFee: 35.00
  }
];

const RoleBadge = ({ role }: { role: string }) => {
  const roleConfig = {
    admin: { label: 'Administrador', className: 'bg-red-100 text-red-800' },
    moderator: { label: 'Moderador', className: 'bg-purple-100 text-purple-800' },
    advertiser: { label: 'Anunciante', className: 'bg-blue-100 text-blue-800' },
    client: { label: 'Cliente', className: 'bg-green-100 text-green-800' }
  };

  const { label, className } = roleConfig[role as keyof typeof roleConfig] || 
    { label: role.charAt(0).toUpperCase() + role.slice(1), className: 'bg-gray-100 text-gray-800' };

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const UserManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditUser = (user: any) => {
    setSelectedUser({...user});
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Here you would delete the user from the database
    toast({
      title: "Usuário excluído",
      description: `O usuário ${selectedUser.name} foi excluído com sucesso.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const saveUserChanges = () => {
    // Here you would save the changes to the database
    toast({
      title: "Alterações salvas",
      description: "As alterações no usuário foram salvas com sucesso.",
    });
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuários..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Gerencie os usuários da plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell><RoleBadge role={user.role} /></TableCell>
                  <TableCell>
                    <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Atualize os detalhes do usuário. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  E-mail
                </Label>
                <Input
                  id="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Função
                </Label>
                <select
                  id="role"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="client">Cliente</option>
                  <option value="advertiser">Anunciante</option>
                  <option value="moderator">Moderador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch 
                    id="status" 
                    checked={selectedUser.status === 'active'} 
                    onCheckedChange={(checked) => 
                      setSelectedUser({...selectedUser, status: checked ? 'active' : 'inactive'})
                    }
                  />
                  <Label htmlFor="status">
                    {selectedUser.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveUserChanges}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Você está prestes a excluir o usuário {selectedUser?.name}. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-red-500">
              <AlertTriangle className="h-16 w-16 mx-auto mb-2" />
              Todos os dados deste usuário serão permanentemente excluídos.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={confirmDelete}>Confirmar Exclusão</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ServiceManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<any>(null);
  
  const filteredServices = mockServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const approveService = (service: any) => {
    // Here you would approve the service in the database
    toast({
      title: "Serviço aprovado",
      description: `O serviço "${service.title}" foi aprovado e está visível na plataforma.`,
    });
  };

  const rejectService = (service: any) => {
    // Here you would reject the service in the database
    toast({
      title: "Serviço rejeitado",
      description: `O serviço "${service.title}" foi rejeitado.`,
    });
  };

  const viewService = (serviceId: string) => {
    // Navigate to service details
    console.log(`View service: ${serviceId}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar serviços..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Serviços</CardTitle>
          <CardDescription>Gerencie os serviços anunciados na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Anunciante</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destaque</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.providerName}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={
                      service.status === 'active' ? 'bg-green-100 text-green-800' : 
                      service.status === 'pending_review' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }>
                      {service.status === 'active' ? 'Ativo' : 
                       service.status === 'pending_review' ? 'Em Análise' : service.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {service.featured && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Destacado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => viewService(service.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {service.status === 'pending_review' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-green-600"
                            onClick={() => approveService(service)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-600"
                            onClick={() => rejectService(service)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const PaymentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPayments = mockPayments.filter(payment =>
    payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: 'Concluído', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      refunded: { label: 'Reembolsado', className: 'bg-purple-100 text-purple-800' },
      cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800' }
    };

    const { label, className } = statusConfig[status as keyof typeof statusConfig] || 
      { label: status, className: 'bg-gray-100 text-gray-800' };

    return (
      <Badge variant="outline" className={className}>
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar pagamentos..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pagamentos</CardTitle>
          <CardDescription>Gerencie os pagamentos da plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Taxa da Plataforma</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                  <TableCell>{payment.userName}</TableCell>
                  <TableCell>{payment.serviceName}</TableCell>
                  <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                  <TableCell>R$ {payment.platformFee.toFixed(2)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Painel Administrativo</h2>
            <p className="text-muted-foreground">
              Gerencie usuários, serviços e as operações da plataforma
            </p>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Configurações do Sistema
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuários Totais
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUsers.length}</div>
              <p className="text-xs text-muted-foreground">
                +3 novos esta semana
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Serviços Ativos
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockServices.filter(s => s.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockServices.filter(s => s.status === 'pending_review').length} em revisão
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Receita Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {mockPayments.reduce((sum, p) => sum + p.platformFee, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês passado
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Permissões
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="services">
            <ServiceManagement />
          </TabsContent>
          
          <TabsContent value="payments">
            <PaymentManagement />
          </TabsContent>
          
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Permissões</CardTitle>
                <CardDescription>
                  Defina quais funcionalidades cada tipo de usuário pode acessar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Moderadores</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mod-manage-services">Gerenciar serviços</Label>
                        <Switch id="mod-manage-services" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mod-approve-services">Aprovar serviços</Label>
                        <Switch id="mod-approve-services" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mod-manage-users">Gerenciar usuários</Label>
                        <Switch id="mod-manage-users" defaultChecked={false} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mod-view-payments">Visualizar pagamentos</Label>
                        <Switch id="mod-view-payments" defaultChecked={false} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mod-manage-payments">Gerenciar pagamentos</Label>
                        <Switch id="mod-manage-payments" defaultChecked={false} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Anunciantes</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="adv-create-services">Criar serviços</Label>
                        <Switch id="adv-create-services" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="adv-edit-services">Editar próprios serviços</Label>
                        <Switch id="adv-edit-services" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="adv-promote-services">Promover serviços</Label>
                        <Switch id="adv-promote-services" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="adv-see-clients">Ver dados de clientes</Label>
                        <Switch id="adv-see-clients" defaultChecked={false} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Clientes</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="client-hire-services">Contratar serviços</Label>
                        <Switch id="client-hire-services" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="client-review-services">Avaliar serviços</Label>
                        <Switch id="client-review-services" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="client-message-providers">Enviar mensagens para anunciantes</Label>
                        <Switch id="client-message-providers" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
