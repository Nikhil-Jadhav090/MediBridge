import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MdDashboard, MdInventory, MdLocalPharmacy } from 'react-icons/md';
import Sidebar from '../components/Sidebar/Sidebar';
import PharmacyDashboard from '../pages/Pharmacy/Dashboard/Dashboard';
import Inventory from '../pages/Pharmacy/Inventory/Inventory';
import IssueMedicine from '../pages/Pharmacy/IssueMedicine/IssueMedicine';
import './PharmacyLayout.css';

const PharmacyLayout = ({ onLogout }) => {
  const menuItems = [
    { path: '/pharmacy', icon: MdDashboard, label: 'Dashboard' },
    { path: '/pharmacy/inventory', icon: MdInventory, label: 'Inventory' },
    { path: '/pharmacy/issue', icon: MdLocalPharmacy, label: 'Issue Medicine' },
  ];

  return (
    <div className="pharmacy-layout">
      <Sidebar role="Pharmacy" menuItems={menuItems} onLogout={onLogout} />
      <div className="main-content">
        <Routes>
          <Route index element={<PharmacyDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="issue" element={<IssueMedicine />} />
        </Routes>
      </div>
    </div>
  );
};

export default PharmacyLayout;
