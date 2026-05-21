import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { fetchBouquets } from '../api/bouquetsApi';
import BouquetCard from '../components/BouquetCard';
import CustomButton from '../components/CustomButton';
import QuantityStepper from '../components/QuantityStepper';
import SearchBar from '../components/SearchBar';
import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';

const categories = ['Birthday', 'Romance', 'Wedding', 'Luxury', 'Spring'];

export default function HomeScreen({ navigation }) {
  const [quantity, setQuantity] = useState(1);
  const [bouquets, setBouquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { width } = useWindowDimensions();
  const cardWidth = width > 700 ? width / 3 - 32 : width / 2 - 24;

  // Load bouquets from public REST API
  useEffect(() => {
    fetchBouquets()
      .then((data) => {
        setBouquets(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>Bloom.</Text>
          <Text style={styles.subtitle}>Premium flower delivery</Text>
        </View>

        <Pressable
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>

      <SearchBar
        icon="search-outline"
        placeholder="Search bouquets..."
        label="Find your bouquet"
      />

      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>Fresh flowers</Text>
          <Text style={styles.bannerText}>Delivery today with love</Text>

          <CustomButton
            title="Shop now"
            size="medium"
            fullWidth={false}
            style={styles.bannerButton}
            leftIcon={<Ionicons name="cart-outline" size={18} color="#fff" />}
          />
        </View>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800',
          }}
          style={styles.bannerImage}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item}</Text>
          </View>
        )}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular bouquets</Text>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </View>

      {loading ? (
        <View style={styles.centerBlock}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.statusText}>Loading bouquets...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerBlock}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.productsGrid}>
          {bouquets.map((item) => (
            <BouquetCard
              key={item.id}
              bouquet={item}
              width={cardWidth}
              onPress={() =>
                navigation.navigate(SCREENS.PRODUCT_DETAILS, {
                  product: item,
                })
              }
              onAddToCart={() => console.log('Add to cart:', item.name)}
            />
          ))}
        </View>
      )}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: Platform.select({
      ios: 60,
      android: 40,
      default: 30,
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  banner: {
    backgroundColor: colors.secondary,
    borderRadius: 28,
    padding: 20,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  bannerText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 16,
  },
  bannerButton: {
    width: 130,
  },
  bannerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  categoriesList: {
    gap: 10,
    marginBottom: 28,
  },
  categoryItem: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  centerBlock: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  statusText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '700',
  },
  bottomSpace: {
    height: 40,
  },
});