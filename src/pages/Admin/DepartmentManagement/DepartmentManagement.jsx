import React from 'react';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { MdLocalHospital } from 'react-icons/md';
import './DepartmentManagement.css';

const DepartmentManagement = () => {
  const departments = [
    { name: 'Cardiology', doctors: 8, patients: 145, status: 'Active' },
    { name: 'Neurology', doctors: 6, patients: 98, status: 'Active' },
    { name: 'Pediatrics', doctors: 10, patients: 201, status: 'Active' },
    { name: 'Orthopedics', doctors: 7, patients: 122, status: 'Active' },
    { name: 'Emergency', doctors: 12, patients: 315, status: 'Critical' },
  ];

  return (
    <div className="department-management">
      <h1 className="neon-text">Department Management</h1>
      <div className="departments-grid">
        {departments.map((dept, idx) => (
          <NeonCard key={idx} title={dept.name} icon={MdLocalHospital}>
            <div className="dept-stats">
              <div className="dept-stat"><span>Doctors:</span> {dept.doctors}</div>
              <div className="dept-stat"><span>Patients:</span> {dept.patients}</div>
              <div className="dept-stat">
                <span className={`status-${dept.status.toLowerCase()}`}>{dept.status}</span>
              </div>
            </div>
          </NeonCard>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManagement;
