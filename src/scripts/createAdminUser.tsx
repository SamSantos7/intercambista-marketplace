
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const CreateAdminUser = () => {
  const { createAdminUser } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  
  const handleCreateAdmin = async () => {
    try {
      setIsCreating(true);
      setMessage('Criando usuário administrador...');
      
      const email = 'admin@intercambista.com';
      const password = 'Admin123!';
      
      const { error } = await createAdminUser(email, password);
      
      if (error) {
        setMessage(`Erro ao criar administrador: ${error.message}`);
      } else {
        setMessage(`Administrador criado com sucesso! Use admin@intercambista.com e Admin123! para acessar.`);
      }
    } catch (error) {
      setMessage(`Erro inesperado: ${error}`);
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Criar Usuário Administrador</h1>
      <p className="mb-4">Clique no botão abaixo para criar um usuário administrador com as credenciais padrão:</p>
      <p className="mb-2 font-mono">Email: admin@intercambista.com</p>
      <p className="mb-4 font-mono">Senha: Admin123!</p>
      
      <button
        onClick={handleCreateAdmin}
        disabled={isCreating}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
      >
        {isCreating ? 'Criando...' : 'Criar Administrador'}
      </button>
      
      {message && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateAdminUser;
