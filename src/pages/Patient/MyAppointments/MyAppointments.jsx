import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdEventNote } from 'react-icons/md';

const MyAppointments = () => (
  <div><h1 className="neon-text">My Appointments</h1>
  <NeonCard title="Request Appointment" icon={MdEventNote}>
    <p>View upcoming appointments, request new appointments, and select preferred doctors.</p>
  </NeonCard></div>
);

export default MyAppointments;
