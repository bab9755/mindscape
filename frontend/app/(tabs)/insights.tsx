import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Brain, Heart, Target, BookOpen, Calendar, Lightbulb } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#0F172A']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mind Insights</Text>
          <Text style={styles.subtitle}>Discover patterns in your thoughts</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Weekly Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Week's Summary</Text>
            <View style={styles.summaryCard}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.summaryGradient}>
                <View style={styles.summaryContent}>
                  <View style={styles.summaryStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>7</Text>
                      <Text style={styles.statLabel}>Entries</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>24m</Text>
                      <Text style={styles.statLabel}>Total Time</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>85%</Text>
                      <Text style={styles.statLabel}>Positive</Text>
                    </View>
                  </View>
                  <Text style={styles.summaryText}>
                    You've been particularly focused on mindfulness and personal growth this week.
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Key Themes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Themes</Text>
            <View style={styles.themesGrid}>
              <View style={styles.themeCard}>
                <Brain size={24} color="#8B5CF6" />
                <Text style={styles.themeTitle}>Mindfulness</Text>
                <Text style={styles.themeCount}>5 mentions</Text>
              </View>
              <View style={styles.themeCard}>
                <Target size={24} color="#06B6D4" />
                <Text style={styles.themeTitle}>Goals</Text>
                <Text style={styles.themeCount}>3 mentions</Text>
              </View>
              <View style={styles.themeCard}>
                <Heart size={24} color="#EF4444" />
                <Text style={styles.themeTitle}>Relationships</Text>
                <Text style={styles.themeCount}>4 mentions</Text>
              </View>
              <View style={styles.themeCard}>
                <BookOpen size={24} color="#10B981" />
                <Text style={styles.themeTitle}>Learning</Text>
                <Text style={styles.themeCount}>2 mentions</Text>
              </View>
            </View>
          </View>

          {/* Emotional Patterns */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emotional Patterns</Text>
            <View style={styles.emotionCard}>
              <View style={styles.emotionHeader}>
                <TrendingUp size={20} color="#10B981" />
                <Text style={styles.emotionTitle}>Trending Positive</Text>
              </View>
              <Text style={styles.emotionDescription}>
                Your emotional tone has been consistently positive, with peaks during morning reflections.
              </Text>
              <View style={styles.emotionChart}>
                <View style={[styles.chartBar, { height: 30, backgroundColor: '#10B981' }]} />
                <View style={[styles.chartBar, { height: 45, backgroundColor: '#10B981' }]} />
                <View style={[styles.chartBar, { height: 55, backgroundColor: '#10B981' }]} />
                <View style={[styles.chartBar, { height: 40, backgroundColor: '#10B981' }]} />
                <View style={[styles.chartBar, { height: 60, backgroundColor: '#10B981' }]} />
                <View style={[styles.chartBar, { height: 50, backgroundColor: '#10B981' }]} />
                <View style={[styles.chartBar, { height: 65, backgroundColor: '#10B981' }]} />
              </View>
            </View>
          </View>

          {/* Personalized Suggestions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personalized Suggestions</Text>
            
            <TouchableOpacity style={styles.suggestionCard}>
              <View style={styles.suggestionIcon}>
                <Lightbulb size={24} color="#F59E0B" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Morning Meditation</Text>
                <Text style={styles.suggestionDescription}>
                  Based on your positive morning reflections, try a 10-minute meditation routine.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.suggestionCard}>
              <View style={styles.suggestionIcon}>
                <BookOpen size={24} color="#8B5CF6" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Reading Recommendation</Text>
                <Text style={styles.suggestionDescription}>
                  "The Power of Now" by Eckhart Tolle - matches your mindfulness themes.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.suggestionCard}>
              <View style={styles.suggestionIcon}>
                <Calendar size={24} color="#06B6D4" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Evening Reflection</Text>
                <Text style={styles.suggestionDescription}>
                  Schedule a 5-minute reflection every evening to maintain consistency.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Habit Tracker */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habit Progress</Text>
            <View style={styles.habitCard}>
              <View style={styles.habitHeader}>
                <Text style={styles.habitTitle}>Daily Journaling</Text>
                <Text style={styles.habitStreak}>5 day streak</Text>
              </View>
              <View style={styles.habitProgress}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '71%' }]} />
                </View>
                <Text style={styles.progressText}>5/7 days this week</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 20,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#E2E8F0',
    marginTop: 2,
  },
  summaryText: {
    fontSize: 14,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 20,
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  themeCard: {
    width: (width - 55) / 2,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
  },
  themeCount: {
    fontSize: 12,
    color: '#94A3B8',
  },
  emotionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  emotionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
  emotionDescription: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 15,
  },
  emotionChart: {
    flexDirection: 'row',
    alignItems: 'end',
    gap: 8,
    height: 80,
  },
  chartBar: {
    flex: 1,
    borderRadius: 4,
  },
  suggestionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },
  suggestionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 5,
  },
  suggestionDescription: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  habitCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  habitStreak: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  habitProgress: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});