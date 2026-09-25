import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, User, Lock, ArrowRight, BrainCircuit, BookType, Globe2, ScanFace } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    // Demo: any credentials work
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  const features = [
    { icon: <BookType size={18} />, text: 'Morphology-Aware Analysis' },
    { icon: <Globe2 size={18} />, text: 'Cultural Context Understanding' },
    { icon: <ScanFace size={18} />, text: 'Sarcasm Detection' },
    { icon: <BrainCircuit size={18} />, text: 'Implicit Emotion Reasoning' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#F7FBFF', backgroundImage: 'radial-gradient(circle, rgba(33,150,243,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0D2137 0%, #1565C0 60%, #2196F3 100%)' }}>

        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} />

        {/* Glow blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #90CAF9, transparent)' }} />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #BBDEFB, transparent)' }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <Sparkles size={22} color="#BBDEFB" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            TamilEmotion<span style={{ color: '#90CAF9' }}>AI</span>
          </span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
              Understand Tamil<br />
              <span style={{
                background: 'linear-gradient(135deg, #90CAF9, #BBDEFB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Emotion Deeply.
              </span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: '16px', lineHeight: '1.7', maxWidth: '380px' }}>
              Culturally grounded Tamil emotion reasoning with morphology-aware analysis and continual adaptation.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#90CAF9' }}>
                  {f.icon}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: '500' }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tag */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)', color: '#BBDEFB' }}>
            <Sparkles size={12} />
            Final Year Project — Tamil NLP Research
          </div>
        </div>
      </div>

      {/* ── Right Panel (Login Form) ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#0D2137,#1565C0)' }}>
              <Sparkles size={18} color="#BBDEFB" />
            </div>
            <span className="text-xl font-bold" style={{ color: '#0D2137' }}>
              TamilEmotion<span style={{ color: '#2196F3' }}>AI</span>
            </span>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl p-8 shadow-xl" style={{ border: '1px solid rgba(33,150,243,0.15)', borderLeft: '4px solid #2196F3' }}>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#0D2137' }}>Welcome back</h2>
              <p style={{ color: '#374151', fontSize: '15px' }}>
                Sign in to access the Tamil emotion analysis platform.
              </p>
            </div>

            {/* Demo hint */}
            <div className="mb-6 px-4 py-3 rounded-lg flex items-start gap-3"
              style={{ background: 'rgba(33,150,243,0.07)', border: '1px solid rgba(33,150,243,0.18)' }}>
              <Sparkles size={16} style={{ color: '#1565C0', marginTop: '1px', flexShrink: 0 }} />
              <p style={{ color: '#1565C0', fontSize: '13px', fontWeight: '500' }}>
                <strong>Demo mode:</strong> Enter any username and password to sign in.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider"
                  style={{ color: '#0D2137', letterSpacing: '0.06em', fontSize: '11px' }}>
                  Username
                </label>
                <div className="relative">
                  <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#1565C0' }} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm font-medium outline-none transition-all"
                    style={{
                      border: '1.5px solid rgba(33,150,243,0.25)',
                      color: '#0D2137',
                      background: '#FAFCFF',
                    }}
                    onFocus={e => e.target.style.borderColor = '#2196F3'}
                    onBlur={e => e.target.style.borderColor = 'rgba(33,150,243,0.25)'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider"
                  style={{ color: '#0D2137', letterSpacing: '0.06em', fontSize: '11px' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#1565C0' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 rounded-lg text-sm font-medium outline-none transition-all"
                    style={{
                      border: '1.5px solid rgba(33,150,243,0.25)',
                      color: '#0D2137',
                      background: '#FAFCFF',
                    }}
                    onFocus={e => e.target.style.borderColor = '#2196F3'}
                    onBlur={e => e.target.style.borderColor = 'rgba(33,150,243,0.25)'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#6B7280' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#DC2626' }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all"
                style={{
                  background: loading ? '#90CAF9' : 'linear-gradient(135deg, #0D2137 0%, #1565C0 50%, #2196F3 100%)',
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(33,150,243,0.35)',
                  fontSize: '15px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transform: 'translateY(0)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => !loading && (e.target.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20"/>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>Sign In <ArrowRight size={18} /></>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center mt-6 text-xs" style={{ color: '#6B7280' }}>
              Final Year Project Demo · Tamil Emotion Reasoning System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
