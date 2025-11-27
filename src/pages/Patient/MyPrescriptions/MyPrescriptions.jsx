import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdDescription } from 'react-icons/md';

const MyPrescriptions = () => (
  <div><h1 className="neon-text">My Prescriptions</h1>
  <NeonCard title="Prescription History" icon={MdDescription}>
    <p>View all prescriptions with download options and medication details.</p>
  </NeonCard></div>
);

export default MyPrescriptions;
