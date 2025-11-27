import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdPeople } from 'react-icons/md';

const MedicalRecords = () => (
  <div><h1 className="neon-text">Medical Records</h1>
  <NeonCard title="Patient Records" icon={MdPeople}>
    <p>Complete patient medical history, diagnosis notes, and treatment plans.</p>
  </NeonCard></div>
);

export default MedicalRecords;
