import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import 'react-native-reanimated';

import { getToken } from '@/storage/token';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await getToken();
      console.log('authenticated', authenticated);
      setIsAuthenticated(!!authenticated);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={DarkTheme}
      >
        <NotifierWrapper>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            {isAuthenticated ? (
              <Stack.Screen
                name="(tabs)"
              />
            ) : (
              <Stack.Screen
                name="(auth)"
              />
            )}
          </Stack>
          <StatusBar style="auto" />
        </NotifierWrapper>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
