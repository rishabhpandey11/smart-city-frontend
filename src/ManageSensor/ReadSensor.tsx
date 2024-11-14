import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

// Define the SensorFile type
interface SensorFile {
  id: number;
  file_name: string;
  uploaded_date: string;
  comments: string;
}

const ReadSensor: React.FC = () => {
  const [pick, setPick] = useState<SensorFile | null>(null); // Corrected to hold a single object or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Grab 'id' from the route params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<SensorFile>(`http://localhost:3000/sensor_details/`+ id);
        console.log(res)
        setPick(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Added 'id' as a dependency

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pick) return <p>No data found.</p>; // Added a check for null data

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
      <h2>Sensor Details</h2>
        <div className="mb-2">
          <strong>Filename: {pick.file_name}</strong>
        </div>
        <div className="mb-2">
          <strong>Sensor Type: {pick.type}</strong>
        </div>
      
        
                  {/* Displaying each item in the `data` array */}
        <div className="mb-2">
          <strong>Data:</strong>
          <ul>
            {pick.data.map((item, index) => (
              <li key={index}>
                <strong>Timestamp:</strong> {item.timestamp}, <strong>Value:</strong> {item.value}
              </li>
            ))}
          </ul>
        </div>

        <Link to={`/editsensor/${pick.id}`} className="btn" style={{ backgroundColor: 'green', color: 'white' }}>
          Edit
        </Link>
        <Link to="/sensor" className="btn" style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default ReadSensor;
