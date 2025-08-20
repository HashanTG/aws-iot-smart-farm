import React, { useEffect, useState } from "react";

// Define the shape of your sensor data
interface SensorData {
  humidity: number;
  temperature: number;
  soilAnalog: number;
  soilPercentage: number;
  soilDigital: number;
}

const SensorDashboard: React.FC = () => {
  // State to store the latest sensor data
  const [latestData, setLatestData] = useState<SensorData | null>(null);
  // State to simulate connection status
  const [connectionStatus, setConnectionStatus] = useState(
    "Initializing data stream..."
  );

  useEffect(() => {
    // Simulate initial data load after a short delay
    const initialData: SensorData = {
      humidity: 70,
      temperature: 28.5,
      soilAnalog: 2500,
      soilPercentage: 45,
      soilDigital: 1, // 1 for Dry (needs water), 0 for Wet (happy plant)
    };
    setLatestData(initialData);
    setConnectionStatus("Data stream active (simulated)");

    // Simulate real-time data updates every 5 seconds
    const interval = setInterval(() => {
      setLatestData((prevData) => {
        if (!prevData) {
          return initialData; // Fallback if for some reason prevData is null
        }
        // Simulate changes to sensor data
        const newTemp = parseFloat((Math.random() * (32 - 25) + 25).toFixed(1)); // Temp between 25-32
        const newHumidity = Math.floor(Math.random() * (85 - 65) + 65); // Humidity between 65-85
        const newSoilAnalog = Math.floor(Math.random() * (3500 - 1500) + 1500); // Analog between 1500-3500

        // Recalculate soil percentage and digital status based on simulated analog
        // These calibration values should match what's in your ESP32 code
        const AIR_VALUE = 3600; // Raw analog reading in dry air (higher value = drier)
        const WATER_VALUE = 1200; // Raw analog reading in water (lower value = wetter)

        // Map the raw analog value to a 0-100% range
        // Note: The mapping is inverted for soil moisture where higher analog means drier (less moisture)
        let newSoilPercentage = Math.floor(
          mapRange(newSoilAnalog, AIR_VALUE, WATER_VALUE, 0, 100)
        );
        newSoilPercentage = Math.max(0, Math.min(100, newSoilPercentage)); // Clamp to 0-100%

        // Determine digital soil status (1 for dry, 0 for wet) based on a threshold
        const newSoilDigital = newSoilPercentage < 30 ? 1 : 0; // Simulated dry if percentage is below 30%

        return {
          humidity: newHumidity,
          temperature: newTemp,
          soilAnalog: newSoilAnalog,
          soilPercentage: newSoilPercentage,
          soilDigital: newSoilDigital,
        };
      });
    }, 5000); // Update every 5 seconds

    // Cleanup interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs only once on mount

  // Helper function to map a value from one range to another
  const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans antialiased text-gray-800">
      {/* Dashboard Title with improved styling */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-blue-600 shadow-xl tracking-tight leading-tight text-center">
        🌱 Smart Plant Monitor
      </h1>

      {/* Connection Status Indicator - more subtle animation */}
      <p className="text-lg text-gray-700 mb-6 animate-pulse-slow">
        {connectionStatus}
      </p>

      {/* Conditional Rendering: Show data if available, otherwise a loading message */}
      {latestData ? (
        // Data Display Card - enhanced visuals
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md border border-gray-100 transform transition-all duration-300 hover:scale-102 hover:shadow-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-4 border-gray-100">
            Live Sensor Readings
          </h2>
          {/* Grid layout for sensor values, responsive */}
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-6">
            {/* Temperature Card */}
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl shadow-md border border-purple-100 transition-transform hover:scale-105 duration-200">
              <span className="text-purple-600 text-4xl mb-2">🌡️</span>
              <p className="text-lg font-semibold text-gray-700">Temperature</p>
              <p className="text-4xl font-extrabold text-purple-800 mt-1">
                {latestData.temperature}°C
              </p>
            </div>
            {/* Humidity Card */}
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl shadow-md border border-blue-100 transition-transform hover:scale-105 duration-200">
              <span className="text-blue-600 text-4xl mb-2">💧</span>
              <p className="text-lg font-semibold text-gray-700">Humidity</p>
              <p className="text-4xl font-extrabold text-blue-800 mt-1">
                {latestData.humidity}%
              </p>
            </div>
            {/* Soil Moisture Card (spanning full width on small screens, better layout on larger) */}
            <div className="flex flex-col items-center p-4 col-span-full bg-green-50 rounded-xl shadow-md border border-green-100 transition-transform hover:scale-105 duration-200">
              <span className="text-green-600 text-4xl mb-2">🌿</span>
              <p className="text-lg font-semibold text-gray-700">
                Soil Moisture
              </p>
              <p className="text-4xl font-extrabold text-green-800 mt-1">
                {latestData.soilPercentage}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                (Raw: {latestData.soilAnalog})
              </p>
            </div>
            {/* Soil Status Card (spanning full width) */}
            <div className="flex flex-col items-center p-4 col-span-full bg-orange-50 rounded-xl shadow-md border border-orange-100 transition-transform hover:scale-105 duration-200">
              <span className="text-orange-600 text-4xl mb-2">🌱</span>
              <p className="text-lg font-semibold text-gray-700">Soil Status</p>
              <p
                className={`text-4xl font-extrabold mt-1 ${
                  latestData.soilDigital === 1
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {latestData.soilDigital === 1
                  ? "DRY - Needs Water!"
                  : "WET - Happy Plant!"}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-8 text-center font-mono">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      ) : (
        // Loading Message with improved visuals
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center text-gray-600 animate-pulse border border-gray-100">
          <p className="text-xl sm:text-2xl font-semibold mb-4">
            Initializing sensors...
          </p>
          <p className="text-lg">Waiting for simulated data...</p>
        </div>
      )}

      {/* Footer with improved text */}
      <footer className="mt-12 text-gray-600 text-sm sm:text-base text-center max-w-md">
        An intelligent plant monitoring system powered by ESP32 microcontrollers
        and intuitive dashboard interface.
      </footer>
    </div>
  );
};

export default SensorDashboard;
