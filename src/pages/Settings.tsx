
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas configurações de conta e preferências
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="account">Conta</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="billing">Pagamentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Perfil Público</CardTitle>
                <CardDescription>
                  Estas informações serão exibidas publicamente, então tenha cuidado com o que você compartilha.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" defaultValue="Rafael Costa" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Nome de usuário</Label>
                      <Input id="username" defaultValue="rafaelcosta" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="rafael.costa@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" defaultValue="Especialista em marketing digital e comunicação." />
                    <p className="text-sm text-muted-foreground">
                      Breve descrição para seu perfil público. URLs são hiperlinks.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Foto do Perfil</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Foto de perfil atual"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline">Alterar foto</Button>
                      <Button variant="outline" className="text-destructive hover:text-destructive">
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar alterações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
                <CardDescription>
                  Atualize as informações da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" type="tel" defaultValue="+55 11 98765-4321" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select defaultValue="pt_BR">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt_BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en_US">English (US)</SelectItem>
                          <SelectItem value="es_ES">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso horário</Label>
                    <Select defaultValue="America/Sao_Paulo">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um fuso horário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-4)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Segurança</h3>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="current_password">Senha atual</Label>
                      <Input id="current_password" type="password" />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new_password">Nova senha</Label>
                        <Input id="new_password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm_password">Confirmar senha</Label>
                        <Input id="confirm_password" type="password" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar alterações</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Autenticação de dois fatores</CardTitle>
                <CardDescription>
                  Adicione segurança extra à sua conta ativando a autenticação de dois fatores.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação de dois fatores</p>
                    <p className="text-sm text-muted-foreground">
                      Proteja sua conta com segurança adicional.
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">Configurar</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>
                  Personalize a aparência do seu dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="light" name="theme" className="w-4 h-4" defaultChecked />
                        <Label htmlFor="light">Claro</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="dark" name="theme" className="w-4 h-4" />
                        <Label htmlFor="dark">Escuro</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="system" name="theme" className="w-4 h-4" />
                        <Label htmlFor="system">Sistema</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar alterações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>
                  Configure como você deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Novos serviços</p>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações quando novos serviços forem adicionados.
                        </p>
                      </div>
                      <Switch id="new-services" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mensagens</p>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações quando alguém enviar uma mensagem.
                        </p>
                      </div>
                      <Switch id="messages" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pagamentos</p>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações sobre pagamentos.
                        </p>
                      </div>
                      <Switch id="payments" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notificações no aplicativo</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações no navegador</p>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações no navegador mesmo quando o site estiver fechado.
                        </p>
                      </div>
                      <Switch id="browser-notifications" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar alterações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Plano e Pagamento</CardTitle>
                <CardDescription>
                  Gerencie seu plano de assinatura e métodos de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Plano atual</h3>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-base">Plano Premium</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          R$49,90/mês • Renovação em 15 de julho de 2023
                        </p>
                      </div>
                      <Button variant="outline">Alterar plano</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Métodos de pagamento</h3>
                    <Button variant="outline">Adicionar método</Button>
                  </div>
                  
                  <div className="border rounded-lg divide-y">
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Visa terminando em 4242</p>
                          <p className="text-sm text-muted-foreground">Expira em 12/2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">Remover</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Histórico de pagamentos</h3>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 bg-muted p-3 text-sm font-medium">
                      <div>Data</div>
                      <div>Descrição</div>
                      <div className="text-right">Valor</div>
                      <div className="text-right">Status</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-4 p-3 text-sm">
                        <div>15/06/2023</div>
                        <div>Plano Premium</div>
                        <div className="text-right">R$49,90</div>
                        <div className="text-right text-green-600">Pago</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 text-sm">
                        <div>15/05/2023</div>
                        <div>Plano Premium</div>
                        <div className="text-right">R$49,90</div>
                        <div className="text-right text-green-600">Pago</div>
                      </div>
                      <div className="grid grid-cols-4 p-3 text-sm">
                        <div>15/04/2023</div>
                        <div>Plano Premium</div>
                        <div className="text-right">R$49,90</div>
                        <div className="text-right text-green-600">Pago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
