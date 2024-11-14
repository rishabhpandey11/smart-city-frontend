// BarChart.tsx
import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import temperatureSensorData from '../data/TemperatureSensor.json'; // Adjust the path as needed

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

interface BarChartData {
  timestamp: string; // formatted as HH:mm
  [key: string]: number | string; // dynamic key-value for temperatures
}

const BarChart: React.FC = () => {
  const [data, setData] = useState<BarChartData[]>([]);

  useEffect(() => {
    const sensorDataResponse = temperatureSensorData as SensorResponse;

    // Transform the data to match Nivo's bar chart format
    const transformedData: BarChartData[] = sensorDataResponse.sensors[0].data.map((entry, index) => {
      const formattedTime = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const dataPoint: BarChartData = { timestamp: formattedTime };

      sensorDataResponse.sensors.forEach((sensor) => {
        dataPoint[sensor.sensor_id] = sensor.data[index].temperature;
      });

      return dataPoint;
    });

    setData(transformedData);
  }, []);

  return (
    <div style={{ height: 390, width: '100%' }}>
      <h4>Temperature Sensor  Bar Chart</h4>
      <ResponsiveBar
        data={data}
        keys={['temperature_sensor_1', 'temperature_sensor_2']}
        indexBy="timestamp"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#FFD700', '#8BC34A']} // Yellow and green colors
        axisTop={null}
        axisRight={null}
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
          tickRotation: 0,
          legend: 'Temperature (°C)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        tooltip={({ id, value, indexValue }) => (
          <div
            style={{
              padding: '5px 10px',
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          >
            <strong>{id}</strong>: {value}°C<br />
            Time: {indexValue}
          </div>
        )}
        role="application"
        ariaLabel="Temperature Bar Chart"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue}°C at ${e.indexValue}`}
      />
    </div>
  );
};

export default BarChart;
