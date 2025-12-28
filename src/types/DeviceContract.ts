export type ConnectionType = 'BLE' | 'WIFI_AP' | 'CLOUD';
export type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING';

export interface Device {
  id: string;
  name: string;
  species: string;
  fish_count: number;
  fish_age: number; // avg weight in grams
  cage_diameter: number;
  cage_depth: number;
  stocking_date?: string; // ISO Date String
  cage_dimensions?: string; // JSON string for {diameter, depth} redundant but requested as TEXT
  last_seen: string;
  connection_status: 'LOCAL' | 'CLOUD';
  battery_voltage?: number; // Volts
}
export interface DeviceState {
  batteryLevel: number;
  isCharging: boolean;
  motorCurrent: number; // Amps
  isJammed: boolean;
  hopperLevel: number; // %
  temperature: number; // Celsius
  humidity: number; // %
  loadCellWeight: number; // kg
}

export interface FeedingLog {
  timestamp: string;
  plannedAmount: number;
  dispensedAmount: number;
  success: boolean;
}

export type DeviceCommand = 
  | { type: 'SET_CONFIG'; payload: { species: string; count: number } }
  | { type: 'SET_SCHEDULE'; payload: { rules: any[] } }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TEST_FEED'; payload: { amount: number } }
  | { type: 'REQUEST_STATUS' }
  | { type: 'REQUEST_LOGS' };

export interface CommandReceipt {
  commandId: string;
  success: boolean;
  error?: string;
}
