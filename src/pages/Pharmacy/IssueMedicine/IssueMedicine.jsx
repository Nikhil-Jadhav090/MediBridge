import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdLocalPharmacy } from 'react-icons/md';

const IssueMedicine = () => (
  <div><h1 className="neon-text">Issue Medicine</h1>
  <NeonCard title="Dispense Medicine" icon={MdLocalPharmacy}>
    <p>Select patient, choose medicines, set quantities, and add to billing system.</p>
  </NeonCard></div>
);

export default IssueMedicine;
