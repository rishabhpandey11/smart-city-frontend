import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SensorMenu from '../components/SensorMenu';
import '../Dash.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import LineChart from '../Temperature-Sensor/LineChart'
import BarChart from '../Temperature-Sensor/BarChart'
import BumpChart from '../Temperature-Sensor/BumpChart'




const TemperatureSensor = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Navbar />
            <Box height={70} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    <Grid item xs={6}>
                        <Stack spacing={2} direction="row">
                            <SensorMenu />
                            <Button variant="text" sx={{
                                backgroundColor: 'black',
                                color: "white",
                                '&:hover': {
                                    backgroundColor: 'grey',
                                    color: "black"
                                },
                            }} onClick={() => navigate("/analytics")}>
                                Back

                            </Button>
                        </Stack>

                    </Grid>

                    <Box height={10} />

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
                    <Box height={30} />
                    <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>
                        Temperature sensor
                    </Button>
                    <Box height={10} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Stack spacing={2}>
                                <Card sx={{ minwidth: 100 + '%', height: 70 + 'vh' }}>
                                    <LineChart />

                                </Card>
                                <Box height={10} />
                                <Card sx={{ minwidth: 100 + '%', height: 70 + 'vh' }}>


                                    <BarChart />

                                </Card>

                                <Box height={10} />
                                <Card sx={{ minwidth: 100 + '%', height: 70 + 'vh' }}>


                                    <BumpChart />

                                </Card>

                            </Stack>
                        </Grid>

                    </Grid>






                </Box>
            </Box>
        </div>
    )
}

export default TemperatureSensor
