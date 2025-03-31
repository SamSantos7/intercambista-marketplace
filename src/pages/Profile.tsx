
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Star,
  MessageSquare,
  Settings,
  Edit,
  Plus,
  Briefcase,
  CheckCircle,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Globe,
  DollarSign,
  RefreshCcw,
  BarChart2,
  ShoppingCart,
  Users,
  FileText
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: 'Ana Souza',
    email: 'ana.souza@example.com',
    phone: '+55 11 98765-4321',
    location: 'Irlanda',
    bio: 'Professora de português há 8 anos, especializada em ensinar estrangeiros. Formada em Letras pela USP com mestrado em Linguística Aplicada.',
    website: 'www.anasouza.com',
    profileImage: 'https://randomuser.me/api/portraits/women/43.jpg',
    role: 'advertiser',
    hourlyRate: 'R$ 80,00',
    totalEarnings: 'R$ 12.560,00',
    totalServices: 12,
    totalClients: 24,
    averageRating: 4.8,
    totalReviews: 43,
    joined: 'Fevereiro 2023'
  });

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const handleFieldChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src={profileData.profileImage} alt={profileData.fullName} />
                <AvatarFallback>{profileData.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{profileData.fullName}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Membro desde {profileData.joined}
                  </span>
                </div>
                
                {profileData.role === 'advertiser' && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1 font-medium">{profileData.averageRating}</span>
                      <span className="text-muted-foreground ml-1">({profileData.totalReviews} avaliações)</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Prestador de Serviços</Badge>
                  </div>
                )}
                
                {profileData.role === 'client' && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mt-2">Cliente</Badge>
                )}
                
                {profileData.role === 'admin' && (
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 mt-2">Administrador</Badge>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {profileData.role === 'advertiser' && (
                <Button variant="outline" asChild>
                  <Link to="/dashboard/services/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Serviço
                  </Link>
                </Button>
              )}
              
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="h-4 w-4" />
                Editar Perfil
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Contact Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{profileData.email}</p>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{profileData.phone}</p>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                  </div>
                </div>
                
                {profileData.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{profileData.website}</p>
                      <p className="text-sm text-muted-foreground">Website</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Services Stats (for advertisers) */}
            {profileData.role === 'advertiser' && (
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Taxa horária</span>
                    <span className="font-medium">{profileData.hourlyRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total ganho</span>
                    <span className="font-medium">{profileData.totalEarnings}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Serviços ativos</span>
                    <span className="font-medium">{profileData.totalServices}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Clientes atendidos</span>
                    <span className="font-medium">{profileData.totalClients}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avaliação média</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1 font-medium">{profileData.averageRating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Client Stats */}
            {profileData.role === 'client' && (
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Serviços contratados</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avaliações feitas</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Serviços favoritos</span>
                    <span className="font-medium">12</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Membro desde</span>
                    <span className="font-medium">{profileData.joined}</span>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Admin Stats */}
            {profileData.role === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas do Admin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Serviços aprovados</span>
                    <span className="font-medium">145</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Usuários moderados</span>
                    <span className="font-medium">32</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pagamentos processados</span>
                    <span className="font-medium">287</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nível de acesso</span>
                    <Badge>Administrador Master</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Editar Perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações de perfil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input 
                      id="fullName" 
                      value={profileData.fullName} 
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        value={profileData.phone} 
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input 
                      id="location" 
                      value={profileData.location} 
                      onChange={(e) => handleFieldChange('location', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea 
                      id="bio" 
                      rows={4} 
                      value={profileData.bio} 
                      onChange={(e) => handleFieldChange('bio', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      value={profileData.website} 
                      onChange={(e) => handleFieldChange('website', e.target.value)}
                    />
                  </div>
                  
                  {profileData.role === 'advertiser' && (
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Taxa Horária (R$)</Label>
                      <Input 
                        id="hourlyRate" 
                        value={profileData.hourlyRate.replace('R$ ', '')} 
                        onChange={(e) => handleFieldChange('hourlyRate', `R$ ${e.target.value}`)}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="public-profile" defaultChecked />
                    <Label htmlFor="public-profile">Perfil público</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  <Button onClick={handleSaveProfile}>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            ) : (
              <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  
                  {profileData.role === 'advertiser' && (
                    <TabsTrigger value="services">Serviços</TabsTrigger>
                  )}
                  
                  {profileData.role === 'client' && (
                    <TabsTrigger value="hired">Serviços Contratados</TabsTrigger>
                  )}
                  
                  <TabsTrigger value="reviews">
                    {profileData.role === 'advertiser' ? 'Avaliações' : 'Avaliações Feitas'}
                  </TabsTrigger>
                  
                  {profileData.role === 'admin' && (
                    <TabsTrigger value="activities">Atividades</TabsTrigger>
                  )}
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line">{profileData.bio}</p>
                    </CardContent>
                  </Card>
                  
                  {profileData.role === 'advertiser' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Estatísticas Recentes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Serviços Ativos</span>
                            <div className="flex items-center mt-2">
                              <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-2xl font-bold">{profileData.totalServices}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Avaliação</span>
                            <div className="flex items-center mt-2">
                              <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-2" />
                              <span className="text-2xl font-bold">{profileData.averageRating}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Clientes</span>
                            <div className="flex items-center mt-2">
                              <BarChart2 className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-2xl font-bold">{profileData.totalClients}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium mb-4">Clientes Recentes</h3>
                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 20}.jpg`} />
                                    <AvatarFallback>CL</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">Cliente {i}</p>
                                    <p className="text-xs text-muted-foreground">Aula de português</p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-green-50">
                                  <CheckCircle className="h-3 w-3 mr-1" /> Concluído
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {profileData.role === 'client' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Atividade Recente</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Serviços Contratados</span>
                            <div className="flex items-center mt-2">
                              <ShoppingCart className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-2xl font-bold">8</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Avaliações</span>
                            <div className="flex items-center mt-2">
                              <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-2" />
                              <span className="text-2xl font-bold">7</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Pagamentos</span>
                            <div className="flex items-center mt-2">
                              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-2xl font-bold">12</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium mb-4">Serviços Recentes</h3>
                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${i + 30}.jpg`} />
                                    <AvatarFallback>PR</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">Serviço {i}</p>
                                    <p className="text-xs text-muted-foreground">Prestador {i}</p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-green-50">
                                  <CheckCircle className="h-3 w-3 mr-1" /> Concluído
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {profileData.role === 'admin' && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Visão Geral do Sistema</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Usuários Totais</span>
                            <div className="flex items-center mt-2">
                              <Users className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-2xl font-bold">523</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Serviços Ativos</span>
                            <div className="flex items-center mt-2">
                              <Briefcase className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-2xl font-bold">187</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col p-4 border rounded-lg">
                            <span className="text-sm text-muted-foreground">Transações</span>
                            <div className="flex items-center mt-2">
                              <RefreshCcw className="h-5 w-5 text-amber-500 mr-2" />
                              <span className="text-2xl font-bold">845</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium mb-4">Atividades Recentes</h3>
                          <div className="space-y-3">
                            {[
                              {
                                action: "Aprovação de serviço",
                                details: "Aula de português",
                                time: "2 horas atrás"
                              },
                              {
                                action: "Moderação de usuário",
                                details: "Carlos Mendes",
                                time: "5 horas atrás"
                              },
                              {
                                action: "Processamento de reembolso",
                                details: "Pedido #45982",
                                time: "1 dia atrás"
                              }
                            ].map((activity, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium">{activity.action}</p>
                                  <p className="text-xs text-muted-foreground">{activity.details}</p>
                                </div>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Services Tab for advertisers */}
                {profileData.role === 'advertiser' && (
                  <TabsContent value="services" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Meus Serviços</h3>
                      <Button asChild>
                        <Link to="/dashboard/services/new" className="flex items-center">
                          <Plus className="h-4 w-4 mr-2" />
                          Novo Serviço
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          id: "srv-001",
                          title: "Aulas de Português para Estrangeiros",
                          category: "Educação",
                          price: "R$ 80,00/hora",
                          bookings: 8,
                          rating: 4.9,
                          status: "active",
                          image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        },
                        {
                          id: "srv-002",
                          title: "Tradução de Documentos (PT/EN)",
                          category: "Tradução",
                          price: "R$ 120,00/página",
                          bookings: 12,
                          rating: 4.8,
                          status: "active",
                          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        },
                        {
                          id: "srv-003",
                          title: "Orientação para Intercambistas",
                          category: "Consultoria",
                          price: "R$ 150,00/sessão",
                          bookings: 5,
                          rating: 5.0,
                          status: "inactive",
                          image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        }
                      ].map((service) => (
                        <Card key={service.id} className="overflow-hidden">
                          <div className="aspect-video relative">
                            <img 
                              src={service.image} 
                              alt={service.title} 
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge className={service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {service.status === 'active' ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold line-clamp-2">{service.title}</h4>
                                <p className="text-sm text-muted-foreground">{service.category}</p>
                              </div>
                              <p className="font-bold">{service.price}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                <span className="ml-1 text-sm">{service.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{service.bookings} agendamentos</span>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex gap-2">
                            <Button variant="outline" size="sm" asChild className="flex-1">
                              <Link to={`/dashboard/services/${service.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver
                              </Link>
                            </Button>
                            <Button size="sm" asChild className="flex-1">
                              <Link to={`/dashboard/services/${service.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                )}
                
                {/* Hired Services Tab for clients */}
                {profileData.role === 'client' && (
                  <TabsContent value="hired" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Serviços Contratados</h3>
                      <Button variant="outline" asChild>
                        <Link to="/services">
                          Explorar Serviços
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          id: "book-001",
                          title: "Aulas de Português para Estrangeiros",
                          provider: "Ana Souza",
                          date: "15/06/2023",
                          status: "completed",
                          amount: "R$ 320,00",
                          image: "https://randomuser.me/api/portraits/women/43.jpg"
                        },
                        {
                          id: "book-002",
                          title: "Orientação para Intercambistas",
                          provider: "Paulo Mendes",
                          date: "28/07/2023",
                          status: "completed",
                          amount: "R$ 150,00",
                          image: "https://randomuser.me/api/portraits/men/22.jpg"
                        },
                        {
                          id: "book-003",
                          title: "Tradução de Documentos",
                          provider: "Carla Santos",
                          date: "03/08/2023",
                          status: "active",
                          amount: "R$ 240,00",
                          image: "https://randomuser.me/api/portraits/women/28.jpg"
                        }
                      ].map((booking) => (
                        <Card key={booking.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={booking.image} alt={booking.provider} />
                                <AvatarFallback>{booking.provider.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold">{booking.title}</h4>
                                <p className="text-sm text-muted-foreground">Prestador: {booking.provider}</p>
                              </div>
                              
                              <div className="text-right">
                                <p className="font-bold">{booking.amount}</p>
                                <p className="text-sm text-muted-foreground">{booking.date}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <Badge
                                className={
                                  booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                  booking.status === 'active' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-amber-100 text-amber-800'
                                }
                              >
                                {booking.status === 'completed' ? 'Concluído' : 
                                  booking.status === 'active' ? 'Em Andamento' : 'Agendado'}
                              </Badge>
                              
                              <div className="space-x-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/services/${booking.id}`}>Detalhes</Link>
                                </Button>
                                {booking.status === 'completed' && !booking.id.includes('002') && (
                                  <Button size="sm" variant="outline">Avaliar</Button>
                                )}
                                {booking.status === 'completed' && booking.id.includes('002') && (
                                  <Button size="sm" variant="outline" disabled>Avaliado</Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                )}
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {profileData.role === 'advertiser' ? 'Avaliações de Clientes' : 'Avaliações Feitas'}
                      </CardTitle>
                      {profileData.role === 'advertiser' && (
                        <CardDescription>
                          {profileData.totalReviews} avaliações, média de {profileData.averageRating} estrelas
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {profileData.role === 'advertiser' ? (
                        // Reviews for advertiser
                        [
                          {
                            id: 1,
                            client: "João Silva",
                            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                            rating: 5,
                            date: "10/06/2023",
                            comment: "Excelentes aulas de português! A Ana é paciente e explica de maneira clara, adaptando o conteúdo às minhas necessidades. Recomendo!"
                          },
                          {
                            id: 2,
                            client: "Maria Costa",
                            avatar: "https://randomuser.me/api/portraits/women/56.jpg",
                            rating: 5,
                            date: "28/05/2023",
                            comment: "Ótimo serviço! Aulas personalizadas e materiais muito úteis. Já estou notando um grande progresso no meu português."
                          },
                          {
                            id: 3,
                            client: "Richard Thompson",
                            avatar: "https://randomuser.me/api/portraits/men/41.jpg",
                            rating: 4,
                            date: "15/05/2023",
                            comment: "Professora muito competente e pontual. As aulas são bem estruturadas e práticas. Recomendo para quem quer aprender português rapidamente."
                          }
                        ].map((review) => (
                          <div key={review.id} className="pb-5 border-b last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={review.avatar} alt={review.client} />
                                  <AvatarFallback>{review.client.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{review.client}</p>
                                  <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-3 text-sm">{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        // Reviews made by client
                        [
                          {
                            id: 1,
                            provider: "Paulo Mendes",
                            service: "Orientação para Intercambistas",
                            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                            rating: 5,
                            date: "28/07/2023",
                            comment: "Orientação excelente! Paulo conhece muito bem a Irlanda e me ajudou com dicas valiosas sobre moradia, trabalho e documentação."
                          },
                          {
                            id: 2,
                            provider: "Ana Souza",
                            service: "Aulas de Português para Estrangeiros",
                            avatar: "https://randomuser.me/api/portraits/women/43.jpg",
                            rating: 4,
                            date: "15/06/2023",
                            comment: "Ótimas aulas, professora muito paciente e dedicada. Materiais bem elaborados e adaptados às minhas necessidades."
                          }
                        ].map((review) => (
                          <div key={review.id} className="pb-5 border-b last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={review.avatar} alt={review.provider} />
                                  <AvatarFallback>{review.provider.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{review.provider}</p>
                                  <p className="text-xs">{review.service}</p>
                                  <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-3 text-sm">{review.comment}</p>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Admin Activities Tab */}
                {profileData.role === 'admin' && (
                  <TabsContent value="activities" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Atividades do Administrador</CardTitle>
                        <CardDescription>
                          Registro de ações administrativas recentes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              action: "Aprovação de serviço",
                              details: "Tradução de Documentos - Carlos Mendes",
                              time: "Hoje, 14:30",
                              icon: <CheckCircle className="h-4 w-4 text-green-500" />
                            },
                            {
                              action: "Moderação de usuário",
                              details: "Advertência - Roberto Alves",
                              time: "Ontem, 16:45",
                              icon: <User className="h-4 w-4 text-amber-500" />
                            },
                            {
                              action: "Moderação de conteúdo",
                              details: "Remoção de comentário inadequado",
                              time: "25/05/2023, 10:20",
                              icon: <FileText className="h-4 w-4 text-red-500" />
                            },
                            {
                              action: "Processamento de reembolso",
                              details: "Pedido #45982 - R$ 150,00",
                              time: "22/05/2023, 09:15",
                              icon: <RefreshCcw className="h-4 w-4 text-blue-500" />
                            },
                            {
                              action: "Configuração do sistema",
                              details: "Atualização das taxas de serviço",
                              time: "20/05/2023, 11:30",
                              icon: <Settings className="h-4 w-4 text-gray-500" />
                            }
                          ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                              <div className="bg-muted rounded-full p-2 mt-1">
                                {activity.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <p className="font-medium">{activity.action}</p>
                                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Permissões de Acesso</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { name: "Gerenciar usuários", enabled: true },
                            { name: "Aprovar/rejeitar serviços", enabled: true },
                            { name: "Processar reembolsos", enabled: true },
                            { name: "Modificar configurações do sistema", enabled: true },
                            { name: "Acessar relatórios financeiros", enabled: true },
                            { name: "Adicionar administradores", enabled: false }
                          ].map((permission, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span>{permission.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge className={permission.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                  {permission.enabled ? 'Permitido' : 'Bloqueado'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
