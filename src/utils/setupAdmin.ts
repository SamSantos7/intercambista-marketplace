
import { supabase } from '@/integrations/supabase/client';

export const setupAdminUser = async () => {
  try {
    // Verificar se o admin já existe
    const { data: existingAdmin, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'admin@intercambista.com')
      .eq('user_type', 'admin')
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erro ao verificar admin:', checkError);
      return { success: false, error: checkError };
    }
    
    if (existingAdmin) {
      console.log('Usuário admin já existe');
      return { success: true, message: 'Admin já existe' };
    }
    
    // Criar o usuário admin
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'admin@intercambista.com',
      password: 'Admin123!',
      options: {
        data: {
          full_name: 'Administrador',
          user_type: 'admin'
        }
      }
    });
    
    if (authError) {
      console.error('Erro ao criar admin:', authError);
      return { success: false, error: authError };
    }
    
    // Forçar a definição de usuário como admin
    if (authData.user) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ user_type: 'admin' })
        .eq('id', authData.user.id);
      
      if (updateError) {
        console.error('Erro ao definir tipo de usuário:', updateError);
        return { success: false, error: updateError };
      }
    }
    
    console.log('Admin criado com sucesso:', authData.user?.id);
    return { success: true };
  } catch (error) {
    console.error('Erro ao configurar admin:', error);
    return { success: false, error };
  }
};
