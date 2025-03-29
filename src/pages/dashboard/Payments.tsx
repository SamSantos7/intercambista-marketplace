
import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  DownloadCloud, 
  Filter, 
  Search,
  CreditCard,
  Landmark,
  Wallet,
  AlertCircle,
  CheckCircle2,
  Clock,
  Printer,
  ArrowDownToLine,
  Calendar
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Payment {
  id: string;
  client: {
    name: string;
    avatar: string;
  };
  service: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded' | 'processing';
  date: string;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'pix' | 'paypal';
  invoice: string;
}

const mockPayments: Payment[] = [
  {
    id: 'INV-001',
    client: {
      name: 'João Silva',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    service: 'Aulas de Português',
    amount: 150.00,
    status: 'completed',
    date: '2023-06-15',
    paymentMethod: 'credit_card',
    invoice: 'INV-2023-001'
  },
  {
    id: 'INV-002',
    client: {
      name: 'Ana Souza',
      avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    },
    service: 'Tradução de Documentos',
    amount: 280.50,
    status: 'pending',
    date: '2023-06-14',
    paymentMethod: 'bank_transfer',
    invoice: 'INV-2023-002'
  },
  {
    id: 'INV-003',
    client: {
      name: 'Carlos Mendes',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    service: 'Design de Site',
    amount: 750.00,
    status: 'completed',
    date: '2023-06-10',
    paymentMethod: 'pix',
    invoice: 'INV-2023-003'
  },
  {
    id: 'INV-004',
    client: {
      name: 'Luísa Ferreira',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    service: 'Consultoria de Viagem',
    amount: 320.75,
    status: 'failed',
    date: '2023-06-05',
    paymentMethod: 'credit_card',
    invoice: 'INV-2023-004'
  },
  {
    id: 'INV-005',
    client: {
      name: 'Roberto Alves',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    },
    service: 'Orientação Acadêmica',
    amount: 125.00,
    status: 'refunded',
    date: '2023-06-01',
    paymentMethod: 'paypal',
    invoice: 'INV-2023-005'
  },
  {
    id: 'INV-006',
    client: {
      name: 'Fernanda Lima',
      avatar: 'https://randomuser.me/api/portraits/women/69.jpg',
    },
    service: 'Aulas de Inglês',
    amount: 200.00,
    status: 'completed',
    date: '2023-05-28',
    paymentMethod: 'credit_card',
    invoice: 'INV-2023-006'
  },
  {
    id: 'INV-007',
    client: {
      name: 'Pedro Santos',
      avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    },
    service: 'Marketing Digital',
    amount: 450.00,
    status: 'processing',
    date: '2023-05-25',
    paymentMethod: 'bank_transfer',
    invoice: 'INV-2023-007'
  }
];

const PaymentStatusBadge = ({ status }: { status: Payment['status'] }) => {
  const statusConfig = {
    completed: { label: 'Concluído', className: 'bg-green-100 text-green-700' },
    pending: { label: 'Pendente', className: 'bg-amber-100 text-amber-700' },
    failed: { label: 'Falhou', className: 'bg-red-100 text-red-700' },
    refunded: { label: 'Reembolsado', className: 'bg-purple-100 text-purple-700' },
    processing: { label: 'Processando', className: 'bg-blue-100 text-blue-700' }
  };

  const { label, className } = statusConfig[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const PaymentMethodIcon = ({ method }: { method: Payment['paymentMethod'] }) => {
  switch (method) {
    case 'credit_card':
      return <CreditCard className="h-4 w-4" />;
    case 'bank_transfer':
      return <Landmark className="h-4 w-4" />;
    case 'pix':
      return <Wallet className="h-4 w-4" />;
    case 'paypal':
      return <Wallet className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  // Calculate some statistics
  const totalPayments = mockPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingPayments = mockPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  // Filter payments based on search and filters
  const filteredPayments = mockPayments.filter(payment => {
    // Search filter
    const matchesSearch = 
      payment.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoice.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    // Date filter (simplified for demo)
    let matchesDate = true;
    const paymentDate = new Date(payment.date);
    const now = new Date();
    
    if (dateFilter === 'today') {
      matchesDate = paymentDate.toDateString() === now.toDateString();
    } else if (dateFilter === 'this_week') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      matchesDate = paymentDate >= weekStart;
    } else if (dateFilter === 'this_month') {
      matchesDate = paymentDate.getMonth() === now.getMonth() && 
                   paymentDate.getFullYear() === now.getFullYear();
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pagamentos</h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe os pagamentos dos seus serviços
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline">
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Novo Pagamento
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Recebido</p>
                  <h3 className="text-2xl font-bold mt-1">R$ {totalPayments.toFixed(2)}</h3>
                </div>
                <div className="bg-green-100 text-green-700 rounded-lg p-2">
                  <ArrowUp className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center text-sm font-medium gap-1 text-green-600">
                  <ArrowUp className="h-3.5 w-3.5" />
                  12%
                </span>
                <span className="text-sm text-muted-foreground ml-2">em relação ao mês passado</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pagamentos Pendentes</p>
                  <h3 className="text-2xl font-bold mt-1">R$ {pendingPayments.toFixed(2)}</h3>
                </div>
                <div className="bg-amber-100 text-amber-700 rounded-lg p-2">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <span className="text-sm text-muted-foreground">
                  {mockPayments.filter(p => p.status === 'pending').length} pagamentos aguardando
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receita do Mês</p>
                  <h3 className="text-2xl font-bold mt-1">R$ {completedPayments.toFixed(2)}</h3>
                </div>
                <div className="bg-blue-100 text-blue-700 rounded-lg p-2">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center text-sm font-medium gap-1 text-blue-600">
                  <ArrowUp className="h-3.5 w-3.5" />
                  8%
                </span>
                <span className="text-sm text-muted-foreground ml-2">em relação ao mês passado</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Falhas</p>
                  <h3 className="text-2xl font-bold mt-1">2.4%</h3>
                </div>
                <div className="bg-red-100 text-red-700 rounded-lg p-2">
                  <AlertCircle className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center text-sm font-medium gap-1 text-green-600">
                  <ArrowDown className="h-3.5 w-3.5" />
                  1.2%
                </span>
                <span className="text-sm text-muted-foreground ml-2">em relação ao mês passado</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pagamentos</CardTitle>
            <CardDescription>
              Gerencie e visualize todos os pagamentos recebidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente, serviço ou número da fatura..."
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
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="processing">Processando</SelectItem>
                    <SelectItem value="failed">Falhou</SelectItem>
                    <SelectItem value="refunded">Reembolsado</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todo Período</SelectItem>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="this_week">Esta Semana</SelectItem>
                    <SelectItem value="this_month">Este Mês</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-4">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="completed">Concluídos</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
                <TabsTrigger value="processing">Processando</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={payment.client.avatar} alt={payment.client.name} />
                              <AvatarFallback>{payment.client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{payment.client.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <PaymentMethodIcon method={payment.paymentMethod} />
                            <span>{payment.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <PaymentStatusBadge status={payment.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8">
                            <DownloadCloud className="h-4 w-4 mr-2" />
                            {payment.invoice}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        Nenhum pagamento encontrado com os filtros atuais.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payments;
