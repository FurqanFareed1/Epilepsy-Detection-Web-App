import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/layout/Sidebar'
import { TopNav } from './components/layout/TopNav'
import { Home } from './pages/Home'
import { LiveMonitor } from './pages/LiveMonitor'
import { Events } from './pages/Events'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-teal-900/20 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)] pointer-events-none" />
        
        <Sidebar />
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monitor" element={<LiveMonitor />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

