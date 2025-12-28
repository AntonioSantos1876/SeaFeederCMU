# SeaFeeder CMU 🐟

Welcome to **SeaFeeder CMU**, a final year project developed by Computer Science students at CMU. This application is designed to modernize aquaculture by providing an intelligent, automated feeding system for fish farms.

## What it does
SeaFeeder connects to automated feedhoppers attached to sea cages. It allows farm operators to:
- **Automate Feeding**: Calculates exact rations based on fish species (Tilapia, Basa, Shrimp), weight, and water temperature.
- **Visualize Data**: View fish growth and feeding schedules in a clean, glassy dashboard.
- **Work Offline**: Unlike cloud-only apps, SeaFeeder works entirely offline using a local database, syncing only when you're back on shore.
- **Calibrate Hardware**: Includes a built-in wizard to calibrate motor flow rates for precise dosing.

## Key Features
- **Glassy UI**: A modern, dark-mode-first interface that looks great on phones and tablets.
- **Biological Algorithms**: Built-in growth tables for scientifically accurate feeding.
- **Smart Connectivity**: Automatically switches between Bluetooth (local control) and Cloud (remote monitoring).
- **Tablet Ready**: rotates seamlessly to landscape mode for a command-center experience.

## Getting Started

### Prerequisites
You will need:
- Node.js (Version 18 or newer)
- A smartphone (Android or iOS) with the **Expo Go** app installed.

### Installation
1.  Clone this repository:
    ```bash
    git clone https://github.com/AntonioSantos1876/SeaFeederCMU.git
    ```
2.  Navigate to the project folder:
    ```bash
    cd SeaFeederCMU
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the App
To start the development server:
```bash
npx expo start
```
Scan the QR code with your phone to launch the app!

## Project Structure
- **/src/screens**: All the user interface pages (Dashboard, Setup, Settings).
- **/src/services**: The brain of the app. Contains the Feeding Calculator and Database logic.
- **/src/store**: State management for themes and user preferences.
- **/src/assets**: Static files like the fish research tables and images.

## Developers
- **Antonio Santos** - Lead Developer
- **CMU Team** - Research & Design

---
*Built with React Native, Expo, and ❤️ for the ocean.*
