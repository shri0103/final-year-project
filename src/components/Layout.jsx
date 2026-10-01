import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  GitMerge, 
  Network, 
  Menu, 
  X,
  Sparkles,
  LogOut,
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { systemAPI } from '../services/api';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true, info: null });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check logged in user
    try {
      const stored = localStorage.getItem('tamil_ai_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.warn(e);
    }

    // Ping Spring Boot backend
    systemAPI.getHealth()
      .then(data => {
        setBackendStatus({ online: true, checking: false, info: data });
      })
      .catch(err => {
        console.warn('Backend check:', err);
        setBackendStatus({ online: false, checking: false, info: null });
      });
  }, []);

  const navItems = [
    { path: '/dashboard',    icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/analyze',      icon: <MessageSquare size={20} />,   label: 'Analyze Text' },
    { path: '/adaptation',   icon: <GitMerge size={20} />,        label: 'Continual Adaptation' },
    { path: '/architecture', icon: <Network size={20} />,         label: 'Architecture' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('tamil_ai_token');
    localStorage.removeItem('tamil_ai_user');
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <div className="app-layout">

      {/* ── Logout Confirmation Modal ── */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(13,33,55,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 animate-fade-in"
            style={{ border: '1px solid rgba(33,150,243,0.18)', borderLeft: '4px solid #2196F3' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <LogOut size={26} style={{ color: '#DC2626' }} />
            </div>

            {/* Text */}
            <h3 className="text-xl font-extrabold text-center mb-2" style={{ color: '#0D2137' }}>
              Sign Out?
            </h3>
            <p className="text-center text-sm mb-7" style={{ color: '#374151' }}>
              You will be returned to the login page.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-lg font-semibold text-sm transition-all"
                style={{
                  border: '1.5px solid rgba(33,150,243,0.25)',
                  color: '#1565C0',
                  background: 'white',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-lg font-bold text-sm text-white flex items-center justify-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #DC2626, #EF4444)',
                  boxShadow: '0 4px 14px rgba(220,38,38,0.30)',
                }}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(13,33,55,0.4)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''} fixed lg:static flex flex-col justify-between`}>
        <div>
          {/* Logo */}
          <div className="p-5 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(33,150,243,0.20)', border: '1px solid rgba(33,150,243,0.30)' }}>
                <Sparkles size={18} style={{ color: '#90CAF9' }} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                TamilEmotion<span style={{ color: '#90CAF9' }}>AI</span>
              </span>
            </div>
            <button
              className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onClick={() => setSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          {/* User Profile Mini Banner */}
          {currentUser && (
            <div className="mx-3 mt-3 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-200 font-bold text-xs uppercase">
                {currentUser.username ? currentUser.username.substring(0, 2) : 'AI'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{currentUser.fullName || currentUser.username}</p>
                <p className="text-[10px] text-blue-200/70 uppercase tracking-wider">{currentUser.role || 'Researcher'}</p>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="px-2 py-4">
            <div className="px-4 mb-3" style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.10em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
              Navigation
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom section with Live Backend Health & MongoDB Indicator */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Backend Status Pill */}
          <div className="px-3 py-2 rounded-xl mb-3 border transition-all"
            style={{
              background: backendStatus.online ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
              borderColor: backendStatus.online ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'
            }}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${backendStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <p className="text-xs font-semibold text-white flex-1 truncate">
                {backendStatus.online ? 'Spring Boot + MongoDB' : 'Connecting Backend...'}
              </p>
              <Database size={13} className={backendStatus.online ? 'text-emerald-300' : 'text-amber-300'} />
            </div>
            <p className="text-[10px] text-white/60 mt-1 pl-4">
              {backendStatus.online ? 'Port 8080 • Connected' : 'Checking port 8080...'}
            </p>
          </div>

          {/* Project info */}
          <div className="px-3 py-2 rounded-lg mb-3"
            style={{ background: 'rgba(33,150,243,0.08)' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.50)', lineHeight: '1.6' }}>
              Final Year Project<br />
              <span style={{ color: '#90CAF9', fontWeight: '600' }}>Tamil Emotion AI System</span>
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-sm transition-all"
            style={{
              color: 'rgba(252,165,165,0.90)',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.15)',
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-20"
          style={{ borderColor: 'rgba(33,150,243,0.15)' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md transition-colors"
              style={{ color: '#0D2137' }}
            >
              <Menu size={24} />
            </button>
            <div className="font-bold text-lg" style={{ color: '#0D2137' }}>TamilEmotion AI</div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Backend Active
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
