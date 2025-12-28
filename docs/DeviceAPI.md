# Device API & Telemetry Contract

## Command Structue
Commands are JSON objects sent over BLE or HTTP.

### Types
```typescript
type CommandType = 
  | 'SET_CONFIG' 
  | 'SET_SCHEDULE' 
  | 'PAUSE' 
  | 'RESUME' 
  | 'TEST_FEED' 
  | 'REQUEST_STATUS';
```

### Payloads
- **SET_CONFIG**: `{ species: string; count: number }`
- **SET_SCHEDULE**: `{ rules: Array<{ time: string; amount_g: number }> }`
- **TEST_FEED**: `{ amount: number }` (grams)

## Telemetry
Devices broadcast or return status objects.

### Fields
- `batteryLevel` (0.0 - 1.0)
- `isCharging` (boolean)
- `motorCurrent` (float Amps) - High current indicates JAM.
- `isJammed` (boolean)
- `hopperLevel` (0.0 - 1.0)
- `temperature` (Celsius)
- `humidity` (% RH)
- `loadCellWeight` (kg) - Used to verify dispense.

## Connection Flow
1. **Discovery**: Helper advertises service UUID.
2. **Handshake**: App connects and subscribes to Notification specific characteristic.
3. **Auth**: App writes Pairing Token.
4. **Operation**: Bidirectional Command/Response.
