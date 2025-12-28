import React from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../store/themeStore';

/**
 * Settings Screen
 * Allows user to toggle themes, notifications, and manage data.
 */
export const SettingsScreen = () => {
  const theme = useAppTheme();
  const navigation = useNavigation<any>();
  
  // Theme Store
  const { mode, setMode } = useThemeStore();
  
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [offlineMode, setOfflineMode] = React.useState(false);

  const SettingItem = ({ icon, title, subtitle, right, danger, onPress }: any) => (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={[styles.itemContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.iconBox}>
          <IconButton icon={icon} iconColor={danger ? theme.colors.error : theme.colors.primary} size={24} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ color: danger ? theme.colors.error : theme.colors.text, fontWeight: '600', fontSize: 16 }}>{title}</Text>
          {subtitle && <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{subtitle}</Text>}
        </View>
        {right && right()}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>Appearance</Text>
          
          <SettingItem 
            icon="theme-light-dark" 
            title="Theme Mode" 
            subtitle={`Current: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
            right={() => (
              <View style={{ flexDirection: 'row' }}>
                 <TouchableOpacity onPress={() => setMode('light')}>
                    <IconButton icon="white-balance-sunny" iconColor={mode === 'light' ? theme.colors.secondary : theme.colors.textSecondary} size={20} />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => setMode('dark')}>
                    <IconButton icon="weather-night" iconColor={mode === 'dark' ? theme.colors.secondary : theme.colors.textSecondary} size={20} />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => setMode('system')}>
                    <IconButton icon="cellphone" iconColor={mode === 'system' ? theme.colors.secondary : theme.colors.textSecondary} size={20} />
                 </TouchableOpacity>
              </View>
            )}
          />

          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>Device & Data</Text>
          <SettingItem 
            icon="bell-outline" 
            title="Push Notifications" 
            right={() => <Switch value={pushEnabled} onValueChange={setPushEnabled} trackColor={{true: theme.colors.secondary}} />}
          />
          <SettingItem 
            icon="cloud-off-outline" 
            title="Force Offline Mode" 
            subtitle="Keep all data local"
            right={() => <Switch value={offlineMode} onValueChange={setOfflineMode} trackColor={{true: theme.colors.secondary}} />}
          />
          <SettingItem 
            icon="database-export" 
            title="Export Data" 
            subtitle="CSV / PDF"
            onPress={() => Alert.alert('Exported', 'Data saved to Downloads folder.')}
            right={() => <IconButton icon="chevron-right" iconColor={theme.colors.textSecondary} />}
          />

           <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>System</Text>
           <SettingItem 
             icon="swap-horizontal" 
             title="Switch Device" 
             subtitle="Go back to device list" 
             onPress={() => navigation.navigate('DeviceManager')}
             right={() => <IconButton icon="chevron-right" iconColor={theme.colors.textSecondary} />}
           />
           
           <SettingItem 
             icon="delete-outline" 
             title="Factory Reset App" 
             danger 
             subtitle="Clear all local data"
             onPress={() => Alert.alert('Reset', 'Are you sure?', [{text:'Cancel'}, {text:'Reset', style:'destructive'}])}
             right={() => <IconButton icon="chevron-right" iconColor={theme.colors.error} />} 
          />
           
           <Text style={{ textAlign: 'center', color: theme.colors.textSecondary, marginTop: 30, fontSize: 12 }}>
             SeaFeeder CMU v1.1.0 • Built with Expo
           </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 10 },
  title: { fontSize: 32, fontWeight: 'bold' },
  scroll: { padding: 20, paddingBottom: 100 },
  sectionTitle: { textTransform: 'uppercase', fontSize: 12, fontWeight: 'bold', marginBottom: 10, marginTop: 20 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  iconBox: {
    width: 40, height: 40, justifyContent: 'center', alignItems: 'center'
  }
});
