import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, Square, Play, Pause, RotateCcw } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useRef, useEffect } from 'react';

const { width } = Dimensions.get('window');

export default function RecordScreen() {
  const insets = useSafeAreaInsets();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const waveAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRecording) {
      // Pulse animation for recording button
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Wave animation
      Animated.loop(
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      pulseAnimation.setValue(1);
      waveAnimation.setValue(0);
    }
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Start timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetRecording = () => {
    setHasRecording(false);
    setIsPlaying(false);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#0F172A']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Voice Journal</Text>
          <Text style={styles.subtitle}>
            {isRecording ? 'Recording your thoughts...' : 'Ready to capture your mind'}
          </Text>
        </View>

        {/* Recording Visualizer */}
        <View style={styles.visualizerContainer}>
          {isRecording && (
            <Animated.View
              style={[
                styles.waveContainer,
                {
                  opacity: waveAnimation,
                  transform: [
                    {
                      scale: waveAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.5],
                      }),
                    },
                  ],
                },
              ]}>
              <View style={styles.wave} />
            </Animated.View>
          )}
          
          {/* Recording Time */}
          {(isRecording || hasRecording) && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(recordingTime)}</Text>
            </View>
          )}
        </View>

        {/* Main Recording Button */}
        <View style={styles.recordingSection}>
          <TouchableOpacity
            style={styles.recordButtonContainer}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={hasRecording && !isRecording}>
            
            <Animated.View
              style={[
                styles.recordButton,
                {
                  transform: [{ scale: pulseAnimation }],
                },
              ]}>
              <LinearGradient
                colors={
                  isRecording 
                    ? ['#EF4444', '#DC2626'] 
                    : ['#8B5CF6', '#7C3AED']
                }
                style={styles.recordGradient}>
                
                {isRecording ? (
                  <Square size={32} color="white" />
                ) : (
                  <Mic size={32} color="white" />
                )}
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
          
          <Text style={styles.recordLabel}>
            {isRecording ? 'Tap to stop' : 'Tap to record'}
          </Text>
        </View>

        {/* Playback Controls */}
        {hasRecording && !isRecording && (
          <View style={styles.playbackControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={resetRecording}>
              <RotateCcw size={24} color="#94A3B8" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.playButton}
              onPress={togglePlayback}>
              <LinearGradient
                colors={['#06B6D4', '#0891B2']}
                style={styles.playGradient}>
                {isPlaying ? (
                  <Pause size={28} color="white" />
                ) : (
                  <Play size={28} color="white" />
                )}
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.spacer} />
          </View>
        )}

        {/* Transcription Preview */}
        {hasRecording && (
          <View style={styles.transcriptionSection}>
            <Text style={styles.transcriptionTitle}>Transcription</Text>
            <View style={styles.transcriptionCard}>
              <Text style={styles.transcriptionText}>
                "I've been thinking about the importance of mindfulness in my daily routine. 
                It's fascinating how taking just a few minutes to breathe and reflect can 
                completely change my perspective on challenging situations..."
              </Text>
            </View>
            
            <TouchableOpacity style={styles.analyzeButton}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.analyzeGradient}>
                <Text style={styles.analyzeText}>Analyze & Get Insights</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  visualizerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  waveContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8B5CF620',
    borderWidth: 2,
    borderColor: '#8B5CF640',
  },
  timeContainer: {
    position: 'absolute',
    top: -50,
  },
  timeText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  recordingSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  recordButtonContainer: {
    marginBottom: 20,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  recordGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  recordLabel: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '500',
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginBottom: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  playGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  spacer: {
    width: 50,
  },
  transcriptionSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  transcriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  transcriptionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  transcriptionText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
  },
  analyzeButton: {
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  analyzeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzeText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});