import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
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

// Lista de avatares disponíveis
const AVATAR_OPTIONS = [
  {
    id: 'avatar1',
    name: 'Avatar 1',
    url: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'avatar2',
    name: 'Avatar 2',
    url: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 'avatar3',
    name: 'Avatar 3',
    url: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'avatar4',
    name: 'Avatar 4',
    url: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 'avatar5',
    name: 'Avatar 5',
    url: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'avatar6',
    name: 'Avatar 6',
    url: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 'avatar7',
    name: 'Avatar 7',
    url: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: 'avatar8',
    name: 'Avatar 8',
    url: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 'avatar9',
    name: 'Avatar 9',
    url: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 'avatar10',
    name: 'Avatar 10',
    url: 'https://i.pravatar.cc/150?img=10',
  },
];

export default function AvatarSelector({ selectedAvatar, onAvatarSelect }: AvatarSelectorProps) {
  const renderAvatarItem = ({ item }: { item: typeof AVATAR_OPTIONS[0] }) => {
    const isSelected = selectedAvatar === item.url;

    return (
      <TouchableOpacity
        style={[
          styles.avatarItem,
          isSelected && styles.avatarItemSelected
        ]}
        onPress={() => onAvatarSelect(item.url)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.url }}
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu Avatar</Text>
      <View style={styles.avatarGrid}>
        {AVATAR_OPTIONS.map((item) => renderAvatarItem({ item }))}
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
});
