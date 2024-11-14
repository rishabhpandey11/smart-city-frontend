import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sensorData from "../data/AccelerometerData.json"; // Adjust the path as needed

// Define types for the sensor data
interface SensorDataPoint {
  timestamp: string;
  x: number;
  y: number;
  z: number;
}

interface Sensor {
  sensor_id: string;
  data: SensorDataPoint[];
}

interface SensorData {
  sensors: Sensor[];
}

interface LineDataPoint {
  x: string;
  y: number;
}

interface LineData {
  id: string;
  data: LineDataPoint[];
}

const LineChart: React.FC = () => {
  const [formattedData, setFormattedData] = useState<LineData[]>([]);
  const [filteredData, setFilteredData] = useState<LineData[]>([]); // State for filtered data
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Format the data for the nivo line chart
  useEffect(() => {
    const processData = () => {
      const sensors: Sensor[] = (sensorData as SensorData).sensors;

      // Convert timestamp string to Date object
      const parseTimestamp = (timestamp: string): Date => {
        return new Date(timestamp);
      };

      // Iterate over each sensor and create separate lines for x, y, and z axes
      const lines: LineData[] = sensors.reduce((acc: LineData[], sensor: Sensor) => {
        const xLine: LineData = {
          id: `${sensor.sensor_id} - X`,
          data: sensor.data.map((point: SensorDataPoint) => ({
            x: parseTimestamp(point.timestamp).toISOString(), // Store as ISO string
            y: point.x,
          })),
        };
        const yLine: LineData = {
          id: `${sensor.sensor_id} - Y`,
          data: sensor.data.map((point: SensorDataPoint) => ({
            x: parseTimestamp(point.timestamp).toISOString(),
            y: point.y,
          })),
        };
        const zLine: LineData = {
          id: `${sensor.sensor_id} - Z`,
          data: sensor.data.map((point: SensorDataPoint) => ({
            x: parseTimestamp(point.timestamp).toISOString(),
            y: point.z,
          })),
        };

        return [...acc, xLine, yLine, zLine];
      }, []);

      setFormattedData(lines);
      setFilteredData(lines); // Initially set the filtered data to be the same as the formatted data
    };

    processData();
  }, []);

  // Filter data between selected time points
  useEffect(() => {
    if (startTime && endTime) {
      const filtered = formattedData.map((line) => ({
        ...line,
        data: line.data.filter(
          (point) => {
            const pointTime = new Date(point.x).getTime(); // Convert x (timestamp) back to Date for comparison
            return pointTime >= startTime.getTime() && pointTime <= endTime.getTime();
          }
        ),
      }));

      setFilteredData(filtered);
    } else {
      setFilteredData(formattedData); // Reset to original data if no time range is selected
    }
  }, [startTime, endTime, formattedData]);

  return (
    <div>
      <h4> Accelerometer Line Chart </h4>

      {/* Time Range Pickers */}
      <div style={{ marginBottom: "20px" }}>
        <label>Start Time: </label>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          placeholderText="Select Start Time"
        />
        <label style={{ marginLeft: "20px" }}>End Time: </label>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          placeholderText="Select End Time"
        />
      </div>

      {/* Line chart displaying the filtered data */}
      <div style={{ height: "350px" }}>
        <ResponsiveLine
          data={filteredData}
          margin={{ top: 50, right: 110, bottom: 90, left: 60 }}
          xScale={{ type: "time", format: "%Y-%m-%dT%H:%M:%S.%LZ", precision: "second" }} // Use time scale for x-axis
          xFormat="time:%H:%M:%S"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
            format: "%H:%M:%S", // Show formatted time on the x-axis
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Acceleration",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "nivo" }}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LineChart;
