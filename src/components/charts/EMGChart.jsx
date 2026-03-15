import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { useEMGData } from '@/hooks/useEMGData'
import { motion } from 'framer-motion'

export function EMGChart() {
  const data = useEMGData()

  const chartData = data.map((point, index) => ({
    time: index,
    value: point.value,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData.slice(-100)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#7c3aed" opacity={0.1} />
          <XAxis
            dataKey="time"
            stroke="#a78bfa"
            style={{ fontSize: '12px' }}
            tick={false}
          />
          <YAxis
            stroke="#a78bfa"
            style={{ fontSize: '12px' }}
            domain={[-1.5, 1.5]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(88, 28, 135, 0.9)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '12px',
              color: '#fff',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#colorGradient)"
            strokeWidth={2}
            dot={false}
            animationDuration={300}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

