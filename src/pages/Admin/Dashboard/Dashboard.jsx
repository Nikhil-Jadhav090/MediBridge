import React, { useState, useEffect } from 'react';
import { 
  MdPeople, 
  MdEventNote, 
  MdLocalPharmacy,
  MdAirportShuttle,
  MdWarning,
  MdTrendingUp
} from 'react-icons/md';
import { FaUserMd, FaHospital } from 'react-icons/fa';
import StatCard from '../../../components/StatCard/StatCard';
import NeonCard from '../../../components/NeonCard/NeonCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data for charts
  const patientFlowData = [
    { day: 'Mon', patients: 45 },
    { day: 'Tue', patients: 52 },
    { day: 'Wed', patients: 48 },
    { day: 'Thu', patients: 61 },
    { day: 'Fri', patients: 55 },
    { day: 'Sat', patients: 38 },
    { day: 'Sun', patients: 42 }
  ];

  const medicineUsageData = [
    { name: 'Paracetamol', usage: 145 },
    { name: 'Amoxicillin', usage: 98 },
    { name: 'Ibuprofen', usage: 112 },
    { name: 'Aspirin', usage: 87 },
    { name: 'Metformin', usage: 76 }
  ];

  const emergencyAlerts = [
    { id: 1, type: 'critical', message: 'Ambulance #3 - Critical patient incoming', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Paracetamol stock low (15 units remaining)', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Dr. Sarah requested urgent OR preparation', time: '30 min ago' }
  ];

  const recentActivities = [
    { id: 1, action: 'New patient registered', user: 'Reception Desk 1', time: '5 min ago' },
    { id: 2, action: 'Appointment scheduled', user: 'Dr. John Smith', time: '12 min ago' },
    { id: 3, action: 'Medicine dispensed', user: 'Pharmacy Counter 2', time: '18 min ago' },
    { id: 4, action: 'Lab report uploaded', user: 'Lab Technician', time: '25 min ago' },
    { id: 5, action: 'Ambulance dispatched', user: 'Emergency Desk', time: '32 min ago' }
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-title">
          <h1 className="neon-text">Admin Dashboard</h1>
          <p className="header-subtitle">Hospital Management & Analytics</p>
        </div>
        <div className="header-time">
          <div className="time-display">
            <div className="time-value">{currentTime.toLocaleTimeString()}</div>
            <div className="date-value">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={FaUserMd}
          title="Total Doctors"
          value="48"
          color="blue"
          trend={12}
          subtitle="Active physicians"
        />
        <StatCard
          icon={MdPeople}
          title="Total Patients"
          value="1,247"
          color="green"
          trend={8}
          subtitle="Registered patients"
        />
        <StatCard
          icon={MdEventNote}
          title="Appointments"
          value="156"
          color="purple"
          subtitle="Today's schedule"
        />
        <StatCard
          icon={MdLocalPharmacy}
          title="Medicines in Stock"
          value="892"
          color="yellow"
          trend={-5}
          subtitle="Available items"
        />
        <StatCard
          icon={MdAirportShuttle}
          title="Active Ambulances"
          value="12/15"
          color="blue"
          subtitle="On duty"
        />
        <StatCard
          icon={MdWarning}
          title="Alerts"
          value="7"
          color="red"
          subtitle="Requires attention"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <NeonCard title="Patient Flow Analytics" icon={MdTrendingUp} className="chart-card">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 234, 255, 0.1)" />
                <XAxis dataKey="day" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(20, 27, 46, 0.9)', 
                    border: '1px solid var(--neon-blue)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="var(--neon-cyan)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--neon-cyan)', r: 5 }}
                  activeDot={{ r: 8, fill: 'var(--neon-cyan)', stroke: 'var(--neon-blue)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </NeonCard>

        <NeonCard title="Medicine Usage" icon={MdLocalPharmacy} className="chart-card">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={medicineUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 234, 255, 0.1)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(20, 27, 46, 0.9)', 
                    border: '1px solid var(--neon-blue)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }} 
                />
                <Bar 
                  dataKey="usage" 
                  fill="var(--neon-cyan)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </NeonCard>
      </div>

      {/* Emergency Alerts & Activities */}
      <div className="bottom-section">
        <NeonCard title="Emergency Alerts" icon={MdWarning} glowColor="red" className="alerts-card">
          <div className="alerts-list">
            {emergencyAlerts.map(alert => (
              <div key={alert.id} className={`alert-item alert-${alert.type}`}>
                <div className="alert-indicator"></div>
                <div className="alert-content">
                  <div className="alert-message">{alert.message}</div>
                  <div className="alert-time">{alert.time}</div>
                </div>
                <div className="alert-pulse"></div>
              </div>
            ))}
          </div>
        </NeonCard>

        <NeonCard title="Recent Activities" icon={FaHospital} className="activities-card">
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-meta">
                    <span className="activity-user">{activity.user}</span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </NeonCard>

        {/* AI Prediction Panel */}
        <NeonCard title="AI Stock Predictions" icon={MdTrendingUp} glowColor="purple" className="prediction-card">
          <div className="predictions-list">
            <div className="prediction-item warning">
              <div className="prediction-icon">⚠️</div>
              <div className="prediction-text">
                <strong>Paracetamol</strong>
                <span>May finish in 4 days</span>
              </div>
              <div className="prediction-confidence">89% confidence</div>
            </div>
            <div className="prediction-item alert">
              <div className="prediction-icon">🔴</div>
              <div className="prediction-text">
                <strong>Surgical Masks</strong>
                <span>Critical - Reorder now</span>
              </div>
              <div className="prediction-confidence">95% confidence</div>
            </div>
            <div className="prediction-item success">
              <div className="prediction-icon">✓</div>
              <div className="prediction-text">
                <strong>Antibiotics</strong>
                <span>Stock optimal for 2 weeks</span>
              </div>
              <div className="prediction-confidence">92% confidence</div>
            </div>
          </div>
        </NeonCard>
      </div>

      {/* System Status Bar */}
      <div className="system-status">
        <div className="status-item">
          <div className="status-dot online"></div>
          <span>Database: Online</span>
        </div>
        <div className="status-item">
          <div className="status-dot online"></div>
          <span>Backup: Active</span>
        </div>
        <div className="status-item">
          <div className="status-dot online"></div>
          <span>API: Connected</span>
        </div>
        <div className="status-item">
          <div className="status-dot warning"></div>
          <span>Storage: 78% Used</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
