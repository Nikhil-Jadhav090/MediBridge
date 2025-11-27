import React, { useState } from 'react';
import { MdPeople, MdAdd, MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import NeonCard from '../../../components/NeonCard/NeonCard';
import NeonButton from '../../../components/NeonButton/NeonButton';
import './UserManagement.css';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [users] = useState([
    { id: 1, name: 'Dr. John Smith', role: 'Doctor', phone: '+1-234-567-8901', email: 'john.smith@hospital.com', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', role: 'Receptionist', phone: '+1-234-567-8902', email: 'sarah.j@hospital.com', status: 'Active' },
    { id: 3, name: 'Michael Chen', role: 'Pharmacy', phone: '+1-234-567-8903', email: 'michael.c@hospital.com', status: 'Active' },
    { id: 4, name: 'Dr. Emily Davis', role: 'Doctor', phone: '+1-234-567-8904', email: 'emily.d@hospital.com', status: 'Active' },
    { id: 5, name: 'Robert Wilson', role: 'Admin', phone: '+1-234-567-8905', email: 'robert.w@hospital.com', status: 'Active' },
    { id: 6, name: 'Lisa Anderson', role: 'Receptionist', phone: '+1-234-567-8906', email: 'lisa.a@hospital.com', status: 'Inactive' },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="header-title">
          <h1 className="neon-text">User Management</h1>
          <p className="header-subtitle">Manage all system users and permissions</p>
        </div>
        <NeonButton icon={MdAdd} variant="primary" onClick={() => setShowAddModal(true)}>
          Add New User
        </NeonButton>
      </div>

      <NeonCard icon={MdPeople} title="All Users">
        {/* Search Bar */}
        <div className="search-bar">
          <MdSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search users by name, role, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Users Table */}
        <div className="table-container">
          <table className="neon-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>#{user.id.toString().padStart(3, '0')}</td>
                  <td className="user-name">{user.name}</td>
                  <td>
                    <span className={`role-badge role-${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.phone}</td>
                  <td className="user-email">{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit-btn" title="Edit">
                        <MdEdit />
                      </button>
                      <button className="action-btn delete-btn" title="Delete">
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeonCard>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="neon-text">Add New User</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-input" placeholder="Enter full name" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select className="form-input">
                    <option>Select Role</option>
                    <option>Admin</option>
                    <option>Doctor</option>
                    <option>Receptionist</option>
                    <option>Pharmacy</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" className="form-input" placeholder="+1-234-567-8900" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-input" placeholder="email@hospital.com" />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-input" placeholder="username" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
              </div>
              <div className="modal-actions">
                <NeonButton variant="primary" icon={MdAdd}>Create User</NeonButton>
                <NeonButton variant="danger" onClick={() => setShowAddModal(false)}>Cancel</NeonButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
