import useFetchMe from '@/hooks/useFetchMe';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, View } from 'react-native';

interface ProfileTabIconProps {
  color: string;
  size: number;
}

export default function ProfileTabIcon({ color, size }: ProfileTabIconProps) {
  const { data: userData } = useFetchMe();

  if (userData?.avatar_url) {
    return (
      <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}>
        <Image
          source={{ uri: userData.avatar_url }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Fallback para ícone padrão se não houver avatar
  return <Ionicons name="person" size={size} color={color} />;
}
