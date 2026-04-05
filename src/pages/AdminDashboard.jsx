import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import ContentEditor from '../components/ContentEditor';
import MediaManager from '../components/MediaManager';
import ErrorBoundary from '../components/ErrorBoundary';
import {
  FileText,
  Image,
  Video,
  LogOut,
  Menu,
  X,
  HelpCircle,
  Home,
  Shield,
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════ */
const C = {
  sidebarBg:    '#0f172a',
  sidebarBorder:'rgba(255,255,255,0.06)',
  accent:       '#10b981',
  accentGlow:   'rgba(16,185,129,0.25)',
  accentDark:   '#059669',
  sky:          '#0ea5e9',
  contentBg:    '#f8fafc',
  headerBg:     '#ffffff',
  cardBg:       '#ffffff',
  text:         '#1e293b',
  textMuted:    '#64748b',
  border:       '#e2e8f0',
  danger:       '#ef4444',
  dangerBg:     'rgba(239,68,68,0.08)',
};

const S = {
  /* Layout */
  page: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Inter', 'system-ui', sans-serif",
    background: C.contentBg,
    overflow: 'hidden',
  },
  /* ─── Sidebar ─── */
  sidebar: (open) => ({
    width: open ? '280px' : '72px',
    minWidth: open ? '280px' : '72px',
    background: C.sidebarBg,
    borderRight: `1px solid ${C.sidebarBorder}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), min-width 0.3s cubic-bezier(0.16,1,0.3,1)',
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    zIndex: 20,
  }),
  sidebarHead: {
    padding: '1.5rem 1rem 1rem',
    borderBottom: `1px solid ${C.sidebarBorder}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    overflow: 'hidden',
  },
  brandIcon: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    borderRadius: '12px',
    background: `linear-gradient(135deg, ${C.accent}, ${C.sky})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 4px 16px ${C.accentGlow}`,
  },
  brandText: {
    overflow: 'hidden',
  },
  brandTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    whiteSpace: 'nowrap',
    fontFamily: "'Outfit', sans-serif",
  },
  brandSub: {
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.45)',
    margin: 0,
    whiteSpace: 'nowrap',
  },
  toggleBtn: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    width: '32px',
    height: '32px',
    minWidth: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.6)',
    transition: 'background 0.2s',
    flexShrink: 0,
  },
  nav: {
    flex: 1,
    padding: '1rem 0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  navItem: (active, open) => ({
    display: 'flex',
    alignItems: 'center',
    gap: open ? '0.875rem' : 0,
    padding: open ? '0.75rem 1rem' : '0.75rem',
    borderRadius: '12px',
    cursor: 'pointer',
    border: 'none',
    background: active
      ? `linear-gradient(135deg, ${C.accentGlow}, rgba(14,165,233,0.15))`
      : 'transparent',
    borderLeft: active ? `3px solid ${C.accent}` : '3px solid transparent',
    transition: 'all 0.2s ease',
    width: '100%',
    justifyContent: open ? 'flex-start' : 'center',
    textAlign: 'left',
    overflow: 'hidden',
  }),
  navIcon: (active) => ({
    width: '36px',
    height: '36px',
    minWidth: '36px',
    borderRadius: '10px',
    background: active ? C.accent : 'rgba(255,255,255,0.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: active ? '#fff' : 'rgba(255,255,255,0.5)',
    transition: 'all 0.2s',
  }),
  navLabel: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#fff',
    margin: 0,
    whiteSpace: 'nowrap',
  },
  navDesc: {
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.4)',
    margin: 0,
    whiteSpace: 'nowrap',
  },
  sidebarFooter: {
    padding: '0.75rem',
    borderTop: `1px solid ${C.sidebarBorder}`,
    flexShrink: 0,
  },
  logoutBtn: (open) => ({
    display: 'flex',
    alignItems: 'center',
    gap: open ? '0.75rem' : 0,
    padding: open ? '0.75rem 1rem' : '0.75rem',
    borderRadius: '12px',
    background: C.dangerBg,
    border: `1px solid rgba(239,68,68,0.2)`,
    color: '#f87171',
    cursor: 'pointer',
    width: '100%',
    justifyContent: open ? 'flex-start' : 'center',
    transition: 'background 0.2s',
    overflow: 'hidden',
  }),
  logoutLabel: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#f87171',
    whiteSpace: 'nowrap',
  },
  /* ─── Main area ─── */
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minWidth: 0,
  },
  topbar: {
    background: C.headerBg,
    borderBottom: `1px solid ${C.border}`,
    padding: '0 2rem',
    minHeight: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    gap: '1rem',
    flexWrap: 'wrap',
    rowGap: '0.5rem',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
  },
  pageTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: C.text,
    margin: 0,
    fontFamily: "'Outfit', sans-serif",
  },
  pageDesc: {
    fontSize: '0.8rem',
    color: C.textMuted,
    margin: '2px 0 0',
  },
  topbarActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  previewBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    background: `linear-gradient(135deg, ${C.accent}, ${C.sky})`,
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: `0 4px 12px ${C.accentGlow}`,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  homeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    color: C.textMuted,
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '2rem',
  },
};

/* ═══════════════════════════════════════════════
   ADMIN DASHBOARD
═══════════════════════════════════════════════ */
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'content', label: 'Content Editor', icon: FileText, desc: 'Edit website text'      },
    { id: 'media',   label: 'Image Manager',  icon: Image,   desc: 'Upload & manage images' },
    { id: 'videos',  label: 'Video Manager',  icon: Video,   desc: 'Upload & manage videos' },
  ];

  const stats = [
    { label: 'Pages',   value: 6  },
    { label: 'Images',  value: 24 },
    { label: 'Videos',  value: 8  },
    { label: 'Updated', value: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) },
  ];

  const renderContent = () => {
    const map = {
      content: <ContentEditor />,
      media:   <MediaManager type="image" />,
      videos:  <MediaManager type="video" />,
    };
    return <ErrorBoundary>{map[activeTab] || <ContentEditor />}</ErrorBoundary>;
  };

  const current = menuItems.find(m => m.id === activeTab);

  return (
    <ProtectedRoute>
      <div style={S.page}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700&display=swap');
          .nav-btn:hover:not(.active) { background: rgba(255,255,255,0.06) !important; }
          .sidebar-toggle:hover { background: rgba(255,255,255,0.12) !important; }
          .logout-btn:hover { background: rgba(239,68,68,0.16) !important; }
          .preview-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(16,185,129,0.35) !important; }
          .home-btn:hover { background: #e2e8f0 !important; }
          * { box-sizing: border-box; }
        `}</style>

        {/* ── Sidebar ── */}
        <div style={S.sidebar(sidebarOpen)}>
          {/* Head */}
          <div style={S.sidebarHead}>
            <div style={S.brandRow}>
              <div style={S.brandIcon}>
                <Shield size={20} color="#fff" />
              </div>
              {sidebarOpen && (
                <div style={S.brandText}>
                  <p style={S.brandTitle}>Admin Panel</p>
                  <p style={S.brandSub}>Madhuban NGO</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(o => !o)}
              style={S.toggleBtn}
              className="sidebar-toggle"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

          {/* Nav */}
          <nav style={S.nav}>
            {menuItems.map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={S.navItem(active, sidebarOpen)}
                  className={`nav-btn${active ? ' active' : ''}`}
                >
                  <div style={S.navIcon(active)}>
                    <Icon size={18} />
                  </div>
                  {sidebarOpen && (
                    <div style={{ overflow: 'hidden' }}>
                      <p style={S.navLabel}>{item.label}</p>
                      <p style={S.navDesc}>{item.desc}</p>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Help card */}
            {sidebarOpen && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'rgba(14,165,233,0.1)',
                border: '1px solid rgba(14,165,233,0.2)',
                borderRadius: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <HelpCircle size={16} color="#38bdf8" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>Need Help?</span>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(186,230,253,0.7)', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
                  Check the admin guide for detailed instructions.
                </p>
                <button style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: 'rgba(14,165,233,0.25)',
                  border: '1px solid rgba(14,165,233,0.3)',
                  borderRadius: '8px',
                  color: '#7dd3fc',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  View Guide
                </button>
              </div>
            )}
          </nav>

          {/* Logout */}
          <div style={S.sidebarFooter}>
            <button onClick={handleLogout} style={S.logoutBtn(sidebarOpen)} className="logout-btn">
              <LogOut size={18} color="#f87171" style={{ flexShrink: 0 }} />
              {sidebarOpen && <span style={S.logoutLabel}>Logout</span>}
            </button>
          </div>
        </div>

        {/* ── Main Area ── */}
        <div style={S.mainArea}>
          {/* Topbar */}
          <div style={S.topbar}>
            {/* Left: title */}
            <div style={{ flexShrink: 0 }}>
              <h2 style={S.pageTitle}>{current?.label}</h2>
              <p style={S.pageDesc}>{current?.desc}</p>
            </div>

            {/* Centre: stat chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {stats.map(s => (
                <div key={s.label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  color: '#475569',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{s.value}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Right: action buttons */}
            <div style={{ ...S.topbarActions, flexShrink: 0 }}>
              <button
                onClick={() => window.open('/', '_blank')}
                style={S.previewBtn}
                className="preview-btn"
              >
                <Home size={16} />
                <span>Preview Site</span>
              </button>
              <button
                onClick={() => window.open('/', '_self')}
                style={S.homeBtn}
                className="home-btn"
              >
                <Home size={16} />
                <span>Go to Site</span>
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div style={S.content}>
            {renderContent()}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};


export default AdminDashboard;
