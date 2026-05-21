import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { fetchBouquets } from '../api/bouquetsApi';
import BouquetCard from '../components/BouquetCard';
import QuantityStepper from '../components/QuantityStepper';
import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { ThemeContext } from '../context/ThemeContext';
import { addItem } from '../store/cartSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [bouquets, setBouquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { width } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    return width > 700 ? width / 3 - 32 : width / 2 - 24;
  }, [width]);

  const screenBackground = isDark ? '#111' : colors.background;
  const mainTextColor = isDark ? '#fff' : colors.textPrimary;

  useEffect(() => {
    const loadBouquets = async () => {
      try {
        const data = await fetchBouquets();
        setBouquets(data);
      } catch (err) {
        setError('Failed to load bouquets');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadBouquets();
  }, []);

  const handleOpenDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const handleOpenDetails = useCallback(
    (item) => {
      navigation.navigate(SCREENS.PRODUCT_DETAILS, {
        product: item,
      });
    },
    [navigation]
  );

  const handleAddToCart = useCallback(
    (item) => {
      dispatch(addItem(item));
    },
    [dispatch]
  );

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: screenBackground }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: mainTextColor }}>Loading bouquets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: screenBackground }]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.screen,
        { backgroundColor: screenBackground },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.logo,
            { color: isDark ? '#fff' : colors.primary },
          ]}
        >
          BloomApp
        </Text>

        <Ionicons
          name="menu"
          size={28}
          color={colors.primary}
          onPress={handleOpenDrawer}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            { color: mainTextColor },
          ]}
        >
          Popular bouquets
        </Text>

        <QuantityStepper value={1} onChange={() => {}} />
      </View>

      <View style={styles.productsGrid}>
        {bouquets.map((item) => (
          <BouquetCard
            key={item.id || item.name}
            bouquet={item}
            width={cardWidth}
            onPress={() => handleOpenDetails(item)}
            onAddToCart={() => handleAddToCart(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.select({
      ios: 60,
      android: 40,
      default: 30,
    }),
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    fontSize: 30,
    fontWeight: '800',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
  },

  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },

  errorText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '700',
  },
});