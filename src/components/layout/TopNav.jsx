import { Bell, Battery, Wifi } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { Badge } from '@/components/ui/badge'

export function TopNav() {
  const { batteryLevel, deviceConnected, alertOpen } = useAppStore()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed right-0 top-0 z-30 ml-64 flex h-16 items-center justify-between border-b border-purple-500/20 bg-gradient-to-r from-purple-900/40 via-purple-800/30 to-teal-900/40 backdrop-blur-xl px-6"
    >
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-900/20 px-3 py-1.5">
          <Wifi className={deviceConnected ? "h-4 w-4 text-green-400" : "h-4 w-4 text-red-400"} />
          <span className="text-xs text-purple-200/70">
            {deviceConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-900/20 px-3 py-1.5">
          <Battery className="h-4 w-4 text-teal-400" />
          <span className="text-xs text-purple-200/70">{batteryLevel}%</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-xl border border-purple-500/20 bg-purple-900/20 p-2 text-purple-200/70 hover:bg-purple-500/10 hover:text-purple-200"
        >
          <Bell className="h-5 w-5" />
          {alertOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
            />
          )}
        </motion.button>
      </div>
    </motion.header>
  )
}

