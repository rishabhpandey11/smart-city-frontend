import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import { Link } from "react-router-dom";

// Define the type for a sensor file
interface SensorFile {
    id: number;
    file_name: string;
    uploaded_date: string;
    comments: string;
}

const SensorTable: React.FC = () => {
    const [data, setData] = useState<SensorFile[]>([]); // State to hold the data, typed as an array of SensorFile
    const [loading, setLoading] = useState<boolean>(true); // State to show loading indicator
    const [error, setError] = useState<string | null>(null); // State to handle errors, typed as a string or null


    // fetching the sensor file data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<SensorFile[]>('http://localhost:3000/sensor_files');
                setData(res.data);
            } catch (err: any) { // Handle error with proper typing
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


//Handle delete
    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to Delete?");
        if (confirm) {
            axios.delete(`http://localhost:3000/sensor_files/${id}`)
                .then(res => {
                    location.reload();
                }).catch(
                    err => console.log(err)
                )
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (

        <div className="d-flex justify-content-center align-items-center">
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr >
                        <th className="extra-bold">ID</th>
                        <th>File Names</th>
                        <th>Uploaded Date</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{d.file_name}</td>
                            <td>{d.uploaded_date}</td>
                            <td>{d.comments}

                            </td>
                            <td>
                                <Stack direction="horizontal" gap={3}>
                                    <Link to={`/read/${d.id}`} className="btn" style={{ backgroundColor: '#00008B', color: 'white' }}>Read</Link>
                                    <Link to={`/update/${d.id}`} className="btn" style={{ backgroundColor: '#87CEEB', color: 'white' }}>
                                        Edit
                                    </Link>
                                    <button onClick={e => handleDelete(d.id)} className="btn" style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                                </Stack>

                            </td>
                        </tr>
                    ))}


                </tbody>
            </Table>
        </div>

    );
}

export default SensorTable;
