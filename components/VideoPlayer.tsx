import { Ionicons } from '@expo/vector-icons';
import { useEvent } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useVideoPlayer, VideoSource, VideoView } from 'expo-video';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface VideoPlayerProps {
  videoSource: VideoSource;
  style?: any;
  showControls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  onPlaybackEnd?: () => void;
}

export default function VideoPlayer({
  videoSource,
  style,
  showControls = true,
  autoPlay = false,
  loop = false,
  onPlaybackEnd,
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = loop;
    if (autoPlay) {
      player.play();
    }
  });

  // Listen to player events
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const statusChangeEvent = useEvent(player, 'statusChange', { status: player.status, error: player.status === 'error' ? { message: 'Unknown error' } : undefined });
  const status = statusChangeEvent?.status;
  const error = statusChangeEvent?.error;

  // Listen to time updates
  React.useEffect(() => {
    const subscription = player.addListener('timeUpdate', ({ currentTime: time }) => {
      setCurrentTime(time);
      setDuration(player.duration);
    });

    return () => subscription.remove();
  }, [player]);

  // Handle status changes
  React.useEffect(() => {
    console.log('VideoPlayer status changed:', status);
    if (status === 'readyToPlay') {
      setIsLoading(false);
      setHasError(false);
    } else if (status === 'loading') {
      setIsLoading(true);
      setHasError(false);
    } else if (status === 'error') {
      setIsLoading(false);
      setHasError(true);
      console.error('VideoPlayer error:', error);
    }
  }, [status, error]);

  // Handle play to end
  React.useEffect(() => {
    const subscription = player.addListener('playToEnd', () => {
      if (onPlaybackEnd) {
        onPlaybackEnd();
      }
    });

    return () => subscription.remove();
  }, [player, onPlaybackEnd]);

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleReplay = () => {
    player.replay();
    setHasError(false);
  };

  const handleFullscreenEnter = async () => {
    try {
      // Forçar orientação landscape quando entrar em fullscreen
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } catch (error) {
      console.log('Erro ao alterar orientação:', error);
    }
  };

  const handleFullscreenExit = async () => {
    try {
      // Voltar para portrait quando sair do fullscreen
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } catch (error) {
      console.log('Erro ao alterar orientação:', error);
    }
  };

  const handleSeekBackward = () => {
    const newTime = Math.max(0, currentTime - 5);
    player.currentTime = newTime;
  };

  const handleSeekForward = () => {
    const newTime = Math.min(duration, currentTime + 5);
    player.currentTime = newTime;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasError) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ff6b6b" />
          <Text style={styles.errorText}>Erro ao carregar o vídeo</Text>
          <Text style={styles.errorDetails}>
            Status: {status}
            {error && `\nErro: ${error}`}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleReplay}>
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <VideoView
        style={styles.video}
        player={player}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
        nativeControls={false}
        contentFit="contain"
        onFirstFrameRender={() => setIsLoading(false)}
        onFullscreenEnter={handleFullscreenEnter}
        onFullscreenExit={handleFullscreenExit}
      />
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Carregando vídeo...</Text>
        </View>
      )}

      {showControls && !isLoading && (
        <>
          {/* Área central clicável (invisível) */}
          <TouchableOpacity
            style={styles.centerClickArea}
            onPress={togglePlayPause}
            activeOpacity={1}
          />
          
          {/* Controles na parte inferior */}
          <View style={styles.bottomControls}>
            {/* Botão Play/Pause no canto esquerdo */}
            <TouchableOpacity
              style={styles.playButton}
              onPress={togglePlayPause}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={20}
                color="white"
              />
            </TouchableOpacity>

            {/* Controles centrais */}
            <View style={styles.centerControls}>
              {/* Botão retroceder 5s */}
              <TouchableOpacity
                style={styles.seekButton}
                onPress={handleSeekBackward}
                activeOpacity={0.7}
              >
                <Ionicons name="play-back" size={20} color="white" />
              </TouchableOpacity>

              {/* Barra de progresso */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }
                    ]} 
                  />
                </View>
              </View>

              {/* Botão avançar 5s */}
              <TouchableOpacity
                style={styles.seekButton}
                onPress={handleSeekForward}
                activeOpacity={0.7}
              >
                <Ionicons name="play-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Tempo no canto direito */}
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  centerClickArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  centerControls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff6b6b',
    borderRadius: 2,
  },
  timeContainer: {
    marginLeft: 15,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorDetails: {
    color: 'white',
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 16,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
