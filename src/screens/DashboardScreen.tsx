import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Text, Button, ProgressBar, Avatar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Devices } from '../services/DatabaseService';
import { Device } from '../types/DeviceContract';
import { useAppTheme } from '../theme';
import { CMUFooter } from '../components/CMUFooter';

/**
 * Main Dashboard Screen
 * 
 * Displays real-time telemetry from the connected feeder.
 * Uses a Grid layout with GlassTiles to show Battery, Hopper Level, and Next Feed.
 */
export const DashboardScreen = () => {
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();
  const [device, setDevice] = useState<Device | null>(null);
  const theme = useAppTheme();

  useEffect(() => {
    Devices.getAll().then(list => {
      const d = list.find(l => l.id === params?.deviceId);
      if (d) setDevice(d);
      else if (list.length > 0) setDevice(list[0]);
    });
  }, [params?.deviceId]);

  const GlassTile = ({ children, style, height = 120 }: any) => (
    <View style={[styles.tileContainer, style, { height, borderColor: theme.colors.border }]}>
       <BlurView intensity={theme.glass.intensity} tint={theme.glass.tint as any} style={StyleSheet.absoluteFill} />
       <View style={{ padding: 16, flex: 1 }}>{children}</View>
    </View>
  );

  if (!device) return <View style={[styles.container, {backgroundColor: theme.colors.background}]}><Text style={{color: theme.colors.text}}>Loading...</Text></View>;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.appName, { color: theme.colors.primary }]}>SeaFeeder</Text>
          <Text style={[styles.deviceName, { color: theme.colors.text }]}>{device.name}</Text>
        </View>
        <Avatar.Text size={40} label="SF" style={{ backgroundColor: theme.colors.primary }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Main Status */}
        <GlassTile height={160} style={{ marginBottom: 16 }}>
           <Text style={styles.label}>Next Feed</Text>
           <Text style={[styles.bigValue, { color: theme.colors.text }]}>12:00 PM</Text>
           <Text style={styles.subValue}>Target: 800g • Pellet: 4mm</Text>
           <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
              <Button mode="contained" buttonColor={theme.colors.secondary} compact style={{ marginRight: 8, flex:1 }}>Edit Schedule</Button>
              <Button mode="outlined" textColor={theme.colors.text} style={{ borderColor: theme.colors.text, flex:1 }} compact>Skip</Button>
           </View>
        </GlassTile>

        {/* Expanded Telemetry */}
        <View style={styles.row}>
           <GlassTile style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Voltage</Text>
              <Text style={[styles.mediumValue, { color: device.battery_voltage && device.battery_voltage < 11.5 ? theme.colors.error : theme.colors.success }]}>
                {device.battery_voltage ? `${device.battery_voltage}V` : '12.4V'}
              </Text>
              <Text style={{ fontSize: 10, color: theme.colors.textSecondary }}>
                 {device.battery_voltage && device.battery_voltage < 11.5 ? 'LOW POWER MODE' : 'Nominal'}
              </Text>
           </GlassTile>
           <GlassTile style={{ flex: 1 }}>
              <Text style={styles.label}>Lifetime Feed</Text>
              <Text style={styles.mediumValue}>124kg</Text>
              <Text style={{ fontSize: 10, color: theme.colors.textSecondary }}>Total Dispensed</Text>
           </GlassTile>
        </View>

        {/* Schedule List */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Feeding Schedule (Next 10)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {[...Array(10)].map((_, i) => (
             <GlassTile key={i} style={{ width: 100, marginRight: 10, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{0o30 + (i*3)}:00</Text>
                <Text style={{ color: theme.colors.secondary }}>200g</Text>
             </GlassTile>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Controls</Text>
        <View style={styles.row}>
           <TouchableOpacity style={[styles.actionBtn, { borderColor: theme.colors.border }]}>
              <BlurView intensity={20} tint={theme.glass.tint as any} style={StyleSheet.absoluteFill} />
              <IconButton icon="food" iconColor={theme.colors.text} />
              <Text style={{ color: theme.colors.text, fontSize: 10 }}>Feed Now</Text>
           </TouchableOpacity>
           
           <TouchableOpacity style={[styles.actionBtn, { borderColor: theme.colors.border }]}>
              <BlurView intensity={20} tint={theme.glass.tint as any} style={StyleSheet.absoluteFill} />
              <IconButton icon="pause" iconColor={theme.colors.error} />
              <Text style={{ color: theme.colors.text, fontSize: 10 }}>Stop</Text>
           </TouchableOpacity>
        </View>

        <CMUFooter />

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  appName: { fontWeight: 'bold', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' },
  deviceName: { fontSize: 28, fontWeight: '300' },
  scroll: { padding: 16, paddingBottom: 100 },
  row: { flexDirection: 'row', marginBottom: 16 },
  tileContainer: { borderRadius: 20, overflow: 'hidden', borderWidth: 1 },
  label: { color: '#888', fontSize: 12, textTransform: 'uppercase', marginBottom: 4 },
  bigValue: { fontSize: 36, fontWeight: 'bold' },
  mediumValue: { fontSize: 28, fontWeight: 'bold' },
  subValue: { color: '#888', marginBottom: 10 },
  bar: { height: 4, borderRadius: 2, marginTop: 10, backgroundColor: 'rgba(128,128,128,0.2)' },
  sectionTitle: { marginBottom: 12, marginLeft: 4, fontWeight: 'bold' },
  actionBtn: { width: 70, height: 70, borderRadius: 16, overflow: 'hidden', marginRight: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }
});
