import LayoutBackground from '@/components/LayoutBackground';
import { Colors } from '@/constants/theme';
import useFetchVideoDetails from '@/hooks/useFetchVideoDetails';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function VideoDetailsScreen() {
    const { slug } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState<'sinopse' | 'elenco'>('sinopse');

    // Usar o hook para buscar detalhes do vídeo
    const { data: videoDetails } = useFetchVideoDetails({
        slug: slug as string
    });

    if (!videoDetails) {
        return (
            <LayoutBackground>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Carregando...</Text>
                        <View style={styles.placeholder} />
                    </View>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Carregando detalhes do vídeo...</Text>
                    </View>
                </View>
                <StatusBar style="light" />
            </LayoutBackground>
        );
    }

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
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {videoDetails.titulo}
                    </Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Content */}
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Banner Principal */}
                    <View style={styles.bannerContainer}>
                        <Image
                            source={{ uri: videoDetails.banners.horizontal }}
                            style={styles.bannerImage}
                            resizeMode="cover"
                            blurRadius={0}
                            defaultSource={require('@/assets/images/icon.png')}
                            fadeDuration={0}
                            loadingIndicatorSource={require('@/assets/images/icon.png')}
                        />
                        <View style={styles.bannerOverlay}>
                            <View style={styles.bannerContent}>
                                <View style={styles.bannerInfo}>
                                    <View style={styles.ageRating}>
                                        <Text style={styles.ageRatingText}>{videoDetails.classificacao_etaria.titulo}</Text>
                                    </View>
                                    <Text style={styles.duration}>{videoDetails.duracao}</Text>
                                </View>
                                <TouchableOpacity style={styles.playButton}>
                                    <Ionicons name="play" size={20} color="white" />
                                    <Text style={styles.playButtonText}>Assistir agora</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Gradiente de baixo para cima */}
                        <LinearGradient
                            colors={['transparent', Colors.tint + '80']}
                            style={styles.bannerGradient}
                            locations={[0, 1]}
                        />
                    </View>

                    {/* Informações do Vídeo */}
                    <View style={styles.videoInfo}>
                        {/* Categorias */}
                        <View style={styles.section}>
                            <View style={styles.categoriesContainer}>
                                {videoDetails.categorias ? (
                                    videoDetails.categorias.map((categoria: { id: number; titulo: string; slug: string }) => (
                                        <View key={categoria.id} style={styles.categoryTag}>
                                            <Text style={styles.categoryText}>{categoria.titulo}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.noCategoriesText}>Nenhuma categoria disponível</Text>
                                )}
                            </View>
                        </View>

                        {/* Abas */}
                        <View style={styles.tabsContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === 'sinopse' && styles.tabButtonActive
                                ]}
                                onPress={() => setActiveTab('sinopse')}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === 'sinopse' && styles.tabTextActive
                                ]}>
                                    Sinopse
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === 'elenco' && styles.tabButtonActive
                                ]}
                                onPress={() => setActiveTab('elenco')}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === 'elenco' && styles.tabTextActive
                                ]}>
                                    Elenco
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Conteúdo das Abas */}
                        <View style={styles.tabContent}>
                            {activeTab === 'sinopse' ? (
                                <View style={styles.section}>
                                    <Text style={styles.description}>{videoDetails.descricao}</Text>
                                </View>
                            ) : (
                                <View style={styles.section}>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.castContainer}
                                        contentContainerStyle={styles.castContent}
                                    >
                                        {videoDetails.elenco.map((ator, index) => (
                                            <View key={index} style={styles.castMember}>
                                                <Image
                                                    source={{ uri: ator.foto }}
                                                    style={styles.castPhoto}
                                                    resizeMode="cover"
                                                    defaultSource={require('@/assets/images/icon.png')}
                                                />
                                                <Text style={styles.castName} numberOfLines={2}>
                                                    {ator.nome}
                                                </Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
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
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    placeholder: {
        width: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    loadingText: {
        color: 'white',
        fontSize: 16,
        opacity: 0.7,
    },
    content: {
        flex: 1,
        paddingTop: 100, // Space for fixed header
    },
    bannerContainer: {
        position: 'relative',
        height: height * 0.4,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    bannerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    bannerContent: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    bannerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 15,
    },
    ageRating: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    ageRatingText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    duration: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    playButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    videoInfo: {
        padding: 20,
    },
    section: {
        marginBottom: 25,
    },
    videoTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        color: 'white',
        fontSize: 14,
        lineHeight: 20,
        opacity: 0.9,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    categoryText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    noCategoriesText: {
        color: 'white',
        fontSize: 14,
        opacity: 0.7,
        fontStyle: 'italic',
    },
    castContainer: {
        marginHorizontal: -20,
    },
    castContent: {
        paddingHorizontal: 20,
    },
    castMember: {
        alignItems: 'center',
        marginRight: 15,
        width: 80,
    },
    castPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    castName: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 16,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 4,
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
    },
    tabButtonActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    tabText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        opacity: 0.7,
    },
    tabTextActive: {
        opacity: 1,
        fontWeight: '600',
    },
    tabContent: {
        minHeight: 100,
    },
    bannerGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
});
