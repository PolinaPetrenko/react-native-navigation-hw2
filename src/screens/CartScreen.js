import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { colors } from '../constants/colors';
import { removeItem } from '../store/cartSlice';

export default function CartScreen() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.details}>
                ${item.price} × {item.quantity}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(removeItem(item.id))}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 24,
  },

  empty: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  details: {
    marginTop: 6,
    color: colors.textSecondary,
  },

  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});