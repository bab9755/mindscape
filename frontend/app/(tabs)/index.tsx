import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, TrendingUp, Target, Heart, Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#0F172A']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Evening</Text>
          <Text style={styles.tagline}>Ready to explore your mind?</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionCard}>
                <LinearGradient
                  colors={['#8B5CF6', '#7C3AED']}
                  style={styles.actionGradient}>
                  <Sparkles size={24} color="white" />
                  <Text style={styles.actionText}>Start Recording</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <LinearGradient
                  colors={['#06B6D4', '#0891B2']}
                  style={styles.actionGradient}>
                  <Calendar size={24} color="white" />
                  <Text style={styles.actionText}>Schedule Reflection</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>Morning Thoughts</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <Text style={styles.activityPreview}>
                "I've been thinking about the importance of mindfulness..."
              </Text>
              <View style={styles.activityTags}>
                <View style={[styles.tag, { backgroundColor: '#8B5CF620' }]}>
                  <Text style={styles.tagText}>Mindfulness</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: '#06B6D420' }]}>
                  <Text style={styles.tagText}>Growth</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Insights Preview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Insights</Text>
            <View style={styles.insightsGrid}>
              <View style={styles.insightCard}>
                <TrendingUp size={20} color="#8B5CF6" />
                <Text style={styles.insightValue}>7</Text>
                <Text style={styles.insightLabel}>Entries This Week</Text>
              </View>
              <View style={styles.insightCard}>
                <Target size={20} color="#06B6D4" />
                <Text style={styles.insightValue}>3</Text>
                <Text style={styles.insightLabel}>Goals Tracked</Text>
              </View>
              <View style={styles.insightCard}>
                <Heart size={20} color="#EF4444" />
                <Text style={styles.insightValue}>85%</Text>
                <Text style={styles.insightLabel}>Positive Sentiment</Text>
              </View>
            </View>
          </View>

          {/* Suggested Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suggested for You</Text>
            <TouchableOpacity style={styles.suggestionCard}>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Evening Reflection</Text>
                <Text style={styles.suggestionSubtitle}>
                  Based on your morning entry, consider reflecting on your day
                </Text>
              </View>
              <View style={styles.suggestionIcon}>
                <Sparkles size={20} color="#8B5CF6" />
              </View>
            </TouchableOpacity>
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
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '400',
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
  quickActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionCard: {
    flex: 1,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  activityPreview: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 15,
    lineHeight: 20,
  },
  activityTags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  insightsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  insightCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  insightValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
  },
  insightLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  suggestionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
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
  suggestionSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  suggestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF610',
    justifyContent: 'center',
    alignItems: 'center',
  },
});