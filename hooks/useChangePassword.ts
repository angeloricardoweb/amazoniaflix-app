import { api } from '@/services/axios';
import { useState } from 'react';

export interface ChangePasswordData {
  password: string;
}

export interface ChangePasswordResponse {
  error: boolean;
  message: string[];
  results?: any;
}

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (data: ChangePasswordData): Promise<ChangePasswordResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.put<ChangePasswordResponse>('/auth/alterar-senha', data);
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message?.[0] || 'Erro ao alterar senha';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changePassword,
    isLoading,
    error,
  };
};
