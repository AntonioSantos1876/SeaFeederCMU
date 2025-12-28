# Database Schema Documentation

## Overview
SeaFeeder CMU uses SQLite for offline-first data persistence. The database `seafeeder.db` is initialized on app launch.

## Tables

### `devices`
Stores the configuration and status of paired feeders.
- `id` (TEXT PRIMARY KEY): Unique Identifier (e.g., 'Cage-01').
- `name` (TEXT): User-friendly name.
- `cage_diameter` (REAL): Diameter in meters.
- `cage_depth` (REAL): Depth in meters.
- `species` (TEXT): Fish species (e.g., 'Salmon').
- `fish_count` (INTEGER): Estimated number of fish.
- `fish_age` (REAL): Average weight in grams.
- `last_seen` (TEXT): ISO timestamp of last connection.
- `connection_status` (TEXT): 'OFFLINE', 'LOCAL', 'REMOTE'.

### `feeding_schedules`
Stores the current active plan for each device.
- `id` (INTEGER PK).
- `device_id` (TEXT FK): references `devices(id)`.
- `cycles_per_day` (INTEGER).
- `total_daily_ration` (REAL): in Kg.
- `updated_at` (TEXT): ISO timestamp.

### `logs`
Stores operational history.
- `id` (INTEGER PK).
- `device_id` (TEXT FK).
- `timestamp` (TEXT).
- `type` (TEXT): 'FEED', 'SENSOR', 'ALARM'.
- `data` (TEXT): JSON string containing details (e.g., `{ "amount": 625, "success": true }`).
- `synced` (INTEGER): 0 or 1, indicating cloud sync status.

### `pending_commands`
Queue for commands when offline.
- `id` (INTEGER PK).
- `device_id` (TEXT FK).
- `command` (TEXT): JSON payload of the command.
- `status` (TEXT): 'PENDING', 'SENT', 'FAILED'.
