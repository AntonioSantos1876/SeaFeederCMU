import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('seafeeder.db');

/**
 * Offline-First Database Service
 * 
 * Uses SQLite (via expo-sqlite) to persist all Cage, Schedule, and Log data locally.
 * This ensures the app works 100% offline on the open sea.
 */
export const initDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS devices (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        cage_diameter REAL DEFAULT 10,
        cage_depth REAL DEFAULT 8,
        species TEXT,
        fish_count INTEGER DEFAULT 0,
        fish_age REAL,
        last_seen TEXT,
        connection_status TEXT DEFAULT 'OFFLINE'
      );

      CREATE TABLE IF NOT EXISTS feeding_schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT NOT NULL,
        cycles_per_day INTEGER DEFAULT 4,
        total_daily_ration REAL DEFAULT 0,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (device_id) REFERENCES devices (id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT NOT NULL,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        type TEXT NOT NULL, -- 'FEED', 'SENSOR', 'ALARM'
        data TEXT, -- JSON payload
        synced INTEGER DEFAULT 0,
        FOREIGN KEY (device_id) REFERENCES devices (id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS pending_commands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT NOT NULL,
        command TEXT NOT NULL,
        payload TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'PENDING' -- 'PENDING', 'SENT', 'FAILED'
      );
    `);

    // Migration for Master Build Upgrade
    // Try adding columns if they don't exist (SQLite doesn't support IF NOT EXISTS for columns easily in one go)
    // We catch errors if columns already exist.
    const columns = ['stocking_date TEXT', 'cage_dimensions TEXT', 'battery_voltage REAL'];
    for (const col of columns) {
      try {
        await db.execAsync(`ALTER TABLE devices ADD COLUMN ${col};`);
      } catch (e) {
        // Column likely exists, ignore
      }
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database', error);
  }
};

export const getDB = () => db;

// Basic typed helpers
import { Device } from '../types/DeviceContract';

export const Devices = {
  getAll: async (): Promise<Device[]> => {
    return await db.getAllAsync<Device>('SELECT * FROM devices');
  },
  add: async (device: Device) => {
    return await db.runAsync(
      `INSERT OR REPLACE INTO devices (id, name, cage_diameter, cage_depth, species, fish_count, fish_age, last_seen, connection_status, stocking_date, cage_dimensions, battery_voltage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [device.id, device.name, device.cage_diameter, device.cage_depth, device.species, device.fish_count, device.fish_age, device.last_seen, device.connection_status, device.stocking_date || null, device.cage_dimensions || null, device.battery_voltage || null]
    );
  }
};
