
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Home, Briefcase, MessageSquare, Heart, Settings, 
  Bell, LogOut, Plus, DollarSign, Calendar, BarChart2, ArrowRight,
  Users, CheckCircle, Clock, AlertCircle, Clipboard, Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-background">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-semibold text-xl tracking-tight">Intercambista</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <SidebarItem
            icon={<Home className="h-4 w-4" />}
            label="Visão Geral"
            href="/dashboard"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <SidebarItem
            icon={<Briefcase className="h-4 w-4" />}
            label="Meus Serviços"
            href="/dashboard/services"
            active={activeTab === 'services'}
            onClick={() => setActiveTab('services')}
          />
          <SidebarItem
            icon={<Calendar className="h-4 w-4" />}
            label="Agendamentos"
            href="/dashboard/bookings"
            active={activeTab === 'bookings'}
            onClick={() => setActiveTab('bookings')}
          />
          <SidebarItem
            icon={<MessageSquare className="h-4 w-4" />}
            label="Mensagens"
            href="/dashboard/messages"
            active={activeTab === 'messages'}
            onClick={() => setActiveTab('messages')}
            badge="3"
          />
          <SidebarItem
            icon={<Wallet className="h-4 w-4" />}
            label="Pagamentos"
            href="/dashboard/payments"
            active={activeTab === 'payments'}
            onClick={() => setActiveTab('payments')}
          />
          <SidebarItem
            icon={<Heart className="h-4 w-4" />}
            label="Favoritos"
            href="/dashboard/favorites"
            active={activeTab === 'favorites'}
            onClick={() => setActiveTab('favorites')}
          />
          
          <div className="pt-4 mt-4 border-t">
            <h3 className="mb-2 px-2 text-xs font-medium uppercase text-muted-foreground">
              Configurações
            </h3>
            <SidebarItem
              icon={<User className="h-4 w-4" />}
              label="Perfil"
              href="/dashboard/profile"
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
            <SidebarItem
              icon={<Settings className="h-4 w-4" />}
              label="Configurações"
              href="/dashboard/settings"
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
          </div>
        </nav>
        
        <div className="p-4 border-t">
          <SidebarItem
            icon={<LogOut className="h-4 w-4" />}
            label="Sair"
            href="/logout"
            onClick={() => {
              // Logout logic here
              console.log('Logout clicked');
            }}
          />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b bg-background">
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-semibold text-xl tracking-tight">Intercambista</span>
            </Link>
          </div>
          
          <div className="flex items-center ml-auto gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/dashboard/messages">
                <span className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    3
                  </span>
                </span>
              </Link>
            </Button>
            
            <Button variant="ghost" className="gap-2" asChild>
              <Link to="/dashboard/profile" className="flex items-center gap-2">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden md:inline-block font-medium">Rafael Costa</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <section className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Olá, Rafael!</h1>
                <p className="text-muted-foreground mt-1">
                  Bem-vindo ao seu painel. Veja abaixo seu resumo.
                </p>
              </div>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services">
                    Explorar serviços
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/dashboard/services/new" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Anunciar serviço
                  </Link>
                </Button>
              </div>
            </section>

            {/* Stats Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <StatsCard
                title="Serviços"
                value="12"
                icon={<Briefcase className="h-5 w-5" />}
                description="2 aguardando aprovação"
                trend="up"
                trendValue="3"
                color="blue"
              />
              <StatsCard
                title="Ganhos"
                value="R$ 1.520,00"
                icon={<DollarSign className="h-5 w-5" />}
                description="Últimos 30 dias"
                trend="up"
                trendValue="12%"
                color="green"
              />
              <StatsCard
                title="Avaliações"
                value="4.9"
                icon={<Star />}
                description="De 28 clientes"
                trend="up"
                trendValue="0.2"
                color="amber"
              />
              <StatsCard
                title="Clientes"
                value="35"
                icon={<Users className="h-5 w-5" />}
                description="7 novos este mês"
                trend="up"
                trendValue="5"
                color="purple"
              />
            </section>

            {/* Recent Activity */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Bookings */}
              <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Agendamentos Recentes</CardTitle>
                    <CardDescription>
                      Seus últimos agendamentos de serviços
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard/bookings" className="flex items-center gap-1">
                      <span>Ver todos</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "1",
                        service: "Aulas de Português",
                        client: {
                          name: "John Smith",
                          avatar: "https://randomuser.me/api/portraits/men/42.jpg"
                        },
                        date: "Hoje, 14:30",
                        price: "R$ 80,00",
                        status: "confirmed"
                      },
                      {
                        id: "2",
                        service: "Tradução de Documentos",
                        client: {
                          name: "Emma Wilson",
                          avatar: "https://randomuser.me/api/portraits/women/33.jpg"
                        },
                        date: "Amanhã, 10:00",
                        price: "R$ 150,00",
                        status: "pending"
                      },
                      {
                        id: "3",
                        service: "Design de Site",
                        client: {
                          name: "Michael Brown",
                          avatar: "https://randomuser.me/api/portraits/men/22.jpg"
                        },
                        date: "20 Jun, 16:00",
                        price: "R$ 350,00",
                        status: "completed"
                      },
                    ].map((booking) => (
                      <div 
                        key={booking.id}
                        className="flex items-center justify-between py-3 border-b last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.client.avatar}
                            alt={booking.client.name}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{booking.service}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.client.name} · {booking.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{booking.price}</span>
                          <StatusBadge status={booking.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Acesso rápido às funcionalidades mais usadas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Plus className="h-4 w-4" />
                    Criar novo serviço
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Clipboard className="h-4 w-4" />
                    Ver agendamentos
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <MessageSquare className="h-4 w-4" />
                    Responder mensagens
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <BarChart2 className="h-4 w-4" />
                    Ver análises
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <User className="h-4 w-4" />
                    Editar perfil
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Your Services */}
            <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold tracking-tight">Seus Serviços</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/services" className="flex items-center gap-1">
                    <span>Ver todos</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: "1",
                    title: "Aulas de Português para Estrangeiros",
                    price: 70,
                    bookings: 8,
                    rating: 4.9,
                    active: true,
                    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  },
                  {
                    id: "2",
                    title: "Tradução de Documentos (PT/EN)",
                    price: 120,
                    bookings: 12,
                    rating: 4.8,
                    active: true,
                    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  },
                  {
                    id: "3",
                    title: "Design de Sites Responsivos",
                    price: 250,
                    bookings: 5,
                    rating: 5.0,
                    active: true,
                    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  },
                ].map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, href, active = false, badge, onClick }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      active
        ? "bg-primary/10 text-primary font-medium"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    )}
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="flex-1">{label}</span>
    {badge && (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
        {badge}
      </span>
    )}
  </Link>
);

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  color: string;
}

const StatsCard = ({ title, value, icon, description, trend, trendValue, color }: StatsCardProps) => {
  const colors = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    amber: "text-amber-500 bg-amber-50", 
    purple: "text-purple-500 bg-purple-50",
    red: "text-red-500 bg-red-50"
  };

  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={cn("rounded-lg p-2", colors[color])}>
            {icon}
          </div>
        </div>
        <div className="flex items-center mt-3">
          <span className={cn("inline-flex items-center text-sm font-medium gap-1", trendColor)}>
            <TrendIcon className="h-3.5 w-3.5" />
            {trendValue}
          </span>
          <span className="text-sm text-muted-foreground ml-2">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    price: number;
    bookings: number;
    rating: number;
    active: boolean;
    image: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => (
  <Card className="overflow-hidden hover-lift">
    <div className="aspect-[5/3] relative">
      <img 
        src={service.image} 
        alt={service.title} 
        className="object-cover w-full h-full"
      />
      <div className="absolute top-3 right-3">
        <span className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          service.active 
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        )}>
          {service.active ? "Ativo" : "Inativo"}
        </span>
      </div>
    </div>
    <CardContent className="p-4">
      <h3 className="font-medium line-clamp-2">{service.title}</h3>
      <div className="flex items-center justify-between mt-3">
        <p className="font-semibold text-lg">R$ {service.price}</p>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{service.rating}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        {service.bookings} agendamentos totais
      </p>
    </CardContent>
    <CardFooter className="p-4 pt-0 flex gap-3">
      <Button size="sm" variant="outline" className="flex-1">Editar</Button>
      <Button size="sm" className="flex-1">Gerenciar</Button>
    </CardFooter>
  </Card>
);

const StatusBadge = ({ status }: { status: string }) => {
  let color, icon, label;

  switch (status) {
    case 'confirmed':
      color = "bg-green-100 text-green-700";
      icon = <CheckCircle className="h-3.5 w-3.5" />;
      label = "Confirmado";
      break;
    case 'pending':
      color = "bg-amber-100 text-amber-700";
      icon = <Clock className="h-3.5 w-3.5" />;
      label = "Pendente";
      break;
    case 'cancelled':
      color = "bg-red-100 text-red-700";
      icon = <AlertCircle className="h-3.5 w-3.5" />;
      label = "Cancelado";
      break;
    case 'completed':
      color = "bg-blue-100 text-blue-700";
      icon = <CheckCircle className="h-3.5 w-3.5" />;
      label = "Concluído";
      break;
    default:
      color = "bg-gray-100 text-gray-700";
      icon = <Clock className="h-3.5 w-3.5" />;
      label = "Pendente";
  }

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-1",
      color
    )}>
      {icon}
      {label}
    </span>
  );
};

// Additional icons
const Star = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ArrowUp = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ArrowDown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const Minus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default Dashboard;
