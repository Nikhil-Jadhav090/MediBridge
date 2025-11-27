import React from 'react';
import { MdEventNote, MdDescription, MdReceipt } from 'react-icons/md';
import StatCard from '../../../components/StatCard/StatCard';
import NeonCard from '../../../components/NeonCard/NeonCard';

const PatientDashboard = () => (
  <div>
    <h1 className="neon-text">Patient Dashboard</h1>
    <div className="stats-grid">
      <StatCard icon={MdEventNote} title="Upcoming Appointments" value="3" color="blue" />
      <StatCard icon={MdDescription} title="Active Prescriptions" value="2" color="green" />
      <StatCard icon={MdReceipt} title="Pending Bills" value="1" color="yellow" />
    </div>
    <NeonCard title="Health Timeline">
      <p>Your medical journey, appointments, prescriptions, and billing history.</p>
    </NeonCard>
  </div>
);

export default PatientDashboard;
