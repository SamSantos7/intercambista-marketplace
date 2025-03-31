
import React, { useState } from 'react';
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Validação do formulário
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      
      // Verificar se o usuário é um administrador
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_type')
        .eq('email', values.email)
        .single();
      
      if (userError) {
        setAuthError("Erro ao verificar tipo de usuário");
        // Fazer logout para evitar acesso indevido
        await supabase.auth.signOut();
        return;
      }
      
      if (userData?.user_type !== 'admin') {
        setAuthError("Você não tem permissão de administrador");
        // Fazer logout para evitar acesso indevido
        await supabase.auth.signOut();
        return;
      }
      
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo de volta à área administrativa.",
      });
      
      // Redirecionar para o dashboard de administrador
      navigate('/admin');
    } catch (error) {
      console.error("Erro no login:", error);
      setAuthError("Ocorreu um erro ao tentar fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-muted/20 py-12">
      <div className="container max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold">Intercambista Admin</h1>
          </Link>
          <p className="mt-2 text-muted-foreground">Área restrita para administradores</p>
        </div>
        
        <Card className="shadow-lg border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle>Acesso Administrativo</CardTitle>
            <CardDescription>
              Esta área é restrita para administradores autorizados
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4 pt-6">
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
                      <FormLabel>E-mail de Administrador</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@exemplo.com" {...field} disabled={isLoading} />
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
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-0 border-r-0 rounded-full"></span>
                      Entrando...
                    </span>
                  ) : (
                    "Entrar como Administrador"
                  )}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Voltar para login regular
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

export default AdminLogin;
