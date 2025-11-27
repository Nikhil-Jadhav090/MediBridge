import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import AdminLayout from './layouts/AdminLayout';
import DoctorLayout from './layouts/DoctorLayout';
import ReceptionistLayout from './layouts/ReceptionistLayout';
import PharmacyLayout from './layouts/PharmacyLayout';
import PatientLayout from './layouts/PatientLayout';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const API_BASE = 'http://127.0.0.1:8000/api/auth';

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_BASE}/me/`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (data && data.authenticated) {
          setIsAuthenticated(true);
          const storedRole = localStorage.getItem('medibridge_role') || 'Patient';
          setUserRole(storedRole);
        } else {
          setIsAuthenticated(false);
          setUserRole('');
        }
      } catch (e) {
        // Ignore network errors; stay unauthenticated
      }
    };
    checkSession();
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    try { localStorage.setItem('medibridge_role', role); } catch {}
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    try { localStorage.removeItem('medibridge_role'); } catch {}
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to={`/${userRole.toLowerCase()}`} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/admin/*" 
            element={
              isAuthenticated && userRole === 'Admin' ? (
                <AdminLayout onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/doctor/*" 
            element={
              isAuthenticated && userRole === 'Doctor' ? (
                <DoctorLayout onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/receptionist/*" 
            element={
              isAuthenticated && userRole === 'Receptionist' ? (
                <ReceptionistLayout onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/pharmacy/*" 
            element={
              isAuthenticated && userRole === 'Pharmacy' ? (
                <PharmacyLayout onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/patient/*" 
            element={
              isAuthenticated && userRole === 'Patient' ? (
                <PatientLayout onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
