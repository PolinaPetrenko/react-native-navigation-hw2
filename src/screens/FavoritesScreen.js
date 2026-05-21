import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { fetchBouquets } from '../api/bouquetsApi';
import BouquetCard from '../components/BouquetCard';
import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { ThemeContext } from '../context/ThemeContext';
import { addItem } from '../store/cartSlice';

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [bouquets, setBouquets] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();
  const cardWidth = width > 700 ? width / 3 - 32 : width / 2 - 24;

  useEffect(() => {
    const loadBouquets = async () => {
      try {
        const data = await fetchBouquets();
        setBouquets(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadBouquets();
  }, []);

  const favorites = useMemo(() => {
    return bouquets.filter((item) =>
      favoriteIds.includes(String(item.id || item.name))
    );
  }, [bouquets, favoriteIds]);

  if (loading) {
    return (
      <View
        style={[
          styles.center,
          { backgroundColor: isDark ? '#111' : colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: isDark ? '#fff' : colors.textPrimary }}>
          Loading favorites...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#111' : colors.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Favorites</Text>

      {favorites.length === 0 ? (
        <Text
          style={[
            styles.empty,
            { color: isDark ? '#BDBDBD' : colors.textSecondary },
          ]}
        >
          No favorite bouquets yet 💔
        </Text>
      ) : (
        <View style={styles.grid}>
          {favorites.map((item) => (
            <BouquetCard
              key={item.id || item.name}
              bouquet={item}
              width={cardWidth}
              onPress={() =>
                navigation.navigate(SCREENS.PRODUCT_DETAILS, {
                  product: item,
                })
              }
              onAddToCart={() => dispatch(addItem(item))}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 20,
  },

  empty: {
    fontSize: 16,
    marginTop: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 90,
  },
});