import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';



// Define the SensorFile type
interface SensorFile {
  id: number;
  file_name: string;
  uploaded_date: string;
  comments: string;
}


const EditComment = () => {
  const [data, setData] = useState<SensorFile | null>(null); // Corrected to hold a single object or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Grab 'id' from the route params
  const [formData, setFormData] = useState({
    id: '', 
    file_name: '', 
    uploaded_date: '',
    comments: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<SensorFile>(`http://localhost:3000/sensor_files/${id}`);
        console.log(res)
        setData(res.data);
        setFormData({
          id: res.data.id,
          file_name: res.data.file_name || '',
          uploaded_date: res.data.uploaded_date || '',
          comments: res.data.comments 
        })
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Added 'id' as a dependency


   // Handle input changes
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setError(null); // Reset any previous errors
  
      // Basic validation: Check if all fields are filled in
      if (!formData.age || !formData.message) {
        setError('Age and message fields are required!');
        return;
      }
  
      // Print the form data to the console
      console.log('Submitted Data:', formData);
      
      // Here you can handle the form data (e.g., send it to an API)
      
      // Reset the form after submission
      setFormData({
        id: '', 
    file_name: '', 
    uploaded_date: '',
    comments: '',
      });
    };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data found.</p>; // Added a check for null data
  return (

    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Form onSubmit={handleSubmit} style={{ width: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 className="text-center">Update Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <Form.Group controlId="formName">
        <Form.Label>File Name</Form.Label>
        <Form.Control
          type="text"
          name="file_name" 
          value={formData.file_name}
          onChange={handleChange}
          placeholder="Enter sensor file name"
          disabled // This will make the input read-only
        />
      </Form.Group>

   
      <Form.Group controlId="formEmail">
        <Form.Label>Uploaded date</Form.Label>
        <Form.Control
          type="text"
          name="uploaded_date" 

          value={formData.uploaded_date}
          onChange={handleChange}
          placeholder="Enter uploaded date"
          disabled // This will make the input read-only
        />
      </Form.Group>

   

      {/* Message Textarea (enabled) */}
      <Form.Group controlId="formMessage">
        <Form.Label>Comments</Form.Label>
        <Form.Control
          as="textarea"
          rows={7}
          name="comments" 

          value={formData.comments}
          onChange={handleChange}
          placeholder="Enter your message"
        />
      </Form.Group>
       

        <div style={{height : '2vh'}}>

        </div>

      {/* Submit Button */}
      <Link to={`/update/${data.id}`} className="btn" style={{ backgroundColor: 'green', color: 'white' }}>
          Update
        </Link>
         
        <Link to="/filesuploaded" className="btn" style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }}>
          Back
        </Link>
    </Form>
  </div>

     
    
  )
}

export default EditComment

