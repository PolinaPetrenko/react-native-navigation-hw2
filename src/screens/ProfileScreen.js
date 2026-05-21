import React, { useContext } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { colors } from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
      <Text
        style={[
          styles.title,
          {
            color: isDark ? '#fff' : colors.primary,
          },
        ]}
      >
        Profile
      </Text>

      <View style={styles.switchRow}>
        <Text
          style={[
            styles.label,
            {
              color: isDark ? '#fff' : colors.textPrimary,
            },
          ]}
        >
          {isDark
            ? 'Dark Theme Enabled'
            : 'Enable Dark Theme'}
        </Text>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
        />
      </View>

      <Text
        style={[
          styles.themeText,
          {
            color: isDark ? '#ccc' : colors.textSecondary,
          },
        ]}
      >
        Current theme: {theme}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 30,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 18,
    fontWeight: '600',
  },

  themeText: {
    marginTop: 20,
    fontSize: 16,
  },
});