import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  MdDashboard, 
  MdPeople, 
  MdPersonAdd,
  MdLocalPharmacy,
  MdLocalHospital,
  MdAirportShuttle,
  MdSettings
} from 'react-icons/md';
import { FaUserMd } from 'react-icons/fa';
import Sidebar from '../components/Sidebar/Sidebar';
import AdminDashboard from '../pages/Admin/Dashboard/Dashboard';
import UserManagement from '../pages/Admin/UserManagement/UserManagement';
import DoctorManagement from '../pages/Admin/DoctorManagement/DoctorManagement';
import DepartmentManagement from '../pages/Admin/DepartmentManagement/DepartmentManagement';
import PharmacyManagement from '../pages/Admin/PharmacyManagement/PharmacyManagement';
import AmbulanceManagement from '../pages/Admin/AmbulanceManagement/AmbulanceManagement';
import SystemSettings from '../pages/Admin/SystemSettings/SystemSettings';
import './AdminLayout.css';

const AdminLayout = ({ onLogout }) => {
  const menuItems = [
    { path: '/admin', icon: MdDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: MdPeople, label: 'User Management' },
    { path: '/admin/doctors', icon: FaUserMd, label: 'Doctors' },
    { path: '/admin/departments', icon: MdLocalHospital, label: 'Departments' },
    { path: '/admin/pharmacy', icon: MdLocalPharmacy, label: 'Pharmacy' },
    { path: '/admin/ambulance', icon: MdAirportShuttle, label: 'Ambulance' },
    { path: '/admin/settings', icon: MdSettings, label: 'Settings' },
  ];

  return (
    <div className="admin-layout">
      <Sidebar role="Admin" menuItems={menuItems} onLogout={onLogout} />
      <div className="main-content">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="doctors" element={<DoctorManagement />} />
          <Route path="departments" element={<DepartmentManagement />} />
          <Route path="pharmacy" element={<PharmacyManagement />} />
          <Route path="ambulance" element={<AmbulanceManagement />} />
          <Route path="settings" element={<SystemSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
