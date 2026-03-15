"""
Test script for Flask backend
Tests the /get_sensor_data endpoint to ensure it always returns valid JSON
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_get_sensor_data():
    """Test that /get_sensor_data always returns valid JSON"""
    print("Testing /get_sensor_data endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/get_sensor_data")
        print(f"Status Code: {response.status_code}")
        
        # Check if response is valid JSON
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        # Validate structure
        assert "emg1" in data, "Missing emg1 field"
        assert "emg2" in data, "Missing emg2 field"
        assert "imu" in data, "Missing imu field"
        assert "ppg" in data, "Missing ppg field"
        assert "status" in data, "Missing status field"
        
        # Validate types
        assert isinstance(data["emg1"], (int, float)), "emg1 must be a number"
        assert isinstance(data["emg2"], (int, float)), "emg2 must be a number"
        assert isinstance(data["imu"], dict), "imu must be a dictionary"
        assert isinstance(data["ppg"], int), "ppg must be an integer"
        
        # Validate IMU structure
        assert "ax" in data["imu"], "Missing imu.ax"
        assert "ay" in data["imu"], "Missing imu.ay"
        assert "az" in data["imu"], "Missing imu.az"
        
        print("✅ All tests passed! Backend returns valid JSON structure.")
        return True
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to backend. Is Flask server running?")
        print("   Start it with: python backend/app.py")
        return False
    except AssertionError as e:
        print(f"❌ Test failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def test_simulate_sensor_data():
    """Test the simulate endpoint"""
    print("\nTesting /simulate_sensor_data endpoint...")
    
    try:
        response = requests.post(f"{BASE_URL}/simulate_sensor_data")
        print(f"Status Code: {response.status_code}")
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        print("✅ Simulation successful!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("Flask Backend Test Suite")
    print("=" * 50)
    
    # Test with no sensor data (should return defaults)
    test_get_sensor_data()
    
    # Simulate sensor data
    test_simulate_sensor_data()
    
    # Test again after simulation
    print("\nTesting /get_sensor_data after simulation...")
    test_get_sensor_data()
    
    print("\n" + "=" * 50)
    print("Test suite complete!")
    print("=" * 50)

