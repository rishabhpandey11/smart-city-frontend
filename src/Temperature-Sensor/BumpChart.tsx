// BumpChart.tsx
import React, { useEffect, useState } from 'react';
import { ResponsiveBump } from '@nivo/bump';
import temperatureSensorData from '../data/TemperatureSensor.json'; // Adjust the path as needed

// Define the types for the sensor data
interface SensorDataPoint {
  timestamp: string;
  temperature: number;
}

interface Sensor {
  sensor_id: string;
  data: SensorDataPoint[];
}

interface SensorResponse {
  sensors: Sensor[];
}

// Define the type for bump chart data format
interface BumpChartData {
  id: string; // sensor_id
  data: {
    x: string; // formatted time
    y: number; // temperature
  }[];
}

const BumpChart: React.FC = () => {
  const [data, setData] = useState<BumpChartData[]>([]);

  useEffect(() => {
    const sensorDataResponse = temperatureSensorData as SensorResponse;

    // Transform the JSON data into the format required by Nivo Bump Chart
    const transformedData: BumpChartData[] = sensorDataResponse.sensors.map((sensor) => ({
      id: sensor.sensor_id,
      data: sensor.data.map((entry) => ({
        x: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // format time
        y: entry.temperature,
      })),
    }));

    setData(transformedData);
  }, []);

  return (
    <div style={{ height: 390, width: '100%' }}>
      <h4>Temperature Sensor Bump Chart</h4>
      <ResponsiveBump
        data={data}
        margin={{ top: 40, right: 120, bottom: 60, left: 60 }}
        colors={['#6A994E', '#A7C957', '#386641', '#81B29A', '#588157']}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        pointSize={10}
        activePointSize={12}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        pointBorderColor={{ from: 'serieColor' }}
        enableGridX={false}
        enableGridY={true}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Temperature (°C)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        useMesh={true}
        tooltip={({ point }) => (
          <div
            style={{
              background: 'white',
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          >
            <strong>{point.serieId}</strong>
            <br />
            Time: {point.data.x}
            <br />
            Temperature: {point.data.y}°C
          </div>
        )}
      />
    </div>
  );
};

export default BumpChart;
