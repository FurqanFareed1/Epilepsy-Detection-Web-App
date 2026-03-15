# Seizure Detection System - Medical Wearable Monitoring App

A production-quality web application for monitoring and detecting seizures using simulated EMG (electromyography) data from wearable devices.

## ✨ Features

- **Live EMG Waveform Visualization** - Real-time EMG signal monitoring with animated charts
- **Seizure Detection** - Automatic detection based on EMG signal analysis
- **Heart Rate Monitoring** - Simulated heart rate tracking (60-120 bpm)
- **Motion Level Detection** - Real-time motion activity levels
- **Event History** - Timeline view of all detected events and manual logs
- **Patient Profile** - Comprehensive patient information, medications, and emergency contacts
- **Settings Management** - Configurable detection sensitivity and notification preferences
- **Alert System** - Popup alerts with automatic provider notification simulation

## 🎨 Design

The UI features:
- Elegant gradients and glassmorphism effects
- Smooth Framer Motion animations
- Premium shadows and glow effects
- Modern color palette (purples, teals, blues)
- Responsive layout with sidebar navigation
- Beautiful typography and spacing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
  components/
    ui/          # Reusable UI components (Button, Card, Dialog, etc.)
    cards/       # Card components
    charts/      # Chart components (EMG Chart)
    layout/      # Layout components (Sidebar, TopNav)
  pages/
    Home.jsx     # Dashboard page
    LiveMonitor.jsx  # Real-time monitoring page
    Events.jsx   # Event history page
    Profile.jsx  # Patient profile page
    Settings.jsx # Settings page
  hooks/
    useEMGData.js  # EMG data simulation hook
  utils/
    seizureDetection.js  # Seizure detection logic
    cn.js  # Utility for className merging
  store/
    appStore.js  # Zustand state management
```

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **shadcn/ui** - UI component library (custom implementation)
- **Recharts** - Chart visualization
- **Framer Motion** - Animations
- **React Router** - Routing
- **Zustand** - State management
- **Lucide React** - Icons

## 📱 Pages

1. **Dashboard** - Overview of device status, battery level, and last detected event
2. **Live Monitor** - Real-time EMG waveform, heart rate, motion level, and seizure detection
3. **Events** - Timeline view of all detected events with provider notification status
4. **Profile** - Patient information, medications, emergency contacts, and healthcare provider details
5. **Settings** - Detection sensitivity controls and notification preferences

## 🧪 Simulation Logic

- **EMG Data**: Generated using sine wave with random noise, updating every 50ms
- **Seizure Detection**: Triggers when EMG value exceeds 0.9 (absolute value)
- **Heart Rate**: Simulated between 60-120 bpm with gradual changes
- **Motion Level**: Randomly cycles between Low, Medium, and High

## 🎯 Usage

1. Navigate to **Live Monitor** to start real-time monitoring
2. Click **Start Monitoring** to begin detection
3. Use **Trigger Test Seizure** to simulate a seizure event
4. View detected events in the **Events** page
5. Configure detection sensitivity in **Settings**

## 📝 Notes

This is a demonstration application for academic purposes. The seizure detection logic is simulated and should not be used for actual medical diagnosis or treatment.

## 📄 License

This project is created for educational purposes as part of a Final Year Project.

