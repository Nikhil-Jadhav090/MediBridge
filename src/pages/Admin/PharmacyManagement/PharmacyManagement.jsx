import React, { useState } from 'react';
import { MdLocalPharmacy, MdWarning, MdTrendingUp } from 'react-icons/md';
import NeonCard from '../../../components/NeonCard/NeonCard';
import StatCard from '../../../components/StatCard/StatCard';
import './PharmacyManagement.css';

const PharmacyManagement = () => {
  const [medicines] = useState([
    { id: 1, name: 'Paracetamol', stock: 150, minStock: 100, expiry: '2025-12-31', status: 'Good' },
    { id: 2, name: 'Amoxicillin', stock: 45, minStock: 50, expiry: '2025-10-15', status: 'Low' },
    { id: 3, name: 'Ibuprofen', stock: 12, minStock: 80, expiry: '2025-03-20', status: 'Critical' },
    { id: 4, name: 'Aspirin', stock: 200, minStock: 100, expiry: '2026-06-30', status: 'Good' },
    { id: 5, name: 'Insulin', stock: 25, minStock: 30, expiry: '2025-01-15', status: 'Expiring' },
  ]);

  return (
    <div className="pharmacy-management">
      <h1 className="neon-text">Pharmacy Management</h1>
      
      <div className="pharmacy-stats">
        <StatCard icon={MdLocalPharmacy} title="Total Medicines" value={medicines.length} color="blue" />
        <StatCard icon={MdWarning} title="Low Stock" value="3" color="yellow" />
        <StatCard icon={MdWarning} title="Expiring Soon" value="1" color="red" />
      </div>

      <NeonCard title="Medicine Inventory" icon={MdLocalPharmacy}>
        <div className="table-container">
          <table className="neon-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Stock</th>
                <th>Min Stock</th>
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map(med => (
                <tr key={med.id}>
                  <td className="med-name">{med.name}</td>
                  <td>
                    <div className="stock-bar-container">
                      <div 
                        className={`stock-bar stock-${med.status.toLowerCase()}`}
                        style={{ width: `${(med.stock / 200) * 100}%` }}
                      ></div>
                      <span className="stock-value">{med.stock}</span>
                    </div>
                  </td>
                  <td>{med.minStock}</td>
                  <td className={med.status === 'Expiring' ? 'expiry-warning' : ''}>{med.expiry}</td>
                  <td>
                    <span className={`status-badge status-${med.status.toLowerCase()}`}>
                      {med.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeonCard>

      <NeonCard title="AI Stock Predictions" icon={MdTrendingUp} glowColor="purple" className="predictions-card">
        <div className="prediction-item">
          <MdWarning className="prediction-icon warn" />
          <div>
            <strong>Paracetamol</strong> may finish in <span className="highlight">4 days</span>
            <div className="confidence">AI Confidence: 89%</div>
          </div>
        </div>
        <div className="prediction-item critical">
          <MdWarning className="prediction-icon critical" />
          <div>
            <strong>Ibuprofen</strong> critical - reorder immediately
            <div className="confidence">AI Confidence: 95%</div>
          </div>
        </div>
      </NeonCard>
    </div>
  );
};

export default PharmacyManagement;
