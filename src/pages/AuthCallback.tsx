
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if we have a session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Check if this is a new user via OAuth (lacks a profile)
        const { data: existingProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (!existingProfile) {
          // Create a new profile for the OAuth user
          await supabase.from('users').insert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata.full_name || session.user.user_metadata.name || 'Usuário',
            user_type: 'client', // Default to client for OAuth users
            country: 'Brasil', // Default country
            created_at: new Date().toISOString()
          });
        }
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // If no session, go back to login
        navigate('/login');
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
