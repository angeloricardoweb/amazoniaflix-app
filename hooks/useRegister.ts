import { api } from '@/services/axios';
import { useState } from 'react';

export interface RegisterData {
  nome: string;
  celular: string;
  email: string;
  password: string;
  repassword: string;
}

export interface RegisterResponse {
  error: boolean;
  message: string[];
  results: {
    token: string;
  };
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData): Promise<RegisterResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post<RegisterResponse>('/register', data);
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message?.[0] || 'Erro ao realizar cadastro';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};
