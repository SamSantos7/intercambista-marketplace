
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, Home, Briefcase, MessageSquare, Heart, Settings, 
  Bell, LogOut, DollarSign, Calendar, BarChart2, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  
  // Determine active tab based on URL path
  React.useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path) {
      if (path === 'dashboard') {
        setActiveTab('overview');
      } else {
        setActiveTab(path);
      }
    }
  }, [location.pathname]);

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
            icon={<Users className="h-4 w-4" />}
            label="Clientes"
            href="/dashboard/customers"
            active={activeTab === 'customers'}
            onClick={() => setActiveTab('customers')}
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
            icon={<DollarSign className="h-4 w-4" />}
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
          <SidebarItem
            icon={<BarChart2 className="h-4 w-4" />}
            label="Analytics"
            href="/dashboard/analytics"
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
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
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
