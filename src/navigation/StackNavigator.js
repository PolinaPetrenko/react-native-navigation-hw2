import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../constants/screens';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* Stack handles linear navigation between screens */}
      <Stack.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={SCREENS.PRODUCT_DETAILS}
        component={ProductDetailsScreen}
        options={{
          title: 'Product Details',
          headerTintColor: '#FF2D6F',
        }}
      />

      <Stack.Screen
  name={SCREENS.SUCCESS}
  component={SuccessScreen}
  options={{ headerShown: false }}
/>
    </Stack.Navigator>
  );
}