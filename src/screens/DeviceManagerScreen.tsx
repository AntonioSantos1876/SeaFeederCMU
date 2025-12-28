import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, FAB, Card, Badge, ActivityIndicator, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Devices, Device } from '../services/DatabaseService';
import { ConnectivityManager } from '../services/ConnectivityManager';

export const DeviceManagerScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDevices = async () => {
    setLoading(true);
    const list = await Devices.getAll();
    setDevices(list);
    setLoading(false);
  };

  useEffect(() => {
    loadDevices();
    // Subscribe to focus to reload list when coming back from Setup
    const unsubscribe = navigation.addListener('focus', loadDevices);
    return unsubscribe;
  }, [navigation]);

  const onDevicePress = (device: Device) => {
    navigation.navigate('FishProfile', { deviceId: device.id });
  };

  const onAddPress = () => {
    navigation.navigate('SetupWizard');
  };

  const renderItem = ({ item }: { item: Device }) => (
    <Card style={styles.card} onPress={() => onDevicePress(item)}>
      <Card.Content style={styles.cardContent}>
        <View>
          <Text variant="titleMedium" style={styles.deviceName}>{item.name}</Text>
          <Text variant="bodySmall" style={styles.deviceDetail}>
            {item.species} • {item.fish_count} fish
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Badge size={10} style={{ backgroundColor: item.connection_status === 'OFFLINE' ? 'gray' : '#4ade80' }} />
          <Text variant="labelSmall" style={styles.statusText}>{item.connection_status}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>My Feeders</Text>
      </View>

      {devices.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text variant="bodyLarge" style={styles.emptyText}>No devices connected.</Text>
          <Text variant="bodyMedium" style={{ color: '#94a3b8' }}>Tap + to pair a new feeder.</Text>
        </View>
      ) : (
        <FlatList
          data={devices}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={loadDevices} />}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={onAddPress}
        label="Add Device"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceName: {
    fontWeight: 'bold',
    color: '#334155',
  },
  deviceDetail: {
    color: '#64748b',
    marginTop: 4,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    color: '#64748b',
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#0ea5e9', // Sky blue
  },
});
