import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdAirportShuttle } from 'react-icons/md';

const AmbulanceTracking = () => (
  <div><h1 className="neon-text">Ambulance Tracking</h1>
  <NeonCard title="Live Ambulance Status" icon={MdAirportShuttle} glowColor="red">
    <p>Real-time GPS tracking, emergency alerts, and prepare emergency team notifications.</p>
  </NeonCard></div>
);

export default AmbulanceTracking;
