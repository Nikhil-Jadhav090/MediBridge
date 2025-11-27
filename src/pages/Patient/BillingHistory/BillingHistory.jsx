import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdReceipt } from 'react-icons/md';

const BillingHistory = () => (
  <div><h1 className="neon-text">Billing History</h1>
  <NeonCard title="Invoice History" icon={MdReceipt}>
    <p>View and download all invoices and payment history.</p>
  </NeonCard></div>
);

export default BillingHistory;
