import React from 'react';
import { MdLocalPharmacy, MdWarning } from 'react-icons/md';
import StatCard from '../../../components/StatCard/StatCard';
import NeonCard from '../../../components/NeonCard/NeonCard';

const PharmacyDashboard = () => (
  <div>
    <h1 className="neon-text">Pharmacy Dashboard</h1>
    <div className="stats-grid">
      <StatCard icon={MdLocalPharmacy} title="Total Medicines" value="892" color="blue" />
      <StatCard icon={MdWarning} title="Low Stock Items" value="7" color="yellow" />
      <StatCard icon={MdWarning} title="Expiring Soon" value="3" color="red" />
    </div>
    <NeonCard title="AI Predictions">
      <p>Intelligent stock predictions with expiry warnings and automatic reorder suggestions.</p>
    </NeonCard>
  </div>
);

export default PharmacyDashboard;
