import React, { useState } from 'react';
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
  AlertTriangle
} from 'lucide-react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard',    icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/analyze',      icon: <MessageSquare size={20} />,   label: 'Analyze Text' },
    { path: '/adaptation',   icon: <GitMerge size={20} />,        label: 'Continual Adaptation' },
    { path: '/architecture', icon: <Network size={20} />,         label: 'Architecture' },
  ];

  const handleLogout = () => {
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
              You will be returned to the login page. Any unsaved analysis will be lost.
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
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''} fixed lg:static`}>

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

        {/* Nav */}
        <nav className="flex-1 px-2 py-5">
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

        {/* Bottom section */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Project info */}
          <div className="px-3 py-2 rounded-lg mb-3"
            style={{ background: 'rgba(33,150,243,0.08)' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.50)', lineHeight: '1.6' }}>
              Final Year Project Demo<br />
              <span style={{ color: '#90CAF9', fontWeight: '600' }}>Tamil Emotion Reasoning</span>
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={{
              color: 'rgba(252,165,165,0.90)',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.16)';
              e.currentTarget.style.color = '#FCA5A5';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
              e.currentTarget.style.color = 'rgba(252,165,165,0.90)';
            }}
          >
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b p-4 flex items-center gap-4 sticky top-0 z-20"
          style={{ borderColor: 'rgba(33,150,243,0.15)' }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md transition-colors"
            style={{ color: '#0D2137' }}
          >
            <Menu size={24} />
          </button>
          <div className="font-bold" style={{ color: '#0D2137' }}>TamilEmotion AI</div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
