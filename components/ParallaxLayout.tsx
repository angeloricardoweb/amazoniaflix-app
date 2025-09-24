import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ParallaxLayoutProps {
  children: React.ReactNode;
}

export default function ParallaxLayout({ children }: ParallaxLayoutProps) {
  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#022C00', dark: '#022C00' }}
        headerImage={
          <Image
            source={require('@/assets/images/bg-4.png')}
            style={styles.headerImage}
            contentFit="contain"
          />
        }>
        {children}
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 178,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
