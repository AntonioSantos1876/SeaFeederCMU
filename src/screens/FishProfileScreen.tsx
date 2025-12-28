import React, { Suspense, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-paper';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Devices, Device } from '../services/DatabaseService';

function FishModel(props: any) {
  const mesh = useRef<any>(null);
  useFrame((state, delta) => {
    if (mesh.current) {
        mesh.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <mesh {...props} ref={mesh}>
      <capsuleGeometry args={[1, 3, 4, 16]} />
      <meshStandardMaterial color={props.color || "orange"} />
    </mesh>
  );
}

export const FishProfileScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { deviceId } = route.params;
  const [device, setDevice] = React.useState<Device | null>(null);

  React.useEffect(() => {
    // Load device details
    Devices.getAll().then(list => {
      const d = list.find(l => l.id === deviceId);
      if (d) setDevice(d);
    });
  }, [deviceId]);

  if (!device) return <View><Text>Loading...</Text></View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>{device.species} Profile</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.visualContainer}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FishModel position={[0, 0, 0]} rotation={[0, 0, 1.57]} color={device.species === 'Salmon' ? 'salmon' : 'silver'} />
          </Canvas>
          <Text style={styles.hint}>Swipe to rotate (Implemented via OrbitControls in full version)</Text>
        </View>

        <View style={styles.infoPanel}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                <Text style={styles.label}>Cage Size:</Text>
                <Text style={styles.value}>{device.cage_diameter}m x {device.cage_depth}m</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Stock:</Text>
                <Text style={styles.value}>{device.fish_count} fish</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Avg Weight:</Text>
                <Text style={styles.value}>{device.fish_age} g</Text>
              </View>
            </Card.Content>
          </Card>

          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Dashboard', { deviceId })}
            style={styles.button}
            contentStyle={{ height: 50 }}
          >
            Go to Dashboard
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 16, alignItems: 'center' },
  title: { color: 'white', fontWeight: 'bold' },
  content: { flex: 1, flexDirection: 'row' },
  visualContainer: { flex: 1.5, position: 'relative' },
  infoPanel: { flex: 1, padding: 16, backgroundColor: '#f8fafc', borderTopLeftRadius: 20 },
  hint: { position: 'absolute', bottom: 10, left: 10, color: 'white', fontSize: 10, opacity: 0.7 },
  card: { marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  label: { color: '#64748b' },
  value: { fontWeight: 'bold', color: '#0f172a' },
  divider: { marginVertical: 4 },
  button: { marginTop: 'auto' }
});
