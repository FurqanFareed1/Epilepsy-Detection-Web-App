"""
Flask Backend for Epilepsy Detection System
Handles sensor data streaming with proper error handling
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Global variables to store latest sensor readings
# These would normally come from actual hardware sensors
latest_emg1 = None
latest_emg2 = None
latest_imu = None
latest_ppg = None


@app.route("/get_sensor_data", methods=["GET"])
def get_sensor_data():
    """
    Returns sensor data in a consistent JSON format.
    Always returns valid JSON with default values if sensors haven't reported yet.
    """
    try:
        # Ensure all values have defaults - prevents None/undefined issues
        data = {
            "emg1": float(latest_emg1) if latest_emg1 is not None else 0.0,
            "emg2": float(latest_emg2) if latest_emg2 is not None else 0.0,
            "imu": latest_imu if latest_imu is not None else {"ax": 0.0, "ay": 0.0, "az": 0.0},
            "ppg": int(latest_ppg) if latest_ppg is not None else 0,
            "status": "ok"
        }
        
        # Validate IMU structure
        if not isinstance(data["imu"], dict):
            data["imu"] = {"ax": 0.0, "ay": 0.0, "az": 0.0}
        else:
            # Ensure all IMU fields exist
            data["imu"] = {
                "ax": float(data["imu"].get("ax", 0.0)),
                "ay": float(data["imu"].get("ay", 0.0)),
                "az": float(data["imu"].get("az", 0.0))
            }
        
        return jsonify(data), 200
        
    except Exception as e:
        # Return error response in same format
        return jsonify({
            "emg1": 0.0,
            "emg2": 0.0,
            "imu": {"ax": 0.0, "ay": 0.0, "az": 0.0},
            "ppg": 0,
            "status": "error",
            "error": str(e)
        }), 500


@app.route("/update_sensor_data", methods=["POST"])
def update_sensor_data():
    """
    Endpoint to receive sensor data from hardware.
    This simulates receiving data from actual sensors.
    """
    global latest_emg1, latest_emg2, latest_imu, latest_ppg
    
    try:
        json_data = request.get_json()
        
        if json_data is None:
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400
        
        # Update sensor values if provided
        if "emg1" in json_data:
            latest_emg1 = json_data["emg1"]
        if "emg2" in json_data:
            latest_emg2 = json_data["emg2"]
        if "imu" in json_data:
            latest_imu = json_data["imu"]
        if "ppg" in json_data:
            latest_ppg = json_data["ppg"]
        
        return jsonify({"status": "ok", "message": "Sensor data updated"}), 200
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/simulate_sensor_data", methods=["POST"])
def simulate_sensor_data():
    """
    Simulates sensor data for testing purposes.
    Useful for development when hardware isn't available.
    """
    global latest_emg1, latest_emg2, latest_imu, latest_ppg
    
    # Simulate EMG data (sine wave with noise)
    t = time.time()
    latest_emg1 = round(random.uniform(-1.0, 1.0) + 0.5 * random.sin(t), 3)
    latest_emg2 = round(random.uniform(-1.0, 1.0) + 0.5 * random.sin(t + 1), 3)
    
    # Simulate IMU data (accelerometer)
    latest_imu = {
        "ax": round(random.uniform(-9.8, 9.8), 2),
        "ay": round(random.uniform(-9.8, 9.8), 2),
        "az": round(random.uniform(-9.8, 9.8), 2)
    }
    
    # Simulate PPG data (heart rate sensor)
    latest_ppg = random.randint(60, 120)
    
    return jsonify({
        "status": "ok",
        "message": "Sensor data simulated",
        "data": {
            "emg1": latest_emg1,
            "emg2": latest_emg2,
            "imu": latest_imu,
            "ppg": latest_ppg
        }
    }), 200


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Backend is running"}), 200


if __name__ == "__main__":
    print("Starting Flask backend server...")
    print("Endpoints:")
    print("  GET  /get_sensor_data - Get current sensor readings")
    print("  POST /update_sensor_data - Update sensor data (from hardware)")
    print("  POST /simulate_sensor_data - Simulate sensor data (for testing)")
    print("  GET  /health - Health check")
    
    app.run(debug=True, host="0.0.0.0", port=5000)

