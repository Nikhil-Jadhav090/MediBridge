import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdPersonAdd } from 'react-icons/md';

const PatientRegistration = () => (
  <div><h1 className="neon-text">Patient Registration</h1>
  <NeonCard title="Register New Patient" icon={MdPersonAdd}>
    <p>Complete patient registration form with personal details, medical history, and insurance info.</p>
  </NeonCard></div>
);

export default PatientRegistration;
