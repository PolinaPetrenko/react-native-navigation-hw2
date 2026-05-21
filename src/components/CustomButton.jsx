import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../constants/colors';

export default function CustomButton({
  title,
  variant = 'primary',
  size = 'large',
  loading = false,
  fullWidth = true,
  disabled = false,
  leftIcon,
  onPress,
  style,
}) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        size === 'large' ? styles.large : styles.medium,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        isGhost && styles.ghost,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : colors.primary} />
      ) : (
        <View style={styles.row}>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}

          <Text
            style={[
              styles.title,
              isPrimary && styles.primaryText,
              (isSecondary || isGhost) && styles.secondaryText,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
  },
  medium: {
    height: 46,
  },
  primary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.primarySoft,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.55,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: colors.primary,
  },
});