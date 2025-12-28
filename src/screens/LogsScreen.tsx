import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Chip, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_LOGS = [
  { id: '1', time: '10:00 AM', type: 'FEED', message: 'Dispensed 625g', status: 'SUCCESS' },
  { id: '2', time: '09:30 AM', type: 'SENSOR', message: 'Temp: 14.5°C, DO: 8.2mg/L', status: 'INFO' },
  { id: '3', time: '08:00 AM', type: 'ALARM', message: 'Motor Jam Detected', status: 'ERROR' },
  { id: '4', time: '06:00 AM', type: 'FEED', message: 'Dispensed 625g', status: 'SUCCESS' },
  { id: '5', time: '05:55 AM', type: 'SYS', message: 'Device Online (WiFi)', status: 'INFO' },
];

export const LogsScreen = () => {
  const [query, setQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return '#dcfce7'; // green
      case 'ERROR': return '#fee2e2'; // red
      default: return '#f1f5f9'; // gray
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return '#166534';
      case 'ERROR': return '#991b1b';
      default: return '#475569';
    }
  };

  const renderItem = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Content style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>{item.type} • {item.time}</Text>
          <Text variant="bodyMedium">{item.message}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={{ color: getStatusTextColor(item.status), fontSize: 10, fontWeight: 'bold' }}>{item.status}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
         <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Device Logs</Text>
         <Searchbar
           placeholder="Search logs..."
           onChangeText={setQuery}
           value={query}
           style={styles.search}
         />
       </View>
       <FlatList
         data={MOCK_LOGS}
         keyExtractor={item => item.id}
         renderItem={renderItem}
         contentContainerStyle={styles.list}
       />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 16, backgroundColor: 'white' },
  search: { marginTop: 10, backgroundColor: '#f1f5f9' },
  list: { padding: 16 },
  card: { marginBottom: 8, backgroundColor: 'white' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }
});
