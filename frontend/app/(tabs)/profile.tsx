import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, Moon, Volume2, Calendar } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Optionally, you can add feedback or navigation here
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#0F172A']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                style={styles.avatar}>
                <User size={40} color="white" />
              </LinearGradient>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Sarah Chen</Text>
              <Text style={styles.email}>sarah.chen@email.com</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Stats Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Journey</Text>
            <View style={styles.statsCard}>
              <View style={styles.statRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>42</Text>
                  <Text style={styles.statLabel}>Total Entries</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>2h 15m</Text>
                  <Text style={styles.statLabel}>Total Time</Text>
                </View>
              </View>
              <View style={styles.statRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>15</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>7</Text>
                  <Text style={styles.statLabel}>Insights</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Bell size={20} color="#8B5CF6" />
                  <Text style={styles.settingLabel}>Notifications</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#374151', true: '#8B5CF6' }}
                  thumbColor={notificationsEnabled ? '#ffffff' : '#9CA3AF'}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Moon size={20} color="#8B5CF6" />
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: '#374151', true: '#8B5CF6' }}
                  thumbColor={darkModeEnabled ? '#ffffff' : '#9CA3AF'}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Volume2 size={20} color="#8B5CF6" />
                  <Text style={styles.settingLabel}>Sound Effects</Text>
                </View>
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  trackColor={{ false: '#374151', true: '#8B5CF6' }}
                  thumbColor={soundEnabled ? '#ffffff' : '#9CA3AF'}
                />
              </View>
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionLeft}>
                <Calendar size={20} color="#06B6D4" />
                <Text style={styles.optionLabel}>Reminder Schedule</Text>
              </View>
              <Text style={styles.optionValue}>Daily at 9:00 AM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionLeft}>
                <Settings size={20} color="#06B6D4" />
                <Text style={styles.optionLabel}>Recording Quality</Text>
              </View>
              <Text style={styles.optionValue}>High</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionCard}>
              <View style={styles.optionLeft}>
                <Shield size={20} color="#06B6D4" />
                <Text style={styles.optionLabel}>Privacy Settings</Text>
              </View>
              <Text style={styles.optionValue}>Secure</Text>
            </TouchableOpacity>
          </View>

          {/* Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            
            <TouchableOpacity style={styles.supportCard}>
              <HelpCircle size={20} color="#10B981" />
              <Text style={styles.supportLabel}>Help & FAQ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportCard}>
              <Settings size={20} color="#10B981" />
              <Text style={styles.supportLabel}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          {/* Premium Upgrade */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.premiumCard}>
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.premiumGradient}>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumSubtitle}>
                  Unlock unlimited recordings, advanced insights, and personalized recommendations
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Text style={styles.signOutText}>Sign Out</Text>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#94A3B8',
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
  statsCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  settingsCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
  },
  optionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
  },
  optionValue: {
    fontSize: 14,
    color: '#94A3B8',
  },
  supportCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  supportLabel: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
  },
  premiumCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  premiumGradient: {
    padding: 20,
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#FEF3C7',
    textAlign: 'center',
    lineHeight: 20,
  },
  signOutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});