import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import sensorData from '../data/PressureSensor.json'; // Adjust the path based on your file location

// Define interfaces for type safety
interface SensorDataPoint {
  timestamp: string;
  pressure: number;
}

interface Sensor {
  sensor_id: string;
  data: SensorDataPoint[];
}

interface FormattedData {
  timestamp: string;
  sensor_1?: number;
  sensor_2?: number;
}

// Function to format the data for the Nivo bar chart
const formatDataForBarChart = (sensors: Sensor[]): FormattedData[] => {
  const formattedData: FormattedData[] = [];

  sensors.forEach((sensor) => {
    sensor.data.forEach((entry) => {
      const time = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const existingEntry = formattedData.find((d) => d.timestamp === time);
      if (existingEntry) {
        existingEntry[sensor.sensor_id] = entry.pressure;
      } else {
        formattedData.push({
          timestamp: time,
          [sensor.sensor_id]: entry.pressure,
        });
      }
    });
  });

  return formattedData;
};

// Prepare the formatted data for the bar chart
const data = formatDataForBarChart(sensorData.sensors);

const BarChart: React.FC = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <h4>Pressure Sensor Bar Chart</h4>

      <ResponsiveBar
        data={data}
        keys={['sensor_1', 'sensor_2']} // Ensure these keys match your sensor IDs
        indexBy="timestamp"
        margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
        padding={0.3} // Adjust padding for side-by-side bars
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'set2' }} // Use a different color scheme for a vibrant look
        animate={true} // Enable animations
        motionConfig="gentle" // Smooth animations
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
          legend: 'Pressure (hPa)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        tooltip={({ id, value, indexValue }) => (
          <div style={{ color: 'white', background: '#333', padding: '5px', borderRadius: '5px' }}>
            <strong>{id}</strong>: {value} hPa <br /> Time: {indexValue}
          </div>
        )}
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
        role="application"
        ariaLabel="Pressure Sensor Bar Chart"
        barAriaLabel={(e) => `${e.id}: ${e.value} at ${e.indexValue}`}
      />
    </div>
  );
};

export default BarChart;
