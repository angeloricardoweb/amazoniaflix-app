import { getToken, setToken } from '@/storage/token';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getToken();
      const authenticated = !!token;
      
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        // Se tem token, considera usuário logado
        setUser({ token });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      await setToken(token);
      setIsAuthenticated(true);
      setUser({ token });
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const logout = async () => {
    try {
      await setToken('');
      setIsAuthenticated(false);
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuthStatus,
  };
};
