import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function BouquetCard({ bouquet, width, onPress, onAddToCart }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, width ? { width } : null]}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: bouquet.imageUrl }} style={styles.image} />

        <TouchableOpacity
          style={styles.heart}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? colors.primary : colors.textPrimary}
          />
        </TouchableOpacity>

        <View style={styles.delivery}>
          <Ionicons name="time-outline" size={12} color="#fff" />
          <Text style={styles.deliveryText}>{bouquet.deliveryTime}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {bouquet.name}
        </Text>

        <View style={styles.row}>
          <Ionicons name="star" size={12} color="#FFB800" />
          <Text style={styles.rating}>
            {bouquet.rating} ({bouquet.reviewsCount})
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${bouquet.price}</Text>

          <TouchableOpacity style={styles.plus} onPress={onAddToCart}>
            <Ionicons name="cart-outline" size={17} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.secondary,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delivery: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  deliveryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  plus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});