import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDispatch } from 'react-redux';

import { colors } from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';
import { addItem } from '../store/cartSlice';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

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
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.deliveryBadge}>
          <Ionicons name="time-outline" size={14} color="#fff" />
          <Text style={styles.deliveryText}>{product.deliveryTime}</Text>
        </View>
      </View>

      <View style={[styles.contentCard, { backgroundColor: cardBg }]}>
        <View style={styles.topRow}>
          <View style={styles.flex}>
            <Text style={[styles.name, { color: textColor }]}>
              {product.name}
            </Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={17} color="#FFB800" />
              <Text style={[styles.ratingText, { color: mutedColor }]}>
                {product.rating} ({product.reviewsCount})
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Description
        </Text>

        <Text style={[styles.description, { color: mutedColor }]}>
          A fresh handmade bouquet created for special moments. Perfect for
          birthdays, romantic surprises, celebrations, and warm everyday gifts.
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="leaf-outline" size={22} color={colors.primary} />
            <Text style={[styles.infoText, { color: mutedColor }]}>Fresh</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="car-outline" size={22} color={colors.primary} />
            <Text style={[styles.infoText, { color: mutedColor }]}>
              Fast delivery
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="gift-outline" size={22} color={colors.primary} />
            <Text style={[styles.infoText, { color: mutedColor }]}>Gift</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View>
            <Text style={[styles.priceLabel, { color: mutedColor }]}>Price</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => dispatch(addItem(product))}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.cartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageWrap: {
    height: 360,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  backButton: {
    position: 'absolute',
    top: 48,
    left: 18,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deliveryBadge: {
    position: 'absolute',
    left: 18,
    bottom: 20,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  deliveryText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },

  contentCard: {
    marginTop: -28,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 22,
    minHeight: 420,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },

  flex: {
    flex: 1,
  },

  name: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  ratingText: {
    fontSize: 15,
    fontWeight: '600',
  },

  heartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE4ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  infoItem: {
    width: '31%',
    borderRadius: 20,
    backgroundColor: '#FFE4ED',
    paddingVertical: 16,
    alignItems: 'center',
  },

  infoText: {
    marginTop: 7,
    fontSize: 12,
    fontWeight: '700',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceLabel: {
    fontSize: 14,
    marginBottom: 4,
  },

  price: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
  },

  cartButton: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});