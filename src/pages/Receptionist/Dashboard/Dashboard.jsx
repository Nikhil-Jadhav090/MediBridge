import React from 'react';
import { MdSearch, MdEventNote } from 'react-icons/md';
import StatCard from '../../../components/StatCard/StatCard';
import NeonCard from '../../../components/NeonCard/NeonCard';

const ReceptionDashboard = () => (
  <div className="reception-dashboard">
    <h1 className="neon-text">Reception Dashboard</h1>
    <div className="stats-grid">
      <StatCard icon={MdEventNote} title="Today's Appointments" value="42" color="blue" />
      <StatCard icon={MdSearch} title="Patients Checked-in" value="28" color="green" />
    </div>
    <NeonCard title="Quick Actions">
      <p>Patient search, appointment scheduling, and emergency ambulance dispatch.</p>
    </NeonCard>
  </div>
);

export default ReceptionDashboard;
