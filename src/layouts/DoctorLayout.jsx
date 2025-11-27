import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MdDashboard, MdEventNote, MdPeople, MdDescription } from 'react-icons/md';
import { FaNotesMedical } from 'react-icons/fa';
import Sidebar from '../components/Sidebar/Sidebar';
import DoctorDashboard from '../pages/Doctor/Dashboard/Dashboard';
import Appointments from '../pages/Doctor/Appointments/Appointments';
import MedicalRecords from '../pages/Doctor/MedicalRecords/MedicalRecords';
import Prescriptions from '../pages/Doctor/Prescriptions/Prescriptions';
import './DoctorLayout.css';

const DoctorLayout = ({ onLogout }) => {
  const menuItems = [
    { path: '/doctor', icon: MdDashboard, label: 'Dashboard' },
    { path: '/doctor/appointments', icon: MdEventNote, label: 'Appointments' },
    { path: '/doctor/records', icon: MdPeople, label: 'Medical Records' },
    { path: '/doctor/prescriptions', icon: FaNotesMedical, label: 'Prescriptions' },
  ];

  return (
    <div className="doctor-layout">
      <Sidebar role="Doctor" menuItems={menuItems} onLogout={onLogout} />
      <div className="main-content">
        <Routes>
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="prescriptions" element={<Prescriptions />} />
        </Routes>
      </div>
    </div>
  );
};

export default DoctorLayout;
