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
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { fetchBouquets } from '../api/bouquetsApi';
import BouquetCard from '../components/BouquetCard';
import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { ThemeContext } from '../context/ThemeContext';
import { addItem } from '../store/cartSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [bouquets, setBouquets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { width } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    return width > 700 ? width / 3 - 32 : width / 2 - 24;
  }, [width]);

  const filteredBouquets = useMemo(() => {
    return bouquets.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [bouquets, search]);

  const screenBackground = isDark ? '#111' : colors.background;
  const cardBackground = isDark ? '#1E1E1E' : '#FFE4ED';
  const mainTextColor = isDark ? '#fff' : colors.textPrimary;
  const mutedTextColor = isDark ? '#BDBDBD' : colors.textSecondary;

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
      style={[styles.screen, { backgroundColor: screenBackground }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.brandHeader}>
        <View style={styles.brandLeft}>
          <Ionicons name="flower-outline" size={22} color={colors.primary} />
          <Text style={styles.brandText}>BloomApp</Text>
        </View>
      </View>

      <View style={styles.topHeader}>
        <View>
          <Text style={[styles.hello, { color: mainTextColor }]}>
            Hello, Polina
          </Text>
          <Text style={[styles.subtitle, { color: mutedTextColor }]}>
            What blooms today?
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.profileCircle,
            { backgroundColor: isDark ? '#2A2A2A' : '#FFE4ED' },
          ]}
          onPress={() => navigation.navigate(SCREENS.PROFILE)}
        >
          <Text style={styles.profileLetter}>P</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchBox,
          { backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5' },
        ]}
      >
        <Ionicons name="search-outline" size={20} color="#999" />

        <TextInput
          placeholder="Search bouquets..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={[styles.searchInput, { color: mainTextColor }]}
        />

        <Ionicons name="options-outline" size={22} color={colors.primary} />
      </View>

      <View style={[styles.promoCard, { backgroundColor: cardBackground }]}>
        <Text style={styles.promoLabel}>FEATURED</Text>
        <Text style={[styles.promoTitle, { color: mainTextColor }]}>
          Same-day delivery
        </Text>
        <Text style={[styles.promoText, { color: mutedTextColor }]}>
          Order before 4pm
        </Text>

        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Shop now</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: mainTextColor }]}>
          Popular bouquets
        </Text>
      </View>

      <View style={styles.productsGrid}>
        {filteredBouquets.map((item) => (
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
      ios: 40,
      android: 34,
      default: 24,
    }),
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandHeader: {
    marginBottom: 22,
  },

  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  brandText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  hello: {
    fontSize: 28,
    fontWeight: '800',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '500',
  },

  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileLetter: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },

  searchBox: {
    height: 54,
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 15,
    outlineStyle: 'none',
  },

  promoCard: {
    borderRadius: 26,
    padding: 18,
    marginBottom: 24,
  },

  promoLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
  },

  promoTitle: {
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 4,
  },

  promoText: {
    fontSize: 15,
    marginBottom: 14,
  },

  promoButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  promoButtonText: {
    color: '#fff',
    fontWeight: '800',
  },

  sectionHeader: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
  },

  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 90,
  },

  errorText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '700',
  },
});