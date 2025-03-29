
import React, { useState } from 'react';
import { 
  Check, 
  Filter, 
  MoreHorizontal, 
  Star, 
  ArrowUpDown,
  Search,
  MailIcon,
  PhoneIcon,
  MapPinIcon
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  avatar: string;
  status: 'active' | 'inactive' | 'pending';
  lastPurchase: string;
  totalSpent: number;
  rating: number;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    location: 'São Paulo, Brasil',
    phone: '+55 (11) 98765-4321',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    status: 'active',
    lastPurchase: '2 dias atrás',
    totalSpent: 1250.75,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Ana Souza',
    email: 'ana.souza@example.com',
    location: 'Rio de Janeiro, Brasil',
    phone: '+55 (21) 98123-4567',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    status: 'active',
    lastPurchase: '1 semana atrás',
    totalSpent: 842.30,
    rating: 4.5
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@example.com',
    location: 'Porto Alegre, Brasil',
    phone: '+55 (51) 99876-5432',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'inactive',
    lastPurchase: '1 mês atrás',
    totalSpent: 350.00,
    rating: 3.9
  },
  {
    id: '4',
    name: 'Luísa Ferreira',
    email: 'luisa.ferreira@example.com',
    location: 'Belo Horizonte, Brasil',
    phone: '+55 (31) 98234-5678',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    status: 'active',
    lastPurchase: '3 dias atrás',
    totalSpent: 1675.45,
    rating: 5.0
  },
  {
    id: '5',
    name: 'Roberto Alves',
    email: 'roberto.alves@example.com',
    location: 'Salvador, Brasil',
    phone: '+55 (71) 99432-1876',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    status: 'pending',
    lastPurchase: 'Nunca',
    totalSpent: 0,
    rating: 0
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@example.com',
    location: 'Brasília, Brasil',
    phone: '+55 (61) 98345-6789',
    avatar: 'https://randomuser.me/api/portraits/women/69.jpg',
    status: 'active',
    lastPurchase: '5 dias atrás',
    totalSpent: 920.15,
    rating: 4.6
  },
  {
    id: '7',
    name: 'Pedro Santos',
    email: 'pedro.santos@example.com',
    location: 'Curitiba, Brasil',
    phone: '+55 (41) 99765-4321',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    status: 'active',
    lastPurchase: '2 semanas atrás',
    totalSpent: 530.50,
    rating: 4.2
  }
];

const CustomerStatus = ({ status }: { status: 'active' | 'inactive' | 'pending' }) => {
  const statusMap = {
    active: { label: 'Ativo', className: 'bg-green-100 text-green-700' },
    inactive: { label: 'Inativo', className: 'bg-gray-100 text-gray-700' },
    pending: { label: 'Pendente', className: 'bg-amber-100 text-amber-700' }
  };

  const { label, className } = statusMap[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const CustomerRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.round(rating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-200 fill-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  
  const filteredCustomers = mockCustomers.filter((customer) => {
    // Filter by search query
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // Sort by selected field
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'totalSpent':
        return b.totalSpent - a.totalSpent;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie e analise seus clientes
            </p>
          </div>
          <Button>Adicionar Cliente</Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Todos os Clientes</CardTitle>
            <CardDescription>
              Um total de {mockCustomers.length} clientes registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy('name')}>
                      <Check className={`mr-2 h-4 w-4 ${sortBy === 'name' ? 'opacity-100' : 'opacity-0'}`} />
                      Nome
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('totalSpent')}>
                      <Check className={`mr-2 h-4 w-4 ${sortBy === 'totalSpent' ? 'opacity-100' : 'opacity-0'}`} />
                      Total Gasto
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('rating')}>
                      <Check className={`mr-2 h-4 w-4 ${sortBy === 'rating' ? 'opacity-100' : 'opacity-0'}`} />
                      Avaliação
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="grid" className="mb-6">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">Lista</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{customer.name}</h3>
                          <CustomerStatus status={customer.status} />
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remover</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Total Gasto:</span>
                        <span className="font-medium">R$ {customer.totalSpent.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Última Compra:</span>
                        <span>{customer.lastPurchase}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Avaliação:</span>
                        <CustomerRating rating={customer.rating} />
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex gap-2">
                      <Button className="flex-1" variant="outline" size="sm">Mensagem</Button>
                      <Button className="flex-1" size="sm">Ver Perfil</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
