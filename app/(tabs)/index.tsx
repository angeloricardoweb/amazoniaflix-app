import LayoutBackground from '@/components/LayoutBackground';
import { Colors } from '@/constants/theme';
import useFetchHomeVideos from '@/hooks/useFetchHomeVideos';
import { ISecao } from '@/interfaces';
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
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>AMAZÔNIA</Text>
            <View style={styles.logoFlixContainer}>
              <Ionicons name="play" size={16} color={Colors.tint} style={styles.playIcon} />
              <Text style={styles.logoFlixText}>FLIX</Text>
            </View>
          </View>
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
                    <View style={styles.cardActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="information-circle-outline" size={20} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  logoFlixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  playIcon: {
    marginRight: 2,
  },
  logoFlixText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.tint,
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

const filmes: ISecao[] = [
  {
    id: 1,
    titulo: 'Continue Assistindo',
    videos: [
      {
        id: 1,
        slug: 'a-lenda-do-curupira',
        titulo: 'A Lenda do Curupira',
        categorias: ['Animação', 'Ficção'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/curupira-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/curupira-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
      {
        id: 2,
        slug: 'o-mundo-da-cultura-indigena',
        titulo: 'O Mundo da Cultura Indígena',
        categorias: ['Documentário', 'Cultura'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/cultura-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/cultura-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
      {
        id: 3,
        slug: 'matinta-perecica',
        titulo: 'Matinta Perecica',
        categorias: ['Animação', 'Ficção'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/matinta-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/matinta-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
      {
        id: 4,
        slug: 'o-segredo-dos-rios-amazonico',
        titulo: 'O Segredo dos Rios Amazonicos',
        categorias: ['Documentário', 'Natureza'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/rios-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/rios-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
      {
        id: 5,
        slug: 'conhecendo-a-flora-amazonica',
        titulo: 'Conhecendo a Flora Amazônica',
        categorias: ['Documentário', 'Natureza'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/flora-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/flora-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
    ]
  },
  {
    id: 2,
    titulo: 'Documentários',
    videos: [
      {
        id: 6,
        slug: 'conhecendo-a-flora-amazonica',
        titulo: 'Conhecendo a Flora Amazônica',
        categorias: ['Documentário', 'Natureza'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/flora-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/flora-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
      {
        id: 7,
        slug: 'o-mundo-da-cultura-indigena',
        titulo: 'O Mundo da Cultura Indígena',
        categorias: ['Documentário', 'Cultura'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/cultura-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/cultura-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
      {
        id: 8,
        slug: 'os-segredos-dos-rios-amazonicos',
        titulo: 'Os segredos dos RIOS AMAZÔNICOS',
        categorias: ['Documentário', 'Natureza'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/rios-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/rios-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
    ]
  },
  {
    id: 3,
    titulo: 'Animações',
    videos: [
      {
        id: 9,
        slug: 'a-lenda-do-curupira',
        titulo: 'A Lenda do Curupira',
        categorias: ['Animação', 'Ficção'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/curupira-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/curupira-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
      {
        id: 10,
        slug: 'matinta-pereira',
        titulo: 'Matinta Pereira',
        categorias: ['Animação', 'Ficção'],
        banners: {
          vertical: 'https://api-beta-lac.vercel.app/amazonia-flix/matinta-v.png',
          horizontal: 'https://api-beta-lac.vercel.app/amazonia-flix/matinta-h.png'
        },
        classificacao_etaria: {
          id: 1,
          titulo: '10',
          cor: '#EAAC00'
        }
      },
    ]
  }
]