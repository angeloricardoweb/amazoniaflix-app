import { api } from "@/services/axios";
import { useState } from "react";

interface UpdateProfileData {
  nome?: string;
  avatar_url?: string;
  telefone?: string;
  senha?: string;
}

export default function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: UpdateProfileData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.patch('/me', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar perfil';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
}
