import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from './src/theme/theme';
import { FloatingHearts } from './src/components/FloatingHearts';
import { SvgIcon } from './src/components/SvgIcons';
import { LoveTimerScreen } from './src/screens/LoveTimerScreen';
import { GalleryScreen } from './src/screens/GalleryScreen';
import { QuotesDeckScreen } from './src/screens/QuotesDeckScreen';
import { MilestonesScreen } from './src/screens/MilestonesScreen';

type ScreenTab = 'timer' | 'gallery' | 'quotes' | 'milestones';

function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<ScreenTab>('timer');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleTabChange = (tab: ScreenTab) => {
    if (tab === activeTab) return;
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tab);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'timer':
        return <LoveTimerScreen />;
      case 'gallery':
        return <GalleryScreen />;
      case 'quotes':
        return <QuotesDeckScreen />;
      case 'milestones':
        return <MilestonesScreen />;
      default:
        return <LoveTimerScreen />;
    }
  };

  return (
    <SafeAreaProvider style={styles.provider}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Persistent floating love hearts ambient layer */}
      <FloatingHearts />

      {/* Screen Area */}
      <View style={styles.screenWrapper}>
        <Animated.View style={[styles.screenContainer, { opacity: fadeAnim }]}>
          {renderActiveScreen()}
        </Animated.View>
      </View>

      {/* Embedded Floating Navigation Bar */}
      <SafeAreaView edges={['bottom']} style={styles.navigationWrap}>
        <View style={styles.navigationContainer}>
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => handleTabChange('timer')}
            >
              <SvgIcon
                name="clock"
                size={20}
                color={activeTab === 'timer' ? COLORS.primary : COLORS.textMuted}
              />
              {activeTab === 'timer' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => handleTabChange('gallery')}
            >
              <SvgIcon
                name="camera"
                size={20}
                color={activeTab === 'gallery' ? COLORS.primary : COLORS.textMuted}
              />
              {activeTab === 'gallery' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => handleTabChange('quotes')}
            >
              <SvgIcon
                name="heart"
                size={20}
                color={activeTab === 'quotes' ? COLORS.primary : COLORS.textMuted}
              />
              {activeTab === 'quotes' && <View style={styles.activeDot} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => handleTabChange('milestones')}
            >
              <SvgIcon
                name="star"
                size={20}
                color={activeTab === 'milestones' ? COLORS.primary : COLORS.textMuted}
              />
              {activeTab === 'milestones' && <View style={styles.activeDot} />}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenWrapper: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  navigationWrap: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    zIndex: 99,
  },
  navigationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(195, 141, 130, 0.25)',
    shadowColor: '#4A3E3D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    height: 58,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.secondary,
  },
});

export default App;