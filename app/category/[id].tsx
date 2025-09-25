import LayoutBackground from '@/components/LayoutBackground';
import useFetchVideos from '@/hooks/useFetchVideos';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 3; // 3 cards por linha com espaçamento
const CARD_HEIGHT = CARD_WIDTH * 1.4;


export default function CategoryScreen() {
  const { id } = useLocalSearchParams();

  // Usar o hook para buscar vídeos da categoria
  const { data: categoryVideos } = useFetchVideos({ 
    params: `categoria=${id}` 
  });

  const renderVideoItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        styles.videoCard,
        { marginLeft: index % 3 === 0 ? 0 : 10 }
      ]}
      onPress={() => {
        router.push(`/video/${item.slug}`);
      }}
    >
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: item.banners.vertical }}
          style={styles.cardImage}
          resizeMode="cover"
          blurRadius={0}
          defaultSource={require('@/assets/images/icon.png')}
          fadeDuration={0}
          loadingIndicatorSource={require('@/assets/images/icon.png')}
        />
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={20} color="white" />
        </View>
        <View style={styles.ageRating}>
          <Text style={styles.ageRatingText}>{item.classificacao_etaria.titulo}</Text>
        </View>
      </View>
      <Text style={styles.videoTitle} numberOfLines={2}>
        {item.titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LayoutBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Categoria {id}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.videosGrid}>
            {categoryVideos && categoryVideos.length > 0 ? (
              <FlatList
                data={categoryVideos}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
                contentContainerStyle={styles.gridContent}
                columnWrapperStyle={styles.row}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Nenhum vídeo encontrado nesta categoria
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <StatusBar style="light" />
    </LayoutBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50, // Safe area
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  videosGrid: {
    flex: 1,
  },
  gridContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  videoCard: {
    width: CARD_WIDTH,
  },
  cardImageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});
