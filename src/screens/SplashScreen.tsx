import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      navigation.replace('DeviceManager');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SeaFeeder CMU</Text>
        <Text style={styles.subtitle}>Automated Feed Control</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by CMU final year students</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark Navy
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#38bdf8', // Light Blue
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  footer: {
    padding: 20,
    marginBottom: 20,
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
});
