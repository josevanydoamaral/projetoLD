import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../auth/LoginScreen';
import TabLayout from '../(tabs)/_layout';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={TabLayout} />  {/* O nome da tela é 'MainTabs' */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
