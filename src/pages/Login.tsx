
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
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

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Here you would make an actual API call to authenticate the user
      console.log('Login data:', data);
      
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Você será redirecionado para sua conta.',
      });
      
      // Simulate successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Email ou senha incorretos. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 xl:w-2/5 flex items-center justify-center p-6 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para a home</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Bem-vindo de volta</h1>
            <p className="text-muted-foreground mt-2">
              Entre na sua conta para continuar
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Senha</FormLabel>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm font-medium text-primary hover:text-primary/90 transition-colors text-link"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="********" 
                          type={showPassword ? "text" : "password"} 
                          {...field} 
                          autoComplete="current-password"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Lembrar de mim</FormLabel>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Não tem uma conta?{' '}
                </span>
                <Link 
                  to="/register" 
                  className="font-medium text-primary hover:text-primary/90 transition-colors text-link"
                >
                  Cadastre-se
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:block md:w-1/2 xl:w-3/5 bg-accent">
        <div className="h-full w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Intercambistas trabalhando"
            className="h-full w-full object-cover animate-scale-in"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
