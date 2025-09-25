import LayoutBackground from '@/components/LayoutBackground';
import Logo from '@/components/Logo';
import { Colors } from '@/constants/theme';
import useFetchHomeVideos from '@/hooks/useFetchHomeVideos';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.32;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

export default function HomeScreen() {
  const { data } = useFetchHomeVideos();

  return (
    <LayoutBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Logo width={160} height={20} color="white" />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {data?.map((secao) => (
            <View key={secao.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{secao.titulo}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
                contentContainerStyle={styles.horizontalContent}
              >
                {secao.videos.map((video) => (
                  <View key={video.id} style={styles.movieCard}>
                    <View style={styles.cardImageContainer}>
                      <Image
                        source={{ uri: video.banners.vertical }}
                        style={styles.cardImage}
                        resizeMode="cover"
                        blurRadius={0}
                        defaultSource={require('@/assets/images/icon.png')}
                        fadeDuration={0}
                        loadingIndicatorSource={require('@/assets/images/icon.png')}
                      />
                      <View style={styles.playOverlay}>
                        <Ionicons name="play" size={24} color="white" />
                      </View>
                    </View>
                    {/* <View style={styles.cardActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="information-circle-outline" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="white" />
                      </TouchableOpacity>
                    </View> */}
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
    </LayoutBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Safe area
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.tint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  horizontalScroll: {
    marginHorizontal: -20,
  },
  horizontalContent: {
    paddingHorizontal: 20,
  },
  movieCard: {
    width: CARD_WIDTH,
    marginRight: 15,
  },
  cardImageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 8,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    padding: 5,
  },
});
