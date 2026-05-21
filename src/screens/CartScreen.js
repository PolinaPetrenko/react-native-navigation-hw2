import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useMemo } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { ThemeContext } from '../context/ThemeContext';
import { removeItem, updateQuantity } from '../store/cartSlice';

export default function CartScreen({ navigation }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const delivery = 0;
  const total = subtotal + delivery;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const textColor = isDark ? '#fff' : colors.textPrimary;
  const mutedColor = isDark ? '#BDBDBD' : colors.textSecondary;
  const cardBg = isDark ? '#1E1E1E' : '#fff';

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#111' : colors.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Your cart</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyBox}>
          <View style={styles.emptyIcon}>
            <Ionicons name="cart-outline" size={36} color={colors.primary} />
          </View>

          <Text style={[styles.emptyTitle, { color: textColor }]}>
            Your cart is empty
          </Text>

          <Text style={[styles.emptyText, { color: mutedColor }]}>
            Add beautiful bouquets and come back here.
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate(SCREENS.HOME)}
          >
            <Text style={styles.shopButtonText}>Start shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={[styles.count, { color: mutedColor }]}>
            {cartCount} item{cartCount > 1 ? 's' : ''}
          </Text>

          {cart.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: cardBg }]}>
              <Image
                source={{ uri: item.image_url || item.imageUrl }}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text numberOfLines={1} style={[styles.name, { color: textColor }]}>
                  {item.name}
                </Text>

                <Text style={[styles.details, { color: mutedColor }]}>
                  ${item.price} × {item.quantity}
                </Text>

                <View style={styles.controls}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                  >
                    <Text style={styles.qtyText}>−</Text>
                  </TouchableOpacity>

                  <Text style={[styles.qtyNumber, { color: textColor }]}>
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.rightSide}>
                <Text style={styles.linePrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>

                <TouchableOpacity
                  style={styles.trashButton}
                  onPress={() => dispatch(removeItem(item.id))}
                >
                  <Ionicons name="trash-outline" size={19} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={[styles.summaryCard, { backgroundColor: cardBg }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: mutedColor }]}>Subtotal</Text>
              <Text style={[styles.summaryValue, { color: textColor }]}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: mutedColor }]}>Delivery</Text>
              <Text style={[styles.summaryValue, { color: textColor }]}>Free</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: textColor }]}>Total</Text>
              <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate(SCREENS.CHECKOUT)}
          >
            <Text style={styles.checkoutText}>
              Go to checkout • ${total.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 6,
  },

  count: {
    fontSize: 15,
    marginBottom: 18,
  },

  card: {
    borderRadius: 24,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  image: {
    width: 86,
    height: 86,
    borderRadius: 18,
    backgroundColor: '#FFE4ED',
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },

  details: {
    fontSize: 14,
    marginBottom: 12,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE4ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '800',
  },

  qtyNumber: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '800',
  },

  rightSide: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 78,
  },

  linePrice: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },

  trashButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryCard: {
    borderRadius: 24,
    padding: 20,
    marginTop: 8,
    marginBottom: 18,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  summaryLabel: {
    fontSize: 15,
  },

  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: 8,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: '800',
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },

  checkoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 100,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },

  checkoutText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },

  emptyBox: {
    alignItems: 'center',
    paddingTop: 90,
  },

  emptyIcon: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFE4ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },

  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 20,
  },

  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});