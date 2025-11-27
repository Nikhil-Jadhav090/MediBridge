import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdEventNote } from 'react-icons/md';

const AppointmentBooking = () => (
  <div><h1 className="neon-text">Appointment Booking</h1>
  <NeonCard title="Book Appointment" icon={MdEventNote}>
    <p>Calendar view with doctor availability, time slots, and conflict detection.</p>
  </NeonCard></div>
);

export default AppointmentBooking;
