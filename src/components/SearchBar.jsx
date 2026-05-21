import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function SearchBar({
  label,
  icon,
  error,
  rightAction,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.wrapper,
          focused && styles.focused,
          error && styles.errorBorder,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color={focused ? colors.primary : colors.textSecondary}
            style={styles.icon}
          />
        ) : null}

        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {rightAction}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 16,
    height: 56,
  },

  focused: {
    borderColor: colors.primary,
    backgroundColor: '#fff',
  },

  errorBorder: {
    borderColor: '#FF4D67',
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },

  error: {
    marginTop: 6,
    fontSize: 12,
    color: '#FF4D67',
  },
});