import { useEffect, useState } from 'react';
import { HiPlus, HiTrash, HiPencil, HiX } from 'react-icons/hi';
import API from '../api';

const emptyForm = { title: '', description: '', category: '', techStack: '', teamSize: 1, image: '🚀' };

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get('/projects');
      setProjects(data);
    } catch { /* backend may be offline */ }
  };

  useEffect(() => { fetchProjects(); }, []);

  const notify = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: typeof form.techStack === 'string'
        ? form.techStack.split(',').map(s => s.trim()).filter(Boolean)
        : form.techStack,
      teamSize: Number(form.teamSize),
    };

    try {
      if (editId) {
        await API.put(`/projects/${editId}`, payload);
        notify('Project updated!');
      } else {
        await API.post('/projects', payload);
        notify('Project added!');
      }
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      fetchProjects();
    } catch {
      notify('Failed to save project.', true);
    }
  };

  const handleEdit = (p) => {
    setForm({
      title: p.title,
      description: p.description,
      category: p.category,
      techStack: p.techStack.join(', '),
      teamSize: p.teamSize,
      image: p.image,
    });
    setEditId(p._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await API.delete(`/projects/${id}`);
      notify('Project deleted!');
      fetchProjects();
    } catch {
      notify('Failed to delete.', true);
    }
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Manage your portfolio projects</p>
        </div>
        <button className="btn btn-primary" onClick={() => { cancelEdit(); setShowForm(!showForm); }}>
          <HiPlus /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editId ? '✏️ Edit Project' : '➕ Add New Project'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required placeholder="e.g. Full Stack, Automation" />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Tech Stack (comma-separated)</label>
                <input value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} required placeholder="React, Node.js, MongoDB" />
              </div>
              <div className="form-group">
                <label>Team Size</label>
                <input type="number" min="1" value={form.teamSize} onChange={e => setForm({ ...form, teamSize: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Emoji Icon</label>
              <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="🚀" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add'} Project</button>
              <button type="button" className="btn btn-danger" onClick={cancelEdit}><HiX /> Cancel</button>
            </div>
          </form>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📂</div>
          <div className="empty-state-text">No projects yet</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Go to Dashboard and click "Seed Initial Data" or add a project above.
          </p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}></th>
              <th>Title</th>
              <th>Category</th>
              <th>Tech Stack</th>
              <th>Team</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td>{p.image}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</td>
                <td><span className="tag">{p.category}</span></td>
                <td>{p.techStack.map(t => <span className="tag" key={t}>{t}</span>)}</td>
                <td>{p.teamSize}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-edit btn-sm" onClick={() => handleEdit(p)}><HiPencil /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}><HiTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {toast && <div className={`toast ${toast.isError ? 'error' : ''}`}>{toast.msg}</div>}
    </div>
  );
}
