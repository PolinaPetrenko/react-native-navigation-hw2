import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSelector } from 'react-redux';

import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { ThemeContext } from '../context/ThemeContext';

export default function CheckoutScreen({ navigation }) {
  const cart = useSelector((state) => state.cart);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [promoCode, setPromoCode] = useState('');

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const delivery = 0;
  const discount = promoCode.toLowerCase() === 'bloom10' ? 10 : 0;
  const total = Math.max(subtotal + delivery - discount, 0);

  const cardBg = isDark ? '#1E1E1E' : '#fff';
  const textColor = isDark ? '#fff' : colors.textPrimary;
  const mutedColor = isDark ? '#BDBDBD' : colors.textSecondary;

  const handlePlaceOrder = () => {
    navigation.navigate(SCREENS.SUCCESS);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#111' : colors.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Checkout</Text>

      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.rowTop}>
          <View style={styles.iconCircle}>
            <Ionicons name="location-outline" size={22} color={colors.primary} />
          </View>

          <View style={styles.flex}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Delivery address
            </Text>
            <Text style={[styles.cardText, { color: mutedColor }]}>
              Wroclaw, Poland
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.rowTop}>
          <View style={styles.iconCircle}>
            <Ionicons name="card-outline" size={22} color={colors.primary} />
          </View>

          <View style={styles.flex}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Payment method
            </Text>
            <Text style={[styles.cardText, { color: mutedColor }]}>
              Card ending •••• 3202
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textColor }]}>Promo code</Text>

        <View
          style={[
            styles.promoBox,
            { backgroundColor: isDark ? '#111' : '#F7F7F7' },
          ]}
        >
          <TextInput
            value={promoCode}
            onChangeText={setPromoCode}
            placeholder="Try BLOOM10"
            placeholderTextColor="#999"
            style={[styles.input, { color: textColor }]}
          />

          <Text style={styles.applyText}>Apply</Text>
        </View>

        {discount > 0 && (
          <Text style={styles.discountText}>Promo applied: -$10.00</Text>
        )}
      </View>

      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textColor }]}>
          Order summary
        </Text>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: mutedColor }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: textColor }]}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: mutedColor }]}>
            Delivery
          </Text>
          <Text style={[styles.summaryValue, { color: textColor }]}>
            Free
          </Text>
        </View>

        {discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: mutedColor }]}>
              Discount
            </Text>
            <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={[styles.totalLabel, { color: textColor }]}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>
          Place order • ${total.toFixed(2)}
        </Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },

  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },

  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFE4ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  flex: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },

  cardText: {
    fontSize: 14,
  },

  promoBox: {
    height: 52,
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
    outlineStyle: 'none',
  },

  applyText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },

  discountText: {
    marginTop: 10,
    color: '#34C759',
    fontSize: 14,
    fontWeight: '700',
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

  discountValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#34C759',
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

  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 100,

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