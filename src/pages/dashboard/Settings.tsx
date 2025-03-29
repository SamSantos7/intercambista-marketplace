
import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  CreditCard, 
  Bell, 
  Globe, 
  Smartphone,
  Brush,
  Check,
  Users,
  Shield,
  Trash2
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    fullName: 'Rafael Costa',
    email: 'rafael.costa@example.com',
    phone: '+55 (11) 98765-4321',
    location: 'São Paulo, Brasil',
    bio: 'Professor de Português para estrangeiros com mais de 5 anos de experiência. Especialista em comunicação empresarial e conversação.',
    website: 'www.rafaelcosta.com.br',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Perfil atualizado",
      description: "Suas informações de perfil foram salvas com sucesso.",
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar senha",
        description: "As senhas não coincidem. Por favor, tente novamente.",
      });
      return;
    }
    
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi atualizada com sucesso.",
    });
    
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Pagamento</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Brush className="h-4 w-4" />
              <span className="hidden sm:inline">Aparência</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais e como você aparece na plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                            <AvatarFallback>RC</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">Alterar Foto</Button>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Nome Completo</Label>
                              <Input
                                id="fullName"
                                name="fullName"
                                value={profileForm.fullName}
                                onChange={handleProfileChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={profileForm.email}
                                onChange={handleProfileChange}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Telefone</Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={profileForm.phone}
                                onChange={handleProfileChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Localização</Label>
                              <Input
                                id="location"
                                name="location"
                                value={profileForm.location}
                                onChange={handleProfileChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          rows={4}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={profileForm.website}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button type="submit">Salvar Alterações</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Identidade Profissional</CardTitle>
                  <CardDescription>
                    Configure as informações sobre seus serviços e habilidades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Idiomas Falados</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="py-1 px-3 flex items-center gap-2">
                        Português <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">×</Button>
                      </Badge>
                      <Badge variant="outline" className="py-1 px-3 flex items-center gap-2">
                        Inglês <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">×</Button>
                      </Badge>
                      <Badge variant="outline" className="py-1 px-3 flex items-center gap-2">
                        Espanhol <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">×</Button>
                      </Badge>
                      <Button variant="outline" size="sm" className="h-7 px-2">+ Adicionar</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Habilidades</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="py-1 px-3 flex items-center gap-2">
                        Ensino de Idiomas <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">×</Button>
                      </Badge>
                      <Badge variant="outline" className="py-1 px-3 flex items-center gap-2">
                        Tradução <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">×</Button>
                      </Badge>
                      <Badge variant="outline" className="py-1 px-3 flex items-center gap-2">
                        Comunicação <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">×</Button>
                      </Badge>
                      <Badge variant="outline" className="py-1 px-3 flex items-center gap-2">
                        Redação <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">×</Button>
                      </Badge>
                      <Button variant="outline" size="sm" className="h-7 px-2">+ Adicionar</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiência</Label>
                    <Select defaultValue="5_plus">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua experiência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1_year">Menos de 1 ano</SelectItem>
                        <SelectItem value="1_3_years">1 a 3 anos</SelectItem>
                        <SelectItem value="3_5_years">3 a 5 anos</SelectItem>
                        <SelectItem value="5_plus">Mais de 5 anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="education">Educação</Label>
                    <Input id="education" placeholder="Ex: Letras - Universidade de São Paulo" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="certificates">Certificados</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700">Verificado</Badge>
                          <span>TESOL - Certificação de Ensino de Inglês</span>
                        </div>
                        <Button variant="ghost" size="sm">Visualizar</Button>
                      </div>
                      <Button variant="outline">Adicionar Certificado</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificações</CardTitle>
                <CardDescription>
                  Configure como e quando deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notificações por E-mail</h3>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Novas Mensagens</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber um e-mail quando alguém te enviar uma mensagem
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Novos Agendamentos</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber um e-mail quando alguém agendar um serviço
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Pagamentos Recebidos</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber um e-mail quando receber um pagamento
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Novas Avaliações</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber um e-mail quando alguém deixar uma avaliação
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Atualizações da Plataforma</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber um e-mail sobre atualizações e novidades da plataforma
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notificações Push</h3>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Notificações no Navegador</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações mesmo quando não estiver usando o site
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Sons de Notificação</Label>
                        <p className="text-sm text-muted-foreground">
                          Reproduzir sons ao receber notificações
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Resumos por E-mail</h3>
                  <Separator />
                  
                  <div>
                    <Label htmlFor="digest-frequency">Frequência do Resumo</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alteração de Senha</CardTitle>
                  <CardDescription>
                    Atualize sua senha para manter sua conta segura
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button type="submit">Atualizar Senha</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Segurança da Conta</CardTitle>
                  <CardDescription>
                    Gerencie as opções de segurança da sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Autenticação de Dois Fatores</h3>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Sessões Ativas</h3>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-md flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Smartphone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">iPhone 12 - São Paulo</p>
                            <p className="text-sm text-muted-foreground">Ativo agora (Este dispositivo)</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          Atual
                        </Badge>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-md flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Globe className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Chrome - Windows</p>
                            <p className="text-sm text-muted-foreground">Último acesso há 2 dias</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Encerrar</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline">Encerrar Todas as Outras Sessões</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Privacidade</CardTitle>
                  <CardDescription>
                    Gerencie quem pode ver suas informações e como seus dados são usados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Perfil Público</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que os visitantes vejam seu perfil completo
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Mostrar Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Exibir seu email em seu perfil público
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-normal">Mostrar Telefone</Label>
                        <p className="text-sm text-muted-foreground">
                          Exibir seu número de telefone em seu perfil público
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">Controles de Dados</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Shield className="mr-2 h-4 w-4" />
                        Solicitar Meus Dados
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto text-red-600 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir Minha Conta
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Payment Tab */}
          <TabsContent value="payment">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pagamento</CardTitle>
                  <CardDescription>
                    Gerencie os métodos de pagamento vinculados à sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-md flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Visa - Expira em 12/2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Padrão</Badge>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Adicionar Novo Método de Pagamento
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Informações de Faturamento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingName">Nome Completo</Label>
                        <Input id="billingName" defaultValue="Rafael Costa" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxId">CPF/CNPJ</Label>
                        <Input id="taxId" defaultValue="123.456.789-00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress">Endereço</Label>
                        <Input id="billingAddress" defaultValue="Av. Paulista, 1000, Apto 123" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">Cidade</Label>
                        <Input id="billingCity" defaultValue="São Paulo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingState">Estado</Label>
                        <Input id="billingState" defaultValue="SP" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">CEP</Label>
                        <Input id="billingZip" defaultValue="01311-000" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Salvar Alterações</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>
                    Visualize o histórico de transações da sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-72">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-2 font-medium">Data</th>
                          <th className="pb-2 font-medium">Descrição</th>
                          <th className="pb-2 font-medium">Valor</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3">15/06/2023</td>
                          <td>Taxa de serviço</td>
                          <td>R$ 35,00</td>
                          <td>
                            <Badge variant="outline" className="bg-green-100 text-green-700">Pago</Badge>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">01/06/2023</td>
                          <td>Assinatura mensal</td>
                          <td>R$ 89,90</td>
                          <td>
                            <Badge variant="outline" className="bg-green-100 text-green-700">Pago</Badge>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">15/05/2023</td>
                          <td>Taxa de serviço</td>
                          <td>R$ 28,50</td>
                          <td>
                            <Badge variant="outline" className="bg-green-100 text-green-700">Pago</Badge>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">01/05/2023</td>
                          <td>Assinatura mensal</td>
                          <td>R$ 89,90</td>
                          <td>
                            <Badge variant="outline" className="bg-green-100 text-green-700">Pago</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3">15/04/2023</td>
                          <td>Taxa de serviço</td>
                          <td>R$ 42,00</td>
                          <td>
                            <Badge variant="outline" className="bg-green-100 text-green-700">Pago</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">
                    Exportar Histórico
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>
                  Personalize a aparência da plataforma conforme sua preferência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Tema</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 flex flex-col items-center gap-4 cursor-pointer bg-background">
                      <div className="w-full h-20 bg-background border rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-foreground"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Claro</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 flex flex-col items-center gap-4 cursor-pointer hover:border-primary">
                      <div className="w-full h-20 bg-slate-950 border border-slate-800 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4"></div>
                        <span>Escuro</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 flex flex-col items-center gap-4 cursor-pointer hover:border-primary">
                      <div className="w-full h-20 bg-gradient-to-b from-background to-slate-950 border rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-foreground to-slate-300"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4"></div>
                        <span>Sistema</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Densidade</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="density-compact"
                        name="density"
                        className="form-radio"
                      />
                      <Label htmlFor="density-compact">Compacta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="density-normal"
                        name="density"
                        className="form-radio"
                        defaultChecked
                      />
                      <Label htmlFor="density-normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="density-comfortable"
                        name="density"
                        className="form-radio"
                      />
                      <Label htmlFor="density-comfortable">Confortável</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Animações</h3>
                      <p className="text-sm text-muted-foreground">
                        Habilitar animações na interface
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Dashboard Simplificado</h3>
                      <p className="text-sm text-muted-foreground">
                        Mostrar versão simplificada do dashboard
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Idioma da Plataforma</h3>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en">Inglês</SelectItem>
                      <SelectItem value="es">Espanhol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
