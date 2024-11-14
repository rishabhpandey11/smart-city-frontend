import React from 'react'
import  {Button , Box}  from '@mui/material';
import { useNavigate } from 'react-router-dom';



const Logout = () => {
    const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ paddingBottom: '10vh' }}>
        
    
    <Box
      sx={{
        width: '50vw',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.300', // Light grey background color
        borderRadius: 1,
        
      }}
    >
      
        <h3>
        You have been logged out.
        
        </h3>
       
        <h3> Login to continue.</h3>
        <Button variant="contained"
    onClick={() => {navigate("/"); }}
         sx={{
            padding: '12px 24px', // Adjust padding for larger button
            fontSize: '1rem', // Adjust font size
            backgroundColor: 'black', // Black color
            color: 'white', // White text color
            '&:hover': {
              backgroundColor: 'grey.600', // Lighter grey on hover
            },
          }}>Home</Button>
    
      
    </Box>
   
    </div>
  )
}

export default Logout
