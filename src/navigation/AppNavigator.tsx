import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { DeviceManagerScreen } from '../screens/DeviceManagerScreen';
import { SetupWizardScreen } from '../screens/SetupWizardScreen';
import { FishProfileScreen } from '../screens/FishProfileScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DeviceManager" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0a0a0a' } }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="DeviceManager" component={DeviceManagerScreen} />
      <Stack.Screen name="SetupWizard" component={SetupWizardScreen} />
      <Stack.Screen name="FishProfile" component={FishProfileScreen} />
      <Stack.Screen name="Dashboard" component={TabNavigator} />
    </Stack.Navigator>
  );
};
