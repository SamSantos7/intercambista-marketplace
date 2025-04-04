
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
  clientOnly?: boolean;
  providerOnly?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  adminOnly = false,
  clientOnly = false,
  providerOnly = false 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const [userType, setUserType] = useState<string | null>(null);
  const [isCheckingUserType, setIsCheckingUserType] = useState(true);
  
  useEffect(() => {
    const checkUserType = async () => {
      if (!user) {
        setIsCheckingUserType(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('user_type')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching user type:', error);
          setUserType(null);
        } else {
          setUserType(data?.user_type || null);
        }
      } catch (err) {
        console.error('Error in user type check:', err);
        setUserType(null);
      } finally {
        setIsCheckingUserType(false);
      }
    };
    
    checkUserType();
  }, [user]);
  
  // Mostrar um loading enquanto verifica a autenticação
  if (isLoading || isCheckingUserType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Verificar se o usuário está autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Verificar as regras de permissão
  
  // Verificar se a rota é apenas para administradores
  if (adminOnly && userType !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Verificar se a rota é apenas para clientes
  if (clientOnly && userType !== 'client') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Verificar se a rota é apenas para anunciantes (providers)
  if (providerOnly && userType !== 'provider') {
    return <Navigate to="/dashboard-alt" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
