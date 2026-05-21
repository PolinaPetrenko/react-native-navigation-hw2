import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import StackNavigator from './StackNavigator';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { SCREENS } from '../constants/screens';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF2D6F',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';

          if (route.name === SCREENS.CART) iconName = 'cart-outline';
          if (route.name === SCREENS.PROFILE) iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={StackNavigator} />
      <Tab.Screen name={SCREENS.CART} component={CartScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}