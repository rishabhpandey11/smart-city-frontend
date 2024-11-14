import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line'; // Correctly importing the Line chart for Area

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
interface NivoLineDataPoint {
  x: string;
  y: number;
}

interface NivoLineData {
  id: string;
  data: NivoLineDataPoint[];
}

const AreaChart: React.FC = () => {
  const [data, setData] = useState<NivoLineData[]>([]);

  useEffect(() => {
    // Use the imported JSON data
    const sensorDataResponse = lightSensorData as SensorResponse;
    const sensorData = sensorDataResponse.sensors[0].data; // Assuming you want to use the first sensor's data

    // Transform the data to the format needed by Nivo
    const transformedData: NivoLineData[] = [
      {
        id: 'light_intensity',
        data: sensorData.map((entry) => ({
          x: entry.timestamp,
          y: entry.light_intensity,
        })),
      },
    ];

    setData(transformedData);
  }, []);

  return (
    <div style={{ height: 380, width: '100%' }}>
      <h4>Light sensor Area Chart</h4>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        xScale={{ type: 'time', format: '%Y-%m-%dT%H:%M:%S%Z', precision: 'minute' }}
        xFormat="time:%Y-%m-%dT%H:%M:%S%Z"
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: '%H:%M',
          tickValues: 'every 1 hour',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Time',
          legendOffset: 50,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Light Intensity',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel={(point) => `Intensity: ${point.y}`} // Corrected point label access
        enableArea={true} // Enables area below the lines
        useMesh={true}
        motionConfig="stiff"
        tooltip={({ point }) => (
          <div style={{ background: 'white', padding: '5px', borderRadius: '3px' }}>
            <strong>{point.serieId}</strong><br />
            Timestamp: {point.data.xFormatted}<br />
            Light Intensity: {point.data.yFormatted}
          </div>
        )}
      />
    </div>
  );
};

export default AreaChart;
