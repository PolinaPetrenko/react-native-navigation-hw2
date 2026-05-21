import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import BouquetCard from '../components/BouquetCard';
import QuantityStepper from '../components/QuantityStepper';
import { colors } from '../constants/colors';
import { SCREENS } from '../constants/screens';
import { fetchBouquets } from '../api/bouquetsApi';

export default function HomeScreen({ navigation }) {
  const [bouquets, setBouquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { width } = useWindowDimensions();

  const cardWidth = width > 700 ? width / 3 - 32 : width / 2 - 24;

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Loading bouquets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>BloomApp</Text>

        <Ionicons
          name="menu"
          size={28}
          color={colors.primary}
          onPress={() => navigation.openDrawer()}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular bouquets</Text>
        <QuantityStepper value={1} onChange={() => {}} />
      </View>

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
            onAddToCart={() => console.log('Add:', item.name)}
          />
        ))}
      </View>
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
    color: colors.primary,
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
    color: colors.textPrimary,
  },

  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});