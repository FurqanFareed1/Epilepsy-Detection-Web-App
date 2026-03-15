/**
 * React Hook for fetching sensor data from Flask backend
 * Includes proper error handling and null safety
 */
import { useEffect, useState, useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function useSensorData(intervalMs = 1000) {
  const [sensorData, setSensorData] = useState({
    emg1: 0.0,
    emg2: 0.0,
    imu: { ax: 0.0, ay: 0.0, az: 0.0 },
    ppg: 0,
    status: 'ok',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchSensorData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/get_sensor_data`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Validate and set data with defaults
      setSensorData({
        emg1: typeof data.emg1 === 'number' ? data.emg1 : 0.0,
        emg2: typeof data.emg2 === 'number' ? data.emg2 : 0.0,
        imu: data.imu && typeof data.imu === 'object' 
          ? {
              ax: typeof data.imu.ax === 'number' ? data.imu.ax : 0.0,
              ay: typeof data.imu.ay === 'number' ? data.imu.ay : 0.0,
              az: typeof data.imu.az === 'number' ? data.imu.az : 0.0,
            }
          : { ax: 0.0, ay: 0.0, az: 0.0 },
        ppg: typeof data.ppg === 'number' ? data.ppg : 0,
        status: data.status || 'ok',
      })

      setError(null)
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch sensor data:', err)
      setError(err.message)
      setLoading(false)
      
      // Set default values on error
      setSensorData({
        emg1: 0.0,
        emg2: 0.0,
        imu: { ax: 0.0, ay: 0.0, az: 0.0 },
        ppg: 0,
        status: 'error',
      })
    }
  }, [])

  useEffect(() => {
    // Fetch immediately
    fetchSensorData()

    // Set up interval
    const intervalId = setInterval(fetchSensorData, intervalMs)

    return () => clearInterval(intervalId)
  }, [fetchSensorData, intervalMs])

  return { sensorData, error, loading, refetch: fetchSensorData }
}

