
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Verificar se temos uma sessão
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao obter sessão:', error);
          toast({
            title: "Erro de autenticação",
            description: "Não foi possível verificar sua sessão.",
            variant: "destructive",
          });
          navigate('/login?error=session_error');
          return;
        }
        
        if (session) {
          // Obter dados do usuário para verificar o tipo (admin, client ou provider)
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_type')
            .eq('id', session.user.id)
            .single();
          
          if (userError) {
            console.error('Erro ao obter tipo de usuário:', userError);
            toast({
              title: "Erro de perfil",
              description: "Não foi possível verificar seu tipo de usuário.",
              variant: "destructive",
            });
            navigate('/dashboard'); // Fallback para dashboard genérico
            return;
          }
          
          // Redirecionar com base no tipo de usuário
          console.info('Tipo de usuário:', userData?.user_type);
          
          switch (userData?.user_type) {
            case 'admin':
              navigate('/admin');
              break;
            case 'provider': // Anunciante
              navigate('/dashboard'); // Dashboard para anunciantes
              break;
            case 'client': // Cliente
              navigate('/dashboard-alt'); // Dashboard específico para clientes
              break;
            default:
              navigate('/dashboard');
              break;
          }
        } else {
          // Se não houver sessão, voltar para login
          toast({
            title: "Sessão expirada",
            description: "Por favor, faça login novamente.",
          });
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao processar callback:', error);
        toast({
          title: "Erro inesperado",
          description: "Ocorreu um erro ao processar seu login.",
          variant: "destructive",
        });
        navigate('/login?error=auth_error');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default AuthCallback;
