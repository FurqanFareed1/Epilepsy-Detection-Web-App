import { motion } from 'framer-motion'
import { Activity, Battery, AlertCircle, Play, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/appStore'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const { deviceConnected, batteryLevel, isMonitoring, events, setIsMonitoring } = useAppStore()
  const navigate = useNavigate()
  const lastEvent = events[0]

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  return (
    <div className="ml-64 mt-16 p-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-purple-200/60">Monitor seizure detection in real-time</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Device Status</CardTitle>
                <Activity className={deviceConnected ? "h-5 w-5 text-green-400" : "h-5 w-5 text-red-400"} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Badge variant={deviceConnected ? "success" : "destructive"}>
                  {deviceConnected ? "Connected" : "Disconnected"}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-purple-200/70">
                  <Battery className="h-4 w-4" />
                  <span>{batteryLevel}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-transparent" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Monitoring</CardTitle>
                <TrendingUp className="h-5 w-5 text-teal-400" />
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant={isMonitoring ? "success" : "secondary"}>
                {isMonitoring ? "Active" : "Inactive"}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Last Event</CardTitle>
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              {lastEvent ? (
                <div className="space-y-2">
                  <p className="text-sm text-purple-200/70">
                    {lastEvent.timestamp.toLocaleString()}
                  </p>
                  <Badge variant={lastEvent.status === 'POSSIBLE_SEIZURE' ? "destructive" : "secondary"}>
                    {lastEvent.type}
                  </Badge>
                </div>
              ) : (
                <p className="text-sm text-purple-200/70">No events recorded</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-teal-600/10 to-purple-600/10" />
          <CardHeader>
            <CardTitle className="text-2xl">Quick Actions</CardTitle>
            <CardDescription>Start monitoring or view live data</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button
              onClick={() => {
                setIsMonitoring(true)
                navigate('/monitor')
              }}
              size="lg"
              className="flex items-center gap-2"
            >
              <Play className="h-5 w-5" />
              Start Monitoring
            </Button>
            <Button
              onClick={() => navigate('/monitor')}
              variant="outline"
              size="lg"
            >
              View Live Monitor
            </Button>
            <Button
              onClick={() => navigate('/events')}
              variant="outline"
              size="lg"
            >
              View Events
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

