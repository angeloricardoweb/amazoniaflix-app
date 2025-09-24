import DrawerModal from '@/components/DrawerModal';
import ParallaxLayout from '@/components/ParallaxLayout';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            router.replace('/(auth)');
          },
        },
      ]
    );
  };

  const profileOptions = [
    {
      title: 'Editar Perfil',
      icon: 'person-outline',
      onPress: () => {
        // Implementar edição de perfil
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento');
      },
    },
    {
      title: 'Configurações',
      icon: 'settings-outline',
      onPress: () => {
        // Implementar configurações
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento');
      },
    },
    {
      title: 'Histórico',
      icon: 'time-outline',
      onPress: () => {
        // Implementar histórico
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento');
      },
    },
    {
      title: 'Favoritos',
      icon: 'heart-outline',
      onPress: () => {
        // Implementar favoritos
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento');
      },
    },
    {
      title: 'Downloads',
      icon: 'download-outline',
      onPress: () => {
        // Implementar downloads
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento');
      },
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ParallaxLayout>
        {/* Header do Perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
              <Ionicons name="person" size={40} color="white" />
            </View>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>Usuário</Text>
          <Text style={[styles.userEmail, { color: colors.tabIconDefault }]}>usuario@email.com</Text>
        </View>

        {/* Opções do Perfil */}
        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionItem, { borderBottomColor: colors.border }]}
              onPress={option.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={colors.text}
                  style={styles.optionIcon}
                />
                <Text style={[styles.optionText, { color: colors.text }]}>
                  {option.title}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.tabIconDefault}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ParallaxLayout>

      <DrawerModal 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 16,
    width: 24,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
