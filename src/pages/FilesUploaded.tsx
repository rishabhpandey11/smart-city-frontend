import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import SensorTable from '../components/SensorTable'
import { Link } from 'react-router-dom';


const FilesUploaded: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box height={30} />
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ gap: 2 }} // Custom spacing between elements
          >
            <h3>List of imported files</h3>
            <Link to="/import" className="btn btn-success"> Add +</Link>

          </Box>
          <Box height={10} />
          <SensorTable />
       
        </Box>
      </Box>
    </div>
  );
};

export default FilesUploaded;
