// LineChart.tsx
import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import temperatureSensorData from '../data/TemperatureSensor.json'; // Adjust the path if needed

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

interface LineChartData {
  id: string; // sensor_id
  data: {
    x: string; // time formatted
    y: number; // temperature
  }[];
}

const LineChart: React.FC = () => {
  const [data, setData] = useState<LineChartData[]>([]);

  useEffect(() => {
    // Cast the imported data to the expected type
    const sensorDataResponse = temperatureSensorData as SensorResponse;

    // Transform the data to the format Nivo expects
    const transformedData: LineChartData[] = sensorDataResponse.sensors.map((sensor) => ({
      id: sensor.sensor_id,
      data: sensor.data.map((entry) => ({
        x: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time
        y: entry.temperature,
      })),
    }));

    setData(transformedData);
  }, []);

  return (
    <div style={{ height: 390, width: '100%' }}>
      <h4>Temperature Sensor Line Chart</h4>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 100, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Temperature (°C)',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x"
        tooltip={({ point }) => (
          <div style={{ background: 'white', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}>
            <strong>{point.serieId}</strong><br />
            Time: {point.data.x}<br />
            Temperature: {point.data.y} °C
          </div>
        )}
      />
    </div>
  );
};

export default LineChart;
