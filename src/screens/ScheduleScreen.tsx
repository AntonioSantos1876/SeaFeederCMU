import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, List, Button, Card, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


export const ScheduleScreen = () => {
  // Mock schedule data
  const [cycles, setCycles] = useState([
    { id: 1, time: '06:00', amount: 625 },
    { id: 2, time: '10:00', amount: 625 },
    { id: 3, time: '14:00', amount: 625 },
    { id: 4, time: '18:00', amount: 625 },
  ]);

  const handleRecalculate = () => {
    Alert.alert('Recalculate', 'Regenerate schedule based on current biomass?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: () => Alert.alert('Updated', 'Schedule optimized for 2.5kg daily ration') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>Feeding Schedule</Text>
        <Text variant="bodyMedium" style={{ color: '#64748b' }}>Target: 2.5 kg/day • 4 Cycles</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title>Time</DataTable.Title>
            <DataTable.Title numeric>Amount (g)</DataTable.Title>
            <DataTable.Title numeric>Action</DataTable.Title>
          </DataTable.Header>

          {cycles.map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.time}</DataTable.Cell>
              <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Button compact mode="text" onPress={() => {}}>Edit</Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <Button 
          mode="contained" 
          icon="refresh" 
          onPress={handleRecalculate}
          style={styles.button}
        >
          Recalculate from Biology
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, backgroundColor: '#f8fafc', borderBottomWidth: 1, borderColor: '#e2e8f0' },
  title: { fontWeight: 'bold' },
  content: { padding: 16 },
  table: { marginBottom: 20 },
  button: { marginTop: 20 }
});
