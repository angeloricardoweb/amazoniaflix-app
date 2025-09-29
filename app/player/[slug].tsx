import VideoPlayer from '@/components/VideoPlayer';
import useFetchVideoDetails from '@/hooks/useFetchVideoDetails';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function VideoPlayerScreen() {
    const { slug } = useLocalSearchParams();

    // Buscar detalhes do vídeo
    const { data: videoDetails } = useFetchVideoDetails({
        slug: slug as string
    });

    // Debug: verificar se os dados estão chegando
    useEffect(() => {
        console.log('Player Screen - Slug:', slug);
        console.log('Player Screen - Video Details:', videoDetails);
    }, [slug, videoDetails]);

    // Função para extrair ID do Vimeo
    const extractVimeoId = (url: string): string | null => {
        const match = url.match(/(?:vimeo\.com\/)(\d+)/);
        return match ? match[1] : null;
    };

    // Criar source do vídeo baseado nos dados reais
    const videoSource = useMemo(() => {
        if (!videoDetails?.video_id) {
            console.log('Video details not loaded, using fallback video');
            // Fallback para vídeo de teste
            return {
                uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                metadata: {
                    title: 'Vídeo de Teste - AmazôniaFlix',
                    artist: 'AmazôniaFlix',
                },
            };
        }

        const vimeoId = extractVimeoId(videoDetails.video_id);
        console.log('Video ID from API:', videoDetails.video_id);
        console.log('Extracted Vimeo ID:', vimeoId);
        
        if (vimeoId) {
            // Para Vimeo, usar a URL original que já vem formatada
            // O expo-video pode lidar com URLs do Vimeo diretamente
            console.log('Using Vimeo URL:', videoDetails.video_id);
            return {
                uri: videoDetails.video_id,
                metadata: {
                    title: videoDetails.titulo,
                    artist: 'AmazôniaFlix',
                },
            };
        }

        // Se não conseguir extrair ID do Vimeo, usar a URL original
        console.log('Using original URL:', videoDetails.video_id);
        return {
            uri: videoDetails.video_id,
            metadata: {
                title: videoDetails.titulo,
                artist: 'AmazôniaFlix',
            },
        };
    }, [videoDetails]);

    // Permitir rotação automática quando a tela carrega
    useEffect(() => {
        // Permitir todas as orientações
        ScreenOrientation.unlockAsync();
        
        // Restaurar orientação quando sair da tela
        return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
    }, []);

    const handleBack = () => {
        // Restaurar orientação portrait antes de voltar
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        router.back();
    };

    // Mostrar loading enquanto os dados não carregam
    if (!videoDetails) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBack}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.loadingText}>Carregando vídeo...</Text>
                </View>
                <StatusBar style="light" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header com botão de voltar */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Video Player em tela cheia */}
            <View style={styles.videoContainer}>
                <VideoPlayer
                    videoSource={videoSource}
                    style={styles.videoPlayer}
                    showControls={true}
                    autoPlay={true}
                    loop={false}
                />
            </View>

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        position: 'absolute',
        top: 50, // Safe area
        left: 20,
        zIndex: 1000,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoContainer: {
        flex: 1,
        width: '100%',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loadingText: {
        color: 'white',
        fontSize: 16,
        marginTop: 16,
        opacity: 0.7,
    },
});
