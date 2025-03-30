
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar, 
  Download,
  Clock
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';

// Mock data
const areaChartData = [
  { month: 'Jan', serviços: 20, ganhos: 1200 },
  { month: 'Fev', serviços: 15, ganhos: 900 },
  { month: 'Mar', serviços: 25, ganhos: 1500 },
  { month: 'Abr', serviços: 30, ganhos: 1800 },
  { month: 'Mai', serviços: 22, ganhos: 1320 },
  { month: 'Jun', serviços: 28, ganhos: 1680 },
  { month: 'Jul', serviços: 35, ganhos: 2100 },
];

const pieChartData = [
  { name: 'Tradução', value: 45 },
  { name: 'Acompanhamento', value: 25 },
  { name: 'Documentação', value: 15 },
  { name: 'Outros', value: 15 },
];

const barChartData = [
  { name: 'Seg', clientes: 10, concluídos: 7 },
  { name: 'Ter', clientes: 15, concluídos: 10 },
  { name: 'Qua', clientes: 12, concluídos: 8 },
  { name: 'Qui', clientes: 18, concluídos: 12 },
  { name: 'Sex', clientes: 20, concluídos: 15 },
  { name: 'Sab', clientes: 8, concluídos: 6 },
  { name: 'Dom', clientes: 5, concluídos: 3 },
];

const statusData = [
  { name: 'Pendentes', value: 8 },
  { name: 'Em andamento', value: 15 },
  { name: 'Concluídos', value: 42 },
  { name: 'Cancelados', value: 3 },
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Acompanhe seu desempenho e tome decisões baseadas em dados.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          </TabsList>

          <div className="mt-6 grid gap-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total de Ganhos"
                  value="R$ 8.450,00"
                  icon={<DollarSign className="h-4 w-4" />}
                  description="Receita dos últimos 30 dias"
                  trend={{ value: 12.5, isPositive: true }}
                />
                <StatCard
                  title="Serviços Prestados"
                  value="68"
                  icon={<BarChart2 className="h-4 w-4" />}
                  description="Total deste mês"
                  trend={{ value: 8.2, isPositive: true }}
                />
                <StatCard
                  title="Novos Clientes"
                  value="24"
                  icon={<Users className="h-4 w-4" />}
                  description="Últimos 30 dias"
                  trend={{ value: 5.1, isPositive: true }}
                />
                <StatCard
                  title="Taxa de Conclusão"
                  value="92%"
                  icon={<TrendingUp className="h-4 w-4" />}
                  description="Serviços concluídos vs cancelados"
                  trend={{ value: 1.2, isPositive: true }}
                />
              </div>

              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <AnalyticsChart
                  title="Serviços e Ganhos"
                  description="Serviços prestados e ganhos nos últimos 7 meses"
                  type="area"
                  data={areaChartData}
                  dataKeys={{
                    x: 'month',
                    y: ['serviços', 'ganhos'],
                  }}
                />
                <AnalyticsChart
                  title="Distribuição por Tipo de Serviço"
                  description="Quais são seus serviços mais populares"
                  type="pie"
                  data={pieChartData}
                  dataKeys={{
                    name: 'name',
                    value: 'value',
                  }}
                />
              </div>

              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <AnalyticsChart
                  title="Atividade Semanal"
                  description="Novos clientes e serviços concluídos esta semana"
                  type="bar"
                  data={barChartData}
                  dataKeys={{
                    category: 'name',
                    y: ['clientes', 'concluídos'],
                  }}
                />
                <Card>
                  <CardHeader>
                    <CardTitle>Status dos Serviços</CardTitle>
                    <CardDescription>Visão geral dos seus serviços ativos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsChart
                      title=""
                      type="pie"
                      data={statusData}
                      dataKeys={{
                        name: 'name',
                        value: 'value',
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho dos Serviços</CardTitle>
                  <CardDescription>
                    Performance detalhada de cada serviço oferecido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    Esta seção mostrará métricas detalhadas para cada serviço individual que você oferece.
                  </p>
                  
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Tradução de Documentos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Solicitações</span>
                            <span className="font-medium">32</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Concluídos</span>
                            <span className="font-medium">28</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Avaliação média</span>
                            <span className="font-medium">4.8/5</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Receita</span>
                            <span className="font-medium">R$ 3.360,00</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Acompanhamento de Vistos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Solicitações</span>
                            <span className="font-medium">18</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Concluídos</span>
                            <span className="font-medium">15</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Avaliação média</span>
                            <span className="font-medium">4.6/5</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Receita</span>
                            <span className="font-medium">R$ 2.700,00</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Auxílio com Documentação</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Solicitações</span>
                            <span className="font-medium">25</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Concluídos</span>
                            <span className="font-medium">22</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Avaliação média</span>
                            <span className="font-medium">4.7/5</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Receita</span>
                            <span className="font-medium">R$ 2.200,00</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Clientes</CardTitle>
                  <CardDescription>
                    Informações sobre seus clientes e comportamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-4">Origem dos Clientes</h3>
                      <AnalyticsChart
                        title=""
                        type="pie"
                        data={[
                          { name: 'Busca orgânica', value: 45 },
                          { name: 'Indicação', value: 30 },
                          { name: 'Redes sociais', value: 15 },
                          { name: 'Outros', value: 10 },
                        ]}
                        dataKeys={{
                          name: 'name',
                          value: 'value',
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Taxa de Retenção</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Clientes recorrentes</span>
                            <span className="font-medium">65%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Novos clientes</span>
                            <span className="font-medium">35%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h4 className="font-medium mb-2">Satisfação do Cliente</h4>
                        <div className="flex items-center">
                          <div className="text-3xl font-bold">4.7</div>
                          <div className="flex ml-2">
                            {[1, 2, 3, 4].map((star) => (
                              <svg
                                key={star}
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 15.585l-5.196 2.73 1.098-6.404-4.658-4.541 6.435-.935L10 1l2.32 4.716 6.435.935-4.658 4.541 1.098 6.404L10 15.585z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                            <svg
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 15.585l-5.196 2.73 1.098-6.404-4.658-4.541 6.435-.935L10 1l2.32 4.716 6.435.935-4.658 4.541 1.098 6.404L10 15.585z"
                                clipRule="evenodd"
                                opacity="0.7"
                              />
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">
                            baseado em 68 avaliações
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Reuniões</CardTitle>
                  <CardDescription>Agendamentos com clientes nos próximos dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="flex-shrink-0">
                        <Calendar className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Consulta sobre visto canadense</p>
                        <p className="text-sm text-muted-foreground">Maria Oliveira</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Amanhã, 14:00 - 15:00</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver detalhes
                      </Button>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="flex-shrink-0">
                        <Calendar className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Tradução de documentos acadêmicos</p>
                        <p className="text-sm text-muted-foreground">Carlos Mendes</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>22/10/2023, 10:30 - 11:30</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver detalhes
                      </Button>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="flex-shrink-0">
                        <Calendar className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Revisão de documentação para visto americano</p>
                        <p className="text-sm text-muted-foreground">Ana Costa</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>23/10/2023, 15:00 - 16:30</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-4">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                  title="Receita Total"
                  value="R$ 8.450,00"
                  icon={<DollarSign className="h-4 w-4" />}
                  trend={{ value: 12.5, isPositive: true }}
                />
                <StatCard
                  title="Pendente"
                  value="R$ 2.150,00"
                  icon={<Clock className="h-4 w-4" />}
                  trend={{ value: 3.2, isPositive: false }}
                />
                <StatCard
                  title="Concluído"
                  value="R$ 6.300,00"
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  trend={{ value: 8.1, isPositive: true }}
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Ganhos</CardTitle>
                  <CardDescription>Receita dos últimos 12 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart
                    title=""
                    type="area"
                    data={[
                      { month: 'Out', value: 1500 },
                      { month: 'Nov', value: 1800 },
                      { month: 'Dez', value: 2200 },
                      { month: 'Jan', value: 2000 },
                      { month: 'Fev', value: 1900 },
                      { month: 'Mar', value: 2400 },
                      { month: 'Abr', value: 2800 },
                      { month: 'Mai', value: 3200 },
                      { month: 'Jun', value: 3000 },
                      { month: 'Jul', value: 3400 },
                      { month: 'Ago', value: 3800 },
                      { month: 'Set', value: 4200 },
                    ]}
                    dataKeys={{
                      x: 'month',
                      y: 'value',
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
