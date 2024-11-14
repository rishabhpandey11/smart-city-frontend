import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';
import Stack from '@mui/material/Stack';
import SensorMenu from '../components/SensorMenu'
import '../Dash.css'
import AreaBump from '../Light-Sensor/AreaBump'
import LineChart from '../Accelerometer-Sensor-charts/LineChart';
import BarChart from '../Temperature-Sensor/BarChart'
import Bump from '../Pressure-Sensor/Bump'


// You can define an "Item" component or remove it if it's unnecessary
// This component was undefined in the original code, so I'll comment it out
// const Item = ({ children }: { children: React.ReactNode }) => (
//   <Box sx={{ p: 2, border: '1px dashed grey' }}>{children}</Box>
// );

const Analytics: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid item xs={6}>
            <SensorMenu />

          </Grid>

          <Box height={20} />

          <h4> Static Information </h4>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={2} direction='row'>
                {/* Example Card with content */}
                <Card sx={{ minWidth: 30 + '%', height: 90 }} className="gradient-green">
                  <CardContent>
                    <div>
                      <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                        Cpu cores
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ color: "white" }}>
                        4
                      </Typography>

                    </div>


                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 30 + '%', height: 90 }} className="gradient-blue">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                      RAM Total
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: "white" }}>
                      500MB
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 30 + '%', height: 90 }} className="gradient-red">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                      Uptime
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: "white" }}>
                      20.4s
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

          </Grid>
          <Box height={40} />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>

              <Card sx={{ height: 70 + 'vh' }}>

                <AreaBump />

              </Card>

            </Grid>
            <Grid item xs={6}>
              <Card sx={{ height: 70 + 'vh' }}>

                <BarChart />

              </Card>
            </Grid>
          </Grid>

          <Box height={40} />
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Card sx={{ height: 70 + 'vh' }}>

                 
                <LineChart />

                </Card>
                <Box height={30} />
                <Card sx={{ height: 70 + 'vh' }}>

                  <Bump />

                </Card>
              </Stack>
            </Grid>

          </Grid>

        </Box>

      </Box>

    </div>
  );
};

export default Analytics;
