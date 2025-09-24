import LayoutBackground from '@/components/LayoutBackground';
import Title from '@/components/ui/Title';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { api } from '@/services/axios';
import { setToken } from '@/storage/token';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading] = useState(false);
  const [error, setError] = useState('');

  // Função para aplicar máscara de telefone brasileiro
  const formatPhoneNumber = (text: string) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');

    // Aplica a máscara baseada no tamanho
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else {
      // Limita a 11 dígitos
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
  };

  const handleRegister = async () => {
    const { data } = await api.post('/auth/register', { name, email, phone, password, confirmPassword });

    if (data.error) {
      setError(data.message[0]);
    } else {
      await setToken(data.results.token);
      router.replace('/(tabs)');
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <LayoutBackground>
      <SafeAreaView style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Botão Voltar */}
            <View style={styles.headerContainer}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBackToLogin}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Nome do App */}
            <View style={styles.appNameContainer}>
              <Title>
                Criar Conta
              </Title>
            </View>

            {/* Formulário */}
            <View style={styles.formContainer}>
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={[styles.errorText, { color: '#FF3B30' }]}>{error}</Text>
                </View>
              ) : null}

              <Input
                label="Nome"
                placeholder="Digite seu nome completo"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (error) setError('');
                }}
                autoCapitalize="words"
                autoCorrect={false}
                variant="default"
                size="large"
              />

              <Input
                label="Email"
                placeholder="Digite seu email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                variant="default"
                size="large"
              />

              <Input
                label="Telefone"
                placeholder="(11) 99999-9999"
                value={phone}
                onChangeText={(text) => {
                  handlePhoneChange(text);
                  if (error) setError('');
                }}
                keyboardType="phone-pad"
                maxLength={15}
                variant="default"
                size="large"
              />

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (error) setError('');
                }}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                variant="default"
                size="large"
              />

              <Input
                label="Confirmar Senha"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (error) setError('');
                }}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                variant="default"
                size="large"
              />

              {/* Botões */}
              <Button
                title="Criar Conta"
                onPress={handleRegister}
                variant="primary"
                size="large"
                loading={loading}
                disabled={loading}
                style={styles.registerButton}
              />

              <Button
                title="Já tenho uma conta"
                onPress={handleBackToLogin}
                variant="outline"
                size="large"
                style={styles.loginButton}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LayoutBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
  },
  registerButton: {
    marginTop: 24,
  },
  loginButton: {
    marginTop: 16,
  },
});
