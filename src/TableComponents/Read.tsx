import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Define the SensorFile type
interface SensorFile {
  id: number;
  file_name: string;
  uploaded_date: string;
  comments: string;
}

const Read: React.FC = () => {
  const [data, setData] = useState<SensorFile | null>(null); // Corrected to hold a single object or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Grab 'id' from the route params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<SensorFile>(`http://localhost:3000/sensor_files/${id}`);
        console.log(res)
        setData(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Added 'id' as a dependency

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data found.</p>; // Added a check for null data

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3>Details</h3>
        <div className="mb-2">
          <strong>Filename: {data.file_name}</strong>
        </div>
        <div className="mb-2">
          <strong>Upload Date: {data.uploaded_date}</strong>
        </div>
        <div className="mb-2">
          <strong>Comments: {data.comments}</strong>
        </div>
        <Link to={`/update/${data.id}`} className="btn" style={{ backgroundColor: 'green', color: 'white' }}>
          Edit
        </Link>
        <Link to="/filesuploaded" className="btn" style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default Read;
