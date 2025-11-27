import React, { useEffect, useState } from 'react';
import { MdEventNote, MdAccessTime, MdPerson, MdEmail, MdPhone, MdNoteAlt, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import './Appointments.css';

const API_BASE = 'http://127.0.0.1:8000/api/appointments';

const defaultForm = {
  patient_name: '',
  patient_email: '',
  patient_phone: '',
  reason: '',
  scheduled_at: '', // datetime-local
  status: 'scheduled',
  notes: '',
};

const Appointments = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const toISO = (dtLocal) => {
    // Convert 'YYYY-MM-DDTHH:mm' to ISO string
    if (!dtLocal) return '';
    const d = new Date(dtLocal);
    return d.toISOString();
  };

  const fromISOToLocal = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to load appointments');
      const data = await res.json();
      setItems(data.results || []);
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => setForm(defaultForm);

  const createAppointment = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.patient_name || !form.scheduled_at) {
      setError('Patient name and date/time are required');
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, scheduled_at: toISO(form.scheduled_at) };
      const res = await fetch(`${API_BASE}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Create failed');
      setItems((arr) => [data, ...arr]);
      resetForm();
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setSaving(false);
    }
  };

  const deleteAppointment = async (id) => {
    if (!confirm('Delete this appointment?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}/`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      setItems((arr) => arr.filter((a) => a.id !== id));
    } catch (e) {
      setError(e.message || 'Network error');
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      patient_name: item.patient_name,
      patient_email: item.patient_email,
      patient_phone: item.patient_phone,
      reason: item.reason,
      scheduled_at: fromISOToLocal(item.scheduled_at),
      status: item.status,
      notes: item.notes,
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    setSaving(true);
    try {
      const payload = { ...form, scheduled_at: toISO(form.scheduled_at) };
      const res = await fetch(`${API_BASE}/${editingId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setItems((arr) => arr.map((a) => (a.id === editingId ? data : a)));
      setEditingId(null);
      resetForm();
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => { setEditingId(null); resetForm(); };

  const changeStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Status update failed');
      setItems((arr) => arr.map((a) => (a.id === id ? data : a)));
    } catch (e) {
      setError(e.message || 'Network error');
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1 className="appointments-title">Appointments Management</h1>
        <p className="appointments-subtitle">Schedule, track, and manage patient appointments</p>
      </div>

      {error && (
        <div className="error-banner">
          <MdNoteAlt size={20} />
          {error}
        </div>
      )}

      {/* Create/Edit Form */}
      <div className="form-card">
        <h2 className="form-title">
          <MdEventNote className="form-icon" />
          {editingId ? 'Edit Appointment' : 'Create New Appointment'}
        </h2>
        <form onSubmit={editingId ? saveEdit : createAppointment}>
          <div className="form-grid">
            <input
              name="patient_name"
              placeholder="Patient Name *"
              value={form.patient_name}
              onChange={onChange}
              className="form-input-light"
              required
            />
            <input
              name="patient_email"
              type="email"
              placeholder="Patient Email"
              value={form.patient_email}
              onChange={onChange}
              className="form-input-light"
            />
            <input
              name="patient_phone"
              placeholder="Patient Phone"
              value={form.patient_phone}
              onChange={onChange}
              className="form-input-light"
            />
            <input
              name="reason"
              placeholder="Reason for Visit"
              value={form.reason}
              onChange={onChange}
              className="form-input-light"
            />
            <input
              type="datetime-local"
              name="scheduled_at"
              value={form.scheduled_at}
              onChange={onChange}
              className="form-input-light"
              required
            />
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="form-input-light"
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              name="notes"
              placeholder="Additional Notes"
              value={form.notes}
              onChange={onChange}
              className="form-input-light"
              style={{ gridColumn: '1 / -1' }}
            />
          </div>
          <div className="btn-group">
            <button className="btn-primary" type="submit" disabled={saving}>
              {editingId ? <MdEdit size={18} /> : <MdAdd size={18} />}
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Appointment'}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={cancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Appointments List */}
      <div className="appointments-list">
        {loading ? (
          <div className="loading-state">
            <MdEventNote size={48} />
            <div>Loading appointments...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <MdEventNote />
            </div>
            <div className="empty-text">No appointments yet. Create your first one above!</div>
          </div>
        ) : (
          items.map((a) => (
            <div key={a.id} className="appointment-card">
              <div className="appointment-header">
                <div className="appointment-patient">
                  <div className="patient-name">{a.patient_name}</div>
                  <div className="appointment-time">
                    <MdAccessTime size={16} />
                    {new Date(a.scheduled_at).toLocaleString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div className={`status-badge status-${a.status}`}>
                  {a.status}
                </div>
              </div>

              <div className="appointment-details">
                {a.patient_email && (
                  <div className="detail-row">
                    <MdEmail size={16} />
                    <span className="detail-label">Email:</span>
                    <span>{a.patient_email}</span>
                  </div>
                )}
                {a.patient_phone && (
                  <div className="detail-row">
                    <MdPhone size={16} />
                    <span className="detail-label">Phone:</span>
                    <span>{a.patient_phone}</span>
                  </div>
                )}
                {a.reason && (
                  <div className="detail-row">
                    <MdNoteAlt size={16} />
                    <span className="detail-label">Reason:</span>
                    <span>{a.reason}</span>
                  </div>
                )}
                {a.notes && (
                  <div className="detail-row">
                    <MdNoteAlt size={16} />
                    <span className="detail-label">Notes:</span>
                    <span>{a.notes}</span>
                  </div>
                )}
              </div>

              <div className="appointment-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>
                    Status:
                  </span>
                  <select
                    value={a.status}
                    onChange={(e) => changeStatus(a.id, e.target.value)}
                    className="status-selector"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="action-buttons">
                  <button className="btn-edit" onClick={() => startEdit(a)}>
                    <MdEdit size={16} /> Edit
                  </button>
                  <button className="btn-danger" onClick={() => deleteAppointment(a.id)}>
                    <MdDelete size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointments;
