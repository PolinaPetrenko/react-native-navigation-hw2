import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './DrawerNavigator';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      {/* Root navigator connects Drawer, Tabs and Stack navigation */}
      <DrawerNavigator />
    </NavigationContainer>
  );
}