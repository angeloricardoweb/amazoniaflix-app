import AvatarSelector from '@/components/AvatarSelector';
import LayoutBackground from '@/components/LayoutBackground';
import { useAuth } from '@/contexts/AuthContext';
import useFetchMe from '@/hooks/useFetchMe';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { data: userData } = useFetchMe();
  const { updateProfile, isLoading } = useUpdateProfile();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Atualizar dados quando userData carregar
  useEffect(() => {
    if (userData) {
      setNome(userData.nome);
      setTelefone(userData.telefone || '');
      setSelectedAvatar(userData.avatar_url);
    }
  }, [userData]);

  const handleSave = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }

    // Validar senha se foi preenchida
    if (senha || confirmarSenha) {
      if (!senha.trim()) {
        Alert.alert('Erro', 'Senha é obrigatória');
        return;
      }
      if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'Senhas não coincidem');
        return;
      }
      if (senha.length < 6) {
        Alert.alert('Erro', 'Senha deve ter pelo menos 6 caracteres');
        return;
      }
    }

    try {
      const updateData: any = {
        nome: nome.trim(),
        telefone: telefone.trim() || undefined,
        avatar_url: selectedAvatar || undefined,
      };

      // Só incluir senha se foi preenchida
      if (senha.trim()) {
        updateData.senha = senha.trim();
      }

      await updateProfile(updateData);
      
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      setIsEditing(false);
      // Limpar campos de senha após salvar
      setSenha('');
      setConfirmarSenha('');
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
    }
  };

  const handleCancel = () => {
    if (userData) {
      setNome(userData.nome);
      setTelefone(userData.telefone || '');
      setSelectedAvatar(userData.avatar_url);
    }
    setSenha('');
    setConfirmarSenha('');
    setIsEditing(false);
  };

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
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              Alert.alert('Erro', 'Não foi possível sair da conta. Tente novamente.');
            }
          },
        },
      ]
    );
  };

  if (!userData) {
    return (
      <LayoutBackground>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff6b6b" />
          <Text style={styles.loadingText}>Carregando perfil...</Text>
        </View>
      </LayoutBackground>
    );
  }

  return (
    <LayoutBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          {!isEditing ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="create-outline" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="checkmark" size={20} color="white" />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.currentAvatarContainer}>
            {selectedAvatar ? (
              <Image
                source={{ uri: selectedAvatar }}
                style={styles.currentAvatar}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.defaultAvatar}>
                <Ionicons name="person" size={40} color="white" />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{userData.nome}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Nome Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome</Text>
            <TextInput
              style={[
                styles.textInput,
                !isEditing && styles.textInputDisabled
              ]}
              value={nome}
              onChangeText={setNome}
              editable={isEditing}
              placeholder="Digite seu nome"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>

          {/* Telefone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <TextInput
              style={[
                styles.textInput,
                !isEditing && styles.textInputDisabled
              ]}
              value={telefone}
              onChangeText={setTelefone}
              editable={isEditing}
              placeholder="Digite seu telefone"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="phone-pad"
            />
          </View>

          {/* Senha Inputs - só aparecem no modo edição */}
          {isEditing && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nova Senha (opcional)</Text>
                <TextInput
                  style={styles.textInput}
                  value={senha}
                  onChangeText={setSenha}
                  placeholder="Digite sua nova senha"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
                <TextInput
                  style={styles.textInput}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  placeholder="Confirme sua nova senha"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  secureTextEntry
                />
              </View>
            </>
          )}

          {/* Avatar Selector */}
          {isEditing && (
            <AvatarSelector
              selectedAvatar={selectedAvatar}
              onAvatarSelect={setSelectedAvatar}
            />
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </LayoutBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  currentAvatarContainer: {
    marginBottom: 20,
  },
  currentAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  userEmail: {
    color: 'white',
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  formSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textInputDisabled: {
    opacity: 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
