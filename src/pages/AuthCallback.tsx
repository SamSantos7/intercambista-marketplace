
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Verificar se temos uma sessão
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao obter sessão:', error);
          navigate('/login?error=session_error');
          return;
        }
        
        if (session) {
          // Obter dados do usuário para verificar o tipo (admin ou regular)
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_type')
            .eq('id', session.user.id)
            .single();
          
          if (userError) {
            console.error('Erro ao obter tipo de usuário:', userError);
          }
          
          // Redirecionar com base no tipo de usuário
          if (userData?.user_type === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        } else {
          // Se não houver sessão, voltar para login
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao processar callback:', error);
        navigate('/login?error=auth_error');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default AuthCallback;
