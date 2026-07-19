import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { COLORS } from '../theme/theme';
import { STORIES_timeline, Memory } from '../data/data';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 36) / 2;

export function GalleryScreen(): React.JSX.Element {
  const [selectedItem, setSelectedItem] = useState<Memory | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openLightbox = (item: Memory) => {
    setSelectedItem(item);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeLightbox = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSelectedItem(null));
  };

  const getFrameStyle = (index: number) => {
    const r = COLUMN_WIDTH;
    const shapes = [
      // 0: Elegant Arch (Cathedral Window)
      {
        borderTopLeftRadius: r * 0.75,
        borderTopRightRadius: r * 0.75,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      // 1: Asymmetric Petal/Teardrop (Top-right & Bottom-left curves)
      {
        borderTopLeftRadius: 10,
        borderTopRightRadius: r * 0.75,
        borderBottomLeftRadius: r * 0.75,
        borderBottomRightRadius: 10,
      },
      // 2: Sculpted Cameo Oval (Smooth egg shape)
      {
        borderTopLeftRadius: r * 0.5,
        borderTopRightRadius: r * 0.5,
        borderBottomLeftRadius: r * 0.5,
        borderBottomRightRadius: r * 0.5,
      },
      // 3: Soft Premium Squircle (Retro feel)
      {
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
      },
      // 4: Opposite Diagonal Leaf (Top-left & Bottom-right curves)
      {
        borderTopLeftRadius: r * 0.75,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: r * 0.75,
      },
      // 5: Elegant Capsule Curve
      {
        borderTopLeftRadius: r * 0.75,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: r * 0.75,
        borderBottomRightRadius: 12,
      },
    ];
    return shapes[index % shapes.length];
  };

  const getCardHeight = (index: number) => {
    const heights = [
      COLUMN_WIDTH * 1.35,
      COLUMN_WIDTH * 1.55,
      COLUMN_WIDTH * 1.45,
      COLUMN_WIDTH * 1.5,
      COLUMN_WIDTH * 1.4,
    ];
    return heights[index % heights.length];
  };

  const getCardRotation = (index: number) => {
    const rotations = ['0.8deg', '-1.2deg', '0.5deg', '-0.8deg', '1.2deg', '-0.6deg'];
    return rotations[index % rotations.length];
  };

  const renderGalleryItem = (item: Memory, absoluteIndex: number) => {
    const frameStyle = getFrameStyle(absoluteIndex);
    const imageHeight = getCardHeight(absoluteIndex);
    const rotation = getCardRotation(absoluteIndex);

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.9}
        onPress={() => openLightbox(item)}
        style={[
          styles.card,
          frameStyle,
          {
            height: imageHeight,
            transform: [{ rotate: rotation }],
          },
        ]}
      >
        <View style={[styles.imageWrapper, frameStyle]}>
          <Image
            source={item.imageSource ? item.imageSource : { uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Separate even and odd items for the left and right columns
  const leftColumnItems = STORIES_timeline.filter((_, i) => i % 2 === 0);
  const rightColumnItems = STORIES_timeline.filter((_, i) => i % 2 !== 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gallery</Text>
      <Text style={styles.subHeader}>A curation of our quiet milestones</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.masonryContainer}>
          <View style={styles.masonryColumn}>
            {leftColumnItems.map((item, index) => renderGalleryItem(item, index * 2))}
          </View>
          <View style={[styles.masonryColumn, styles.rightColumnOffset]}>
            {rightColumnItems.map((item, index) => renderGalleryItem(item, index * 2 + 1))}
          </View>
        </View>
      </ScrollView>

      {/* Modern museum lightbox popup modal */}
      {selectedItem && (
        <Modal
          transparent
          visible={!!selectedItem}
          onRequestClose={closeLightbox}
          animationType="none"
        >
          <Animated.View style={[styles.lightboxOverlay, { opacity: fadeAnim }]}>
            <TouchableOpacity
              style={styles.lightboxCloseBg}
              activeOpacity={1}
              onPress={closeLightbox}
            />
            <View style={styles.lightboxContent}>
              <View style={[styles.lightboxInnerFrame, getFrameStyle(parseInt(selectedItem.id, 10) - 1)]}>
                <Image
                  source={selectedItem.imageSource ? selectedItem.imageSource : { uri: selectedItem.imageUrl }}
                  style={styles.lightboxImage}
                  resizeMode="cover"
                  resizeMethod="resize"
                />
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={closeLightbox}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 32,
    fontWeight: '300',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subHeader: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    marginTop: 6,
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 135,
    paddingHorizontal: 12,
  },
  masonryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  masonryColumn: {
    width: COLUMN_WIDTH,
  },
  rightColumnOffset: {
    marginTop: 28, // Offset right column downwards to initiate vertical staggering
  },
  card: {
    width: COLUMN_WIDTH,
    backgroundColor: COLORS.cardBg,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 4,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(195, 141, 130, 0.22)',
    backgroundColor: '#F5EFEB', // Soft placeholder cream
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // Elegant Translucent Lightbox Styles
  lightboxOverlay: {
    flex: 1,
    backgroundColor: 'rgba(45, 42, 40, 0.75)', // Elegant smoky dark background overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightboxCloseBg: {
    ...StyleSheet.absoluteFillObject,
  },
  lightboxContent: {
    width: width * 0.88,
    height: Dimensions.get('window').height * 0.68,
    backgroundColor: '#FCFAF6', // Premium Warm Alabaster cream mat board
    borderRadius: 24,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2D2A28',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 28,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(209, 166, 114, 0.35)', // Elegant soft gold border
    position: 'relative',
  },
  lightboxInnerFrame: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(195, 141, 130, 0.15)',
    backgroundColor: '#FAF6F0',
  },
  lightboxImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(195, 141, 130, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: 'bold',
  },
});
