import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import RegisterSensor from '../ManageSensor/RegisterSensor'



const Sensor: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
           <RegisterSensor/>
         
         
          
        </Box>
      </Box>
    </div>
  );
};

export default Sensor;
