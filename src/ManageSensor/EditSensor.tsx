import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditSensor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jsonError, setJsonError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        id: '',
        file_name: '',
        type: '',
        data: '' // CSV format initially
    });

    // Function to convert CSV format text to JSON
    const parseCSVDataToJSON = (csvData) => {
        try {
            const lines = csvData.trim().split('\n'); // Split input into lines
            return lines.map(line => {
                const [timestamp, value] = line.split(',');
                if (!timestamp || isNaN(parseFloat(value))) throw new Error("Invalid format in line: " + line);
                return { timestamp: timestamp.trim(), value: parseFloat(value.trim()) };
            });
        } catch (err) {
            throw new Error("Error parsing time series data: " + err.message);
        }
    };

    // Load sensor data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:3000/sensor_details/${id}`);
                setValues({
                    id: res.data.id,
                    file_name: res.data.file_name || '',
                    type: res.data.type || '',
                    data: res.data.data
                        ? res.data.data.map((entry) =>
                            `${entry.timestamp}, ${entry.value}`
                        ).join('\n') // Convert initial JSON data to CSV format
                        : ''
                });
            } catch (err) {
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setJsonError(null);

        try {
            const parsedData = parseCSVDataToJSON(values.data);
            const postData = {
                id: values.id,
                file_name: values.file_name,
                type: values.type,
                data: parsedData,
            };

            await axios.put(`http://localhost:3000/sensor_details/${values.id}`, postData);
            navigate('/sensor');
        } catch (err) {
            setJsonError("Error in parsing or updating the data.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '30rem', padding: '20px', borderRadius: '10px', margin: '20px auto' }}>
                <Card.Body>
                    <Card.Title style={{ marginBottom: '20px', fontSize: '2rem' }}>Edit Sensor Details</Card.Title>

                    {jsonError && <p style={{ color: 'red' }}>{jsonError}</p>}

                    <Form onSubmit={handleUpdate}>
                        {/* File Name Section */}
                        <Form.Group className="mb-3" controlId="formFileName">
                            <Form.Label>File Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='file_name'
                                value={values.file_name}
                                onChange={e => setValues({ ...values, file_name: e.target.value })}
                                placeholder="Enter sensor file name"
                            />
                        </Form.Group>

                        {/* Sensor Type Section (Dropdown) */}
                        <Form.Group className="mb-3" controlId="formSensorType">
                            <Form.Label>Sensor Type</Form.Label>
                            <Form.Select
                                aria-label="Select sensor type"
                                name="type"
                                value={values.type}
                                onChange={e => setValues({ ...values, type: e.target.value })}
                            >
                                <option value="">Select sensor type</option>
                                <option value="temperature">Temperature</option>
                                <option value="light">Light</option>
                                <option value="pressure">Pressure</option>
                                <option value="accelerometer">Accelerometer</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Data Section (CSV format) */}
                        <Form.Group className="mb-3" controlId="formData">
                            <Form.Label>Data (Enter as timestamp, value pairs)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="data"
                                placeholder='Enter time series data. Example: 2024-10-14T10:00:00Z, 23.5\n2024-10-14T11:00:00Z, 24.0'
                                value={values.data}
                                onChange={e => setValues({ ...values, data: e.target.value })}
                            />
                        </Form.Group>

                        {/* Button Section */}
                        <div className="d-flex justify-content-between">
                            <Button variant="dark" onClick={() => navigate(-1)}>Back</Button>
                            <Button variant="success" type="submit">Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditSensor;
