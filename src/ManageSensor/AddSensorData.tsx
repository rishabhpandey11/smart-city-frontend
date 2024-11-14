import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddSensorData() {
    const [values, setValues] = useState({
        file_name: '',
        type: '',
        data: '' // Data will initially be entered as plain text and converted to JSON
    });

    const [error, setError] = useState(null);
    const [jsonError, setJsonError] = useState(null); // To handle JSON parsing errors

    const navigate = useNavigate();

    // A single change handler for all fields
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Function to convert plain text time series data to JSON format
    const parseTimeSeriesData = (text) => {
        try {
            const lines = text.trim().split('\n'); // Split input into lines
            const dataPoints = lines.map(line => {
                const [timestamp, value] = line.split(','); // Split each line by comma
                if (!timestamp || isNaN(parseFloat(value))) {
                    throw new Error("Invalid format in line: " + line);
                }
                return {
                    timestamp: timestamp.trim(),
                    value: parseFloat(value.trim())
                };
            });
            return dataPoints;
        } catch (err) {
            throw new Error("Error parsing time series data: " + err.message);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Reset errors
        setJsonError(null);

        // Basic validation: Check if all fields are filled in
        if (!values.file_name || !values.type || !values.data) {
            setError("All fields are required!");
            return;
        }

        // Parse the data field (converting raw text into JSON format)
        try {
            const parsedData = parseTimeSeriesData(values.data); // Convert text to JSON format

            // Post the data to the API
            const postData = {
                file_name: values.file_name,
                type: values.type,
                data: parsedData // JSON formatted data
            };

            axios.post('http://localhost:3000/sensor_details', postData)
                .then((res) => {
                    console.log(res);
                    navigate('/sensor'); // Redirect to sensor list page after successful submit
                })
                .catch((err) => {
                    console.log(err);
                    setError("Failed to submit sensor data.");
                });

        } catch (err) {
            console.error(err);
            setJsonError(err.message); // Display parsing error
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '30rem', padding: '20px', borderRadius: '10px', margin: '20px auto' }}>
                <Card.Body>
                    <Card.Title style={{ marginBottom: '20px', fontSize: '2rem' }}>Add Sensor Details</Card.Title>

                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message for validation */}
                    {jsonError && <p style={{ color: 'red' }}>{jsonError}</p>} {/* Error message for JSON parsing */}

                    <Form onSubmit={handleSubmit}>
                        {/* File Name Section */}
                        <Form.Group className="mb-3" controlId="formFileName">
                            <Form.Label>File Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="file_name"
                                onChange={handleChange} // Use the generic handler
                                placeholder="Enter sensor file name"
                            />
                        </Form.Group>

                        {/* Sensor Type Section (Dropdown) */}
                        <Form.Group className="mb-3" controlId="formSensorType">
                            <Form.Label>Sensor Type</Form.Label>
                            <Form.Select
                                aria-label="Select sensor type"
                                name="type"
                                onChange={handleChange} // Use the generic handler
                            >
                                <option value="">Select sensor type</option>
                                <option value="temperature">Temperature</option>
                                <option value="light">Light</option>
                                <option value="pressure">Pressure</option>
                                <option value="accelerometer">Accelerometer</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Data Section (raw time series input in CSV-like format) */}
                        <Form.Group className="mb-3" controlId="formData">
                            <Form.Label>Data (Enter as timestamp, value pairs)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="data"
                                placeholder='Enter time series data. Example: 2024-10-14T10:00:00Z, 23.5\n2024-10-14T11:00:00Z, 24.0'
                                onChange={handleChange} // Use the generic handler
                            />
                        </Form.Group>

                        {/* Button Section */}
                        <div className="d-flex justify-content-between">
                            <Button variant="dark" onClick={() => navigate(-1)}>Back</Button> {/* Go back to the previous page */}
                            <Button variant="success" type="submit">Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AddSensorData;
