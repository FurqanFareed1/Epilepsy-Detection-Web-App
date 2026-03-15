import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Activity,
  History,
  User,
  Settings,
  Heart,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/monitor', label: 'Live Monitor', icon: Activity },
  { path: '/events', label: 'Events', icon: History },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-purple-500/20 bg-gradient-to-b from-purple-900/40 via-purple-800/30 to-teal-900/40 backdrop-blur-xl"
    >
      <div className="flex h-full flex-col p-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/30">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">SeizureDetect</h1>
            <p className="text-xs text-purple-300/60">Medical Monitoring</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-gradient-to-r from-purple-600/80 to-purple-700/80 text-white shadow-lg shadow-purple-500/20"
                      : "text-purple-300/70 hover:bg-purple-500/10 hover:text-purple-200"
                  )}
                >
                  <Icon className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-teal-900/30 p-4">
          <p className="text-xs font-medium text-purple-300/80">System Status</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <span className="text-xs text-purple-200/60">All Systems Operational</span>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

