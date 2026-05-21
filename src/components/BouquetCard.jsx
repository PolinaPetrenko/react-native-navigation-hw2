import { Ionicons } from '@expo/vector-icons';
import React, { memo, useContext, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemeContext } from '../context/ThemeContext';

function BouquetCard({ bouquet, item, onPress, onAddToCart, width }) {
  const data = bouquet || item;
  const scale = useRef(new Animated.Value(1)).current;

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  if (!data) return null;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        style={[
          styles.card,
          {
            width,
            backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image source={{ uri: data.imageUrl }} style={styles.image} />

        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={12} color="#fff" />
          <Text style={styles.timeText}>{data.deliveryTime}</Text>
        </View>

        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#666" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>
            {data.name}
          </Text>

          <Text
            style={[styles.rating, { color: isDark ? '#BDBDBD' : '#666' }]}
          >
            ⭐ {data.rating} ({data.reviewsCount})
          </Text>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>${data.price}</Text>

            <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
              <Ionicons name="cart-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default memo(BouquetCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 240,
  },
  timeBadge: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#FF2D6F',
    fontSize: 28,
    fontWeight: '800',
  },
  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FF2D6F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});