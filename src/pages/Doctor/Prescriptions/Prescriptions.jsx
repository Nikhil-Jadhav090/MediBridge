import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { FaNotesMedical } from 'react-icons/fa';

const Prescriptions = () => (
  <div><h1 className="neon-text">Prescriptions</h1>
  <NeonCard title="Create Prescription" icon={FaNotesMedical}>
    <p>Prescription creation system with medicine selection, dosage, and schedule.</p>
  </NeonCard></div>
);

export default Prescriptions;
