import LayoutBackground from '@/components/LayoutBackground';
import Logo from '@/components/Logo';
import { Colors } from '@/constants/theme';
import useFetchCategorias from '@/hooks/useFetchCategorias';
import useFetchHomeVideos from '@/hooks/useFetchHomeVideos';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
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
  const { data: categorias } = useFetchCategorias();

  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);

  // Selecionar vídeo aleatório para o card destacado
  const getRandomVideo = React.useMemo(() => {
    if (!data || data.length === 0) return null;
    
    const allVideos = data.flatMap(secao => secao.videos);
    if (allVideos.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * allVideos.length);
    return allVideos[randomIndex];
  }, [data]);

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
        
        {/* Scrollable Content */}
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categorias?.map((categoria) => (
              <TouchableOpacity 
                key={categoria.id} 
                style={[
                  styles.categoryButton,
                  selectedCategory === categoria.id && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(
                  selectedCategory === categoria.id ? null : categoria.id
                )}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === categoria.id && styles.categoryTextSelected
                ]}>
                  {categoria.titulo}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Featured Video Card */}
          {getRandomVideo && (
            <View style={styles.featuredCard}>
              <View style={styles.featuredImageContainer}>
                <Image
                  source={{ uri: getRandomVideo.banners.horizontal }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                  blurRadius={0}
                  defaultSource={require('@/assets/images/icon.png')}
                  fadeDuration={0}
                  loadingIndicatorSource={require('@/assets/images/icon.png')}
                />
                <View style={styles.featuredOverlay}>
                  <View style={styles.featuredContent}>
                    <TouchableOpacity style={styles.watchNowButton}>
                      <Ionicons name="play" size={20} color="white" />
                      <Text style={styles.watchNowText}>Assistir agora</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          {/* Content Sections */}
          {data?.map((secao) => (
            <View key={secao.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{secao.titulo}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
                contentContainerStyle={styles.horizontalContent}
              >
                {secao.videos.map((video, index) => (
                  <View key={index} style={styles.movieCard}>
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
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 100, // Space for fixed header
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.tint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginVertical: 15,
    maxHeight: 40,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    height: 40,
    gap: 12,
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryButtonSelected: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: 'white',
    fontWeight: '700',
  },
  featuredCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
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
  featuredImageContainer: {
    position: 'relative',
    width: 375,
    height: 350,
    alignSelf: 'center',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  featuredContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  featuredTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  watchNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  watchNowText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
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
    marginRight: 8,
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
