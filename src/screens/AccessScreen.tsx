import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';
import { COLORS } from '../theme/theme';
import { SvgIcon } from '../components/SvgIcons';

const { width } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Question {
  id: number;
  question: string;
  hint: string;
  answer: string;
  options: string[];
}

const QUESTIONS_POOL: Question[] = [
  {
    id: 1,
    question: "What is the best Metro station in the world?",
    hint: "Crinkle your nose to find out the answer",
    answer: "Majlis Park",
    options: ["Majlis Park", "CR Park", "Central park", "Park-e-disco"]
  },
  {
    id: 2,
    question: "What does our favourite Didi say when she calls?",
    hint: "Obsession",
    answer: "Babu, khana khaye?",
    options: ["Babu, khana khaye?", "Kya re chikni?", "Chalti hai kya 9 se 9.10", "Hey maa mataji"]
  },
  {
    id: 3,
    question: "Akshay Kumar, Suniel Shetty, Shilpa Shetty. First word that comes to mind?",
    hint: "Tilt your head to find out the answer",
    answer: "Anjali!!",
    options: ["Anjali!!", "Ye dharti meri maa hai", "Babu bhaiyya", "Pooja chacha"]
  },
  {
    id: 4,
    question: "Ek shoe ne dusre shoe se kya kaha?",
    hint: "Silenceeeee",
    answer: "SSHHH!!",
    options: ["SSHHH!!", "Mere tarf kyu dekh rha hai?", "Mai apki ki sahayata nhi kr sakta", "Kya karengi aap itni dhan rashi ka?"]
  },
  {
    id: 5,
    question: "Duck ke sardaar ko kya kehte hai?",
    hint: "Wrebeckkk!!",
    answer: "Mainduck",
    options: ["Mainduck", "Kuuk-o-do-koo", "Bhow bhow", "Aaauuuuu"]
  },
  {
    id: 6,
    question: "Teacher ne kaunse row me baithne bola tha?",
    hint: "Aatmanirbhar NASA",
    answer: "ISRO",
    options: ["ISRO", "Usro", "jis-bhi-row", "pata nhi kaunsa row"]
  }
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface AccessScreenProps {
  onAccessGranted: () => void;
}

export function AccessScreen({ onAccessGranted }: AccessScreenProps): React.JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Select 3 random questions and shuffle their options
    const selected = shuffleArray(QUESTIONS_POOL).slice(0, 3).map(q => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestions(selected);
  }, []);

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleOptionPress = (option: string) => {
    if (selectedOption !== null && isCorrect) return; // Prevent double pressing on correct

    const currentQuestion = questions[currentIndex];
    setSelectedOption(option);
    setShowHint(false);

    if (option === currentQuestion.answer) {
      setIsCorrect(true);
      setErrorMsg(null);
      
      // Animate transition to next question or trigger access success
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          // Transition to next question
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
            
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            }).start();
          });
        } else {
          onAccessGranted();
        }
      }, 700);
    } else {
      setIsCorrect(false);
      triggerShake();
      
      // Funny messages
      const errors = [
        "Really? Did you crinkle your nose properly?",
        "Ouch! Someone is going to be super judged.",
        "Incorrect! Try again before Didi gets mad.",
        "Mmaaahh! Let's think carefully...",
        "Wrong answer! The hints are there for a reason!"
      ];
      setErrorMsg(errors[Math.floor(Math.random() * errors.length)]);
    }
  };

  const toggleHint = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowHint(!showHint);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Preparing Lovers' Vault...</Text>
      </View>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.cardContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ translateX: shakeAnim }] 
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.lockIconContainer}>
            <SvgIcon name="heart" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>The Lovers' Vault</Text>
          <Text style={styles.subtitle}>Answer correctly to unlock Nil & Vidu's Diary</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${((currentIndex + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Question {currentIndex + 1} of {questions.length}
          </Text>
        </View>

        {/* Question Text */}
        <View style={styles.questionSection}>
          <Text style={styles.questionText}>{currentQ.question}</Text>
        </View>

        {/* Hint Collapse */}
        <View style={styles.hintContainer}>
          <TouchableOpacity 
            style={styles.hintHeader} 
            onPress={toggleHint} 
            activeOpacity={0.7}
          >
            <Text style={styles.hintTitle}>Need a Hint?</Text>
            <Text style={styles.hintToggleIcon}>{showHint ? '−' : '+'}</Text>
          </TouchableOpacity>
          {showHint && (
            <View style={styles.hintBody}>
              <Text style={styles.hintText}>{currentQ.hint}</Text>
            </View>
          )}
        </View>

        {/* Options List */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, idx) => {
            const isThisSelected = selectedOption === option;
            let optionStyle: any = styles.optionButton;
            let textStyle: any = styles.optionText;

            if (isThisSelected) {
              if (isCorrect) {
                optionStyle = [styles.optionButton, styles.optionCorrect];
                textStyle = [styles.optionText, styles.optionTextSelected];
              } else {
                optionStyle = [styles.optionButton, styles.optionIncorrect];
                textStyle = [styles.optionText, styles.optionTextSelected];
              }
            }

            return (
              <TouchableOpacity
                key={idx}
                style={optionStyle}
                activeOpacity={0.75}
                onPress={() => handleOptionPress(option)}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.radioCircle,
                    isThisSelected && isCorrect && styles.radioCorrect,
                    isThisSelected && !isCorrect && styles.radioIncorrect
                  ]}>
                    {isThisSelected && (
                      <View style={[
                        styles.radioInner,
                        isCorrect ? styles.radioInnerCorrect : styles.radioInnerIncorrect
                      ]} />
                    )}
                  </View>
                  <Text style={textStyle}>{option}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Error Messages */}
        {errorMsg && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(253, 251, 247, 0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 18,
    color: COLORS.primary,
    fontStyle: 'italic',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(195, 141, 130, 0.2)',
    shadowColor: '#4A3E3D',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  lockIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(195, 141, 130, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#F3EDE6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    textAlign: 'right',
  },
  questionSection: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: COLORS.text,
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  hintContainer: {
    backgroundColor: 'rgba(195, 141, 130, 0.05)',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 24,
  },
  hintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  hintTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
  },
  hintToggleIcon: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  hintBody: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(195, 141, 130, 0.08)',
  },
  hintText: {
    fontSize: 13,
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(195, 141, 130, 0.12)',
  },
  optionCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },
  optionIncorrect: {
    backgroundColor: '#FFEBEE',
    borderColor: '#E57373',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.textMuted,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCorrect: {
    borderColor: '#4CAF50',
  },
  radioIncorrect: {
    borderColor: '#F44336',
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  radioInnerCorrect: {
    backgroundColor: '#4CAF50',
  },
  radioInnerIncorrect: {
    backgroundColor: '#F44336',
  },
  optionText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    flex: 1,
  },
  optionTextSelected: {
    color: COLORS.text,
  },
  errorBox: {
    marginTop: 20,
    backgroundColor: 'rgba(244, 67, 54, 0.06)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(244, 67, 54, 0.15)',
  },
  errorText: {
    fontSize: 12.5,
    color: '#D32F2F',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    fontWeight: '500',
  },
});
