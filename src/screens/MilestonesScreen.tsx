import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { COLORS } from '../theme/theme';
import { MILESTONES, Milestone } from '../data/data';
import { SvgIcon } from '../components/SvgIcons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function MilestonesScreen(): React.JSX.Element {
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMilestones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMilestoneItem = ({ item, index }: { item: Milestone; index: number }) => {
    const isLast = index === MILESTONES.length - 1;
    const isExpanded = !!expandedMilestones[item.id];

    return (
      <View style={styles.milestoneRow}>
        {/* Fine gold-colored timeline path */}
        <View style={styles.timelineColumn}>
          <View style={styles.iconCircle}>
            <SvgIcon name={item.iconName} size={18} color={COLORS.secondary} />
          </View>
          {!isLast && <View style={styles.verticalLine} />}
        </View>

        {/* Clean paper card detailing milestones */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleExpand(item.id)}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardDate}>{item.date}</Text>
            {/* Minimalist expansion indicator +/- */}
            <Text style={styles.expandIndicator}>{isExpanded ? '−' : '+'}</Text>
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text
            style={styles.cardDesc}
            numberOfLines={isExpanded ? undefined : 1}
          >
            {item.description}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Milestones</Text>
      <Text style={styles.subHeader}>A timeline of our meaningful milestones</Text>

      <FlatList
        data={MILESTONES}
        renderItem={renderMilestoneItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  listContent: {
    paddingTop: 10,
    paddingBottom: 110,
  },
  milestoneRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineColumn: {
    alignItems: 'center',
    marginRight: 16,
    width: 44,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: 'rgba(209, 166, 114, 0.45)', // Champagne gold border
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
    zIndex: 2,
  },
  verticalLine: {
    width: 1.5,
    backgroundColor: 'rgba(209, 166, 114, 0.25)', // Elegant champagne line
    position: 'absolute',
    top: 44,
    bottom: -24,
    zIndex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(195, 141, 130, 0.12)',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  expandIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
    paddingRight: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
    fontWeight: '300',
    marginTop: 4,
  },
});
