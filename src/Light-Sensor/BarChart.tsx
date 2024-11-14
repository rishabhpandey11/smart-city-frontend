import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar'; // Importing the Bar chart component

// Import the JSON file directly
import lightSensorData from '../data/LightSensor.json'; // Adjust the path as needed

// Define types for the sensor data
interface SensorDataPoint {
  timestamp: string;
  light_intensity: number;
}

interface Sensor {
  sensor_id: string;
  data: SensorDataPoint[];
}

interface SensorResponse {
  sensors: Sensor[];
}

// Define types for the Nivo data structure
interface NivoBarDataPoint {
  timestamp: string;
  light_intensity: number;
}

const BarChart: React.FC = () => {
  const [data, setData] = useState<NivoBarDataPoint[]>([]);

  useEffect(() => {
    // Use the imported JSON data
    const sensorDataResponse = lightSensorData as SensorResponse;
    const sensorData = sensorDataResponse.sensors[0].data; // Assuming you want to use the first sensor's data

    // Transform the data to the format needed by Nivo Bar chart
    const transformedData = sensorData.map((entry) => ({
      timestamp: entry.timestamp,
      light_intensity: entry.light_intensity,
    }));

    setData(transformedData);
  }, []);

  // Ensure data is in the correct format and available
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h4>Light Sensor Bar Chart</h4>
      <ResponsiveBar
        data={data}
        keys={['light_intensity']} // The field we are measuring
        indexBy="timestamp" // The field on the x-axis
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (d) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Formatting time on the x-axis
          tickValues: 'every 1 hour',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: 50,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Light Intensity',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        colors={({ index }) => (index % 2 === 0 ? 'red' : 'orange')} // Alternating red and green
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        enableLabel={false}
        tooltip={({ id, value, indexValue }) => (
          <div style={{ background: 'white', padding: '5px', borderRadius: '3px' }}>
            <strong>{id}</strong><br />
            Time: {indexValue}<br />
            Light Intensity: {value}
          </div>
        )}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        motionConfig="stiff"
      />
    </div>
  );
};

export default BarChart;
