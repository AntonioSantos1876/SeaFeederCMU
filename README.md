# SeaFeeder CMU - Smart Aquaculture Feeding System

Welcome to **SeaFeeder CMU**, a final year project developed by Mechatronics Engineering students at The Caribbean Maritime University (CMU). This application is designed to modernize aquaculture by providing an intelligent, automated feeding system for fish farms.

**SeaFeeder CMU** is a state-of-the-art mobile application designed to control and monitor intelligent autonomous fish feeders. Developed as a final year engineering project, it leverages Bluetooth Low Energy (BLE) and an offline-first architecture to operate reliably in open ocean environments.

## Features

-   **Dashboard Telemetry**: Real-time monitoring of battery voltage, hopper levels, and next scheduled feed.
-   **Smart Feeding Algorithms**: Automatically calculates optimal feed rations based on species, fish weight, and water temperature.
-   **Offline-First**: Built with `expo-sqlite` to ensure full functionality without internet access.
-   **Bluetooth Control**: Direct connection to feeder hardware for configuration and manual override.
-   **Visual Analytics**: Historical data visualization of feeding cycles and dispensed rations.
-   **Tablet Optimized**: Layout adapts for landscape orientation on tablets for field use.
-   **Dynamic Theming**: Support for Light and Dark modes with a custom "Glassmorphism" UI aesthetic.

## Tech Stack

-   **Framework**: React Native (Expo SDK 50)
-   **Language**: TypeScript
-   **Navigation**: React Navigation (Native Stack & Bottom Tabs)
-   **Database**: SQLite (via `expo-sqlite`) with WAL mode
-   **Wireless**: `react-native-ble-plx` for Bluetooth communication
-   **UI Library**: React Native Paper + Custom Tailwind-styled components
-   **3D Elements**: React Three Fiber (for 3D cage visualization)

## Getting Started

### Prerequisites

-   Node.js (LTS recommended)
-   npm or yarn
-   Expo Go app on Android/iOS (for physical device testing)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AntonioSantos1876/SeaFeederCMU.git
    cd SeaFeederCMU
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npx expo start
    ```

4.  **Run on Device:**
    -   Scan the QR code printed in the terminal using the **Expo Go** app.
    -   Ensure your phone and computer are on the same Wi-Fi network (or use a tunnel).

## Project Structure

-   `src/screens`: Main UI screens (Dashboard, Device Manager, Setup Wizard).
-   `src/services`: Core logic (Database, Bluetooth, Feeding Calculator).
-   `src/components`: Reusable UI elements (GlassTile, CMUFooter).
-   `src/assets`: Images and static JSON data (Species Research Tables).
-   `src/navigation`: App routing configuration.

## Development Team

**Developed by CMU Final Year Engineering Students**

-   **Antonio Santos** - Lead Developer & System Architect
-   **Sarah Jenkin** - UI/UX Design & Frontend
-   **Michael Chen** - Embedded Systems & Bluetooth Protocol
-   **Dr. Emily Vance** - Project Supervisor

---

&copy; 2025 SeaFeeder CMU. All rights reserved.
