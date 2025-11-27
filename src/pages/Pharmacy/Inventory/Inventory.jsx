import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdInventory } from 'react-icons/md';

const Inventory = () => (
  <div><h1 className="neon-text">Medicine Inventory</h1>
  <NeonCard title="Stock Management" icon={MdInventory}>
    <p>Complete inventory with stock bars, expiry alerts, and add/edit/delete functionality.</p>
  </NeonCard></div>
);

export default Inventory;
