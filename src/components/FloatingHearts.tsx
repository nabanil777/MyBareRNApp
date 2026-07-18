import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface HeartInstance {
  id: number;
  x: number;
  scale: number;
  duration: number;
  delay: number;
}

export function FloatingHearts(): React.JSX.Element {
  const [hearts, setHearts] = useState<HeartInstance[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    // Periodically spawn new hearts
    const interval = setInterval(() => {
      const newHeart: HeartInstance = {
        id: idCounter.current++,
        x: Math.random() * SCREEN_WIDTH,
        scale: 0.4 + Math.random() * 0.8,
        duration: 3500 + Math.random() * 2500,
        delay: Math.random() * 500,
      };
      setHearts((prev) => [...prev.slice(-30), newHeart]); // Keep max 30 hearts to avoid lag
    }, 850);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {hearts.map((heart) => (
        <FloatingHeartItem key={heart.id} heart={heart} onComplete={(id) => {
          setHearts((prev) => prev.filter((h) => h.id !== id));
        }} />
      ))}
    </View>
  );
}

interface FloatingHeartItemProps {
  heart: HeartInstance;
  onComplete: (id: number) => void;
}

function FloatingHeartItem({ heart, onComplete }: FloatingHeartItemProps): React.JSX.Element {
  const positionY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const swing = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animation sequence
    Animated.parallel([
      // Move up
      Animated.timing(positionY, {
        toValue: SCREEN_HEIGHT + 100,
        duration: heart.duration,
        delay: heart.delay,
        useNativeDriver: true,
      }),
      // Fade in then out
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: heart.duration * 0.2,
          delay: heart.delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: heart.duration * 0.8,
          useNativeDriver: true,
        }),
      ]),
      // Swing left and right
      Animated.loop(
        Animated.sequence([
          Animated.timing(swing, {
            toValue: 1,
            duration: 1000 + Math.random() * 500,
            useNativeDriver: true,
          }),
          Animated.timing(swing, {
            toValue: -1,
            duration: 1000 + Math.random() * 500,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ),
    ]).start(() => {
      onComplete(heart.id);
    });
  }, [positionY, opacity, swing, heart, onComplete]);

  // Interpolate sideways movement
  const translateX = swing.interpolate({
    inputRange: [-1, 1],
    outputRange: [-30, 30],
  });

  const translateY = positionY.interpolate({
    inputRange: [0, SCREEN_HEIGHT + 100],
    outputRange: [SCREEN_HEIGHT + 20, -50],
  });

  return (
    <Animated.View
      style={[
        styles.heartContainer,
        {
          left: heart.x,
          transform: [{ translateX }, { translateY }, { scale: heart.scale }],
          opacity,
        },
      ]}
    >
      <HeartShape />
    </Animated.View>
  );
}

// Crisp pure CSS shape heart widget
function HeartShape(): React.JSX.Element {
  return (
    <View style={styles.heart}>
      <View style={[styles.heartPart, styles.leftHeart]} />
      <View style={[styles.heartPart, styles.rightHeart]} />
    </View>
  );
}

const styles = StyleSheet.create({
  heartContainer: {
    position: 'absolute',
  },
  heart: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  heartPart: {
    position: 'absolute',
    width: 14,
    height: 22,
    backgroundColor: '#FF2E93',
    borderRadius: 7, // Rounded top
  },
  leftHeart: {
    transform: [{ rotate: '-45deg' }],
    left: 2,
  },
  rightHeart: {
    transform: [{ rotate: '45deg' }],
    left: 8,
  },
});
