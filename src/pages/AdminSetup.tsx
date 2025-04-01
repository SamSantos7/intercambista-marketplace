
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { setupAdminUser } from '@/utils/setupAdmin';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const AdminSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [setupResult, setSetupResult] = useState<{
    success?: boolean;
    message?: string;
    error?: any;
  } | null>(null);

  useEffect(() => {
    document.title = 'Configuração de Administrador | Intercambista';
  }, []);

  const handleSetupAdmin = async () => {
    setIsLoading(true);
    
    try {
      const result = await setupAdminUser();
      setSetupResult(result);
    } catch (error) {
      setSetupResult({
        success: false,
        error: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Configuração de Administrador</CardTitle>
          <CardDescription className="text-center">
            Configure uma conta de administrador para gerenciar a plataforma Intercambista
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Credenciais do Administrador</h3>
            <div className="space-y-1 font-mono text-sm">
              <p>Email: <span className="text-primary">admin@intercambista.com</span></p>
              <p>Senha: <span className="text-primary">Admin123!</span></p>
            </div>
          </div>

          {setupResult && (
            <Alert variant={setupResult.success ? "default" : "destructive"}>
              {setupResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {setupResult.success ? "Sucesso!" : "Erro"}
              </AlertTitle>
              <AlertDescription>
                {setupResult.success 
                  ? "Usuário administrador configurado com sucesso." 
                  : `Falha na configuração: ${setupResult.message || setupResult.error?.message || 'Erro desconhecido'}`
                }
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            className="w-full" 
            onClick={handleSetupAdmin}
            disabled={isLoading || setupResult?.success}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-0 border-r-0 rounded-full"></span>
                Configurando...
              </>
            ) : setupResult?.success ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Configurado
              </>
            ) : (
              "Configurar Administrador"
            )}
          </Button>
          
          {setupResult?.success && (
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/login">
                Ir para Login de Administrador
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          
          <Button asChild variant="ghost" className="w-full">
            <Link to="/">Voltar para a página principal</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSetup;
