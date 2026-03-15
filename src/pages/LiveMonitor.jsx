import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Heart, Activity, Bell } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EMGChart } from '@/components/charts/EMGChart'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useEMGData } from '@/hooks/useEMGData'
import { detectSeizure, getStatusColor, getStatusLabel } from '@/utils/seizureDetection'
import { useAppStore } from '@/store/appStore'

export function LiveMonitor() {
  const emgData = useEMGData()
  const [heartRate, setHeartRate] = useState(72)
  const [motionLevel, setMotionLevel] = useState('Low')
  const [testSeizureActive, setTestSeizureActive] = useState(false)
  const lastAlertedRef = useRef(false)

  const {
    isMonitoring,
    setIsMonitoring,
    currentStatus,
    setCurrentStatus,
    alertOpen,
    setAlertOpen,
    addEvent,
    autoNotifyProvider,
  } = useAppStore()

  // Simulate heart rate
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const change = (Math.random() - 0.5) * 4
        return Math.max(60, Math.min(120, prev + change))
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Simulate motion level
  useEffect(() => {
    const interval = setInterval(() => {
      const levels = ['Low', 'Medium', 'High']
      setMotionLevel(levels[Math.floor(Math.random() * levels.length)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Reset alert tracking when monitoring stops or alert is closed
  useEffect(() => {
    if (!isMonitoring || !alertOpen) {
      lastAlertedRef.current = false
    }
  }, [isMonitoring, alertOpen])

  // Seizure detection
  useEffect(() => {
    if (!isMonitoring || emgData.length === 0) return

    const latestValue = emgData[emgData.length - 1]?.value || 0
    const status = detectSeizure(latestValue)
    setCurrentStatus(status)

    if (status === 'POSSIBLE_SEIZURE' && !alertOpen && !lastAlertedRef.current) {
      lastAlertedRef.current = true
      setAlertOpen(true)
      addEvent({
        timestamp: new Date(),
        type: 'AUTOMATIC',
        status: 'POSSIBLE_SEIZURE',
        providerNotified: autoNotifyProvider,
        summary: 'Possible seizure detected from EMG analysis',
      })

      // Simulate notification
      if (autoNotifyProvider) {
        setTimeout(() => {
          console.log('Notification sent to caregiver and healthcare provider')
        }, 500)
      }
    } else if (status !== 'POSSIBLE_SEIZURE') {
      lastAlertedRef.current = false
    }
  }, [emgData, isMonitoring, alertOpen, setCurrentStatus, setAlertOpen, addEvent, autoNotifyProvider])

  const handleTestSeizure = () => {
    setTestSeizureActive(true)
    setAlertOpen(true)
    addEvent({
      timestamp: new Date(),
      type: 'AUTOMATIC',
      status: 'POSSIBLE_SEIZURE',
      providerNotified: autoNotifyProvider,
      summary: 'Test seizure triggered',
    })
    setTimeout(() => setTestSeizureActive(false), 5000)
  }

  const handleManualEvent = () => {
    addEvent({
      timestamp: new Date(),
      type: 'MANUAL',
      status: 'NORMAL',
      providerNotified: false,
      summary: 'Manual event logged',
    })
  }

  const getMotionColor = (level) => {
    switch (level) {
      case 'High': return 'destructive'
      case 'Medium': return 'warning'
      default: return 'success'
    }
  }

  return (
    <div className="ml-64 mt-16 p-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Live Monitor</h1>
            <p className="text-purple-200/60">Real-time seizure detection monitoring</p>
          </div>
          <Badge variant={isMonitoring ? "success" : "secondary"} className="text-lg px-4 py-2">
            {isMonitoring ? "Monitoring Active" : "Monitoring Inactive"}
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              EMG Waveform
            </CardTitle>
            <CardDescription>Real-time electromyography signal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <EMGChart />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Heart Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                key={heartRate}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-white mb-2"
              >
                {Math.round(heartRate)}
                <span className="text-lg text-purple-200/70 ml-2">bpm</span>
              </motion.div>
              <p className="text-sm text-purple-200/60">Normal range: 60-100 bpm</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Motion Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={getMotionColor(motionLevel)} className="text-lg px-4 py-2">
                {motionLevel}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={getStatusColor(currentStatus)} className="text-lg px-4 py-2 w-full justify-center">
                {getStatusLabel(currentStatus)}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Controls</CardTitle>
          <CardDescription>Manage monitoring and events</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            variant={isMonitoring ? "destructive" : "default"}
            size="lg"
          >
            {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
          </Button>
          <Button
            onClick={handleManualEvent}
            variant="outline"
            size="lg"
          >
            Mark Manual Event
          </Button>
          <Button
            onClick={handleTestSeizure}
            variant="destructive"
            size="lg"
            disabled={testSeizureActive}
          >
            Trigger Test Seizure
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {alertOpen && (
          <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/30">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <DialogTitle className="text-2xl text-red-400">
                    Seizure Detection Alert
                  </DialogTitle>
                </div>
              </DialogHeader>
              <DialogDescription className="text-base text-purple-200/80 mt-4">
                Possible seizure detected based on EMG analysis. Caregiver and nearest healthcare provider have been notified.
              </DialogDescription>
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setAlertOpen(false)}
                  className="flex-1"
                  size="lg"
                >
                  Acknowledge
                </Button>
                <Button
                  onClick={() => {
                    setAlertOpen(false)
                    handleManualEvent()
                  }}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Log Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

