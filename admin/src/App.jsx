import { useState } from 'react';
import {
  HiOutlineViewGrid,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineBadgeCheck,
  HiOutlineMail,
} from 'react-icons/hi';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import CertificationsPage from './pages/CertificationsPage';
import MessagesPage from './pages/MessagesPage';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <HiOutlineViewGrid /> },
  { id: 'projects', label: 'Projects', icon: <HiOutlineBriefcase /> },
  { id: 'skills', label: 'Skills', icon: <HiOutlineSparkles /> },
  { id: 'certifications', label: 'Certifications', icon: <HiOutlineBadgeCheck /> },
  { id: 'messages', label: 'Messages', icon: <HiOutlineMail /> },
];

const pages = {
  dashboard: Dashboard,
  projects: ProjectsPage,
  skills: SkillsPage,
  certifications: CertificationsPage,
  messages: MessagesPage,
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const ActivePage = pages[activePage];

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">{'<TP /> Admin'}</div>
        <div className="sidebar-label">Navigation</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          Portfolio Admin v1.0<br />
          <a href="http://localhost:5173" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-secondary)' }}>
            ← View Portfolio
          </a>
        </div>
      </aside>

      <main className="main-content">
        <ActivePage />
      </main>
    </div>
  );
}

export default App;
