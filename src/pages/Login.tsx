
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Validação do formulário
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signInWithGoogle, signInWithFacebook } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Initialize the form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        // Get user type to redirect correctly
        const { data, error } = await supabase
          .from('users')
          .select('user_type')
          .eq('id', user.id)
          .single();
        
        if (!error && data) {
          switch (data.user_type) {
            case 'admin':
              navigate('/admin');
              break;
            case 'provider': // Anunciante
              navigate('/dashboard');
              break;
            case 'client': // Cliente
              navigate('/dashboard-alt');
              break;
            default:
              navigate('/dashboard');
              break;
          }
        } else {
          navigate('/dashboard');
        }
      }
    };
    
    checkUser();
  }, [user, navigate]);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        setAuthError(
          error.message === 'Invalid login credentials'
            ? 'E-mail ou senha incorretos'
            : error.message
        );
        return;
      }
      
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo de volta à plataforma.",
      });
      
      // Auth context and useEffect will handle the redirect based on user type
    } catch (error) {
      console.error("Erro no login:", error);
      setAuthError("Ocorreu um erro ao tentar fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      await signInWithGoogle();
    } catch (error) {
      console.error("Erro no login com Google:", error);
      setAuthError("Ocorreu um erro ao tentar fazer login com Google. Tente novamente.");
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      await signInWithFacebook();
    } catch (error) {
      console.error("Erro no login com Facebook:", error);
      setAuthError("Ocorreu um erro ao tentar fazer login com Facebook. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-muted/20 py-12">
      <div className="container max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold">Intercambista</h1>
          </Link>
          <p className="mt-2 text-muted-foreground">Faça login para acessar sua conta</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Entrar na plataforma</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {/* Error Alert */}
                {authError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
                
                {/* E-mail */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} disabled={isLoading} />
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
                            placeholder="Digite sua senha"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Lembrar-me e Esqueci a senha */}
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer">Lembrar-me</FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <Link 
                    to="/reset-password" 
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-0 border-r-0 rounded-full"></span>
                      Entrando...
                    </span>
                  ) : "Entrar"}
                </Button>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground flex-1 border-t"></span>
                  <span className="text-muted-foreground">ou</span>
                  <span className="text-muted-foreground flex-1 border-t"></span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="gap-2"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <GoogleLogo />
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="gap-2"
                    onClick={handleFacebookLogin}
                    disabled={isLoading}
                  >
                    <FacebookLogo />
                    Facebook
                  </Button>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  Ainda não tem uma conta?{' '}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Cadastre-se
                  </Link>
                </p>
                
                <p className="text-center text-sm text-muted-foreground">
                  Área administrativa?{' '}
                  <Link to="/admin/login" className="text-primary font-medium hover:underline">
                    Login de administrador
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

// Ícone do Google corrigido
const GoogleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// Ícone do Facebook corrigido
const FacebookLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default Login;
