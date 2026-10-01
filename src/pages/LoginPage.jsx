import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, User, Lock, ArrowRight, BrainCircuit, BookType, Globe2, ScanFace, Database, CheckCircle2 } from 'lucide-react';
import { authAPI } from '../services/api';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        const response = await authAPI.register({
          username: username.trim(),
          password: password.trim(),
          email: email.trim(),
          fullName: fullName.trim()
        });
        localStorage.setItem('tamil_ai_token', response.token);
        localStorage.setItem('tamil_ai_user', JSON.stringify({
          username: response.username,
          role: response.role,
          fullName: response.fullName
        }));
        setSuccessMsg('Account registered in MongoDB! Redirecting to Dashboard...');
        setTimeout(() => navigate('/dashboard'), 800);
      } else {
        const response = await authAPI.login({
          username: username.trim(),
          password: password.trim()
        });
        localStorage.setItem('tamil_ai_token', response.token);
        localStorage.setItem('tamil_ai_user', JSON.stringify({
          username: response.username,
          role: response.role,
          fullName: response.fullName
        }));
        setSuccessMsg('Authenticated via Spring Boot! Loading...');
        setTimeout(() => navigate('/dashboard'), 600);
      }
    } catch (err) {
      console.error('Auth error:', err);
      // Fallback demo login if network is offline
      if (err.message && err.message.includes('Failed to fetch')) {
        setError('Backend server offline. Continuing in offline demo mode...');
        localStorage.setItem('tamil_ai_user', JSON.stringify({ username, role: 'RESEARCHER', fullName: username }));
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setError(err.message || 'Authentication failed. Please verify credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  const features = [
    { icon: <BookType size={18} />, text: 'Morphology-Aware Tamil Tokenizer' },
    { icon: <Globe2 size={18} />, text: 'Cultural Idioms & Metaphor Grounding' },
    { icon: <ScanFace size={18} />, text: 'Contextual Sarcasm Contradiction' },
    { icon: <BrainCircuit size={18} />, text: 'Continual Learning with EWC & Replay' },
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-4 border border-white/20">
              <Database size={13} /> Fullstack Java Spring Boot + MongoDB
            </div>
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
            <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: '16px', lineHeight: '1.7', maxWidth: '420px' }}>
              Culturally grounded Tamil emotion reasoning system backed by Java Spring Boot, MongoDB document storage, and continual adaptation.
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
        <div className="relative z-10 flex items-center justify-between text-xs"
          style={{ color: 'rgba(255,255,255,0.50)', borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: '16px' }}>
          <span>Final Year Project 2026</span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            MongoDB 9.0 Connected
          </span>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-6">

          {/* Tab Switcher */}
          <div className="flex bg-blue-50/80 p-1 rounded-xl border border-blue-100 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                !isRegister ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                isRegister ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Register New User
            </button>
          </div>

          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D2137' }}>
              {isRegister ? 'Create NLP Researcher Account' : 'Welcome to TamilEmotion AI'}
            </h2>
            <p className="text-muted text-sm mt-1">
              {isRegister
                ? 'Store analyses, custom idioms, and adaptation logs in MongoDB'
                : 'Sign in to access morphological reasoning and continual learning'}
            </p>
          </div>

          {/* Quick Credential Badges */}
          {!isRegister && (
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1.5">
              <p className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                <Sparkles size={13} className="text-blue-600" /> Pre-seeded MongoDB Demo Accounts:
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin', 'admin123')}
                  className="flex-1 text-[11px] font-semibold py-1 px-2 rounded bg-white text-blue-700 border border-blue-200 hover:bg-blue-100/50 transition-all text-left"
                >
                  <span className="font-bold">admin</span> / admin123
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('researcher', 'tamilai2026')}
                  className="flex-1 text-[11px] font-semibold py-1 px-2 rounded bg-white text-blue-700 border border-blue-200 hover:bg-blue-100/50 transition-all text-left"
                >
                  <span className="font-bold">researcher</span> / tamilai2026
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl text-sm font-medium flex items-center gap-2"
              style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.20)' }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="p-3.5 rounded-xl text-sm font-medium flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#0D2137' }}>
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. K. Sundaram"
                    className="w-full px-4 py-3 pl-10 rounded-xl text-sm font-medium transition-all"
                    style={{
                      border: '1.5px solid rgba(33,150,243,0.25)',
                      background: 'white',
                      color: '#0D2137',
                    }}
                  />
                  <User size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                </div>
              </div>
            )}

            {isRegister && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#0D2137' }}>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="researcher@tamilai.org"
                    className="w-full px-4 py-3 pl-10 rounded-xl text-sm font-medium transition-all"
                    style={{
                      border: '1.5px solid rgba(33,150,243,0.25)',
                      background: 'white',
                      color: '#0D2137',
                    }}
                  />
                  <Globe2 size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                </div>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#0D2137' }}>
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 pl-10 rounded-xl text-sm font-medium transition-all"
                  style={{
                    border: '1.5px solid rgba(33,150,243,0.25)',
                    background: 'white',
                    color: '#0D2137',
                  }}
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#0D2137' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pl-10 pr-10 rounded-xl text-sm font-medium transition-all"
                  style={{
                    border: '1.5px solid rgba(33,150,243,0.25)',
                    background: 'white',
                    color: '#0D2137',
                  }}
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md mt-4"
              style={{
                background: 'linear-gradient(135deg, #1565C0 0%, #2196F3 100%)',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Backend...</span>
                </>
              ) : (
                <>
                  <span>{isRegister ? 'Create Account & Sign In' : 'Sign In to Workspace'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-xs text-muted">
            Backed by <span className="font-bold text-primary">Spring Boot 3.2</span> &{' '}
            <span className="font-bold text-primary">MongoDB 9.0</span>
          </p>
        </div>
      </div>
    </div>
  );
}
