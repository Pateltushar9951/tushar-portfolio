import { useEffect, useState } from 'react';
import { HiPlus, HiTrash, HiPencil, HiX } from 'react-icons/hi';
import API from '../api';

const emptyForm = { category: '', icon: '💡', items: '', order: 0 };

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchSkills = async () => {
    try {
      const { data } = await API.get('/skills');
      setSkills(data);
    } catch { /* */ }
  };

  useEffect(() => { fetchSkills(); }, []);

  const notify = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      items: typeof form.items === 'string'
        ? form.items.split(',').map(s => s.trim()).filter(Boolean)
        : form.items,
      order: Number(form.order),
    };
    try {
      if (editId) {
        await API.put(`/skills/${editId}`, payload);
        notify('Skill category updated!');
      } else {
        await API.post('/skills', payload);
        notify('Skill category added!');
      }
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      fetchSkills();
    } catch {
      notify('Failed to save.', true);
    }
  };

  const handleEdit = (s) => {
    setForm({
      category: s.category,
      icon: s.icon,
      items: s.items.join(', '),
      order: s.order || 0,
    });
    setEditId(s._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill category?')) return;
    try {
      await API.delete(`/skills/${id}`);
      notify('Skill category deleted!');
      fetchSkills();
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
          <h1 className="page-title">Skills</h1>
          <p className="page-subtitle">Manage your skill categories and items</p>
        </div>
        <button className="btn btn-primary" onClick={() => { cancelEdit(); setShowForm(!showForm); }}>
          <HiPlus /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editId ? '✏️ Edit Skill Category' : '➕ Add New Skill Category'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Category Name</label>
                <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required placeholder="e.g. AI & Automation" />
              </div>
              <div className="form-group">
                <label>Icon (emoji)</label>
                <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="🧠" />
              </div>
            </div>
            <div className="form-group">
              <label>Skills (comma-separated)</label>
              <textarea value={form.items} onChange={e => setForm({ ...form, items: e.target.value })} required placeholder="n8n, Claude AI, Cursor, Prompt Engineering" />
            </div>
            <div className="form-group" style={{ maxWidth: 200 }}>
              <label>Display Order</label>
              <input type="number" min="0" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add'} Category</button>
              <button type="button" className="btn btn-danger" onClick={cancelEdit}><HiX /> Cancel</button>
            </div>
          </form>
        </div>
      )}

      {skills.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🧠</div>
          <div className="empty-state-text">No skills yet</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Seed initial data from Dashboard or add a category above.
          </p>
        </div>
      ) : (
        <div className="item-list">
          {skills.map((s) => (
            <div className="item-row" key={s._id}>
              <div className="item-info">
                <div className="item-title">{s.icon} {s.category}</div>
                <div className="item-meta">
                  {s.items.map(item => <span className="tag" key={item}>{item}</span>)}
                </div>
              </div>
              <div className="btn-group">
                <button className="btn btn-edit btn-sm" onClick={() => handleEdit(s)}><HiPencil /></button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s._id)}><HiTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <div className={`toast ${toast.isError ? 'error' : ''}`}>{toast.msg}</div>}
    </div>
  );
}
