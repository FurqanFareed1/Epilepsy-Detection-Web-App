import { create } from 'zustand'

export const useAppStore = create((set) => ({
  // Device state
  deviceConnected: true,
  batteryLevel: 87,
  isMonitoring: false,
  
  // Seizure detection
  currentStatus: 'NORMAL',
  alertOpen: false,
  
  // Events
  events: [
    {
      id: 1,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'AUTOMATIC',
      status: 'POSSIBLE_SEIZURE',
      providerNotified: true,
      summary: 'Elevated EMG activity detected'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      type: 'MANUAL',
      status: 'NORMAL',
      providerNotified: false,
      summary: 'Manual event logged by caregiver'
    },
  ],
  
  // Settings
  detectionSensitivity: 70,
  notificationsEnabled: true,
  autoNotifyProvider: true,
  
  // Actions
  setDeviceConnected: (connected) => set({ deviceConnected: connected }),
  setBatteryLevel: (level) => set({ batteryLevel: level }),
  setIsMonitoring: (monitoring) => set({ isMonitoring: monitoring }),
  setCurrentStatus: (status) => set({ currentStatus: status }),
  setAlertOpen: (open) => set({ alertOpen: open }),
  addEvent: (event) => set((state) => ({
    events: [{ ...event, id: state.events.length + 1 }, ...state.events]
  })),
  setDetectionSensitivity: (sensitivity) => set({ detectionSensitivity: sensitivity }),
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  setAutoNotifyProvider: (enabled) => set({ autoNotifyProvider: enabled }),
}))

