
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UserRole, AdvertiserProfile, ClientProfile, AdminProfile } from '@/types/user';
import {
  User,
  Mail,
  MapPin,
  Edit2,
  Shield,
  Star,
  FileText,
  Briefcase,
  Award,
  CheckCircle,
  BookOpen,
  Heart,
  Clock
} from 'lucide-react';

const Profile = () => {
  // Normalmente você buscaria esses dados de uma API
  const [userRole, setUserRole] = useState<UserRole>('advertiser');
  const [profile, setProfile] = useState<AdvertiserProfile | ClientProfile | AdminProfile>({
    id: "user-1",
    fullName: "Rafael Costa",
    email: "rafael.costa@example.com",
    location: "São Paulo, SP",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Especialista em marketing digital e comunicação. Ajudo intercambistas a estabelecer presença online e encontrar oportunidades no Brasil.",
    role: "advertiser",
    verified: true,
    createdAt: new Date("2022-07-15"),
    updatedAt: new Date("2023-06-22"),
    skills: ["Marketing Digital", "SEO", "Copywriting", "Social Media"],
    experience: "5+ anos em marketing digital, tendo trabalhado com empresas nacionais e internacionais.",
    portfolio: "https://rafaelcosta.portfolio.com",
    rating: 4.8,
    totalReviews: 124,
    identityVerified: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData as any);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const renderProfileContent = () => {
    switch (userRole) {
      case 'advertiser':
        return renderAdvertiserProfile();
      case 'client':
        return renderClientProfile();
      case 'admin':
        return renderAdminProfile();
      default:
        return renderAdvertiserProfile();
    }
  };

  const renderAdvertiserProfile = () => {
    const advertiserProfile = profile as AdvertiserProfile;
    
    return (
      <>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Seus dados pessoais e profissionais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input 
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input 
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea 
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input 
                          id="portfolio"
                          name="portfolio"
                          value={(formData as AdvertiserProfile).portfolio}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experiência</Label>
                        <Textarea 
                          id="experience"
                          name="experience"
                          value={(formData as AdvertiserProfile).experience}
                          onChange={handleChange}
                          rows={3}
                        />
                      </div>
                      
                      <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                          Cancelar
                        </Button>
                        <Button type="submit">
                          Salvar Alterações
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Dados Pessoais</h3>
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                          <Edit2 className="h-4 w-4 mr-2" /> Editar
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Nome</p>
                            <p>{advertiserProfile.fullName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>{advertiserProfile.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Localização</p>
                            <p>{advertiserProfile.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Membro desde</p>
                            <p>{advertiserProfile.createdAt.toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Sobre</h3>
                        <p className="text-muted-foreground">{advertiserProfile.description}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Experiência</h3>
                        <p className="text-muted-foreground">{advertiserProfile.experience}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Habilidades</h3>
                        <div className="flex flex-wrap gap-2">
                          {advertiserProfile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Portfolio</h3>
                        <a 
                          href={advertiserProfile.portfolio} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {advertiserProfile.portfolio}
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Verificações</CardTitle>
                  <CardDescription>
                    Status de verificação da sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <span>Conta Verificada</span>
                    </div>
                    {advertiserProfile.verified ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button variant="outline" size="sm">Verificar</Button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-500" />
                      <span>Identidade Verificada</span>
                    </div>
                    {advertiserProfile.identityVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button variant="outline" size="sm">Verificar</Button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span>Email Verificado</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Classificação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{advertiserProfile.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(advertiserProfile.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({advertiserProfile.totalReviews} avaliações)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Serviços</CardTitle>
                <CardDescription>
                  Serviços que você oferece na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-lg font-medium">Gerenciador de Serviços</h3>
                  <p className="mt-1 text-muted-foreground">
                    Gerencie seus serviços na seção específica do dashboard
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/dashboard/services">Gerenciar Serviços</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações</CardTitle>
                <CardDescription>
                  O que os clientes estão dizendo sobre seus serviços
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-lg font-medium">Avaliações de Serviços</h3>
                  <p className="mt-1 text-muted-foreground">
                    Veja as avaliações detalhadas em cada serviço individual
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/dashboard/services">Ver Serviços</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>
                  Visualização detalhada do desempenho dos seus serviços
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-lg font-medium">Analytics Detalhados</h3>
                  <p className="mt-1 text-muted-foreground">
                    Veja estatísticas detalhadas na seção de analytics do dashboard
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/analytics">Ver Analytics</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  const renderClientProfile = () => {
    const clientProfile = profile as ClientProfile;
    
    return (
      <>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="bookings">Contratações</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Seus dados pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input 
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input 
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea 
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>
                      
                      <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                          Cancelar
                        </Button>
                        <Button type="submit">
                          Salvar Alterações
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Dados Pessoais</h3>
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                          <Edit2 className="h-4 w-4 mr-2" /> Editar
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Nome</p>
                            <p>{clientProfile.fullName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>{clientProfile.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Localização</p>
                            <p>{clientProfile.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Membro desde</p>
                            <p>{clientProfile.createdAt.toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Sobre</h3>
                        <p className="text-muted-foreground">{clientProfile.description}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Verificações</CardTitle>
                  <CardDescription>
                    Status de verificação da sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <span>Conta Verificada</span>
                    </div>
                    {clientProfile.verified ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button variant="outline" size="sm">Verificar</Button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span>Email Verificado</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingCart className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Histórico de Compras</span>
                    </div>
                    <p className="text-2xl font-bold">{clientProfile.purchaseHistory}</p>
                    <p className="text-sm text-muted-foreground">serviços contratados</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Serviços Contratados</CardTitle>
                <CardDescription>
                  Serviços que você contratou na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-lg font-medium">Serviços Contratados</h3>
                  <p className="mt-1 text-muted-foreground">
                    Gerencie seus serviços contratados na seção específica
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/client-services">Ver Serviços Contratados</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Favoritos</CardTitle>
                <CardDescription>
                  Serviços que você salvou como favoritos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-lg font-medium">Serviços Favoritos</h3>
                  <p className="mt-1 text-muted-foreground">
                    Visualize e gerencie seus serviços favoritos
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/favorites">Ver Favoritos</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  const renderAdminProfile = () => {
    const adminProfile = profile as AdminProfile;
    
    return (
      <>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="permissions">Permissões</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Informações do Administrador</CardTitle>
                  <CardDescription>
                    Seus dados de administrador do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input 
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                          Cancelar
                        </Button>
                        <Button type="submit">
                          Salvar Alterações
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Dados Pessoais</h3>
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                          <Edit2 className="h-4 w-4 mr-2" /> Editar
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Nome</p>
                            <p>{adminProfile.fullName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>{adminProfile.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Função</p>
                            <p>Administrador</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Último Acesso</p>
                            <p>{adminProfile.lastActive.toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Atalhos para funções administrativas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Gerenciar Usuários
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Revisar Serviços
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Relatórios
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Configurações de Segurança
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Permissões do Sistema</CardTitle>
                <CardDescription>
                  Suas permissões como administrador
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(adminProfile.permissions || ['user_management', 'content_management', 'system_config', 'reports_access']).map((permission, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{permission.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  // Controles para alternar entre os diferentes tipos de perfil (apenas para demonstração)
  const handleSwitchProfile = (role: UserRole) => {
    setUserRole(role);
    // Em uma aplicação real, você não teria esse botão. Apenas para demonstração.
    
    if (role === 'advertiser') {
      setProfile({
        id: "user-1",
        fullName: "Rafael Costa",
        email: "rafael.costa@example.com",
        location: "São Paulo, SP",
        profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
        description: "Especialista em marketing digital e comunicação. Ajudo intercambistas a estabelecer presença online e encontrar oportunidades no Brasil.",
        role: "advertiser",
        verified: true,
        createdAt: new Date("2022-07-15"),
        updatedAt: new Date("2023-06-22"),
        skills: ["Marketing Digital", "SEO", "Copywriting", "Social Media"],
        experience: "5+ anos em marketing digital, tendo trabalhado com empresas nacionais e internacionais.",
        portfolio: "https://rafaelcosta.portfolio.com",
        rating: 4.8,
        totalReviews: 124,
        identityVerified: true
      } as AdvertiserProfile);
    } else if (role === 'client') {
      setProfile({
        id: "user-2",
        fullName: "Ana Silva",
        email: "ana.silva@example.com",
        location: "Rio de Janeiro, RJ",
        profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
        description: "Intercambista em busca de serviços para facilitar minha adaptação no Brasil.",
        role: "client",
        verified: true,
        createdAt: new Date("2023-01-10"),
        updatedAt: new Date("2023-05-15"),
        purchaseHistory: 8,
        savedServices: ["service-1", "service-3", "service-7"]
      } as ClientProfile);
    } else if (role === 'admin') {
      setProfile({
        id: "user-3",
        fullName: "Carlos Mendes",
        email: "carlos.admin@example.com",
        location: "Brasília, DF",
        profileImage: "https://randomuser.me/api/portraits/men/67.jpg",
        description: "Administrador da plataforma responsável pela gestão de usuários e conteúdos.",
        role: "admin",
        verified: true,
        createdAt: new Date("2022-01-01"),
        updatedAt: new Date("2023-04-20"),
        permissions: ["user_management", "content_management", "system_config", "reports_access"],
        lastActive: new Date()
      } as AdminProfile);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
          
          {/* Apenas para demonstração - alternar entre tipos de perfil */}
          <div className="flex gap-2">
            <Button 
              variant={userRole === 'advertiser' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSwitchProfile('advertiser')}
            >
              Prestador
            </Button>
            <Button 
              variant={userRole === 'client' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSwitchProfile('client')}
            >
              Cliente
            </Button>
            <Button 
              variant={userRole === 'admin' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleSwitchProfile('admin')}
            >
              Admin
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-background rounded-lg p-6 border">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.profileImage} alt={profile.fullName} />
            <AvatarFallback>{profile.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-1 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-2xl font-bold">{profile.fullName}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {profile.role === 'advertiser' ? 'Prestador de Serviços' : 
                   profile.role === 'client' ? 'Cliente' : 'Administrador'}
                </Badge>
                {profile.verified && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Verificado
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-muted-foreground">{profile.description}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button>Editar Perfil</Button>
            <Button variant="outline">Configurações</Button>
          </div>
        </div>
        
        {renderProfileContent()}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
