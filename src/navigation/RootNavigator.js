import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../constants/screens';
import SupportScreen from '../screens/SupportScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.MAIN_TABS} component={TabNavigator} />
      <Stack.Screen name={SCREENS.SUPPORT} component={SupportScreen} />
    </Stack.Navigator>
  );
}