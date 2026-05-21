import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { SCREENS } from '../constants/screens';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SuccessScreen from '../screens/SuccessScreen';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF2D6F',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarStyle: {
          height: 76,
          paddingTop: 8,
          paddingBottom: 10,
        },

        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },

        tabBarBadgeStyle: {
          backgroundColor: '#FF2D6F',
          color: '#fff',
          fontSize: 11,
          minWidth: 18,
          height: 18,
          borderRadius: 9,
        },

        tabBarIcon: ({ color }) => {
          let iconName = 'home-outline';

          if (route.name === SCREENS.FAVORITES) iconName = 'heart-outline';
          if (route.name === SCREENS.CART) iconName = 'cart-outline';
          if (route.name === SCREENS.PROFILE) iconName = 'person-outline';

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={StackNavigator} />

      <Tab.Screen
        name={SCREENS.FAVORITES}
        component={FavoritesScreen}
        options={{
          tabBarBadge: favoritesCount > 0 ? favoritesCount : undefined,
        }}
      />

      <Tab.Screen
        name={SCREENS.CART}
        component={CartScreen}
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />

      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />

      <Tab.Screen
        name={SCREENS.CHECKOUT}
        component={CheckoutScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />

      <Tab.Screen
        name={SCREENS.SUCCESS}
        component={SuccessScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />
    </Tab.Navigator>
  );
}