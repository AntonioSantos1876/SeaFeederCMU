import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import { Text, TextInput, Button, IconButton, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Devices } from '../services/DatabaseService';
import { calculateFeedingPlan } from '../services/FeedingCalculator';
import { useAppTheme } from '../theme';

export const SetupWizardScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Data
  const [deviceId, setDeviceId] = useState(''); 
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Tilapia');
  const [count, setCount] = useState('');
  const [avgWeight, setAvgWeight] = useState('');
  const [stockingDate, setStockingDate] = useState(new Date().toISOString().split('T')[0]); // Default Today
  const [protein, setProtein] = useState('');
  const [calibWeight, setCalibWeight] = useState('');
  const [flowRate, setFlowRate] = useState(10);
  const [plan, setPlan] = useState<any>(null);

  React.useEffect(() => {
    if (step === 4) handleCalculate();
  }, [step]);

  const handleScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDeviceId(`CG-${Math.floor(Math.random() * 1000)}`);
      setName('New Cage');
      setStep(2);
    }, 1000);
  };

  const handleCalculate = () => {
    try {
      const p = calculateFeedingPlan({
        species,
        fishCount: parseInt(count),
        avgWeightG: parseFloat(avgWeight),
        calibrationFlowRate: flowRate
      });
      setPlan(p);
      setStep(5);
    } catch {
      setStep(2);
    }
  };

  const GlassCard = ({ children, style }: any) => (
    <View style={[styles.glassCard, style, { borderColor: theme.colors.border }]}>
      <BlurView intensity={theme.glass.intensity} tint={theme.glass.tint as any} style={StyleSheet.absoluteFill} />
       {children}
    </View>
  );

  return (
     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContent}>
            {step === 1 && (
               <GlassCard style={{ padding: 30, alignItems: 'center', width: '90%' }}>
                  <Text style={{color: theme.colors.text, fontSize: 24, marginBottom: 20}}>Setup Feeder</Text>
                  <Button mode="contained" onPress={handleScan} loading={loading} buttonColor={theme.colors.primary}>Scan QR</Button>
               </GlassCard>
            )}
            {/* Abbreviated logic for other steps - relying on previous implementation structure but fixing imports */}
            {step > 1 && (
              <ScrollView contentContainerStyle={{padding: 20}}>
                  <Text style={{color: theme.colors.text, fontSize: 20, marginBottom: 10}}>Configuration</Text>
                  
                   {step === 2 && (
                    <GlassCard style={{padding: 10}}>
                       <Text style={{color: theme.colors.textSecondary, marginBottom: 5, fontSize: 12, textTransform: 'uppercase'}}>Species Selection</Text>
                       <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15, gap: 8}}>
                          <Button mode={species === 'Tilapia' ? 'contained' : 'outlined'} onPress={() => setSpecies('Tilapia')} contentStyle={{height: 36}} labelStyle={{fontSize: 12}} theme={{colors: {primary: theme.colors.primary}}}>Tilapia</Button>
                          <Button mode="outlined" onPress={() => Alert.alert('Coming Soon', 'Basa support is under development.')} contentStyle={{height: 36}} labelStyle={{fontSize: 12, color: theme.colors.textSecondary}} style={{borderColor: theme.colors.border}}>Basa 🔒</Button>
                          <Button mode="outlined" onPress={() => Alert.alert('Coming Soon', 'Shrimp support is under development.')} contentStyle={{height: 36}} labelStyle={{fontSize: 12, color: theme.colors.textSecondary}} style={{borderColor: theme.colors.border}}>Shrimp 🔒</Button>
                       </View>

                       <TextInput label="Name" value={name} onChangeText={setName} style={{backgroundColor: 'transparent'}} textColor={theme.colors.text} />
                       <TextInput label="Count" value={count} onChangeText={setCount} keyboardType="numeric" style={{backgroundColor: 'transparent'}} textColor={theme.colors.text} />
                       <TextInput label="Avg Weight (g)" value={avgWeight} onChangeText={setAvgWeight} keyboardType="numeric" style={{backgroundColor: 'transparent'}} textColor={theme.colors.text} />
                       <TextInput label="Stocking Date (YYYY-MM-DD)" value={stockingDate} onChangeText={setStockingDate} style={{backgroundColor: 'transparent'}} textColor={theme.colors.text} />
                       <Button mode="contained" onPress={() => setStep(3)} style={{marginTop: 20}}>Next</Button>
                    </GlassCard>
                  )}

                  {step === 3 && (
                     <GlassCard style={{padding: 20}}>
                        <Text style={{color: theme.colors.text}}>Calibration Step...</Text>
                        <Button mode="contained" onPress={() => setStep(4)} style={{marginTop: 20}}>Simulate Calibrate</Button>
                     </GlassCard>
                  )}

                  {step === 5 && (
                    <GlassCard style={{padding: 20}}>
                        <Text style={{color: theme.colors.text, fontSize: 18}}>Plan Generated</Text>
                        <Text style={{color: theme.colors.text}}>{plan?.totalDailyRationG.toFixed(0)}g Daily</Text>
                        <Button mode="contained" onPress={async () => {
                          await Devices.add({
                            id: deviceId,
                            name,
                            species,
                            fish_count: parseInt(count),
                            fish_age: parseFloat(avgWeight),
                            cage_diameter: 10,
                            cage_depth: 8,
                            stocking_date: stockingDate,
                            last_seen: new Date().toISOString(),
                            connection_status: 'LOCAL',
                            battery_voltage: 12.4
                          });
                          navigation.navigate('Dashboard', { deviceId });
                        }} style={{marginTop: 20}}>Save & Finish</Button>
                    </GlassCard>
                  )}
              </ScrollView>
            )}
        </View>
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContent: { flex: 1, justifyContent: 'center' },
  glassCard: { borderRadius: 16, overflow: 'hidden', borderWidth: 1 }
});
