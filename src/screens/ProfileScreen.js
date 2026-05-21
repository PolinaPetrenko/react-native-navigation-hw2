import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const cardBg = isDark ? '#1E1E1E' : '#fff';
  const softBg = isDark ? '#1B1B1B' : '#FFEAF2';
  const textColor = isDark ? '#fff' : colors.textPrimary;
  const mutedColor = isDark ? '#BDBDBD' : colors.textSecondary;
  const dividerColor = isDark ? '#333' : '#F1F1F1';

  const openSupport = () => {
    navigation.getParent()?.navigate(SCREENS.SUPPORT);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? '#111' : colors.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: isDark ? '#fff' : colors.primary }]}>
        Profile
      </Text>

      <View style={[styles.profileCard, { backgroundColor: softBg }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>P</Text>
        </View>

        <Text style={[styles.name, { color: textColor }]}>Polina</Text>
        <Text style={[styles.email, { color: mutedColor }]}>Bloom lover 🌸</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: cardBg }]}>
          <Text style={styles.statValue}>12</Text>
          <Text style={[styles.statLabel, { color: mutedColor }]}>Favorites</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: cardBg }]}>
          <Text style={styles.statValue}>3</Text>
          <Text style={[styles.statLabel, { color: mutedColor }]}>Orders</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: cardBg }]}>
          <Text style={styles.statValue}>2</Text>
          <Text style={[styles.statLabel, { color: mutedColor }]}>Address</Text>
        </View>
      </View>

      <View style={[styles.orderCard, { backgroundColor: softBg }]}>
        <View>
          <Text style={styles.orderLabel}>Current order</Text>

          <Text style={[styles.orderTitle, { color: textColor }]}>
            Preparing bouquet 🌸
          </Text>

          <Text style={[styles.orderEta, { color: mutedColor }]}>ETA 35 min</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </View>

      <View style={[styles.actionsCard, { backgroundColor: cardBg }]}>
        <TouchableOpacity
          style={[styles.actionItem, { borderBottomColor: dividerColor }]}
          onPress={() => navigation.navigate(SCREENS.FAVORITES)}
        >
          <Ionicons name="heart-outline" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: textColor }]}>
            My favorites
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionItem, { borderBottomColor: dividerColor }]}
          onPress={() => navigation.navigate(SCREENS.CART)}
        >
          <Ionicons name="receipt-outline" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: textColor }]}>
            Order history
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionItem, { borderBottomColor: dividerColor }]}
        >
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: textColor }]}>
            Saved addresses
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={openSupport}>
          <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: textColor }]}>Support</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={[styles.themeCard, { backgroundColor: cardBg }]}>
        <Text style={[styles.label, { color: textColor }]}>Dark theme</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.signOutButton}>
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 24,
  },

  profileCard: {
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },

  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
  },

  email: {
    marginTop: 6,
    fontSize: 14,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
  },

  orderCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
    textTransform: 'uppercase',
  },

  orderTitle: {
    fontSize: 18,
    fontWeight: '800',
  },

  orderEta: {
    marginTop: 4,
    fontSize: 14,
  },

  actionsCard: {
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
  },

  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
  },

  actionText: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '700',
  },

  themeCard: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 17,
    fontWeight: '600',
  },

  signOutButton: {
    backgroundColor: '#FFECEC',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  signOutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '800',
  },
});