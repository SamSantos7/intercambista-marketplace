
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve conter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não correspondem',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Here you would make an actual API call to register the user
      console.log('Registration data:', data);
      
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você será redirecionado para sua conta.',
      });
      
      // Simulate successful registration
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        description: 'Ocorreu um erro. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const renderPasswordStrength = () => {
    const password = form.watch('password');
    const strength = passwordStrength(password);
    
    if (!password) return null;
    
    const strengthLabels = ['Fraca', 'Média', 'Boa', 'Forte'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    
    return (
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-full transition-all duration-300",
                  i < strength ? strengthColors[strength - 1] : "bg-transparent"
                )}
                style={{ width: '25%' }}
              />
            ))}
          </div>
          <span className="text-xs font-medium">
            {strength > 0 ? strengthLabels[strength - 1] : 'Muito fraca'}
          </span>
        </div>
      </div>
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 xl:w-2/5 flex items-center justify-center p-6 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para a home</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Criar sua conta</h1>
            <p className="text-muted-foreground mt-2">
              Preencha seus dados para começar a usar a plataforma
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Seu nome completo" 
                        {...field} 
                        autoComplete="name"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="seu.email@exemplo.com" 
                        type="email" 
                        {...field} 
                        autoComplete="email"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="********" 
                          type={showPassword ? "text" : "password"} 
                          {...field} 
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    {renderPasswordStrength()}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="********" 
                          type={showConfirmPassword ? "text" : "password"} 
                          {...field} 
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Criar conta"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Já tem uma conta?{' '}
                </span>
                <Link 
                  to="/login" 
                  className="font-medium text-primary hover:text-primary/90 transition-colors text-link"
                >
                  Entrar
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right Column - Image/Info */}
      <div className="hidden md:block md:w-1/2 xl:w-3/5 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5">
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-primary/10 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-center p-12 animate-fade-in">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
              Plataforma 100% gratuita
            </span>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Ganhe dinheiro extra enquanto está no exterior
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Conecte-se com clientes locais, ofereça seus serviços e receba pagamentos de forma segura.
              Tudo em uma única plataforma.
            </p>

            <div className="space-y-4">
              <BenefitItem>Cadastro gratuito e sem taxas</BenefitItem>
              <BenefitItem>Sistema de pagamento seguro</BenefitItem>
              <BenefitItem>Avaliações e feedback de clientes</BenefitItem>
              <BenefitItem>Suporte durante todo o processo</BenefitItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BenefitItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="flex-shrink-0 rounded-full bg-primary/20 p-1">
      <CheckCircle className="h-5 w-5 text-primary" />
    </span>
    <span className="font-medium">{children}</span>
  </div>
);

export default Register;
