import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';

interface SvgIconProps {
  name: 'heart' | 'star' | 'coffee' | 'camera' | 'flight' | 'clock' | 'book';
  size?: number;
  color?: string;
}

export function SvgIcon({ name, size = 20, color = COLORS.primary }: SvgIconProps): React.JSX.Element {
  const isActive = color === COLORS.primary;

  const renderIcon = () => {
    switch (name) {
      case 'clock':
        return (
          <View style={[styles.clockOuter, { width: size, height: size, borderRadius: size / 2, borderColor: color }]}>
            {/* Bezel Ticks */}
            <View style={[styles.clockTick, styles.tickTop, { backgroundColor: color }]} />
            <View style={[styles.clockTick, styles.tickBottom, { backgroundColor: color }]} />
            <View style={[styles.clockTick, styles.tickLeft, { backgroundColor: color }]} />
            <View style={[styles.clockTick, styles.tickRight, { backgroundColor: color }]} />

            {/* Stopwatch Winder Stem */}
            <View style={[styles.clockWinder, { backgroundColor: color }]} />

            {/* Double ring dial */}
            <View style={[styles.clockInnerRing, { borderColor: color, opacity: 0.15 }]} />

            {/* Center Axis Dot */}
            <View style={[styles.clockCenter, { backgroundColor: color }]} />
            
            {/* Hour hand (points right) */}
            <View style={[styles.clockHandHour, { width: size * 0.24, backgroundColor: color }]} />
            
            {/* Minute hand (points up) */}
            <View style={[styles.clockHandMinute, { height: size * 0.34, backgroundColor: color }]} />

            {/* Golden Chrono Second Hand (tilted up-left) */}
            <View style={[styles.clockHandSecond, { width: size * 0.38 }]} />
          </View>
        );

      case 'camera':
        return (
          <View style={[styles.cameraChassis, { width: size * 1.15, height: size * 0.85, borderRadius: 4, borderColor: color }]}>
            {/* Leica Red Dot brand stamp */}
            <View style={styles.cameraRedDot} />

            {/* Rangefinder view window */}
            <View style={[styles.cameraViewfinder, { borderColor: color }]} />

            {/* Leica dial cylinder button */}
            <View style={[styles.cameraDial, { backgroundColor: color }]} />

            {/* Multi-ring Lens System */}
            <View style={[styles.cameraLensOuter, { width: size * 0.52, height: size * 0.52, borderRadius: (size * 0.52) / 2, borderColor: color }]}>
              <View 
                style={[
                  styles.cameraLensInner, 
                  { 
                    width: size * 0.32, 
                    height: size * 0.32, 
                    borderRadius: (size * 0.32) / 2, 
                    borderColor: color,
                    backgroundColor: isActive ? 'rgba(195, 141, 130, 0.25)' : 'transparent',
                    borderWidth: isActive ? 0 : 1 
                  }
                ]} 
              />
              {/* Gold glass flare reflex reflection */}
              <View style={styles.cameraLensReflection} />
            </View>
          </View>
        );

      case 'heart': {
        const partWidth = size * 0.58;
        const partHeight = size * 0.88;
        return (
          <View style={{ width: size, height: size, position: 'relative' }}>
            <View
              style={[
                styles.heartPart,
                {
                  width: partWidth,
                  height: partHeight,
                  borderWidth: 1.5,
                  borderColor: color,
                  borderTopLeftRadius: partWidth / 2,
                  borderTopRightRadius: partWidth / 2,
                  left: size * 0.08,
                  top: size * 0.04,
                  transform: [{ rotate: '-45deg' }],
                  backgroundColor: isActive ? 'rgba(195, 141, 130, 0.22)' : 'transparent',
                },
              ]}
            />
            <View
              style={[
                styles.heartPart,
                {
                  width: partWidth,
                  height: partHeight,
                  borderWidth: 1.5,
                  borderColor: color,
                  borderTopLeftRadius: partWidth / 2,
                  borderTopRightRadius: partWidth / 2,
                  left: size * 0.33,
                  top: size * 0.04,
                  transform: [{ rotate: '45deg' }],
                  backgroundColor: isActive ? 'rgba(195, 141, 130, 0.22)' : 'transparent',
                },
              ]}
            />
          </View>
        );
      }

      case 'star': {
        // High fidelity geometric vertical timeline list tree vector
        const iconSize = size;
        return (
          <View style={{ width: iconSize, height: iconSize, justifyContent: 'center', alignItems: 'center' }}>
            {/* Node branch left */}
            <View style={[styles.timelineBranch, { left: 0, top: iconSize * 0.28, width: iconSize * 0.45, backgroundColor: color }]} />
            {/* Node branch right */}
            <View style={[styles.timelineBranch, { right: 0, top: iconSize * 0.68, width: iconSize * 0.45, backgroundColor: color }]} />
            {/* Vertical timeline stem */}
            <View style={[styles.timelineTrack, { height: iconSize, backgroundColor: color }]} />
            {/* Highlight nodes */}
            <View style={[styles.timelineNode, { left: iconSize * 0.45 - 2, top: iconSize * 0.28 - 2.2, backgroundColor: color }]} />
            <View style={[styles.timelineNode, { left: iconSize * 0.45 - 2, top: iconSize * 0.68 - 2.2, backgroundColor: color }]} />
            {/* Destination mini gold tags */}
            <View style={[styles.timelineTag, { left: 0, top: iconSize * 0.28 - 1 }]} />
            <View style={[styles.timelineTag, { right: 0, top: iconSize * 0.68 - 1 }]} />
          </View>
        );
      }

      default:
        return (
          <View style={[styles.defaultDot, { width: size * 0.4, height: size * 0.4, borderRadius: (size * 0.4) / 2, backgroundColor: color }]} />
        );
    }
  };

  return (
    <View style={styles.iconWrapper}>
      {renderIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Chrono Clock
  clockOuter: {
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  clockTick: {
    position: 'absolute',
    borderRadius: 0.5,
  },
  tickTop: {
    top: 1.5,
    width: 1,
    height: 2.2,
  },
  tickBottom: {
    bottom: 1.5,
    width: 1,
    height: 2.2,
  },
  tickLeft: {
    left: 1.5,
    width: 2.2,
    height: 1,
  },
  tickRight: {
    right: 1.5,
    width: 2.2,
    height: 1,
  },
  clockWinder: {
    position: 'absolute',
    top: -3.5,
    width: 3.5,
    height: 2,
    borderTopLeftRadius: 0.8,
    borderTopRightRadius: 0.8,
  },
  clockInnerRing: {
    position: 'absolute',
    top: 2.2,
    left: 2.2,
    right: 2.2,
    bottom: 2.2,
    borderWidth: 0.8,
    borderRadius: 99,
  },
  clockCenter: {
    width: 3.5,
    height: 3.5,
    borderRadius: 1.75,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -1.75,
    marginTop: -1.75,
    zIndex: 4,
  },
  clockHandHour: {
    height: 1.5,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -0.75,
    borderRadius: 1,
    zIndex: 2,
  },
  clockHandMinute: {
    width: 1.5,
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    marginLeft: -0.75,
    borderRadius: 1,
    zIndex: 2,
  },
  clockHandSecond: {
    height: 0.8,
    backgroundColor: '#D1A672', // Champagne Gold
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -0.4,
    transform: [{ rotate: '-40deg' }],
    transformOrigin: 'left center',
    borderRadius: 0.5,
    zIndex: 3,
  },
  // Leica Camera
  cameraChassis: {
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  cameraRedDot: {
    position: 'absolute',
    top: 2,
    right: 2.5,
    width: 3.5,
    height: 3.5,
    borderRadius: 1.75,
    backgroundColor: '#E42828', // Classic Leica ruby dot
    zIndex: 4,
  },
  cameraViewfinder: {
    position: 'absolute',
    top: 2.5,
    left: 3,
    width: 4,
    height: 2,
    borderWidth: 0.8,
    borderRadius: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  cameraDial: {
    position: 'absolute',
    top: -2.5,
    left: 4.5,
    width: 4,
    height: 1.5,
    borderTopLeftRadius: 0.5,
    borderTopRightRadius: 0.5,
  },
  cameraLensOuter: {
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cameraLensInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraLensReflection: {
    position: 'absolute',
    top: 1.5,
    right: 1.5,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#D1A672', // Gold flash reflection
    opacity: 0.75,
  },
  // Heart Parts
  heartPart: {
    position: 'absolute',
  },
  // Vertical Roadmap Tree
  timelineTrack: {
    width: 1.5,
    position: 'absolute',
  },
  timelineBranch: {
    height: 1.0,
    position: 'absolute',
  },
  timelineNode: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    position: 'absolute',
    borderWidth: 0.8,
    borderColor: '#FFFFFF',
    zIndex: 3,
  },
  timelineTag: {
    width: 3.2,
    height: 3.2,
    borderRadius: 0.8,
    backgroundColor: '#D1A672', // Gold flag milestone tag
    position: 'absolute',
    zIndex: 4,
  },
  defaultDot: {
    opacity: 0.8,
  },
});
