import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Check, X, Upload, Info } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { RegisterUserRole } from '@/types/user';

// Validação do formulário
const registerSchema = z.object({
  fullName: z.string().min(5, "Nome completo deve ter pelo menos 5 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .refine(password => /[A-Z]/.test(password), "Deve conter pelo menos uma letra maiúscula")
    .refine(password => /[0-9]/.test(password), "Deve conter pelo menos um número")
    .refine(password => /[^A-Za-z0-9]/.test(password), "Deve conter pelo menos um caractere especial"),
  confirmPassword: z.string(),
  location: z.string().min(2, "Informe seu país/localização"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  role: z.enum(["advertiser", "client"]),
  terms: z.boolean().refine(value => value === true, "Você precisa aceitar os termos de uso"),
})
.refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Esquema adicional para anunciantes
const advertiserSchema = z.object({
  skills: z.string().min(1, "Informe pelo menos uma habilidade"),
  experience: z.string().min(10, "Descreva sua experiência"),
  portfolio: z.string().optional(),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<RegisterUserRole>('client');
  const [step, setStep] = useState(1);

  // Form para dados básicos
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      description: "",
      role: "client",
      terms: false,
    },
  });

  // Form para dados de anunciante
  const advertiserForm = useForm<z.infer<typeof advertiserSchema>>({
    resolver: zodResolver(advertiserSchema),
    defaultValues: {
      skills: "",
      experience: "",
      portfolio: "",
    },
  });

  // Lidar com upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validar tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erro no upload",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Lidar com mudança de tipo de usuário
  const handleRoleChange = (role: RegisterUserRole) => {
    setCurrentTab(role);
    form.setValue('role', role);
  };

  // Enviar formulário
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (currentTab === 'advertiser' && step === 1) {
      setStep(2);
      return;
    }

    try {
      // Criar objeto com dados do usuário
      const userData = {
        ...values,
        profileImage: profileImagePreview,
      };
      
      // Adicionar dados de anunciante se aplicável
      if (currentTab === 'advertiser') {
        const advertiserData = advertiserForm.getValues();
        Object.assign(userData, advertiserData);
      }
      
      console.log("Dados do registro:", userData);
      
      // Simulação de registro bem-sucedido
      toast({
        title: "Registro concluído!",
        description: "Enviamos um e-mail de confirmação para ativar sua conta.",
      });
      
      // Redirecionar para login após registro
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error("Erro no registro:", error);
      toast({
        title: "Erro no registro",
        description: "Ocorreu um erro ao tentar registrar sua conta. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Voltar para o primeiro passo
  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-muted/20 py-12">
      <div className="container max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold">Intercambista</h1>
          </Link>
          <p className="mt-2 text-muted-foreground">Cadastre-se para começar</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Criar sua conta</CardTitle>
            <CardDescription>
              Preencha seus dados para se cadastrar na plataforma
            </CardDescription>
          </CardHeader>
          
          <Tabs value={currentTab} onValueChange={(value) => handleRoleChange(value as RegisterUserRole)} className="w-full">
            <TabsList className="grid grid-cols-2 mb-2 mx-6">
              <TabsTrigger value="client">Sou Cliente</TabsTrigger>
              <TabsTrigger value="advertiser">Sou Intercambista</TabsTrigger>
            </TabsList>
          </Tabs>

          {step === 1 ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  {/* Upload de foto */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-24 h-24">
                      {profileImagePreview ? (
                        <img 
                          src={profileImagePreview} 
                          alt="Preview" 
                          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground">
                          <Upload size={24} className="text-muted-foreground" />
                        </div>
                      )}
                      <label 
                        htmlFor="profile-image" 
                        className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/80 transition-colors"
                      >
                        <Upload size={16} />
                      </label>
                      <input 
                        id="profile-image"
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Adicione uma foto de perfil (opcional)
                    </span>
                  </div>
                  
                  {/* Nome completo */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* E-mail */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Localização */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>País/Localização</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione seu país" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="IE">Irlanda</SelectItem>
                            <SelectItem value="AE">Dubai</SelectItem>
                            <SelectItem value="AU">Austrália</SelectItem>
                            <SelectItem value="MT">Malta</SelectItem>
                            <SelectItem value="CA">Canadá</SelectItem>
                            <SelectItem value="ES">Espanha</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Descrição */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobre você</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Conte um pouco sobre você" 
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Senha */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type={showPassword ? "text" : "password"}
                              placeholder="Crie uma senha segura"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                        <FormDescription className="text-xs">
                          A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Confirmar Senha */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar senha</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="Confirme sua senha"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Termos de uso */}
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Concordo com os <Link to="/terms" className="text-primary hover:underline" target="_blank">Termos de Uso</Link> e <Link to="/privacy" className="text-primary hover:underline" target="_blank">Política de Privacidade</Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full">
                    {currentTab === 'client' ? 'Criar conta' : 'Continuar'}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Já possui uma conta?{' '}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                      Faça login
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Form>
          ) : (
            /* Segundo passo para anunciantes */
            <Form {...advertiserForm}>
              <form onSubmit={advertiserForm.handleSubmit(() => onSubmit(form.getValues()))}>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg mb-4 flex items-start">
                    <Info className="text-blue-500 mr-2 mt-0.5" size={16} />
                    <p className="text-sm text-muted-foreground">
                      Complete seu perfil de intercambista para poder oferecer serviços na plataforma.
                    </p>
                  </div>
                  
                  {/* Habilidades */}
                  <FormField
                    control={advertiserForm.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Habilidades</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Tradução, Design gráfico, Aulas particulares..." {...field} />
                        </FormControl>
                        <FormDescription>
                          Separe as habilidades por vírgula
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Experiência */}
                  <FormField
                    control={advertiserForm.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experiência</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva sua experiência relevante..." 
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Descreva suas experiências relacionadas aos serviços que pretende oferecer
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Portfolio */}
                  <FormField
                    control={advertiserForm.control}
                    name="portfolio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio ou site pessoal (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormDescription>
                          Adicione um link para seu portfolio ou site pessoal
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/50 p-4 rounded-lg flex items-start">
                    <Info className="text-primary mr-2 mt-0.5" size={16} />
                    <p className="text-sm text-muted-foreground">
                      Para aumentar a confiança dos clientes em seu perfil, você pode verificar sua identidade após o cadastro.
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex w-full gap-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={handleBack}>
                      Voltar
                    </Button>
                    <Button type="submit" className="flex-1">
                      Criar conta
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Register;
