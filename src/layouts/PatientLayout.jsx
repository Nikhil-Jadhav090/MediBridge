import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MdDashboard, MdEventNote, MdDescription, MdReceipt } from 'react-icons/md';
import Sidebar from '../components/Sidebar/Sidebar';
import PatientDashboard from '../pages/Patient/Dashboard/Dashboard';
import MyAppointments from '../pages/Patient/MyAppointments/MyAppointments';
import MyPrescriptions from '../pages/Patient/MyPrescriptions/MyPrescriptions';
import BillingHistory from '../pages/Patient/BillingHistory/BillingHistory';
import './PatientLayout.css';

const PatientLayout = ({ onLogout }) => {
  const menuItems = [
    { path: '/patient', icon: MdDashboard, label: 'Dashboard' },
    { path: '/patient/appointments', icon: MdEventNote, label: 'My Appointments' },
    { path: '/patient/prescriptions', icon: MdDescription, label: 'Prescriptions' },
    { path: '/patient/billing', icon: MdReceipt, label: 'Billing History' },
  ];

  return (
    <div className="patient-layout">
      <Sidebar role="Patient" menuItems={menuItems} onLogout={onLogout} />
      <div className="main-content">
        <Routes>
          <Route index element={<PatientDashboard />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="prescriptions" element={<MyPrescriptions />} />
          <Route path="billing" element={<BillingHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default PatientLayout;
