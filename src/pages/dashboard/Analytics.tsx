
import React from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar,
  ChevronDown,
  Download,
  Users,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Progress } from '@/components/ui/progress';

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 1900 },
  { month: 'Mar', revenue: 1600 },
  { month: 'Apr', revenue: 2100 },
  { month: 'May', revenue: 1800 },
  { month: 'Jun', revenue: 2400 },
  { month: 'Jul', revenue: 2200 },
];

const clientsData = [
  { month: 'Jan', clients: 5 },
  { month: 'Feb', clients: 8 },
  { month: 'Mar', clients: 12 },
  { month: 'Apr', clients: 15 },
  { month: 'May', clients: 18 },
  { month: 'Jun', clients: 24 },
  { month: 'Jul', clients: 28 },
];

const serviceData = [
  { name: 'Aulas de Português', value: 40 },
  { name: 'Tradução de Documentos', value: 25 },
  { name: 'Design de Sites', value: 15 },
  { name: 'Marketing Digital', value: 10 },
  { name: 'Outros', value: 10 },
];

const chartColors = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#8A898C'];

const trafficSources = [
  { source: 'Pesquisa Orgânica', percentage: 45, value: 380 },
  { source: 'Redes Sociais', percentage: 30, value: 253 },
  { source: 'Indicações', percentage: 15, value: 126 },
  { source: 'Email Marketing', percentage: 10, value: 84 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Métricas e análises sobre o desempenho dos seus serviços
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Este Trimestre</SelectItem>
                <SelectItem value="year">Este Ano</SelectItem>
                <SelectItem value="all">Todo Período</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Jun 01 - Jun 30</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Faturamento Total</p>
                  <h3 className="text-2xl font-bold mt-1">R$ 12.450,00</h3>
                </div>
                <div className="bg-primary/10 text-primary rounded-lg p-2">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center text-sm font-medium gap-1 text-green-600">
                  <ArrowUp className="h-3.5 w-3.5" />
                  18%
                </span>
                <span className="text-sm text-muted-foreground ml-2">em relação ao mês passado</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Novos Clientes</p>
                  <h3 className="text-2xl font-bold mt-1">28</h3>
                </div>
                <div className="bg-blue-100 text-blue-700 rounded-lg p-2">
                  <Users className="h-5 w-5" />
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
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
                  <h3 className="text-2xl font-bold mt-1">64.5%</h3>
                </div>
                <div className="bg-green-100 text-green-700 rounded-lg p-2">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center text-sm font-medium gap-1 text-green-600">
                  <ArrowUp className="h-3.5 w-3.5" />
                  5.2%
                </span>
                <span className="text-sm text-muted-foreground ml-2">em relação ao mês passado</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tempo Médio de Resposta</p>
                  <h3 className="text-2xl font-bold mt-1">2h 15min</h3>
                </div>
                <div className="bg-amber-100 text-amber-700 rounded-lg p-2">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center text-sm font-medium gap-1 text-red-600">
                  <ArrowDown className="h-3.5 w-3.5" />
                  12%
                </span>
                <span className="text-sm text-muted-foreground ml-2">melhoria em relação ao mês passado</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>
                Análise da receita nos últimos 7 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value}`, 'Receita']} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Novos Clientes</CardTitle>
              <CardDescription>
                Crescimento de novos clientes ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clientsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} clientes`, 'Novos Clientes']} />
                  <Legend />
                  <Bar dataKey="clients" fill="#0EA5E9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Distribuição de Serviços</CardTitle>
              <CardDescription>
                Proporção de vendas por tipo de serviço
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Porcentagem']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Fontes de Tráfego</CardTitle>
              <CardDescription>
                De onde vêm seus clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{source.source}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-muted text-foreground">
                          {source.value} visitas
                        </Badge>
                        <span className="font-medium">{source.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Analytics Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Detalhada</CardTitle>
            <CardDescription>
              Análise aprofundada de diferentes métricas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="acquisition">Aquisição</TabsTrigger>
                <TabsTrigger value="retention">Retenção</TabsTrigger>
                <TabsTrigger value="revenue">Receita</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Principais Métricas</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Taxa de Conversão</span>
                        <span className="font-medium">8.5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Valor Médio por Pedido</span>
                        <span className="font-medium">R$ 185,00</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Tempo Médio no Site</span>
                        <span className="font-medium">4m 32s</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Taxa de Rejeição</span>
                        <span className="font-medium">24.8%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Novos Registros</span>
                        <span className="font-medium">128</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Desempenho por Serviço</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Aulas de Português</span>
                        <span className="font-medium text-green-600">+24%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Tradução de Documentos</span>
                        <span className="font-medium text-green-600">+12%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Design de Sites</span>
                        <span className="font-medium text-amber-600">+5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Marketing Digital</span>
                        <span className="font-medium text-green-600">+18%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Outros Serviços</span>
                        <span className="font-medium text-red-600">-3%</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Desempenho Regional</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">São Paulo</p>
                      <p className="font-medium">45% dos clientes</p>
                      <p className="text-sm text-green-600">+12% em relação ao mês passado</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Rio de Janeiro</p>
                      <p className="font-medium">22% dos clientes</p>
                      <p className="text-sm text-green-600">+8% em relação ao mês passado</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Belo Horizonte</p>
                      <p className="font-medium">12% dos clientes</p>
                      <p className="text-sm text-amber-600">+4% em relação ao mês passado</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Outros</p>
                      <p className="font-medium">21% dos clientes</p>
                      <p className="text-sm text-green-600">+15% em relação ao mês passado</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="acquisition">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <h3 className="text-lg font-medium">Dados de Aquisição</h3>
                  <p className="text-muted-foreground">
                    Dados detalhados sobre canais de aquisição serão exibidos aqui.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="retention">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <h3 className="text-lg font-medium">Dados de Retenção</h3>
                  <p className="text-muted-foreground">
                    Métricas de retenção de clientes serão exibidas aqui.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="revenue">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <h3 className="text-lg font-medium">Análise de Receita</h3>
                  <p className="text-muted-foreground">
                    Análises detalhadas sobre fontes de receita serão exibidas aqui.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
