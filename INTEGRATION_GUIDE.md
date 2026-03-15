# Integration Guide: Flask Backend + React Frontend

## Quick Start

### 1. Start Flask Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on `http://localhost:5000`

### 2. Start React Frontend

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 3. Connect React to Flask

The React app already has a hook ready: `src/hooks/useSensorData.js`

## Using Sensor Data in React Components

### Example: Display Sensor Values

```jsx
import { useSensorData } from '@/hooks/useSensorData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SensorDisplay() {
  const { sensorData, error, loading } = useSensorData(1000) // Update every 1 second

  if (loading) return <div>Loading sensor data...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>EMG 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{sensorData.emg1.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>EMG 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{sensorData.emg2.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Heart Rate (PPG)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{sensorData.ppg} bpm</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>IMU Accelerometer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            X: {sensorData.imu.ax.toFixed(2)}<br />
            Y: {sensorData.imu.ay.toFixed(2)}<br />
            Z: {sensorData.imu.az.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Example: Update LiveMonitor Page

You can replace the simulated EMG data with real sensor data:

```jsx
// In src/pages/LiveMonitor.jsx
import { useSensorData } from '@/hooks/useSensorData'

export function LiveMonitor() {
  // Replace useEMGData() with real sensor data
  const { sensorData } = useSensorData(50) // Update every 50ms for smooth chart
  
  // Convert sensor data to chart format
  const emgData = useMemo(() => {
    return sensorData.emg1 // Use real EMG1 data
  }, [sensorData])
  
  // ... rest of component
}
```

## Environment Configuration

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:5000
```

## Testing

### Test Backend

```bash
cd backend
python test_backend.py
```

### Test Frontend Integration

1. Start Flask backend
2. Start React frontend
3. Navigate to Live Monitor page
4. Check browser console for any errors
5. Verify sensor values update every second

## Troubleshooting

### CORS Errors

If you see CORS errors, ensure:
- Flask backend has `CORS(app)` enabled
- Backend is running on port 5000
- Frontend is making requests to correct URL

### Connection Refused

- Check Flask backend is running: `curl http://localhost:5000/health`
- Verify `VITE_API_URL` in `.env` matches backend URL

### Data Not Updating

- Check browser console for errors
- Verify network tab shows successful requests
- Ensure `useSensorData` hook is being called

## Production Deployment

### Backend

1. Use production WSGI server (gunicorn):
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

2. Update CORS to allow only your frontend domain:
```python
CORS(app, origins=["https://yourdomain.com"])
```

### Frontend

1. Build React app:
```bash
npm run build
```

2. Set production API URL:
```env
VITE_API_URL=https://api.yourdomain.com
```

