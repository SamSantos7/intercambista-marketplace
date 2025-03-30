
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  User,
  UserPlus,
  Download,
  ArrowUpDown
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  location: string;
  joinDate: string;
  lastActivity: string;
  image?: string;
  totalSpent: number;
  servicesPurchased: number;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '+55 11 98765-4321',
    status: 'active',
    location: 'São Paulo, SP',
    joinDate: '2023-01-15',
    lastActivity: '2023-06-20',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    totalSpent: 1250.00,
    servicesPurchased: 7
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '+55 21 98765-1234',
    status: 'active',
    location: 'Rio de Janeiro, RJ',
    joinDate: '2023-02-10',
    lastActivity: '2023-06-18',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    totalSpent: 850.50,
    servicesPurchased: 4
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@example.com',
    phone: '+55 31 98211-5678',
    status: 'inactive',
    location: 'Belo Horizonte, MG',
    joinDate: '2023-01-05',
    lastActivity: '2023-05-12',
    image: 'https://randomuser.me/api/portraits/men/43.jpg',
    totalSpent: 450.00,
    servicesPurchased: 2
  },
  {
    id: '4',
    name: 'Ana Pereira',
    email: 'ana.pereira@example.com',
    phone: '+55 41 99876-5432',
    status: 'active',
    location: 'Curitiba, PR',
    joinDate: '2023-03-20',
    lastActivity: '2023-06-19',
    image: 'https://randomuser.me/api/portraits/women/43.jpg',
    totalSpent: 1875.25,
    servicesPurchased: 9
  },
  {
    id: '5',
    name: 'Roberto Lima',
    email: 'roberto.lima@example.com',
    phone: '+55 85 98765-8765',
    status: 'active',
    location: 'Fortaleza, CE',
    joinDate: '2023-04-12',
    lastActivity: '2023-06-15',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    totalSpent: 625.75,
    servicesPurchased: 3
  },
  {
    id: '6',
    name: 'Fernanda Costa',
    email: 'fernanda.costa@example.com',
    phone: '+55 51 98222-4567',
    status: 'inactive',
    location: 'Porto Alegre, RS',
    joinDate: '2023-02-28',
    lastActivity: '2023-04-30',
    image: 'https://randomuser.me/api/portraits/women/67.jpg',
    totalSpent: 325.00,
    servicesPurchased: 1
  }
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastActivity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter customers based on search and filters
  const filteredCustomers = mockCustomers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'lastActivity') {
        return sortOrder === 'asc'
          ? new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime()
          : new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      } else if (sortBy === 'totalSpent') {
        return sortOrder === 'asc'
          ? a.totalSpent - b.totalSpent
          : b.totalSpent - a.totalSpent;
      }
      return 0;
    });

  // Calculate stats
  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter(c => c.status === 'active').length;
  const totalRevenue = mockCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie e visualize todos os seus clientes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Cliente
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold mt-1">{totalCustomers}</h3>
                  <span className="text-sm text-green-600">+12% (30d)</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Clientes Ativos</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold mt-1">{activeCustomers}</h3>
                  <span className="text-sm text-muted-foreground">{Math.round((activeCustomers / totalCustomers) * 100)}% do total</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold mt-1">R$ {totalRevenue.toFixed(2)}</h3>
                  <span className="text-sm text-green-600">+8.5% (30d)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
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
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <button 
                    className="flex items-center gap-1" 
                    onClick={() => toggleSort('name')}
                  >
                    Cliente
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>
                  <button 
                    className="flex items-center gap-1" 
                    onClick={() => toggleSort('lastActivity')}
                  >
                    Última Atividade
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button 
                    className="flex items-center gap-1" 
                    onClick={() => toggleSort('totalSpent')}
                  >
                    Total Gasto
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={customer.image} alt={customer.name} />
                          <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                        {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm">Email</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>{new Date(customer.lastActivity).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>R$ {customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Enviar Email</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Nenhum cliente encontrado com os filtros atuais.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
