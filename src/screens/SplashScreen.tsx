import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../theme';
import { CMUFooter } from '../components/CMUFooter';

export const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('DeviceManager');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>SeaFeeder CMU</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Automated Marine Feeding Control</Text>
      </View>
      <CMUFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});
