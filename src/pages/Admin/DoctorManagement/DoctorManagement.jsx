import React, { useState } from 'react';
import { FaUserMd, FaCalendar } from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
import NeonCard from '../../../components/NeonCard/NeonCard';
import NeonButton from '../../../components/NeonButton/NeonButton';
import './DoctorManagement.css';

const DoctorManagement = () => {
  const [doctors] = useState([
    { 
      id: 1, 
      name: 'Dr. John Smith', 
      specialization: 'Cardiology', 
      phone: '+1-234-567-8901',
      email: 'john.smith@hospital.com',
      availability: 'Available',
      patients: 45,
      photo: '👨‍⚕️'
    },
    { 
      id: 2, 
      name: 'Dr. Emily Davis', 
      specialization: 'Neurology', 
      phone: '+1-234-567-8904',
      email: 'emily.d@hospital.com',
      availability: 'On Leave',
      patients: 38,
      photo: '👩‍⚕️'
    },
    { 
      id: 3, 
      name: 'Dr. Michael Chen', 
      specialization: 'Pediatrics', 
      phone: '+1-234-567-8907',
      email: 'michael.c@hospital.com',
      availability: 'Available',
      patients: 52,
      photo: '👨‍⚕️'
    },
    { 
      id: 4, 
      name: 'Dr. Sarah Williams', 
      specialization: 'Orthopedics', 
      phone: '+1-234-567-8910',
      email: 'sarah.w@hospital.com',
      availability: 'In Surgery',
      patients: 41,
      photo: '👩‍⚕️'
    },
  ]);

  return (
    <div className="doctor-management">
      <div className="page-header">
        <div className="header-title">
          <h1 className="neon-text">Doctor Management</h1>
          <p className="header-subtitle">Manage doctors, schedules, and availability</p>
        </div>
        <NeonButton icon={MdAdd} variant="primary">Add New Doctor</NeonButton>
      </div>

      <div className="doctors-grid">
        {doctors.map(doctor => (
          <NeonCard key={doctor.id} className="doctor-card">
            <div className="doctor-photo">
              <div className="photo-circle">{doctor.photo}</div>
              <div className={`availability-indicator ${doctor.availability.toLowerCase().replace(' ', '-')}`}>
                <div className="indicator-dot"></div>
              </div>
            </div>
            
            <div className="doctor-info">
              <h3 className="doctor-name">{doctor.name}</h3>
              <div className="doctor-specialization">{doctor.specialization}</div>
              
              <div className="doctor-details">
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{doctor.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{doctor.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Patients:</span>
                  <span className="detail-value patients-count">{doctor.patients}</span>
                </div>
              </div>

              <div className="availability-status">
                <span className={`status-badge ${doctor.availability.toLowerCase().replace(' ', '-')}`}>
                  {doctor.availability}
                </span>
              </div>

              <div className="doctor-actions">
                <NeonButton icon={FaCalendar} variant="primary" className="neon-btn-sm">
                  View Schedule
                </NeonButton>
                <NeonButton icon={MdEdit} variant="success" className="neon-btn-sm">
                  Edit Info
                </NeonButton>
              </div>
            </div>
          </NeonCard>
        ))}
      </div>

      {/* Weekly Schedule Section */}
      <NeonCard title="Doctor Availability Schedule" icon={FaCalendar} className="schedule-card">
        <div className="schedule-grid">
          <div className="schedule-header">
            <div className="schedule-time"></div>
            <div className="schedule-day">Mon</div>
            <div className="schedule-day">Tue</div>
            <div className="schedule-day">Wed</div>
            <div className="schedule-day">Thu</div>
            <div className="schedule-day">Fri</div>
            <div className="schedule-day">Sat</div>
            <div className="schedule-day">Sun</div>
          </div>
          
          {['09:00', '11:00', '13:00', '15:00', '17:00'].map(time => (
            <div key={time} className="schedule-row">
              <div className="schedule-time">{time}</div>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="schedule-slot">
                  {Math.random() > 0.3 ? (
                    <div className="slot-available">Available</div>
                  ) : (
                    <div className="slot-booked">Booked</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </NeonCard>
    </div>
  );
};

export default DoctorManagement;
