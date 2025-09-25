import VideoPlayer from '@/components/VideoPlayer';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function VideoPlayerScreen() {
    const { slug } = useLocalSearchParams();

    // Vídeo de teste - usando uma URL mais confiável
    const testVideoSource = {
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        metadata: {
            title: 'Vídeo de Teste - AmazôniaFlix',
            artist: 'AmazôniaFlix',
        },
    };

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
                    videoSource={testVideoSource}
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
});
