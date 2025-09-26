import useFetchAvatars from '@/hooks/useFetchAvatars';
import { IAvatar } from '@/interfaces';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface AvatarSelectorProps {
  selectedAvatar: string | null;
  onAvatarSelect: (avatarUrl: string) => void;
}


export default function AvatarSelector({ selectedAvatar, onAvatarSelect }: AvatarSelectorProps) {
  const { data: avatars, isLoading } = useFetchAvatars();

  const renderAvatarItem = (item: IAvatar) => {
    const isSelected = selectedAvatar === item.avatar_url;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.avatarItem,
          isSelected && styles.avatarItemSelected
        ]}
        onPress={() => onAvatarSelect(item.avatar_url)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.avatar_url }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Escolha seu Avatar</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff6b6b" />
          <Text style={styles.loadingText}>Carregando avatares...</Text>
        </View>
      </View>
    );
  }

  if (!avatars || avatars.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Escolha seu Avatar</Text>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Nenhum avatar disponível</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu Avatar</Text>
      <View style={styles.avatarGrid}>
        {avatars.map((item) => renderAvatarItem(item))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  avatarItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  avatarItemSelected: {
    borderColor: '#4CAF50',
    borderWidth: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.7,
  },
});
