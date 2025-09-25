import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    console.log('Erro ao salvar token:', e);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value;
  } catch (e) {
    console.log('Erro ao recuperar token:', e);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.log('Erro ao remover token:', e);
  }
};
