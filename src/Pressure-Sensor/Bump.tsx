import React, { useEffect, useState } from 'react';
import { ResponsiveBump } from '@nivo/bump';
import pressureSensorData from '../data/PressureSensor.json'; // Adjust the path as needed

interface SensorDataPoint {
  timestamp: string;
  pressure: number;
}

interface Sensor {
  sensor_id: string;
  data: SensorDataPoint[];
}

interface SensorResponse {
  sensors: Sensor[];
}

interface BumpChartData {
  id: string; // sensor_id
  data: {
    x: string; // time only
    y: number; // pressure
  }[];
}

const BumpChart: React.FC = () => {
  const [data, setData] = useState<BumpChartData[]>([]);

  useEffect(() => {
    const sensorDataResponse = pressureSensorData as SensorResponse;

    const transformedData: BumpChartData[] = sensorDataResponse.sensors.map(sensor => ({
      id: sensor.sensor_id,
      data: sensor.data.map(entry => ({
        x: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time
        y: entry.pressure,
      })),
    }));

    setData(transformedData);
  }, []);

  return (
    <div style={{ height: 390, width: '100%' }}>
      <h4>Pressure Sensor Bump Chart</h4>
      <ResponsiveBump
        data={data}
        margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
        colors={['#6A994E', '#A7C957', '#386641', '#81B29A', '#588157']}
        lineWidth={4}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel={(point) => `Pressure: ${point.y}`}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Pressure',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableGridX={false}
        enableGridY={true}
        useMesh={true}
        tooltip={({ point }) => (
          <div style={{ background: 'white', padding: '5px', borderRadius: '3px' }}>
            <strong>{point.serieId}</strong><br />
            Time: {point.data.x}<br />
            Pressure: {point.data.y}
          </div>
        )}
      />
    </div>
  );
};

export default BumpChart;
