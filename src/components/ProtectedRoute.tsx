
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

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
  
  // Mostrar um loading enquanto verifica a autenticação
  if (isLoading) {
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
  const userType = user.user_metadata?.user_type || 'client';
  
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
