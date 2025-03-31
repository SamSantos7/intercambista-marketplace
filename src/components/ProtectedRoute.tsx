
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
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
  
  // Verificar se a rota é apenas para administradores
  if (adminOnly) {
    // Verificar se o usuário tem permissão de administrador
    // Esta verificação deve ser feita no banco de dados
    const checkAdminPermission = async () => {
      const { data } = await fetch('/api/check-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      }).then(res => res.json());
      
      return data?.isAdmin;
    };
    
    // Por enquanto, vamos simples verificar com o usertype (que deveria vir do banco de dados)
    // Na implementação real, isso deve ser verificado corretamente
    const isAdmin = user.user_metadata?.user_type === 'admin';
    
    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;
