import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 3; // 3 cards per row with margins
const CARD_HEIGHT = CARD_WIDTH * 1.4; // Aspect ratio

interface Video {
  id: number;
  titulo: string;
  slug: string;
  banners: {
    vertical: string;
    horizontal: string;
  };
  classificacao_etaria: {
    titulo: string;
    cor: string;
  };
  duracao?: string;
  categorias?: {
    id: number;
    titulo: string;
    slug: string;
  }[];
}

interface VideoListProps {
  title: string;
  videos: Video[];
  horizontal?: boolean;
  showTitle?: boolean;
}

export default function VideoList({ 
  title, 
  videos, 
  horizontal = true, 
  showTitle = true 
}: VideoListProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  const renderVideoCard = (video: Video, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={[
        styles.movieCard,
        horizontal ? styles.horizontalCard : styles.verticalCard,
        !horizontal && { marginLeft: index % 3 === 0 ? 0 : 10 },
        horizontal && index === 0 && styles.firstCard
      ]}
      onPress={() => router.push(`/video/${video.slug}`)}
    >
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
        <View style={[styles.ageRating, { backgroundColor: video.classificacao_etaria.cor }]}>
          <Text style={styles.ageRatingText}>{video.classificacao_etaria.titulo}</Text>
        </View>
      </View>
      {!horizontal && (
        <Text style={styles.videoTitle} numberOfLines={2}>
          {video.titulo}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (horizontal) {
    return (
      <View style={styles.section}>
        {showTitle && <Text style={styles.sectionTitle}>{title}</Text>}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalContent}
        >
          {videos.map((video, index) => renderVideoCard(video, index))}
        </ScrollView>
      </View>
    );
  }

  // Grid layout for vertical display
  return (
    <View style={styles.section}>
      {showTitle && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={styles.gridContainer}>
        {videos.map((video, index) => renderVideoCard(video, index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  horizontalScroll: {
    marginHorizontal: -20,
  },
  horizontalContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  movieCard: {
    marginBottom: 15,
  },
  horizontalCard: {
    width: 120,
  },
  verticalCard: {
    width: CARD_WIDTH,
  },
  cardImageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
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
  ageRating: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ageRatingText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  videoTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 16,
  },
  firstCard: {
    marginLeft: 5,
  },
});
