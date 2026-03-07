import { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import API from '../api';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get('/contact');
      setMessages(data);
    } catch { /* */ }
  };

  useEffect(() => { fetchMessages(); }, []);

  const notify = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await API.delete(`/contact/${id}`);
      notify('Message deleted!');
      fetchMessages();
    } catch {
      notify('Failed to delete.', true);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Messages</h1>
        <p className="page-subtitle">
          Contact form submissions from your portfolio visitors ({messages.length} total)
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💬</div>
          <div className="empty-state-text">No messages yet</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            When visitors submit the contact form on your portfolio, messages will appear here.
          </p>
        </div>
      ) : (
        messages.map((msg) => (
          <div className="message-card" key={msg._id}>
            <div className="message-header">
              <div>
                <div className="message-sender">{msg.name}</div>
                <div className="message-email">{msg.email}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="message-date">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(msg._id)}>
                  <HiTrash />
                </button>
              </div>
            </div>
            <div className="message-body">{msg.message}</div>
          </div>
        ))
      )}

      {toast && <div className={`toast ${toast.isError ? 'error' : ''}`}>{toast.msg}</div>}
    </div>
  );
}
