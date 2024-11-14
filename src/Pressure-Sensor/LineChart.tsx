import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line'; // Importing the Line chart component

// Import the JSON file directly
import pressureSensorData from '../data/PressureSensor.json'; // Adjust the path as needed

// Define types for the sensor data
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

// Define types for the Nivo data structure
interface NivoLineDataPoint {
  x: string;
  y: number;
}

interface NivoLineData {
  id: string;
  data: NivoLineDataPoint[];
}

const LineChart: React.FC = () => {
  const [data, setData] = useState<NivoLineData[]>([]);

  useEffect(() => {
    // Use the imported JSON data
    const sensorDataResponse = pressureSensorData as SensorResponse;
    
    // Transform the data to the format needed by Nivo Line chart
    const transformedData: NivoLineData[] = sensorDataResponse.sensors.map(sensor => ({
      id: sensor.sensor_id,
      data: sensor.data.map(entry => ({
        x: entry.timestamp,
        y: entry.pressure,
      })),
    }));

    setData(transformedData);
  }, []);

  // Ensure data is in the correct format and available
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: 380, width: '100%' }}>
      <h4>Pressure Sensor Line Chart</h4>
      <ResponsiveLine
        data={data}
        xScale={{ type: 'time', format: '%Y-%m-%dT%H:%M:%SZ', precision: 'minute' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (d: string) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Formatting time on the x-axis
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
          legend: 'Pressure',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        colors={['#D32F2F', '#F44336', '#E57373', '#FFCDD2', '#B71C1C']}         lineWidth={2}
        pointSize={8}
        pointColor={{ from: 'color' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
        enablePoints={true}
        enableGridX={true}
        enableGridY={true}
        enableArea={false}
        enableSlices="x"
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 36,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
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
        tooltip={({ point }) => (
          <div style={{ background: 'white', padding: '5px', borderRadius: '3px' }}>
            <strong>{point.serieId}</strong><br />
            Time: {point.data.xFormatted}<br />
            Pressure: {point.data.yFormatted}
          </div>
        )}
      />
    </div>
  );
};

export default LineChart;
