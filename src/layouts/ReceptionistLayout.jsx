import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MdDashboard, MdPersonAdd, MdEventNote, MdAirportShuttle } from 'react-icons/md';
import Sidebar from '../components/Sidebar/Sidebar';
import ReceptionDashboard from '../pages/Receptionist/Dashboard/Dashboard';
import PatientRegistration from '../pages/Receptionist/PatientRegistration/PatientRegistration';
import AppointmentBooking from '../pages/Receptionist/AppointmentBooking/AppointmentBooking';
import AmbulanceTracking from '../pages/Receptionist/AmbulanceTracking/AmbulanceTracking';
import './ReceptionistLayout.css';

const ReceptionistLayout = ({ onLogout }) => {
  const menuItems = [
    { path: '/receptionist', icon: MdDashboard, label: 'Dashboard' },
    { path: '/receptionist/register', icon: MdPersonAdd, label: 'Patient Registration' },
    { path: '/receptionist/booking', icon: MdEventNote, label: 'Appointments' },
    { path: '/receptionist/ambulance', icon: MdAirportShuttle, label: 'Ambulance Tracking' },
  ];

  return (
    <div className="receptionist-layout">
      <Sidebar role="Receptionist" menuItems={menuItems} onLogout={onLogout} />
      <div className="main-content">
        <Routes>
          <Route index element={<ReceptionDashboard />} />
          <Route path="register" element={<PatientRegistration />} />
          <Route path="booking" element={<AppointmentBooking />} />
          <Route path="ambulance" element={<AmbulanceTracking />} />
        </Routes>
      </div>
    </div>
  );
};

export default ReceptionistLayout;
