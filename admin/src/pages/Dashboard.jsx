import { useEffect, useState } from 'react';
import API from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, certifications: 0, messages: 0 });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/stats');
      setStats(data);
    } catch {
      setStats({ projects: '—', skills: '—', certifications: '—', messages: '—' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const handleSeed = async () => {
    try {
      const { data } = await API.post('/seed');
      setToast(data.message);
      fetchStats();
    } catch {
      setToast('Failed to seed database');
    }
    setTimeout(() => setToast(null), 3000);
  };

  const statCards = [
    { icon: '🚀', label: 'Projects', value: stats.projects },
    { icon: '🧠', label: 'Skill Categories', value: stats.skills },
    { icon: '🏅', label: 'Certifications', value: stats.certifications },
    { icon: '💬', label: 'Messages', value: stats.messages },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your portfolio data</p>
      </div>

      <div className="stats-grid">
        {statCards.map((card) => (
          <div className="stat-card" key={card.label}>
            <div className="stat-card-icon">{card.icon}</div>
            <div className="stat-card-number">{loading ? '...' : card.value}</div>
            <div className="stat-card-label">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="form-card">
        <h3>🌱 Seed Database</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          If your database is empty, click below to populate it with your initial projects, skills, and certifications.
          This only adds data if the collections are empty — it won't create duplicates.
        </p>
        <button className="btn btn-seed" onClick={handleSeed}>
          🌱 Seed Initial Data
        </button>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
