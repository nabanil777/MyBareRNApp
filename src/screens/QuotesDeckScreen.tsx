import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../theme/theme';

const { width } = Dimensions.get('window');

const FORTUNE_WHO = [
  'Vidu 🙋‍♀️',
  'Nil 🙋‍♂️',
  'A hangry cookie monster 🍪',
  'Your future puppy 🐶',
  'The pillow between you 🛌',
  'An empty bubble tea cup 🧋',
  'Nil\'s favorite hoodie 🧥',
  'A sleepy koala bear 🐨',
];

const FORTUNE_WHAT = [
  'will execute a stealthy snack heist 🍕',
  'will demand 500 immediate forehead kisses 💋',
  'will refuse to wake up from a 12-hour nap 😴',
  'will steal the blanket tonight 🛌',
  'will state that everything is fine 🙃',
  'will make a ridiculous silly face 🤪',
  'will start a dramatic tickle war ⚔️',
  'will purchase bubble tea without telling 🧋',
];

const FORTUNE_RESULT = [
  'resulting in Nil buying pizza to survive.',
  'causing Nil\'s wallet to weep softly.',
  'which requires dynamic cuddles to resolve.',
  'forcing the other to act as a human heater.',
  'leading to a 3-hour debate about snack superiority.',
  'which will be immortalized in a funny selfie.',
  'resulting in immediate victory pizza.',
  'causing a massive giggle fit.',
];

const ROULETTE_OPTIONS = [
  'Vidu wins unconditionally 👑',
  'Nil buys Bubble Tea 🧋',
  'Cuddle it out right now 🧸',
  'Flip a coin (Nil decides heads) 🪙',
  'Nil does the dishes 🍽️',
  'Order matching Pizzas 🍕',
  'Vidu chooses what to watch 🎬',
  'Nil holds Vidu\'s bag 👜',
];

export function QuotesDeckScreen(): React.JSX.Element {
  // Fortune Teller states
  const [isFortuneRunning, setIsFortuneRunning] = useState(false);
  const [whoIdx, setWhoIdx] = useState(0);
  const [whatIdx, setWhatIdx] = useState(0);
  const [resultIdx, setResultIdx] = useState(0);
  const [assembledFortune, setAssembledFortune] = useState<string | null>(null);

  // Spinner states
  const [isSpinning, setIsSpinning] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [chosenResult, setChosenResult] = useState<string | null>(null);

  // Animation values
  const popAnim = useRef(new Animated.Value(0)).current;
  const fortunePopAnim = useRef(new Animated.Value(0)).current;

  // Fortune Teller spinning loop
  const spinFortune = () => {
    if (isFortuneRunning) return;
    setIsFortuneRunning(true);
    setAssembledFortune(null);
    fortunePopAnim.setValue(0);

    let speed = 70;
    let cycles = 0;
    let maxCycles = 16;

    const targetWho = Math.floor(Math.random() * FORTUNE_WHO.length);
    const targetWhat = Math.floor(Math.random() * FORTUNE_WHAT.length);
    const targetResult = Math.floor(Math.random() * FORTUNE_RESULT.length);

    const runReels = () => {
      cycles += 1;

      // Cycle WHO reel
      if (cycles < maxCycles - 4) {
        setWhoIdx((prev) => (prev + 1) % FORTUNE_WHO.length);
      } else {
        setWhoIdx(targetWho);
      }

      // Cycle WHAT reel
      if (cycles < maxCycles - 2) {
        setWhatIdx((prev) => (prev + 1) % FORTUNE_WHAT.length);
      } else {
        setWhatIdx(targetWhat);
      }

      // Cycle RESULT reel
      if (cycles < maxCycles) {
        setResultIdx((prev) => (prev + 1) % FORTUNE_RESULT.length);
      } else {
        setResultIdx(targetResult);
      }

      if (cycles < maxCycles) {
        setTimeout(runReels, speed);
      } else {
        // Resolve final assembled sentence
        const completeSentence = `${FORTUNE_WHO[targetWho]} ${FORTUNE_WHAT[targetWhat]} ${FORTUNE_RESULT[targetResult]}`;
        setAssembledFortune(completeSentence);
        setIsFortuneRunning(false);
        Animated.spring(fortunePopAnim, {
          toValue: 1,
          tension: 65,
          friction: 6,
          useNativeDriver: true,
        }).start();
      }
    };

    runReels();
  };

  // Decision Ticker loop
  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setChosenResult(null);
    popAnim.setValue(0);

    let speed = 80;
    let cycles = 0;
    let maxCycles = 15;
    const finalIndex = Math.floor(Math.random() * ROULETTE_OPTIONS.length);

    const runTicker = () => {
      setTickerIndex((prev) => (prev + 1) % ROULETTE_OPTIONS.length);
      cycles += 1;

      if (cycles < maxCycles) {
        setTimeout(runTicker, speed);
      } else if (cycles < maxCycles + 5) {
        speed += 120;
        setTimeout(runTicker, speed);
      } else {
        setTickerIndex(finalIndex);
        setChosenResult(ROULETTE_OPTIONS[finalIndex]);
        setIsSpinning(false);
        Animated.spring(popAnim, {
          toValue: 1,
          tension: 60,
          friction: 6,
          useNativeDriver: true,
        }).start();
      }
    };

    runTicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Love Lab</Text>
        <Text style={styles.subHeader}>Diagnostics & Conflict Resolution Console</Text>

        {/* SECTION 1: Silly Love Fortune Teller */}
        <View style={styles.cardConsole}>
          <Text style={styles.sectionTitle}>Silly Love Fortune Teller</Text>
          <Text style={styles.sectionDesc}>Spin the prediction slot reels to generate unique relationship forecasts.</Text>

          {/* Three slot wheels mockup side-by-side */}
          <View style={styles.tripleSlotRow}>
            {/* Reel 1: WHO */}
            <View style={styles.slotReel}>
              <Text style={styles.reelIndicatorLabel}>WHO</Text>
              <View style={styles.reelInnerWindow}>
                <Text style={styles.reelText} numberOfLines={1}>
                  {FORTUNE_WHO[whoIdx].split(' ')[0]}
                </Text>
              </View>
            </View>

            {/* Reel 2: WHAT */}
            <View style={styles.slotReelLarge}>
              <Text style={styles.reelIndicatorLabel}>WHAT</Text>
              <View style={styles.reelInnerWindow}>
                <Text style={styles.reelTextSmall} numberOfLines={2}>
                  {FORTUNE_WHAT[whatIdx]}
                </Text>
              </View>
            </View>

            {/* Reel 3: RESULT */}
            <View style={styles.slotReel}>
              <Text style={styles.reelIndicatorLabel}>OUTCOME</Text>
              <View style={styles.reelInnerWindow}>
                <Text style={styles.reelTextCode} numberOfLines={2}>
                  Result...
                </Text>
              </View>
            </View>
          </View>

          {/* Assembled Forecast display card block */}
          <View style={styles.fortuneAnswerArea}>
            {!assembledFortune && !isFortuneRunning ? (
              <Text style={styles.fortunePlaceholderText}>READY TO FORECAST YOUR DAY</Text>
            ) : (
              <Animated.View
                style={[
                  styles.fortuneDisplayCard,
                  assembledFortune ? { transform: [{ scale: fortunePopAnim }] } : {},
                ]}
              >
                <Text style={styles.fortunePrefix}>❤️ TODAY'S PREDICTION:</Text>
                <Text style={styles.fortuneSentence}>{assembledFortune || 'Generating...'}</Text>
              </Animated.View>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={spinFortune}
            disabled={isFortuneRunning}
            style={[styles.spinButton, isFortuneRunning && styles.spinButtonDisabled]}
          >
            <Text style={styles.spinButtonText}>
              {isFortuneRunning ? 'SPINNING REELS...' : 'TELL MY FORTUNE'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 2: Argument Resolver Ticker */}
        <View style={[styles.cardConsole, styles.resolverCard]}>
          <Text style={styles.sectionTitle}>Decision Ticker Resolver</Text>
          <Text style={styles.sectionDesc}>Have a relationship debate? Spin to select a final resolution.</Text>

          <View style={styles.slotViewport}>
            {!chosenResult && !isSpinning ? (
              <Text style={styles.slotPlaceholder}>ROULETTE READY</Text>
            ) : (
              <Animated.View
                style={[
                  styles.slotTickerWindow,
                  chosenResult ? { transform: [{ scale: popAnim }] } : {},
                ]}
              >
                <Text style={styles.slotTickerText}>{ROULETTE_OPTIONS[tickerIndex]}</Text>
              </Animated.View>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={spinRoulette}
            disabled={isSpinning}
            style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]}
          >
            <Text style={styles.spinButtonText}>{isSpinning ? 'SPINNING...' : 'SPIN ROULETTE'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 95, // Above floating tab bar
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subHeader: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    marginTop: 6,
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 0.5,
  },
  cardConsole: {
    width: width * 0.9,
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 4,
    marginBottom: 20,
  },
  resolverCard: {
    backgroundColor: '#FCFAF6',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 20,
    lineHeight: 16,
  },
  tripleSlotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  slotReel: {
    flex: 1.2,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  slotReelLarge: {
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  reelIndicatorLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  reelInnerWindow: {
    width: '100%',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(195, 141, 130, 0.18)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 4,
  },
  reelText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  reelTextSmall: {
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },
  reelTextCode: {
    fontSize: 9,
    fontStyle: 'italic',
    fontWeight: '500',
    color: COLORS.secondary,
    textAlign: 'center',
  },
  fortuneAnswerArea: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  fortunePlaceholderText: {
    fontSize: 9,
    color: COLORS.textMuted,
    fontWeight: '600',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  fortuneDisplayCard: {
    width: '100%',
    backgroundColor: 'rgba(195, 141, 130, 0.05)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  fortunePrefix: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.secondary,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  fortuneSentence: {
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 18,
    fontWeight: '400',
  },
  slotViewport: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  slotPlaceholder: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    letterSpacing: 1.8,
  },
  slotTickerWindow: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotTickerText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  spinButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  spinButtonDisabled: {
    backgroundColor: 'rgba(195, 141, 130, 0.58)',
  },
  spinButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});
