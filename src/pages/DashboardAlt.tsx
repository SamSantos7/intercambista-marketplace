import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Settings, Menu, X, 
  Bell, Search, ChevronDown, MoreHorizontal, Calendar,
  CreditCard, DollarSign, User, Package, BarChart4,
  MessagesSquare, PlusCircle, Check, Boxes, Server
} from 'lucide-react';

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const DashboardAlt = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Mobile sidebar */}
      <div className={`
        fixed inset-0 z-50 bg-background/80 backdrop-blur-sm 
        lg:hidden transition-opacity duration-200
        ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="fixed inset-y-0 left-0 z-50 w-72 bg-background shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Package className="h-6 w-6 text-primary" />
              <span>ServicesHub</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="py-4 px-2 space-y-1">
            {/* Mobile navigation links */}
            <MobileNavLink icon={<LayoutDashboard className="h-5 w-5" />} to="/dashboard">
              Dashboard
            </MobileNavLink>
            <MobileNavLink icon={<Users className="h-5 w-5" />} to="/customers">
              Clientes
            </MobileNavLink>
            <MobileNavLink icon={<FileText className="h-5 w-5" />} to="/dashboard/services" active>
              Serviços
            </MobileNavLink>
            <MobileNavLink icon={<MessagesSquare className="h-5 w-5" />} to="/messages">
              Mensagens
            </MobileNavLink>
            <MobileNavLink icon={<BarChart4 className="h-5 w-5" />} to="/analytics">
              Análises
            </MobileNavLink>
            <MobileNavLink icon={<CreditCard className="h-5 w-5" />} to="/payments">
              Pagamentos
            </MobileNavLink>
            
            <div className="pt-4 mt-4 border-t">
              <MobileNavLink icon={<Settings className="h-5 w-5" />} to="/settings">
                Configurações
              </MobileNavLink>
              <MobileNavLink icon={<User className="h-5 w-5" />} to="/profile">
                Perfil
              </MobileNavLink>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop layout */}
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-72 border-r bg-background">
          <div className="flex items-center h-16 px-6 border-b">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Package className="h-6 w-6 text-primary" />
              <span>ServicesHub</span>
            </Link>
          </div>
          
          <div className="flex-1 py-6 px-4 space-y-1">
            {/* Desktop navigation links */}
            <NavLink icon={<LayoutDashboard />} to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink icon={<Users />} to="/customers">
              Clientes
            </NavLink>
            <NavLink icon={<FileText />} to="/dashboard/services" active>
              Serviços
            </NavLink>
            <NavLink icon={<MessagesSquare />} to="/messages">
              Mensagens
            </NavLink>
            <NavLink icon={<BarChart4 />} to="/analytics">
              Análises
            </NavLink>
            <NavLink icon={<CreditCard />} to="/payments">
              Pagamentos
            </NavLink>
            
            <div className="pt-4 mt-4 border-t">
              <NavLink icon={<Settings />} to="/settings">
                Configurações
              </NavLink>
              <NavLink icon={<User />} to="/profile">
                Perfil
              </NavLink>
            </div>
          </div>
          
          <div className="p-4 border-t mt-auto">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">João Silva</p>
                <p className="text-xs text-muted-foreground">joao@example.com</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Editar perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1">
          {/* Header */}
          <header className="flex items-center h-16 px-6 border-b bg-background">
            <Button variant="outline" size="icon" onClick={toggleMobileMenu} className="mr-4 lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar..." 
                className="pl-10 max-w-xs"
              />
            </div>
            
            <div className="flex items-center ml-auto gap-2">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background"></span>
              </Button>
              
              <div className="hidden md:flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">João Silva</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </header>
          
          {/* Content area */}
          <div className="py-6 px-6 md:px-8 max-w-7xl mx-auto">
            {/* Page title */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Serviço
              </Button>
            </div>
            
            {/* Overview cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <StatsCard 
                title="Faturamento Total"
                value="R$ 4.325,00"
                description="+12% em relação ao mês passado"
                trend="up"
                icon={<DollarSign className="h-8 w-8 text-primary" />}
              />
              <StatsCard 
                title="Serviços Ativos" 
                value="7"
                description="2 aguardando aprovação"
                icon={<FileText className="h-8 w-8 text-indigo-500" />}
              />
              <StatsCard 
                title="Clientes" 
                value="24"
                description="5 novos este mês"
                trend="up"
                icon={<Users className="h-8 w-8 text-green-500" />}
              />
              <StatsCard 
                title="Avaliação Média" 
                value="4.8"
                description="Baseado em 37 avaliações"
                icon={<BarChart4 className="h-8 w-8 text-amber-500" />}
              />
            </div>
            
            {/* Tabs for different views */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="analytics">Análises</TabsTrigger>
                <TabsTrigger value="reports">Relatórios</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab Content */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Atividade Recente</CardTitle>
                      <CardDescription>
                        Últimas 5 atividades registradas na sua conta
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <ActivityItem 
                          title="Novo Serviço Criado"
                          description="Você criou um novo serviço: Aulas de Design"
                          timestamp="Há 2 horas"
                          icon={<PlusCircle className="h-6 w-6 text-green-500" />}
                        />
                        <ActivityItem 
                          title="Pagamento Recebido"
                          description="Pagamento de R$ 150,00 recebido de Eduardo Santos"
                          timestamp="Ontem"
                          icon={<DollarSign className="h-6 w-6 text-primary" />}
                        />
                        <ActivityItem 
                          title="Nova Avaliação"
                          description="5 estrelas para seu serviço de Tradução"
                          timestamp="Há 2 dias"
                          icon={<Check className="h-6 w-6 text-amber-500" />}
                        />
                        <ActivityItem 
                          title="Nova Mensagem"
                          description="Mariana enviou uma mensagem sobre seu serviço"
                          timestamp="Há 3 dias"
                          icon={<MessagesSquare className="h-6 w-6 text-blue-500" />}
                        />
                        <ActivityItem 
                          title="Perfil Atualizado"
                          description="Você atualizou suas informações de perfil"
                          timestamp="Há 5 dias"
                          icon={<User className="h-6 w-6 text-violet-500" />}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Ver todas as atividades
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Upcoming Schedule */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Agenda da Semana</CardTitle>
                      <CardDescription>
                        Próximos eventos e compromissos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 text-primary rounded-lg p-2 w-12 h-12 flex flex-col items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold">SET</span>
                            <span className="text-lg font-bold leading-none">28</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Videoconferência com Ana Souza</h4>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>14:00 - 15:00</span>
                            </div>
                            <Badge variant="outline" className="mt-2">Aula de Português</Badge>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 text-primary rounded-lg p-2 w-12 h-12 flex flex-col items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold">SET</span>
                            <span className="text-lg font-bold leading-none">29</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Entrega de Projeto</h4>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>Prazo final: 18:00</span>
                            </div>
                            <Badge variant="outline" className="mt-2">Design de Site</Badge>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 text-primary rounded-lg p-2 w-12 h-12 flex flex-col items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold">OUT</span>
                            <span className="text-lg font-bold leading-none">02</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Reunião com cliente potencial</h4>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>10:30 - 11:30</span>
                            </div>
                            <Badge variant="outline" className="mt-2">Nova Oportunidade</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Ver agenda completa
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Featured Services */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Seus Serviços em Destaque</CardTitle>
                        <CardDescription>
                          Serviços que estão gerando mais interesse
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/services')}>
                        Ver todos
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Service Card 1 */}
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">Aulas de Português</CardTitle>
                            <Badge>Popular</Badge>
                          </div>
                          <CardDescription>Educação > Idiomas</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex justify-between text-sm pb-2">
                            <span className="text-muted-foreground">8 vendas este mês</span>
                            <span className="font-medium">R$ 70,00/hora</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            75% de conclusão da meta mensal
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Service Card 2 */}
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">Tradução de Documentos</CardTitle>
                            <Badge variant="outline">Destaque</Badge>
                          </div>
                          <CardDescription>Serviços Profissionais</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex justify-between text-sm pb-2">
                            <span className="text-muted-foreground">12 vendas este mês</span>
                            <span className="font-medium">R$ 120,00/projeto</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            90% de conclusão da meta mensal
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Service Card 3 */}
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">Design de Sites</CardTitle>
                          </div>
                          <CardDescription>Tecnologia > Web Design</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex justify-between text-sm pb-2">
                            <span className="text-muted-foreground">5 vendas este mês</span>
                            <span className="font-medium">R$ 250,00/projeto</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: '50%' }}></div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            50% de conclusão da meta mensal
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Other tabs would be implemented here */}
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Análises de Desempenho</CardTitle>
                    <CardDescription>
                      Visualize métricas detalhadas sobre seus serviços e clientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Server className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Dados sendo carregados</h3>
                      <p className="text-muted-foreground">
                        Visualizações de análises detalhadas estarão disponíveis em breve
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Relatórios</CardTitle>
                    <CardDescription>
                      Gere e baixe relatórios personalizados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Boxes className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Relatórios em desenvolvimento</h3>
                      <p className="text-muted-foreground">
                        Esta funcionalidade estará disponível em breve
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>
                      Gerencie suas preferências de notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Centro de Notificações</h3>
                      <p className="text-muted-foreground">
                        Configure suas preferências de notificações aqui
                      </p>
                      <Button className="mt-4">Configurar Notificações</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper Components
const NavLink = ({ icon, children, to, active = false }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-md text-sm
        ${active 
          ? 'bg-primary/10 text-primary font-medium' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
      `}
    >
      {React.cloneElement(icon, { size: 18 })}
      {children}
    </Link>
  );
};

const MobileNavLink = ({ icon, children, to, active = false }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-md text-sm
        ${active 
          ? 'bg-primary/10 text-primary font-medium' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
      `}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

const StatsCard = ({ title, value, description, icon, trend }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="bg-muted/50 rounded-lg p-1.5">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs flex items-center mt-1 ${
          trend === 'up' ? 'text-green-600' : 
          trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
        }`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ title, description, timestamp, icon }) => {
  return (
    <div className="flex gap-4">
      <div className="mt-1 bg-muted/50 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
};

export default DashboardAlt;
