
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

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
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
      
      // Auth context will handle the redirect
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
                  <Link to="/admin-login" className="text-primary font-medium hover:underline">
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

// Ícone do Google
const GoogleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>
    <path d="M15.5 8.5L12 12m0 0L8.5 15.5M12 12L8.5 8.5M12 12l3.5 3.5"></path>
  </svg>
);

// Ícone do Facebook
const FacebookLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default Login;
