import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import Fileupload from '../components/Fileupload';


const ImportFiles: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centers the content horizontally
          }}
        >
          <h1>Upload your files</h1>
          <Box sx={{ width: '80%', maxWidth: 800 }}> {/* Adjust the width as needed */}
            
          <Fileupload />
          </Box>
        </Box>

      </Box>
    </div>
  );
};

export default ImportFiles;
