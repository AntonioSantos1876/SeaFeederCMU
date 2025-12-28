import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { IconButton } from 'react-native-paper';
import { DashboardScreen } from '../screens/DashboardScreen';
import { LogsScreen } from '../screens/LogsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useAppTheme } from '../theme';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 60,
          borderRadius: 30,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          ...Platform.select({
            ios: { shadowColor: 'transparent' },
          }),
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint={theme.glass.tint as any}
            style={[
              StyleSheet.absoluteFill,
              { borderRadius: 30, overflow: 'hidden', borderWidth: 1, borderColor: theme.colors.border }
            ]}
          />
        ),
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="DashboardTab" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <IconButton icon="view-dashboard" iconColor={color} size={26} />
        }}
      />
      <Tab.Screen 
        name="LogsTab" 
        component={LogsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <IconButton icon="history" iconColor={color} size={26} />
        }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <IconButton icon="cog" iconColor={color} size={26} />
        }}
      />
    </Tab.Navigator>
  );
};
