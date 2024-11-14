import React, { useEffect, useState } from "react";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


// TypeScript component definition
const RegisterSensor: React.FC = () => {

    interface SensorFile {
        id: number;
        file_name: string;
        type: string;
        data: string;
    }

    const [data, setData] = useState<SensorFile[]>([]); // State to hold the data, typed as an array of SensorFile
    const [loading, setLoading] = useState<boolean>(true); // State to show loading indicator
    const [error, setError] = useState<string | null>(null); // State to handle errors, typed as a string or null
    const navigate = useNavigate();


    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<SensorFile[]>('http://localhost:3000/sensor_details');
                setData(res.data); // Set data when successful
            } catch (err: any) { // Handle error with proper typing
                setError(err.message); // Display error
            } finally {
                setLoading(false); // Stop loading once data is fetched or failed
            }
        };
        fetchData();
    }, []);

    const handleDelete =(id)=> {
        const confirm  = window.confirm("Would you like to Delete?");
        if(confirm){
            axios.delete(`http://localhost:3000/sensor_details/${id}`)
            .then(res => {
location.reload();
            }).catch (
                err=>console.log(err)
            )
        }
    }
    // Display loading, error, or data
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div style={{ height: '5vh' }}></div>
            <Stack direction="vertical" gap={3}>
                <div style={{
                    backgroundColor: 'black',
                    padding: '20px',
                    borderRadius: '8px',
                    height: '30vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '3rem',

                    }}>Register the sensor here</h1>




                    <Link to={'/addsensor'} className="btn" style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '5px',
                        margin: '10px 0',
                        width: '20%',
                        fontSize: '1rem',
                        textAlign: 'center'
                    }}>
                        Add Sensor +
                    </Link>

                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th className="extra-bold">ID</th>
                                <th>File Names</th>
                                <th>Type</th>
                                <th>Data</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.file_name}</td>
                                    <td>{d.type}</td>
                                    <td>
                                        <Link to={`/readsensor/${d.id}`} className="btn" style={{ backgroundColor: '#00008B', color: 'white' }}>
                                            Read
                                        </Link></td>
                                    <td>
                                        <Stack direction="horizontal" gap={3}>

                                            <Link to={`/editsensor/${d.id}`} className="btn" style={{ backgroundColor: '#007bff', color: 'white' }}>
                                                Edit
                                            </Link>
                                            <button onClick={e => handleDelete(d.id)} className="btn" style={{ backgroundColor: 'red', color: 'white' }}>
                                                Delete
                                            </button>
                                        </Stack>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Stack>
        </div>
    );
};

export default RegisterSensor;
