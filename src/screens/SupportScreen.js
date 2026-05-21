import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

export default function SupportScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#111' : colors.background },
      ]}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="help-circle-outline" size={46} color={colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.primary }]}>
          Support
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: isDark ? '#BDBDBD' : colors.textSecondary },
          ]}
        >
          Need help? Contact BloomApp support.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFE4ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },

  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFE4ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 26,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    paddingHorizontal: 28,
    paddingVertical: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});