# Flask Backend for Epilepsy Detection System

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask server:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET `/get_sensor_data`
Returns current sensor readings in JSON format.

**Response Format:**
```json
{
  "emg1": 0.5,
  "emg2": -0.3,
  "imu": {
    "ax": 9.8,
    "ay": 0.2,
    "az": -0.1
  },
  "ppg": 72,
  "status": "ok"
}
```

**Features:**
- Always returns valid JSON
- Provides default values (0) if sensors haven't reported
- Handles errors gracefully

### POST `/update_sensor_data`
Receive sensor data from hardware devices.

**Request Body:**
```json
{
  "emg1": 0.5,
  "emg2": -0.3,
  "imu": {"ax": 9.8, "ay": 0.2, "az": -0.1},
  "ppg": 72
}
```

### POST `/simulate_sensor_data`
Generate simulated sensor data for testing (no hardware required).

### GET `/health`
Health check endpoint.

## Integration with React Frontend

The React app can use the `useSensorData` hook from `src/hooks/useSensorData.js`:

```javascript
import { useSensorData } from '@/hooks/useSensorData'

function MyComponent() {
  const { sensorData, error, loading } = useSensorData(1000) // Update every 1 second
  
  return (
    <div>
      <p>EMG1: {sensorData.emg1}</p>
      <p>Heart Rate: {sensorData.ppg}</p>
    </div>
  )
}
```

## Environment Variables

Create a `.env` file in the React app root:
```
VITE_API_URL=http://localhost:5000
```

## CORS

CORS is enabled for all origins. For production, restrict this to your frontend domain:

```python
CORS(app, origins=["https://yourdomain.com"])
```

