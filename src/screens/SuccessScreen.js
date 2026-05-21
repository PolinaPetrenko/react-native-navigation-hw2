import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { ThemeContext } from '../context/ThemeContext';

export default function SuccessScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#111' : colors.background,
        },
      ]}
    >
      <View style={styles.iconCircle}>
        <Ionicons
          name="checkmark"
          size={48}
          color={colors.primary}
        />
      </View>

      <Text
        style={[
          styles.title,
          { color: isDark ? '#fff' : colors.textPrimary },
        ]}
      >
        Order confirmed 🌸
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: isDark
              ? '#BDBDBD'
              : colors.textSecondary,
          },
        ]}
      >
        Thank you for your purchase.{'\n'}
        Your bouquet is being prepared.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(SCREENS.HOME)
        }
      >
        <Text style={styles.buttonText}>
          Continue shopping
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFE4ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 34,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 18,
    minWidth: 260,
    alignItems: 'center',

    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
});