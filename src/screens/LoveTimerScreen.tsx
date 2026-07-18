import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS } from '../theme/theme';
import { ANNIVERSARY_DATE, LOVE_QUOTES } from '../data/data';
import { FloatingHearts } from '../components/FloatingHearts';

const { width } = Dimensions.get('window');

export function LoveTimerScreen(): React.JSX.Element {
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const quoteOpacity = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anniversary = new Date(ANNIVERSARY_DATE).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = now - anniversary;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimePassed({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Soft elegant pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.96,
          duration: 850,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 550,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 950,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 4500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 4500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  // Infinite Panning Backdrop interpolations
  const bgTranslateX = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.1, width * 0.1],
  });
  const bgTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 15],
  });

  const handleNextQuote = () => {
    Animated.timing(quoteOpacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % LOVE_QUOTES.length);
      Animated.timing(quoteOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }).start();
    });
  };

  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/IMG3.jpeg')}
        style={[
          styles.bgImage,
          {
            transform: [
              { translateX: bgTranslateX },
              { translateY: bgTranslateY },
              { scale: 1.15 },
            ],
          },
        ]}
        resizeMode="cover"
      />
      <View style={styles.blurOverlay} />
      <FloatingHearts />
      
      <Text style={styles.header}>Our Journey</Text>
      <Text style={styles.subHeader}>Counting every beautiful second together</Text>

      {/* Elegant Typographic Counter Card */}
      <View style={styles.timerCard}>
        <Text style={styles.daysCount}>{timePassed.days} Days</Text>
        <Text style={styles.timeTicker}>
          {pad(timePassed.hours)}h  •  {pad(timePassed.minutes)}m  •  {pad(timePassed.seconds)}s
        </Text>
      </View>

      {/* Elegant Quote Display Panel */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleNextQuote} style={styles.quoteCard}>
        <Animated.View style={{ opacity: quoteOpacity, alignItems: 'center' }}>
          <Text style={styles.quoteMark}>“</Text>
          <Text style={styles.quoteText}>{LOVE_QUOTES[currentQuoteIndex]}</Text>
          <Text style={styles.quoteTip}>Tap to reveal another letter</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  header: {
    fontSize: 32,
    fontWeight: '300', // Light refined font-weight
    color: COLORS.text,
    fontFamily: 'System',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(249, 246, 240, 0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textMuted,
    fontStyle: 'italic',
    marginTop: 6,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(249, 246, 240, 0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bgImage: {
    position: 'absolute',
    left: -width * 0.15,
    top: 0,
    right: 0,
    bottom: 0,
    width: width * 1.3,
    height: '100%',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(249, 246, 240, 0.22)', // More translucent overlay to make background image highly visible
  },
  timerCard: {
    width: width * 0.88,
    backgroundColor: 'rgba(255, 255, 255, 0.55)', // Translucent mat board
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 22,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 35,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  daysCount: {
    fontSize: 38,
    fontWeight: '300',
    color: COLORS.text,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  timeTicker: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 1.2,
  },
  quoteCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 28,
    width: width * 0.88,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 4,
    marginTop: 15,
    marginBottom: 75, // push above tab bar
  },
  quoteMark: {
    fontSize: 36,
    color: COLORS.secondary,
    lineHeight: 36,
    fontFamily: 'System',
    fontWeight: 'bold',
    opacity: 0.8,
    marginBottom: -5,
  },
  quoteText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
    fontWeight: '300',
  },
  quoteTip: {
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 18,
    fontWeight: '600',
    letterSpacing: 1.0,
    textTransform: 'uppercase',
  },
});
