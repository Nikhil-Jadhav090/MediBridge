import React, { useState } from 'react';
import { MdAirportShuttle, MdLocationOn } from 'react-icons/md';
import NeonCard from '../../../components/NeonCard/NeonCard';
import StatCard from '../../../components/StatCard/StatCard';
import './AmbulanceManagement.css';

const AmbulanceManagement = () => {
  const [ambulances] = useState([
    { id: 'AMB-001', driver: 'James Wilson', status: 'Available', location: 'Main Hospital', phone: '+1-234-567-8901' },
    { id: 'AMB-002', driver: 'Maria Garcia', status: 'On Duty', location: 'Route 45', phone: '+1-234-567-8902' },
    { id: 'AMB-003', driver: 'Robert Brown', status: 'Emergency', location: 'Downtown', phone: '+1-234-567-8903' },
    { id: 'AMB-004', driver: 'Lisa Chen', status: 'Available', location: 'Main Hospital', phone: '+1-234-567-8904' },
    { id: 'AMB-005', driver: 'David Miller', status: 'On Duty', location: 'Highway 101', phone: '+1-234-567-8905' },
  ]);

  return (
    <div className="ambulance-management">
      <h1 className="neon-text">Ambulance Management</h1>
      
      <div className="ambulance-stats">
        <StatCard icon={MdAirportShuttle} title="Total Ambulances" value="15" color="blue" />
        <StatCard icon={MdAirportShuttle} title="Available" value="8" color="green" />
        <StatCard icon={MdAirportShuttle} title="On Duty" value="5" color="yellow" />
        <StatCard icon={MdAirportShuttle} title="Emergency" value="2" color="red" />
      </div>

      <NeonCard title="Live Ambulance Status" icon={MdAirportShuttle}>
        <div className="ambulances-grid">
          {ambulances.map(amb => (
            <div key={amb.id} className={`ambulance-card status-${amb.status.toLowerCase().replace(' ', '-')}`}>
              <div className="ambulance-header">
                <div className="ambulance-id">{amb.id}</div>
                <div className={`status-indicator ${amb.status.toLowerCase().replace(' ', '-')}`}>
                  <div className="status-dot"></div>
                  {amb.status}
                </div>
              </div>
              
              <div className="ambulance-details">
                <div className="detail-row">
                  <span className="label">Driver:</span>
                  <span className="value">{amb.driver}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Phone:</span>
                  <span className="value">{amb.phone}</span>
                </div>
                <div className="detail-row">
                  <MdLocationOn className="location-icon" />
                  <span className="value">{amb.location}</span>
                </div>
              </div>

              {amb.status === 'Emergency' && (
                <div className="emergency-alert">
                  <div className="alert-text">⚠️ CRITICAL PATIENT ALERT</div>
                  <div className="eta">ETA: 8 min</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </NeonCard>

      {/* Map Preview */}
      <NeonCard title="Live Location Map" icon={MdLocationOn} className="map-card">
        <div className="map-placeholder">
          <div className="map-text">🗺️ Real-time GPS Tracking</div>
          <div className="map-pins">
            {ambulances.filter(a => a.status !== 'Available').map(amb => (
              <div key={amb.id} className={`map-pin ${amb.status.toLowerCase()}`}>
                <MdAirportShuttle />
                <span>{amb.id}</span>
              </div>
            ))}
          </div>
        </div>
      </NeonCard>
    </div>
  );
};

export default AmbulanceManagement;
