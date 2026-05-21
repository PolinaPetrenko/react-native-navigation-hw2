import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => value > min && onChange(value - 1)}
      >
        <Ionicons
          name="remove"
          size={18}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      <Text style={styles.value}>
        {value}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => value < max && onChange(value + 1)}
      >
        <Ionicons
          name="add"
          size={18}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 999,
    padding: 4,
  },

  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  value: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});