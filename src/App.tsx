import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Sensor from './pages/Sensor';
import ImportFiles from './pages/ImportFiles';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FilesUploaded from './pages/FilesUploaded';
import Logout from './pages/Logout';
import Analytics from './pages/Analytics';
import AccelerometerSensor from './pages/AccelerometerSensor';
import LightSensor from './pages/LightSensor' ;
import TemperatureSensor from './pages/TemperatureSensor';
import PressureSensor from './pages/PressureSensor';
import 'bootstrap/dist/css/bootstrap.min.css';
import Read from './TableComponents/Read'
import ReadSensor from './ManageSensor/ReadSensor'
import EditSensor from './ManageSensor/EditSensor'
import RegisterSensor from './ManageSensor/RegisterSensor'
import AddSensorData from './ManageSensor/AddSensorData';
import EditComment from './TableComponents/EditComment';





const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/import" element={<ImportFiles />} />
          <Route path="/sensor" element={<Sensor />} />
          <Route path="/filesuploaded" element={<FilesUploaded />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/accelerometersensor" element={<AccelerometerSensor />} />
          <Route path="/lightsensor" element={<LightSensor />} />
          <Route path="/pressuresensor" element={<PressureSensor />} />
          <Route path="/temperaturesensor" element={<TemperatureSensor />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/update/:id" element={<EditComment />} />
          <Route path="/registersensor" element={<RegisterSensor />} />
          <Route path="/readsensor/:id" element={<ReadSensor />} />
          <Route path="/editsensor/:id" element={<EditSensor />} />
          <Route path="/addsensor" element={<AddSensorData />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
