
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Building, Briefcase, 
  Edit2, Camera, Save, ArrowLeft, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '(11) 99999-9999',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    company: 'Studio Design',
    bio: 'Designer e professor com mais de 10 anos de experiência em projetos digitais e educação.',
    avatar: 'https://github.com/shadcn.png',
    coverPhoto: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    socialMedia: {
      website: 'joaosilva.com',
      linkedin: 'linkedin.com/in/joaosilva',
      instagram: 'instagram.com/joaosilva'
    },
    skills: ['Design Gráfico', 'UI/UX', 'Ilustração', 'Fotografia', 'Educação']
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-muted/40 pb-12">
      {/* Header */}
      <div 
        className="h-64 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${profile.coverPhoto})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-16">
          <Link to="/dashboard" className="mb-auto mt-4 flex items-center text-white hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Dashboard
          </Link>
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-white/80">{profile.company}</p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="secondary" 
          size="sm" 
          className="absolute bottom-5 right-5 z-10"
          onClick={handleEditToggle}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </>
          ) : (
            <>
              <Edit2 className="mr-2 h-4 w-4" />
              Editar Perfil
            </>
          )}
        </Button>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 -mt-10">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input 
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="h-8 text-sm"
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input 
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="h-8 text-sm"
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-3 h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input 
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      className="h-8 text-sm"
                    />
                  ) : (
                    <span>{profile.address}</span>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Building className="mr-3 h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input 
                      name="company"
                      value={profile.company}
                      onChange={handleInputChange}
                      className="h-8 text-sm"
                    />
                  ) : (
                    <span>{profile.company}</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm" className="h-6">
                      + Adicionar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <strong className="inline-block w-20">Site:</strong>
                  {isEditing ? (
                    <Input 
                      value={profile.socialMedia.website}
                      className="h-8 text-sm mt-1"
                    />
                  ) : (
                    <a href={`https://${profile.socialMedia.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profile.socialMedia.website}
                    </a>
                  )}
                </div>
                <div className="text-sm">
                  <strong className="inline-block w-20">LinkedIn:</strong>
                  {isEditing ? (
                    <Input 
                      value={profile.socialMedia.linkedin}
                      className="h-8 text-sm mt-1"
                    />
                  ) : (
                    <a href={`https://${profile.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profile.socialMedia.linkedin}
                    </a>
                  )}
                </div>
                <div className="text-sm">
                  <strong className="inline-block w-20">Instagram:</strong>
                  {isEditing ? (
                    <Input 
                      value={profile.socialMedia.instagram}
                      className="h-8 text-sm mt-1"
                    />
                  ) : (
                    <a href={`https://${profile.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {profile.socialMedia.instagram}
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Biografia</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea 
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p>{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Services List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Meus Serviços</CardTitle>
                  <Button size="sm" asChild>
                    <Link to="/dashboard/services">Ver Todos</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Service Item */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-4">
                        <Briefcase />
                      </div>
                      <div>
                        <h3 className="font-medium">Aulas de Português</h3>
                        <p className="text-sm text-muted-foreground">5 alunos ativos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">R$ 70,00/h</div>
                      <Badge variant="outline" className="ml-2">Popular</Badge>
                    </div>
                  </div>

                  {/* Service Item */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-4">
                        <Briefcase />
                      </div>
                      <div>
                        <h3 className="font-medium">Tradução de Documentos</h3>
                        <p className="text-sm text-muted-foreground">12 projetos ativos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">R$ 120,00/projeto</div>
                      <Badge variant="outline" className="ml-2">Destaque</Badge>
                    </div>
                  </div>

                  {/* Service Item */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-4">
                        <Briefcase />
                      </div>
                      <div>
                        <h3 className="font-medium">Design de Sites</h3>
                        <p className="text-sm text-muted-foreground">3 projetos ativos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">R$ 250,00/projeto</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings Notification */}
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-400">Complete sua conta</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                      Para aproveitar todos os recursos da plataforma, por favor complete suas informações bancárias e verifique seu email.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200 dark:border-amber-700 dark:bg-amber-800/30 dark:text-amber-400 dark:hover:bg-amber-800/50">
                      Completar Configurações
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
