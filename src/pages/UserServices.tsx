
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Filter, Search, Edit, Trash2, Eye, 
  ArrowUp, ArrowDown, CheckCircle, XCircle,
  Calendar, DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import CreateServiceForm from '@/components/CreateServiceForm';

// Interface para os serviços
interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  status: 'active' | 'inactive' | 'pending';
  image: string;
  bookings: number;
  rating: number;
  highlights: boolean;
  createdAt: Date;
}

const UserServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Dados fictícios de exemplo
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Aulas de Português para Estrangeiros',
      description: 'Aulas personalizadas de português brasileiro para estrangeiros. Metodologia comunicativa e adaptada ao seu nível.',
      price: 70,
      category: 'Educação',
      subcategory: 'Aulas de Idiomas',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bookings: 8,
      rating: 4.9,
      highlights: false,
      createdAt: new Date('2024-03-01')
    },
    {
      id: '2',
      title: 'Tradução de Documentos (PT/EN)',
      description: 'Tradução profissional de documentos entre português e inglês. Ideal para documentos acadêmicos e pessoais.',
      price: 120,
      category: 'Serviços Profissionais',
      subcategory: 'Tradução',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bookings: 12,
      rating: 4.8,
      highlights: true,
      createdAt: new Date('2024-02-15')
    },
    {
      id: '3',
      title: 'Design de Sites Responsivos',
      description: 'Criação de sites modernos e responsivos para seu negócio ou portfólio pessoal.',
      price: 250,
      category: 'Tecnologia',
      subcategory: 'Web Design',
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bookings: 5,
      rating: 5.0,
      highlights: false,
      createdAt: new Date('2024-01-20')
    },
    {
      id: '4',
      title: 'Fotografia para Eventos',
      description: 'Serviço de fotografia profissional para eventos, aniversários e reuniões. Entrega de fotos editadas em alta resolução.',
      price: 180,
      category: 'Arte e Mídia',
      subcategory: 'Fotografia',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bookings: 0,
      rating: 0,
      highlights: false,
      createdAt: new Date('2024-03-10')
    },
  ]);

  // Filtragem dos serviços
  const filteredServices = services.filter(service => {
    // Filtro por termo de busca
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por categoria
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    
    // Filtro por status
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Ordenação dos serviços
  const sortedServices = [...filteredServices].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'bookings':
        comparison = a.bookings - b.bookings;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'createdAt':
      default:
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Handler para deletar um serviço
  const handleDeleteService = (id: string) => {
    setServices(prevServices => prevServices.filter(service => service.id !== id));
    toast({
      title: "Serviço removido",
      description: "O serviço foi excluído com sucesso.",
    });
  };

  // Handler para alternar status de um serviço
  const handleToggleStatus = (id: string) => {
    setServices(prevServices => prevServices.map(service => {
      if (service.id === id) {
        const newStatus = service.status === 'active' ? 'inactive' : 'active';
        return { ...service, status: newStatus };
      }
      return service;
    }));

    toast({
      title: "Status alterado",
      description: "O status do serviço foi atualizado com sucesso.",
    });
  };

  // Handler para adicionar um novo serviço
  const handleAddService = (newService: Omit<Service, 'id' | 'bookings' | 'rating' | 'createdAt'>) => {
    const service: Service = {
      ...newService,
      id: Math.random().toString(36).substring(2, 9),
      bookings: 0,
      rating: 0,
      createdAt: new Date(),
    };
    
    setServices(prevServices => [service, ...prevServices]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Serviço criado",
      description: "Seu serviço foi criado e está pendente de aprovação.",
    });
  };

  // Handler para solicitar destaque
  const handleRequestHighlight = (id: string) => {
    setServices(prevServices => prevServices.map(service => {
      if (service.id === id) {
        return { ...service, highlights: true };
      }
      return service;
    }));
    
    toast({
      title: "Destaque solicitado",
      description: "Seu serviço será destacado após a confirmação do pagamento.",
    });
  };

  // Obter categorias únicas para o filtro
  const uniqueCategories = Array.from(new Set(services.map(service => service.category)));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Meus Serviços</h1>
          <p className="text-muted-foreground">
            Gerencie os serviços que você oferece na plataforma
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Serviço</DialogTitle>
              <DialogDescription>
                Preencha as informações abaixo para criar um novo serviço. Seu serviço passará por uma aprovação antes de ser publicado.
              </DialogDescription>
            </DialogHeader>
            <CreateServiceForm onSubmit={handleAddService} onCancel={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Busca */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar serviços..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Filter className="mr-2 h-4 w-4" />
              {filterCategory === 'all' ? 'Todas as Categorias' : filterCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtrar por Categoria</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterCategory('all')}>
              Todas as Categorias
            </DropdownMenuItem>
            {uniqueCategories.map((category) => (
              <DropdownMenuItem key={category} onClick={() => setFilterCategory(category)}>
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Filter className="mr-2 h-4 w-4" />
              {filterStatus === 'all' ? 'Todos os Status' : 
               filterStatus === 'active' ? 'Ativos' : 
               filterStatus === 'inactive' ? 'Inativos' : 'Pendentes'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterStatus('all')}>
              Todos os Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('active')}>
              Ativos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
              Inativos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('pending')}>
              Pendentes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Lista de Serviços */}
      {sortedServices.length > 0 ? (
        <div className="space-y-4">
          {/* Cabeçalho da tabela com opções de ordenação */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-muted/40 rounded-lg text-sm font-medium">
            <div className="col-span-6 flex items-center cursor-pointer" onClick={() => {
              setSortOrder(sortBy === 'title' && sortOrder === 'asc' ? 'desc' : 'asc');
              setSortBy('title');
            }}>
              Serviço
              {sortBy === 'title' && (
                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </div>
            <div className="col-span-2 flex items-center cursor-pointer" onClick={() => {
              setSortOrder(sortBy === 'price' && sortOrder === 'asc' ? 'desc' : 'asc');
              setSortBy('price');
            }}>
              Preço
              {sortBy === 'price' && (
                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </div>
            <div className="col-span-1 flex items-center cursor-pointer" onClick={() => {
              setSortOrder(sortBy === 'bookings' && sortOrder === 'asc' ? 'desc' : 'asc');
              setSortBy('bookings');
            }}>
              Vendas
              {sortBy === 'bookings' && (
                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </div>
            <div className="col-span-1 flex items-center cursor-pointer" onClick={() => {
              setSortOrder(sortBy === 'rating' && sortOrder === 'asc' ? 'desc' : 'asc');
              setSortBy('rating');
            }}>
              Nota
              {sortBy === 'rating' && (
                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </div>
            <div className="col-span-2 text-center">Ações</div>
          </div>

          {/* Lista de serviços */}
          {sortedServices.map((service) => (
            <Card key={service.id} className={cn(
              "overflow-hidden hover:border-primary/20 transition-all",
              service.highlights && "border-primary/30 bg-primary/5"
            )}>
              {/* Versão desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center gap-4 p-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{service.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {service.category} &gt; {service.subcategory}
                    </p>
                    <div className="mt-1">
                      {service.status === 'active' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                          <CheckCircle className="h-3 w-3" /> Ativo
                        </span>
                      )}
                      {service.status === 'inactive' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                          <XCircle className="h-3 w-3" /> Inativo
                        </span>
                      )}
                      {service.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5">
                          <Calendar className="h-3 w-3" /> Pendente
                        </span>
                      )}
                      {service.highlights && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5 ml-2">
                          <DollarSign className="h-3 w-3" /> Destacado
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 font-semibold">
                  R$ {service.price.toFixed(2)}
                </div>
                <div className="col-span-1 text-center">
                  {service.bookings}
                </div>
                <div className="col-span-1 text-center flex items-center justify-center">
                  {service.rating > 0 ? (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="ml-1">{service.rating.toFixed(1)}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">N/A</span>
                  )}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2 p-4">
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/dashboard/services/${service.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/dashboard/services/${service.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <span className="sr-only">Abrir menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleStatus(service.id)}>
                        {service.status === 'active' ? 'Desativar' : 'Ativar'}
                      </DropdownMenuItem>
                      {!service.highlights && (
                        <DropdownMenuItem onClick={() => handleRequestHighlight(service.id)}>
                          Solicitar Destaque
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDeleteService(service.id)} className="text-destructive">
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Versão mobile */}
              <div className="md:hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span className="line-clamp-1">{service.title}</span>
                  </CardTitle>
                  <CardDescription>
                    {service.category} &gt; {service.subcategory}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      {service.status === 'active' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                          <CheckCircle className="h-3 w-3" /> Ativo
                        </span>
                      )}
                      {service.status === 'inactive' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                          <XCircle className="h-3 w-3" /> Inativo
                        </span>
                      )}
                      {service.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5">
                          <Calendar className="h-3 w-3" /> Pendente
                        </span>
                      )}
                      {service.highlights && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
                          <DollarSign className="h-3 w-3" /> Destacado
                        </span>
                      )}
                    </div>
                    <div className="font-semibold">R$ {service.price.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{service.bookings} vendas</span>
                    </div>
                    {service.rating > 0 ? (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="ml-1">{service.rating.toFixed(1)}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Sem avaliações</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/dashboard/services/${service.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/services/${service.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleStatus(service.id)}>
                          {service.status === 'active' ? 'Desativar' : 'Ativar'}
                        </DropdownMenuItem>
                        {!service.highlights && (
                          <DropdownMenuItem onClick={() => handleRequestHighlight(service.id)}>
                            Solicitar Destaque
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDeleteService(service.id)} className="text-destructive">
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Nenhum serviço encontrado</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
              ? 'Nenhum serviço corresponde aos filtros aplicados.' 
              : 'Você ainda não criou nenhum serviço.'}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Criar seu primeiro serviço
          </Button>
        </div>
      )}
    </div>
  );
};

// Componentes auxiliares
const MoreVertical = (props) => (
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
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

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

export default UserServices;
