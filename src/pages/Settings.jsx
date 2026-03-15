import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Bell, Shield, Sliders } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { useAppStore } from '@/store/appStore'

export function Settings() {
  const {
    detectionSensitivity,
    notificationsEnabled,
    autoNotifyProvider,
    setDetectionSensitivity,
    setNotificationsEnabled,
    setAutoNotifyProvider,
  } = useAppStore()

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
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-purple-200/60">Configure detection sensitivity and notifications</p>
      </motion.div>

      <div className="space-y-6 max-w-3xl">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/30">
                  <Sliders className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Detection Sensitivity</CardTitle>
                  <CardDescription>Adjust the sensitivity of seizure detection</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-purple-200/80">Sensitivity Level</Label>
                  <span className="text-sm font-semibold text-white">{detectionSensitivity}%</span>
                </div>
                <Slider
                  value={detectionSensitivity}
                  onValueChange={setDetectionSensitivity}
                  min={0}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between text-xs text-purple-200/60">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 shadow-lg shadow-teal-500/30">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-purple-200/80">Enable Notifications</Label>
                  <p className="text-sm text-purple-200/60">Receive alerts for detected events</p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-purple-200/80">Auto-Notify Provider</Label>
                  <p className="text-sm text-purple-200/60">Automatically notify healthcare provider on detection</p>
                </div>
                <Switch
                  checked={autoNotifyProvider}
                  onCheckedChange={setAutoNotifyProvider}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/30">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Device Management</CardTitle>
                  <CardDescription>Manage connected devices</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Wearable Device #001</p>
                    <p className="text-sm text-purple-200/60">Connected • Battery: 87%</p>
                  </div>
                  <button className="rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-2 text-sm text-purple-200/80 hover:bg-purple-500/10 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

