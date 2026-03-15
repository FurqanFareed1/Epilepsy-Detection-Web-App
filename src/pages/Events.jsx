import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/appStore'
import { getStatusColor, getStatusLabel } from '@/utils/seizureDetection'

export function Events() {
  const { events } = useAppStore()

  const getTypeIcon = (type) => {
    switch (type) {
      case 'AUTOMATIC':
        return <AlertCircle className="h-4 w-4" />
      case 'MANUAL':
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="ml-64 mt-16 p-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Event History</h1>
        <p className="text-purple-200/60">View all detected events and manual logs</p>
      </motion.div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-purple-200/60">No events recorded yet</p>
            </CardContent>
          </Card>
        ) : (
          events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden hover:border-purple-500/40 transition-all">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-teal-600" />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/30 to-purple-700/30">
                        {getTypeIcon(event.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{getStatusLabel(event.status)}</CardTitle>
                        <CardDescription className="mt-1">
                          {event.timestamp.toLocaleString()}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(event.status)}>
                        {event.type}
                      </Badge>
                      {event.providerNotified ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-purple-400/50" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200/80">{event.summary}</p>
                  {event.providerNotified && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>Healthcare provider notified</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

