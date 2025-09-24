import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import LayoutBackground from '@/components/LayoutBackground';
import ParallaxScrollView from '@/components/parallax-scroll-view';

export default function HomeScreen() {
  return (
    <LayoutBackground>
      {/* <FloatingMenuButton onPress={() => setDrawerVisible(true)} /> */}
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#022C00', dark: '#022C00' }}
        headerImage={
          <Image
            source={require('@/assets/images/bg-4.png')}
            style={styles.reactLogo}
            contentFit="contain"
          />
        }>
      </ParallaxScrollView>
    </LayoutBackground>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
