import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SCREENS } from '../constants/screens';
import SupportScreen from '../screens/SupportScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: '#FF2D6F',
        drawerActiveTintColor: '#FF2D6F',
        drawerInactiveTintColor: '#6B7280',
      }}
    >
      <Drawer.Screen
        name={SCREENS.MAIN_TABS}
        component={TabNavigator}
        options={{
          title: 'BloomApp',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="flower-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name={SCREENS.SUPPORT}
        component={SupportScreen}
        options={{
          title: 'Support',
          drawerItemStyle: { display: 'none' },
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
}