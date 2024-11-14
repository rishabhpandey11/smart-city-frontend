import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import sensorData from "../data/AccelerometerData.json"; // Adjust the path as needed

interface DataPoint {
  x: number;
  y: number;
  z: number;
  timestamp: string;
}

interface Sensor {
  sensor_id: string;
  data: DataPoint[];
}

interface SensorData {
  sensors: Sensor[];
}

// Transform data to the Nivo format
const transformData = (data: SensorData) => {
  return data.sensors.map(sensor => ({
    id: sensor.sensor_id,
    data: sensor.data.map(point => ({
      x: point.x,
      y: point.y,
      z: point.z, // Optional, can be used for dot size or extra data
      timestamp: point.timestamp
    }))
  }));
};

const nivoData = transformData(sensorData);

// Define a static color scheme manually
const colorScheme = [
  '#e41a1c', // Red
  '#377eb8', // Blue
  '#4daf4a', // Green
  '#984ea3', // Purple
  '#ff7f00', // Orange
  '#ffff33', // Yellow
];

const ScatterPlotChart: React.FC = () => {
  // Map each sensor to a color from the scheme
  const sensorColors = nivoData.map((sensor, index) => ({
    id: sensor.id,
    color: colorScheme[index % colorScheme.length], // Cycle through the color scheme
  }));

  return (
    <>
      <h4>Accelerometer Scatter plot</h4>
      <div style={{ height: 350 }}>
        <ResponsiveScatterPlot
          data={nivoData}
          margin={{ top: 40, right: 40, bottom: 60, left: 90 }}
          xScale={{ type: 'linear' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          blendMode="multiply"
          axisBottom={{
            legend: 'X Axis',
            legendPosition: 'middle',
            legendOffset: 46,
          }}
          axisLeft={{
            legend: 'Y Axis',
            legendPosition: 'middle',
            legendOffset: -60,
          }}
          colors={colorScheme} // Assign the static color scheme here
          pointSize={10}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="timestamp"
          pointLabelYOffset={-12}
          useMesh={true}
          tooltip={({ node }) => (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}
            >
              <strong>{node.serieId}</strong>
              <br />
              Timestamp: {node.data.timestamp}
              <br />
              x: {node.data.x}, y: {node.data.y}
            </div>
          )}
        />
      </div>

     
    </>
  );
};

export default ScatterPlotChart;
