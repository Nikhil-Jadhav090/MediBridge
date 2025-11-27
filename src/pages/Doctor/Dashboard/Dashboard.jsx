import React from 'react';
import { MdEventNote, MdPeople, MdWarning } from 'react-icons/md';
import StatCard from '../../../components/StatCard/StatCard';
import NeonCard from '../../../components/NeonCard/NeonCard';
import './Dashboard.css';

const DoctorDashboard = () => {
  const todayAppointments = [
    { id: 1, patient: 'Alice Johnson', time: '09:00 AM', type: 'Checkup', status: 'Completed' },
    { id: 2, patient: 'Bob Smith', time: '10:30 AM', type: 'Follow-up', status: 'In Progress' },
    { id: 3, patient: 'Carol White', time: '02:00 PM', type: 'Emergency', status: 'Pending' },
    { id: 4, patient: 'David Brown', time: '03:30 PM', type: 'Consultation', status: 'Pending' },
  ];

  return (
    <div className="doctor-dashboard">
      <h1 className="neon-text">Doctor Dashboard</h1>
      
      <div className="emergency-banner">
        <MdWarning className="banner-icon" />
        <div className="banner-text">Emergency Alert: Ambulance #3 arriving with critical patient in 8 minutes</div>
      </div>

      <div className="stats-grid">
        <StatCard icon={MdEventNote} title="Today's Appointments" value="8" color="blue" />
        <StatCard icon={MdPeople} title="Total Patients" value="156" color="green" />
        <StatCard icon={MdWarning} title="Pending Cases" value="3" color="yellow" />
      </div>

      <NeonCard title="Today's Schedule" icon={MdEventNote}>
        <div className="appointments-list">
          {todayAppointments.map(apt => (
            <div key={apt.id} className="appointment-item">
              <div className="appointment-time">{apt.time}</div>
              <div className="appointment-details">
                <div className="patient-name">{apt.patient}</div>
                <div className="appointment-type">{apt.type}</div>
              </div>
              <div className={`appointment-status status-${apt.status.toLowerCase().replace(' ', '-')}`}>
                {apt.status}
              </div>
            </div>
          ))}
        </div>
      </NeonCard>
    </div>
  );
};

export default DoctorDashboard;
