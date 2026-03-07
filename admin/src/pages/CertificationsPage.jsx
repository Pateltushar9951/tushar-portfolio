import { useEffect, useState } from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi';
import API from '../api';

export default function CertificationsPage() {
  const [certs, setCerts] = useState([]);
  const [name, setName] = useState('');
  const [toast, setToast] = useState(null);

  const fetchCerts = async () => {
    try {
      const { data } = await API.get('/certifications');
      setCerts(data);
    } catch { /* */ }
  };

  useEffect(() => { fetchCerts(); }, []);

  const notify = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await API.post('/certifications', { name: name.trim() });
      notify('Certification added!');
      setName('');
      fetchCerts();
    } catch {
      notify('Failed to add.', true);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    try {
      await API.delete(`/certifications/${id}`);
      notify('Certification deleted!');
      fetchCerts();
    } catch {
      notify('Failed to delete.', true);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Certifications</h1>
        <p className="page-subtitle">Manage your certifications and achievements</p>
      </div>

      <div className="form-card">
        <h3>➕ Add Certification</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Certification Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. AWS Cloud Practitioner — Amazon" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: 42 }}><HiPlus /> Add</button>
        </form>
      </div>

      {certs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏅</div>
          <div className="empty-state-text">No certifications yet</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Seed initial data from Dashboard or add one above.
          </p>
        </div>
      ) : (
        <div className="item-list">
          {certs.map((cert) => (
            <div className="item-row" key={cert._id}>
              <div className="item-info">
                <div className="item-title">🏅 {cert.name}</div>
                <div className="item-meta">
                  Added {new Date(cert.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cert._id)}>
                <HiTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {toast && <div className={`toast ${toast.isError ? 'error' : ''}`}>{toast.msg}</div>}
    </div>
  );
}
