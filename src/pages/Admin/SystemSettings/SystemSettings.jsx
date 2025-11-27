import React from 'react';
import { MdSettings, MdBackup, MdSecurity } from 'react-icons/md';
import NeonCard from '../../../components/NeonCard/NeonCard';
import NeonButton from '../../../components/NeonButton/NeonButton';
import './SystemSettings.css';

const SystemSettings = () => {
  return (
    <div className="system-settings">
      <h1 className="neon-text">System Settings</h1>

      <NeonCard title="Theme Configuration" icon={MdSettings}>
        <div className="settings-group">
          <div className="setting-item">
            <label>Neon Theme</label>
            <select className="setting-input">
              <option>Blue (Default)</option>
              <option>Purple</option>
              <option>Green</option>
            </select>
          </div>
        </div>
      </NeonCard>

      <NeonCard title="Backup & Restore" icon={MdBackup}>
        <div className="backup-actions">
          <NeonButton variant="primary">Create Backup</NeonButton>
          <NeonButton variant="success">Restore from Backup</NeonButton>
        </div>
        <p className="last-backup">Last backup: 2 hours ago</p>
      </NeonCard>

      <NeonCard title="Security" icon={MdSecurity}>
        <div className="settings-group">
          <div className="setting-item">
            <label>Change Password</label>
            <input type="password" className="setting-input" placeholder="New password" />
          </div>
          <NeonButton variant="primary">Update Password</NeonButton>
        </div>
      </NeonCard>
    </div>
  );
};

export default SystemSettings;
